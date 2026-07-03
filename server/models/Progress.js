import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    // Student who is learning the course
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Course being learned
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    // Completed lectures
    completedLectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lecture",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// One progress document per student per course
progressSchema.index({ student: 1, course: 1 }, { unique: true });

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;