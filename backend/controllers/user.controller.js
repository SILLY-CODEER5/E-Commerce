import { userModel } from "../models/users.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { v2 as cloudinary } from "cloudinary";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

/**
 * Authenticates a regular user.
 * @route POST /api/v1/user/login
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.json({ success: false, msg: "User does not exist." });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword) {
    const token = createToken(user._id);
    res
      .status(200)
      .json({ success: true, msg: "Login successful.", user, token });
  } else {
    res
      .status(200)
      .json({ success: false, msg: "Invalid credentials. Please try again." });
  }
});

/**
 * Authenticates an admin user.
 * @route POST /api/v1/user/admin
 */
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    let id = await userModel.findOne({ email: process.env.ADMIN_EMAIL });
    console.log(id);
    const token = await jwt.sign(email + password, process.env.JWT_SECRET);
    res.status(202).json({ success: "200", msg: "Admin login successful.", token });
  } else {
    res.status(202).json({ success: "202", msg: "Invalid admin credentials." });
  }
});

/**
 * Registers a new regular user.
 * @route POST /api/v1/user/register
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // checking user exists !
  const exists = await userModel.findOne({ email });
  if (exists) {
    return res.json({ success: false, msg: "User already exists." });
  }
  // check email, password validation
  if (!validator.isEmail(email)) {
    return res.json({ success: false, msg: "Please enter a valid email address." });
  }
  if (password.length < 8) {
    return res.json({
      success: false,
      msg: "Password must be at least 8 characters long.",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
  });

  const user = await newUser.save();
  const token = createToken(user._id);
  res
    .status(201)
    .json({ success: true, msg: "User registered successfully.", token });
});

/**
 * Get user profile data.
 * @route POST /api/v1/user/profile
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const user = await userModel.findById(userId).select("-password -cartData");

  if (!user) {
    return res.json({ success: false, msg: "User not found" });
  }

  res.status(200).json({ success: true, user });
});

/**
 * Update user avatar.
 * @route POST /api/v1/user/update-avatar
 */
const updateUserAvatar = asyncHandler(async (req, res) => {
  try {
    // multer overwrites req.body, so we extract userId from token again
    const token = req.headers.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    
    const imageFile = req.file;

    if (!imageFile) {
      return res.json({ success: false, msg: "No image file provided" });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const avatarUrl = imageUpload.secure_url;

    const user = await userModel.findByIdAndUpdate(
      userId,
      { avatar: avatarUrl },
      { new: true }
    ).select("-password -cartData");

    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }

    res.status(200).json({ success: true, msg: "Avatar updated successfully.", user });
  } catch (error) {
    console.error("AVATAR UPLOAD ERROR:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
});

export { loginUser, loginAdmin, registerUser, getUserProfile, updateUserAvatar };
