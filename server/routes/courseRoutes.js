import express from "express";
import {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import {
  enrollCourse,
  getMyCourses,
} from "../controllers/enrollmentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ======================================
// Public Routes
// ======================================

// Get All Courses
router.get("/", getAllCourses);

// Get Logged-in Student's Enrolled Courses
router.get(
  "/my-courses",
  protect,
  authorize("Student"),
  getMyCourses
);

// Get Single Course
router.get("/:id", getSingleCourse);

// ======================================
// Protected Routes (Instructor/Admin)
// ======================================

// Create Course
router.post(
  "/",
  protect,
  authorize("Instructor", "Admin"),
  createCourse
);

// Update Course
router.put(
  "/:id",
  protect,
  authorize("Instructor", "Admin"),
  updateCourse
);

// Delete Course
router.delete(
  "/:id",
  protect,
  authorize("Instructor", "Admin"),
  deleteCourse
);

// ======================================
// Student Routes
// ======================================

// Enroll in Course
router.post(
  "/:id/enroll",
  protect,
  authorize("Student"),
  enrollCourse
);

export default router;