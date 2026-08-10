import express from "express";
import {
  addToCart,
  updateCart,
  getUserCart,
} from "../controllers/cart.controller.js";
import authUser from "../middlewares/userAuth.middleware.js";

const cartRouter = express.Router();

cartRouter.post("/get", authUser, getUserCart);
cartRouter.post("/update", authUser, updateCart);
cartRouter.post("/add", authUser, addToCart);

export default cartRouter;
