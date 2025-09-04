// order.controller.js

import { userModel } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { orderModel } from "../models/order.model.js";
import { productModel } from "../models/product.model.js";
import Stripe from "stripe";
const currency = "USD";
const deliveryCharges = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ... (placeOrder, placeOrderStripe functions remain the same) ...

const placeOrder = asyncHandler(async (req, res) => {
  const { userId, items, amount, address } = req.body;

  const orderData = {
    userId,
    items,
    amount,
    address,
    paymentMethod: "COD",
    payment: false,
    date: Date.now(),
  };

  const newOrder = new orderModel(orderData);
  await newOrder.save();
  await userModel.findByIdAndUpdate(userId, { cartData: {} });
  res.json({ success: true, msg: "Order Placed..." });
});

const placeOrderStripe = asyncHandler(async (req, res) => {
  const { userId, items, amount, address } = req.body;
  const { origin } = req.headers;

  if (!items || items.length === 0) {
    return res.status(400).json({
      success: false,
      msg: "Cannot place an order with an empty cart.",
    });
  }
  try {
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const itemsToStore = items.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
      size: item.size,
    }));

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify-payment?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      line_items,
      mode: "payment",
      metadata: {
        userId,
        items: JSON.stringify(itemsToStore),
        amount,
        address: JSON.stringify(address),
      },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe Session Creation Failed:", error);
    res
      .status(500)
      .json({ success: false, msg: "Failed to create Stripe session." });
  }
});
const verifyStripeSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res
      .status(400)
      .json({ success: false, msg: "Session ID is required." });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.json({ success: false, msg: "Payment not successful." });
    }

    const {
      userId,
      items: itemsString,
      amount,
      address: addressString,
    } = session.metadata;

    let itemsFromMeta, address;
    try {
      itemsFromMeta = JSON.parse(itemsString);
      address = JSON.parse(addressString);
    } catch (e) {
      console.error("Failed to parse metadata JSON:", e);
      return res
        .status(400)
        .json({ success: false, msg: "Order metadata is corrupt." });
    }

    const productIds = itemsFromMeta.map((item) => item.productId);

    // --- START: THE FIX ---
    // 1. Get a list of *unique* product IDs from the cart.
    const uniqueProductIds = [...new Set(productIds)];

    // 2. Find all unique products in the database at once.
    const productsInDb = await productModel.find({
      _id: { $in: uniqueProductIds },
    });

    // 3. Compare the count of unique products found vs. the count of unique IDs required.
    if (productsInDb.length !== uniqueProductIds.length) {
      // This will now only fail if a genuinely non-existent product ID is in the cart.
      console.error(
        "A product in the order could not be found in the database."
      );

      // For debugging, find which ID is missing
      const foundProductIds = productsInDb.map((p) => p._id.toString());
      const missingId = uniqueProductIds.find(
        (id) => !foundProductIds.includes(id)
      );
      console.error(`Missing Product ID: ${missingId}`);

      return res.status(404).json({
        success: false,
        msg: "One or more products in your order are no longer available. Please contact support.",
      });
    }
    // --- END: THE FIX ---

    const productMap = new Map(productsInDb.map((p) => [p._id.toString(), p]));
    const orderItems = itemsFromMeta.map((item) => {
      const product = productMap.get(item.productId);
      return {
        _id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        size: item.size,
        quantity: item.quantity,
      };
    });

    const user = await userModel.findById(userId);
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return res
        .status(404)
        .json({ success: false, msg: "User account not found." });
    }

    const orderData = {
      userId,
      items: orderItems,
      amount: Number(amount),
      address,
      paymentMethod: "Stripe",
      payment: true,
      status: "Order Placed",
      date: Date.now(),
      metadata: { stripeSessionId: sessionId },
    };

    const existingOrder = await orderModel.findOneAndUpdate(
      { "metadata.stripeSessionId": sessionId },
      { $setOnInsert: orderData },
      { upsert: true, new: false }
    );

    if (existingOrder) {
      return res.json({ success: true, msg: "Order already processed." });
    } else {
      user.cartData = {};
      await user.save();
      return res.json({ success: true, msg: "Order placed successfully." });
    }
  } catch (error) {
    console.error("CRITICAL ERROR in verifyStripeSession:", error.message);
    return res
      .status(500)
      .json({ success: false, msg: "An unexpected server error occurred." });
  }
});

const allOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({});
  res.json({ success: true, orders });
});

const userOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const orders = await orderModel.find({ userId });
  res.json({ success: true, orders });
});

const updateStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;
  await orderModel.findByIdAndUpdate(orderId, { status });
  res.json({ success: true, msg: "Status Updated" });
});

export {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripeSession,
};
