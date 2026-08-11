import express from "express";
import {
  loginUser,
  loginAdmin,
  registerUser,
  getUserProfile,
  updateUserAvatar,
} from "../controllers/user.controller.js";
import authUser from "../middlewares/userAuth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login-user", loginUser);
userRouter.post("/login-admin", loginAdmin);
userRouter.post("/profile", authUser, getUserProfile);
userRouter.post("/update-avatar", authUser, upload.single("image"), updateUserAvatar);

export default userRouter;
