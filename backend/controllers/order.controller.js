import { userModel } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { orderModel } from "../models/order.model.js";
import { productModel } from "../models/product.model.js";
import Stripe from "stripe";
const currency = "INR";
const deliveryCharges = 10;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing orders using COD method
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
  // -----------------------------------------

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

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const { userId, items, amount, address } = session.metadata;

      const itemsFromMeta = JSON.parse(items);

      const orderItems = await Promise.all(
        itemsFromMeta.map(async (item) => {
          const product = await productModel.findById(item.productId);
          if (!product) {
            console.error(
              `Product with ID ${item.productId} not found in the database.`
            );
            throw new Error(`A product in your order could not be found.`);
          }

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
        })
      );

      const orderData = {
        userId,
        items: orderItems,
        amount: Number(amount),
        address: JSON.parse(address),
        paymentMethod: "Stripe",
        payment: true,
        status: "Order Placed",
        date: Date.now(),
        metadata: { stripeSessionId: sessionId },
      };

      const newOrder = new orderModel(orderData);
      await newOrder.save();
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      res.json({ success: true });
    } else {
      res.json({ success: false, msg: "Payment not successful." });
    }
  } catch (error) {
    console.error("Error in verifyStripeSession:", error.message);
    res
      .status(500)
      .json({ success: false, msg: "Server error during verification." });
  }
});

// placing orders using Razorpay method
const placeOrderRazorpay = asyncHandler(async (req, res) => {});

// all orders data for Admin Panel
const allOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({});
  res.json({ success: true, orders });
});

// user order data for frontend
const userOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const orders = await orderModel.find({ userId });
  res.json({ success: true, orders });
});

// update order status from Admin Panel
const updateStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  await orderModel.findByIdAndUpdate(orderId, { status });
  res.json({ success: true, msg: "Status Updated" });
});

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripeSession,
};
