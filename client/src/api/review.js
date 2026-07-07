import api from "./axios";

// Get all reviews
export const getCourseReviews = async (courseId) => {
  const { data } = await api.get(`/reviews/${courseId}`);
  return data;
};

// Add review
export const addReview = async (courseId, reviewData) => {
  const { data } = await api.post(
    `/reviews/${courseId}`,
    reviewData
  );

  return data;
};

// Update review
export const updateReview = async (reviewId, reviewData) => {
  const { data } = await api.put(
    `/reviews/${reviewId}`,
    reviewData
  );

  return data;
};

// Delete review
export const deleteReview = async (reviewId) => {
  const { data } = await api.delete(
    `/reviews/${reviewId}`
  );

  return data;
};