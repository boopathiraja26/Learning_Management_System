import express from "express";
import {
  createLecture,
  getCourseLectures,
  getSingleLecture,
  updateLecture,
  deleteLecture,
} from "../controllers/lectureController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ======================================
// Public Routes
// ======================================

// Get All Lectures of a Course
router.get("/course/:courseId", getCourseLectures);
router.get("/:id", getSingleLecture);

// ======================================
// Protected Routes (Instructor/Admin)
// ======================================

// Create Lecture
router.post(
  "/:courseId",
  protect,
  authorize("Instructor", "Admin"),
  createLecture
);
router.put(
  "/:id",
  protect,
  authorize("Instructor", "Admin"),
  updateLecture
);
router.delete(
  "/:id",
  protect,
  authorize("Instructor", "Admin"),
  deleteLecture
);

export default router;