import Course from "../models/Course.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ======================================
// Create Course
// ======================================
export const createCourse = async (req, res) => {
  try {
    // Debug
    console.log("================================");
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    console.log("USER:", req.user);
    console.log("================================");

    const { title, description, category, price } = req.body;

    // Validation
    if (!title || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    let thumbnail = "";

    // Upload thumbnail to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "LMS/Courses",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      thumbnail = result.secure_url;
    }

    // Create Course
    const course = await Course.create({
      title,
      description,
      category,
      price: Number(price),
      thumbnail,
      instructor: req.user._id,
    });

    const populatedCourse = await Course.findById(course._id).populate(
      "instructor",
      "name email role"
    );

    res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      course: populatedCourse,
    });
  } catch (error) {
    console.error("CREATE COURSE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Courses
// ======================================
export const getAllCourses = async (req, res) => {
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

// ======================================
// Get Single Course
// ======================================
export const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email role")
      .select("-__v");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      course,
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
// Update Course
// ======================================
export const updateCourse = async (req, res) => {
  try {
    const { title, description, category, price, thumbnail } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if the logged-in instructor owns this course
    if (
      course.instructor.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this course",
      });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    course.price = price || course.price;
    course.thumbnail = thumbnail || course.thumbnail;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      course,
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
// Delete Course
// ======================================
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Only owner or admin can delete
    if (
      course.instructor.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this course",
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course Deleted Successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};