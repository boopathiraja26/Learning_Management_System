import Review from "../models/Review.js";
import Course from "../models/Course.js";

// ======================================
// Add Review
// ======================================
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if student is enrolled
    const enrolled = course.students.some(
      (student) => student.toString() === req.user._id.toString()
    );

    if (!enrolled) {
      return res.status(403).json({
        success: false,
        message: "You must enroll before reviewing this course",
      });
    }

    // Check if review already exists
    const alreadyReviewed = await Review.findOne({
      student: req.user._id,
      course: course._id,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    const review = await Review.create({
      rating,
      comment,
      student: req.user._id,
      course: course._id,
    });

    res.status(201).json({
      success: true,
      message: "Review Added Successfully",
      review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Course Reviews
// ======================================
export const getCourseReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      course: req.params.courseId,
    })
      .populate("student", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalReviews: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Review
// ======================================
export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (
      review.student.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();

    res.status(200).json({
      success: true,
      message: "Review Updated Successfully",
      review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Review
// ======================================
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (
      review.student.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    await review.deleteOne();

    res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};