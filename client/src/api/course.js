import api from "./axios";

/* ==========================================
   Public Course APIs
========================================== */

// Get all courses
export const getAllCourses = async (params = {}) => {
  const { data } = await api.get("/courses", {
    params,
  });

  return data;
};

// Get single course
export const getCourseById = async (id) => {
  const { data } = await api.get(`/courses/${id}`);
  return data;
};

/* ==========================================
   Student APIs
========================================== */

// Enroll in course
export const enrollCourse = async (id) => {
  const { data } = await api.post(`/courses/${id}/enroll`);
  return data;
};

// Get enrolled courses
export const getMyCourses = async () => {
  const { data } = await api.get("/courses/my-courses");
  return data;
};

/* ==========================================
   Instructor Dashboard
========================================== */

// Instructor dashboard
export const getInstructorDashboard = async () => {
  const { data } = await api.get("/dashboard/instructor");
  return data;
};

/* ==========================================
   Course Management
========================================== */

// Create course
export const createCourse = async (formData) => {
  const { data } = await api.post("/courses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// Update course
export const updateCourse = async (id, formData) => {
  const { data } = await api.put(`/courses/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// Delete course
export const deleteCourse = async (id) => {
  const { data } = await api.delete(`/courses/${id}`);
  return data;
};

/* ==========================================
   Lecture APIs
========================================== */

// Get all lectures of a course
export const getCourseLectures = async (courseId) => {
  const { data } = await api.get(`/lectures/course/${courseId}`);
  return data;
};

// Get single lecture
export const getLectureById = async (lectureId) => {
  const { data } = await api.get(`/lectures/${lectureId}`);
  return data;
};

// Create lecture
export const createLecture = async (courseId, lectureData) => {
  const { data } = await api.post(
    `/lectures/${courseId}`,
    lectureData
  );

  return data;
};

// Upload lecture video
export const uploadLectureVideo = async (lectureId, formData) => {
  const { data } = await api.post(
    `/lectures/${lectureId}/video`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// Update lecture
export const updateLecture = async (lectureId, lectureData) => {
  const { data } = await api.put(
    `/lectures/${lectureId}`,
    lectureData
  );

  return data;
};

// Delete lecture
export const deleteLecture = async (lectureId) => {
  const { data } = await api.delete(`/lectures/${lectureId}`);
  return data;
};