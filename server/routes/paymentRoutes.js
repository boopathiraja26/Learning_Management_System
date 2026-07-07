import express from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create Razorpay Order
router.post(
  "/create-order/:courseId",
  protect,
  authorize("Student"),
  createOrder
);

// Verify Payment
router.post(
  "/verify",
  protect,
  authorize("Student"),
  verifyPayment
);

export default router;