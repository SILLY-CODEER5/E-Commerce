import { userModel } from "../models/users.model.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.json({ success: false, msg: "User does not exist !" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (validPassword) {
    const token = createToken(user._id);
    res
      .status(200)
      .json({ success: true, msg: "User LoggedIn, Hooray !", user, token });
  } else {
    res
      .status(200)
      .json({ success: false, msg: "Invalid credentials, try again !" });
  }
});

// Route for admin login
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    let id = await userModel.findOne({ email: process.env.ADMIN_EMAIL });
    console.log(id);
    const token = await jwt.sign(email + password, process.env.JWT_SECRET);
    res.status(202).json({ success: "200", msg: "User is Admin...", token });
  } else {
    res.status(202).json({ success: "202", msg: "User is Not Admin !" });
  }
});

// Route for register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // checking user exists !
  const exists = await userModel.findOne({ email });
  if (exists) {
    return res.json({ success: false, msg: "User already exists" });
  }
  // check email, password validation
  if (!validator.isEmail(email)) {
    return res.json({ success: false, msg: "Please enter a valid email" });
  }
  if (password.length < 8) {
    return res.json({
      success: false,
      msg: "Password atleast 8 characters long",
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
    .json({ success: true, msg: "User registered successfully !", token });
});

export { loginUser, loginAdmin, registerUser };
