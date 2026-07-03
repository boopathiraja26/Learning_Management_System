import Course from "../models/Course.js";

// ======================================
// Enroll in Course
// ======================================
export const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Only students can enroll
    if (req.user.role !== "Student") {
      return res.status(403).json({
        success: false,
        message: "Only students can enroll in courses",
      });
    }

    // Prevent duplicate enrollment
    if (course.students.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    course.students.push(req.user._id);

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course Enrolled Successfully",
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
// Get My Courses
// ======================================
export const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({
      students: req.user._id,
    })
      .populate("instructor", "name email")
      .select("-__v");

    res.status(200).json({
      success: true,
      totalCourses: courses.length,
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