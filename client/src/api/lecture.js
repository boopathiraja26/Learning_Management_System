import api from "./axios";

// Get all lectures of a course
export const getCourseLectures = async (courseId) => {
  const { data } = await api.get(`/lectures/course/${courseId}`);
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

// Delete lecture
export const deleteLecture = async (lectureId) => {
  const { data } = await api.delete(`/lectures/${lectureId}`);
  return data;
};

// Update Lecture
export const updateLecture = async (lectureId, lectureData) => {
  const { data } = await api.put(
    `/lectures/${lectureId}`,
    lectureData
  );

  return data;
};

// Upload video
export const uploadLectureVideo = async (
  lectureId,
  formData
) => {
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