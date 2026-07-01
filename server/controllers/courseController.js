import Course from "../models/Course.js";

// ======================================
// Create Course
// ======================================
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      price,
      instructor: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      course: {
        _id: course._id,
        title: course.title,
        description: course.description,
        category: course.category,
        price: course.price,
        thumbnail: course.thumbnail,
        instructor: course.instructor,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt,
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
// Get All Courses
// ======================================
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email role")
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