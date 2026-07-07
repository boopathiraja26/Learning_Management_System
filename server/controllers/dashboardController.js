import Course from "../models/Course.js";
import Progress from "../models/Progress.js";
import Lecture from "../models/Lecture.js";

// ======================================
// Student Dashboard
// ======================================
export const getStudentDashboard = async (req, res) => {
  try {
    const enrolledCourses = await Course.find({
      students: req.user._id,
    });

    const progressData = await Progress.find({
      student: req.user._id,
    });

    let completedCourses = 0;
    let inProgressCourses = 0;
    let totalLecturesCompleted = 0;

    for (const progress of progressData) {
      totalLecturesCompleted += progress.completedLectures.length;

      const totalLectures = await Lecture.countDocuments({
        course: progress.course,
      });

      const percentage =
        totalLectures === 0
          ? 0
          : Math.round(
              (progress.completedLectures.length / totalLectures) * 100
            );

      if (percentage === 100) {
        completedCourses++;
      } else {
        inProgressCourses++;
      }
    }

    res.status(200).json({
      success: true,
      dashboard: {
        totalEnrolledCourses: enrolledCourses.length,
        completedCourses,
        inProgressCourses,
        totalLecturesCompleted,
      },
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
// Instructor Dashboard
// ======================================
export const getInstructorDashboard = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user._id,
    });

    const totalCourses = courses.length;

    let totalStudents = 0;
    let totalRevenue = 0;

    for (const course of courses) {
      totalStudents += course.students.length;
      totalRevenue += course.students.length * course.price;
    }

    res.status(200).json({
      success: true,
      dashboard: {
        totalCourses,
        totalStudents,
        totalRevenue,
        latestCourses: courses
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 5),
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};