import express from "express";
import {
  createLecture,
  getCourseLectures,
  getSingleLecture,
  updateLecture,
  deleteLecture,
  uploadLectureVideo,
} from "../controllers/lectureController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ======================================
// Public Routes
// ======================================

// Get All Lectures of a Course
router.get("/course/:courseId", getCourseLectures);

// Get Single Lecture
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

// Upload Lecture Video
router.post(
  "/:id/video",
  protect,
  authorize("Instructor", "Admin"),
  upload.single("video"),
  uploadLectureVideo
);

// Update Lecture
router.put(
  "/:id",
  protect,
  authorize("Instructor", "Admin"),
  updateLecture
);

// Delete Lecture
router.delete(
  "/:id",
  protect,
  authorize("Instructor", "Admin"),
  deleteLecture
);

export default router;