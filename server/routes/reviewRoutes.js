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

/*
========================================
Public
========================================
*/

// Get all reviews of a course
router.get("/:courseId", getCourseReviews);

/*
========================================
Student
========================================
*/

// Add Review
router.post(
  "/:courseId",
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