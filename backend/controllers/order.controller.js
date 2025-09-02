import asyncHandler from "../utils/asyncHandler.js";

// placing orders using COD method
const placeOrder = asyncHandler(async (req, res) => {});

// placing orders using Stripe method
const placeOrderStripe = asyncHandler(async (req, res) => {});

// placing orders using Razorpay method
const placeOrderRazorpay = asyncHandler(async (req, res) => {});

// all orders data for Admin Panel
const allOrders = asyncHandler(async (req, res) => {});

// user order data for frontend
const userOrders = asyncHandler(async (req, res) => {});

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
