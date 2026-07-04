import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    // Student who wrote the review
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Course being reviewed
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    // Rating (1 to 5 stars)
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // Review text
    comment: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// One review per student per course
reviewSchema.index(
  { student: 1, course: 1 },
  { unique: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;