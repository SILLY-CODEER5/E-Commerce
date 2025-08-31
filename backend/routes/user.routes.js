import express from "express";
import {
  loginUser,
  loginAdmin,
  registerUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/login-admin", loginAdmin);

export default userRouter;
