import { userModel } from "../models/users.model.js";
import asyncHandler from "../utils/asyncHandler.js";

/**
 * Adds a product to the user's cart.
 * @route POST /api/v1/cart/add
 */
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

  res.json({ success: true, msg: "Item added to cart successfully." });
});
/**
 * Updates the quantity of a product in the user's cart.
 * @route POST /api/v1/cart/update
 */
const updateCart = asyncHandler(async (req, res) => {
  const { userId, itemId, size, quantity } = req.body;
  const userData = await userModel.findById(userId);
  let cartData = await userData.cartData;
  cartData[itemId][size] = quantity;
  await userModel.findByIdAndUpdate(userId, { cartData });
  res.json({ success: true, msg: "Cart updated successfully." });
});
/**
 * Retrieves the user's cart data.
 * @route GET /api/v1/cart/get
 */
const getUserCart = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const userData = await userModel.findById(userId).lean();
  let cartData = userData ? userData.cartData : {};
  res.json({ success: true, cartData });
});

export { addToCart, updateCart, getUserCart };
