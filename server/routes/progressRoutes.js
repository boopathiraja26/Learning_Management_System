import express from "express";
import {
  markLectureCompleted,
  getCourseProgress,
} from "../controllers/progressController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Mark Lecture Completed
router.post(
  "/:courseId/:lectureId",
  protect,
  authorize("Student"),
  markLectureCompleted
);

// Get Progress
router.get(
  "/:courseId",
  protect,
  authorize("Student"),
  getCourseProgress
);

export default router;