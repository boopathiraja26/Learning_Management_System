import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  toggleWishlist,
  getWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

// Get wishlist
router.get("/", protect, getWishlist);

// Add / Remove course
router.post("/:courseId", protect, toggleWishlist);

export default router;