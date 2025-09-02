import { userModel } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";

// add products to user cart
const addToCart = asyncHandler(async (req, res) => {
  const { userId, itemId, size } = req.body;

  const userData = await userModel.findById(userId);
  let cartData = await userData.cartData;

  if (cartData[itemId]) {
    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }
  } else {
    cartData[itemId] = {};
    cartData[itemId][size] = 1;
  }

  await userModel.findByIdAndUpdate(userId, { cartData });

  res.json({ success: true, msg: "Added to Cart." });
});
//update user cart
const updateCart = asyncHandler(async (req, res) => {
  const { userId, itemId, size, quantity } = req.body;
  const userData = await userModel.findById(userId);
  let cartData = await userData.cartData;
  cartData[itemId][size] = quantity;
  await userModel.findByIdAndUpdate(userId, { cartData });
  res.json({ success: true, msg: "Cart Updated." });
});
// get user cart data
const getUserCart = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const userData = await userModel.findById(userId);
  let cartData = await userData.cartData;
  res.json({ success: true, cartData });
});

export { addToCart, updateCart, getUserCart };
