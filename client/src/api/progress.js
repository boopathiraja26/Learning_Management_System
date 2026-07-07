import api from "./axios";

// Get Progress
export const getCourseProgress = async (courseId) => {
  const { data } = await api.get(`/progress/${courseId}`);
  return data;
};

// Mark Lecture Completed
export const markLectureCompleted = async (
  courseId,
  lectureId
) => {
  const { data } = await api.post(
    `/progress/${courseId}/${lectureId}`
  );

  return data;
};