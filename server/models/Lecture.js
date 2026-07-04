import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    // Cloudinary Video URL
    videoUrl: {
      type: String,
      default: "",
    },

    // Cloudinary Public ID (used for delete/update)
    cloudinaryId: {
      type: String,
      default: "",
    },

    // Video Duration (in seconds)
    duration: {
      type: Number,
      default: 0,
    },

    // Course Reference
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;