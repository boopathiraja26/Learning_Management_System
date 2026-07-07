import Course from "../models/Course.js";

// ======================================
// Get Instructor Dashboard
// ======================================
export const getInstructorDashboard = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.user._id,
    }).populate("students", "_id");

    const totalCourses = courses.length;

    let totalStudents = 0;

    courses.forEach((course) => {
      totalStudents += course.students.length;
    });

    res.status(200).json({
      success: true,
      totalCourses,
      totalStudents,
      courses,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};