import Progress from "../models/Progress.js";
import Course from "../models/Course.js";
import Lecture from "../models/Lecture.js";

// ======================================
// Mark Lecture as Completed
// ======================================
export const markLectureCompleted = async (req, res) => {
  try {
    const { courseId, lectureId } = req.params;

    // Find course
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Find lecture
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    // Check enrollment
    const isEnrolled = course.students.some(
      (id) => id.toString() === req.user._id.toString()
    );

    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course",
      });
    }

    // Find progress
    let progress = await Progress.findOne({
      student: req.user._id,
      course: courseId,
    });

    // Create if not exists
    if (!progress) {
      progress = await Progress.create({
        student: req.user._id,
        course: courseId,
        completedLectures: [],
      });
    }

    // Check already completed
    const alreadyCompleted = progress.completedLectures.some(
      (id) => id.toString() === lectureId.toString()
    );

    if (alreadyCompleted) {
      return res.status(400).json({
        success: false,
        message: "Lecture already completed",
      });
    }

    // Add lecture
    progress.completedLectures.push(lectureId);

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Lecture marked as completed",
      progress,
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
// Get Course Progress
// ======================================
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    const progress = await Progress.findOne({
      student: req.user._id,
      course: courseId,
    });

    const totalLectures = await Lecture.countDocuments({
      course: courseId,
    });

    if (!progress) {
      return res.status(200).json({
        success: true,
        progress: 0,
        completedLectures: [],
        totalLectures,
      });
    }

    const completed = progress.completedLectures.length;

    const percentage =
      totalLectures === 0
        ? 0
        : Math.round((completed / totalLectures) * 100);

    res.status(200).json({
      success: true,
      progress: percentage,
      completedLectures: progress.completedLectures,
      totalLectures,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};