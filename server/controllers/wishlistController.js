import Wishlist from "../models/Wishlist.js";

// ======================================
// Toggle Wishlist
// ======================================
export const toggleWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const courseId = req.params.courseId;

    let wishlist = await Wishlist.findOne({ user: userId });

    // If wishlist doesn't exist → create
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: userId,
        courses: [courseId],
      });

      return res.status(201).json({
        success: true,
        message: "Added to wishlist",
        wishlist,
      });
    }

    // Check if course already exists
    const isExists = wishlist.courses.includes(courseId);

    if (isExists) {
      // REMOVE
      wishlist.courses = wishlist.courses.filter(
        (id) => id.toString() !== courseId
      );

      await wishlist.save();

      return res.status(200).json({
        success: true,
        message: "Removed from wishlist",
        wishlist,
      });
    }

    // ADD
    wishlist.courses.push(courseId);
    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Added to wishlist",
      wishlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate("courses");

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        courses: [],
      });
    }

    res.status(200).json({
      success: true,
      courses: wishlist.courses,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};