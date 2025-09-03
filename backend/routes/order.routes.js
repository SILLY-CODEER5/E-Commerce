import express from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripeSession,
} from "../controllers/order.controller.js";
import adminAuth from "../middlewares/adminAuth.middleware.js";
import authUser from "../middlewares/userAuth.middleware.js";

const orderRouter = express.Router();

// admin
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// payment
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

// user
orderRouter.post("/user-orders", authUser, userOrders);

// verify payment
orderRouter.post("/verify-session", verifyStripeSession);

export default orderRouter;
