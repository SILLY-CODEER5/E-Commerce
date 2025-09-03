import { userModel } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { orderModel } from "../models/order.model.js";
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
const placeOrderStripe = asyncHandler(async (req, res) => {});

// placing orders using Razorpay method
const placeOrderRazorpay = asyncHandler(async (req, res) => {});

// all orders data for Admin Panel
const allOrders = asyncHandler(async (req, res) => {});

// user order data for frontend
const userOrders = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const orders = await orderModel.find({ userId });
  res.json({ success: true, orders });
});

// update order status from Admin Panel
const updateStatus = asyncHandler(async (req, res) => {});

export {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};
