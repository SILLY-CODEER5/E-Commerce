import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

const authUser = asyncHandler(async (req, resizeBy, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, msg: "Not Authorized, Login again !" });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  req.body.userId = decodedToken.id;
  next();
});

export default authUser;
