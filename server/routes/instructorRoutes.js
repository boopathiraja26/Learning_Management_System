import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { getInstructorDashboard } from "../controllers/instructorController.js";

const router = express.Router();

// Dashboard
router.get(
  "/dashboard",
  protect,
  authorize("Instructor"),
  getInstructorDashboard
);

export default router;