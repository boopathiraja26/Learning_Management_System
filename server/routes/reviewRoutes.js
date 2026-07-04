import express from "express";
import {
  addReview,
  getCourseReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ======================================
// Public Routes
// ======================================

// Get all reviews of a course
router.get("/course/:courseId", getCourseReviews);

// ======================================
// Student Routes
// ======================================

// Add Review
router.post(
  "/course/:courseId",
  protect,
  authorize("Student"),
  addReview
);

// Update Review
router.put(
  "/:id",
  protect,
  authorize("Student"),
  updateReview
);

// Delete Review
router.delete(
  "/:id",
  protect,
  authorize("Student", "Admin"),
  deleteReview
);

export default router;