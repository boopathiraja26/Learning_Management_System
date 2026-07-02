import express from "express";
import {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ======================================
// Public Routes
// ======================================
router.get("/", getAllCourses);
router.get("/:id", getSingleCourse);

// ======================================
// Protected Routes
// ======================================
router.post(
  "/",
  protect,
  authorize("Instructor", "Admin"),
  createCourse
);
router.put(
  "/:id",
  protect,
  authorize("Instructor", "Admin"),
  updateCourse
);
router.delete(
  "/:id",
  protect,
  authorize("Instructor", "Admin"),
  deleteCourse
);

export default router;