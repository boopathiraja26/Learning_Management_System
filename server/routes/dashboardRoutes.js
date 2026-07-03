import express from "express";
import {
  getStudentDashboard,
  getInstructorDashboard,
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Student Dashboard
router.get(
  "/student",
  protect,
  authorize("Student"),
  getStudentDashboard
);

// Instructor Dashboard
router.get(
  "/instructor",
  protect,
  authorize("Instructor", "Admin"),
  getInstructorDashboard
);

export default router;