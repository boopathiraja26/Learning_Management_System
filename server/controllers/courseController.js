import Course from "../models/Course.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ======================================
// Create Course
// ======================================
export const createCourse = async (req, res) => {
  try {
    const { title, description, category, price } = req.body;

    if (!title || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    let thumbnail = "";
    let cloudinaryId = "";

    // Upload Thumbnail
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "LMS/Courses",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });

      // ============================
      // Debug
      // ============================
      console.log("========== CLOUDINARY ==========");
      console.log(result);
      console.log("Public ID :", result.public_id);
      console.log("Secure URL:", result.secure_url);
      console.log("================================");

      thumbnail = result.secure_url;
      cloudinaryId = result.public_id;
    }

    console.log("Thumbnail :", thumbnail);
    console.log("Cloudinary ID :", cloudinaryId);

    const course = await Course.create({
      title,
      description,
      category,
      price: Number(price),
      thumbnail,
      cloudinaryId,
      instructor: req.user._id,
    });

    console.log("Saved Course:");
    console.log(course);

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
    // ============================
    // Query Parameters
    // ============================
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const category = req.query.category || "";
    const sort = req.query.sort || "newest";

    // ============================
    // Build Query
    // ============================
    const query = {};

    // Search by title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // ============================
    // Sorting
    // ============================
    let sortOption = {};

    switch (sort) {
      case "priceLow":
        sortOption = { price: 1 };
        break;

      case "priceHigh":
        sortOption = { price: -1 };
        break;

      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      default:
        sortOption = { createdAt: -1 };
    }

    // ============================
    // Fetch Courses
    // ============================
    const courses = await Course.find(query)
      .populate("instructor", "name email role")
      .select("-__v")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalCourses = await Course.countDocuments(query);

    res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(totalCourses / limit),
      totalCourses,
      courses,
    });
  } catch (error) {
    console.error("GET COURSES ERROR:", error);

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
    const { title, description, category, price } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Only owner or admin can update
    if (
      course.instructor.toString() !== req.user._id.toString() &&
      req.user.role !== "Admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this course",
      });
    }

    // Update basic details
    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    course.price = price || course.price;

    // ======================================
    // Upload New Thumbnail (Optional)
    // ======================================
    if (req.file) {
      // Delete old thumbnail from Cloudinary
      if (course.cloudinaryId) {
        await cloudinary.uploader.destroy(course.cloudinaryId);
      }

      // Upload new thumbnail
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

      course.thumbnail = result.secure_url;
      course.cloudinaryId = result.public_id;
    }

    await course.save();

    const updatedCourse = await Course.findById(course._id).populate(
      "instructor",
      "name email role"
    );

    res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      course: updatedCourse,
    });
  } catch (error) {
    console.error("UPDATE COURSE ERROR:", error);

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