import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    // Check Authorization Header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify JWT Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find User (Exclude Sensitive Fields)
      req.user = await User.findById(decoded.id).select(
        "-password -__v -createdAt -updatedAt"
      );

      if (!req.user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. No Token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token Failed",
    });
  }
};