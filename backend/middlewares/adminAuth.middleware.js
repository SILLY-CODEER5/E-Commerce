import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const adminAuth = asyncHandler(async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: "false",
      msg: "Token not found, Login Again ...",
    });
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedToken);

  if (decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    return res.json({
      success: "false",
      msg: "Not Authorized, Invalid Admin !",
    });
  }
  next();
});

export default adminAuth;
