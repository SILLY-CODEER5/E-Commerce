import { userModel } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { orderModel } from "../models/order.model.js";
import Stripe from "stripe";
// import { currency } from "../../admin/src/App.jsx";

// global variables
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

// placing orders using Stripe method
const placeOrderStripe = asyncHandler(async (req, res) => {
  const { userId, items, amount, address } = req.body;
  const { origin } = req.headers;

  const orderData = {
    userId,
    items,
    amount,
    address,
    paymentMethod: "Stripe",
    payment: false,
    date: Date.now(),
  };

  const newOrder = new orderModel(orderData);
  await newOrder.save();

  const line_items = items.map((item) => ({
    price_data: {
      currency: currency,
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  line_items.push({
    price_data: {
      currency: currency,
      product_data: {
        name: "Delivery Charges",
      },
      unit_amount: deliveryCharges * 100,
    },
    quantity: 1,
  });
  const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
    cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    line_items,
    mode: "payment",
  });
  res.json({ success: true, session_url: session.url });
});

// verify stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

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
  verifyStripe,
};
