import Course from "../models/Course.js";
import Lecture from "../models/Lecture.js";

// ======================================
// Create Lecture
// ======================================
export const createLecture = async (req, res) => {
  try {
    const { title, description, duration } = req.body;

    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Only owner or admin
    if (
      course.instructor.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    const lecture = await Lecture.create({
      title,
      description,
      duration,
      course: course._id,
    });

    res.status(201).json({
      success: true,
      message: "Lecture Created Successfully",
      lecture,
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
// Get All Lectures of a Course
// ======================================
export const getCourseLectures = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const lectures = await Lecture.find({
      course: req.params.courseId,
    }).select("-__v");

    res.status(200).json({
      success: true,
      totalLectures: lectures.length,
      lectures,
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
// Get Single Lecture
// ======================================
export const getSingleLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id).select("-__v");

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    res.status(200).json({
      success: true,
      lecture,
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
// Update Lecture
// ======================================
export const updateLecture = async (req, res) => {
  try {
    const { title, description, videoUrl, duration } = req.body;

    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    const course = await Course.findById(lecture.course);

    // Only course owner or admin can update
    if (
      course.instructor.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    lecture.title = title || lecture.title;
    lecture.description = description || lecture.description;
    lecture.videoUrl = videoUrl || lecture.videoUrl;
    lecture.duration = duration || lecture.duration;

    await lecture.save();

    res.status(200).json({
      success: true,
      message: "Lecture Updated Successfully",
      lecture,
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
// Delete Lecture
// ======================================
export const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    const course = await Course.findById(lecture.course);

    // Only course owner or admin can delete
    if (
      course.instructor.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    await lecture.deleteOne();

    res.status(200).json({
      success: true,
      message: "Lecture Deleted Successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};