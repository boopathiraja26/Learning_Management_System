import express from "express";
import {
  createCourse,
  getCourses,
} from "../controllers/courseController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public Route
router.get("/", getCourses);

// Protected Route (Instructor/Admin Only)
router.post(
  "/",
  protect,
  authorize("Instructor", "Admin"),
  createCourse
);

export default router;