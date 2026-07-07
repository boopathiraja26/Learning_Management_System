import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getCourseReviews,
  addReview,
} from "../../api/review";

const CourseReviews = ({ courseId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    if (courseId) {
      fetchReviews();
    }
  }, [courseId]);

  const fetchReviews = async () => {
    try {
      const res = await getCourseReviews(courseId);

      setReviews(res.reviews || []);

      if (res.averageRating !== undefined) {
        setAverageRating(res.averageRating);
      } else if (res.reviews?.length > 0) {
        const avg =
          res.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / res.reviews.length;

        setAverageRating(avg.toFixed(1));
      } else {
        setAverageRating(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await addReview(courseId, formData);

      toast.success(res.message);

      setFormData({
        rating: 5,
        comment: "",
      });

      fetchReviews();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add review"
      );
    }
  };

  return (
    <div className="mt-16">

      <h2 className="text-3xl font-bold mb-6">
        Student Reviews
      </h2>

      <p className="text-lg mb-6">
        ⭐ Average Rating:
        <span className="font-bold ml-2">
          {averageRating}
        </span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 mb-8 space-y-4"
      >
        <select
          value={formData.rating}
          onChange={(e) =>
            setFormData({
              ...formData,
              rating: Number(e.target.value),
            })
          }
          className="w-full border rounded-lg p-3"
        >
          <option value={5}>★★★★★</option>
          <option value={4}>★★★★☆</option>
          <option value={3}>★★★☆☆</option>
          <option value={2}>★★☆☆☆</option>
          <option value={1}>★☆☆☆☆</option>
        </select>

        <textarea
          rows={4}
          placeholder="Write your review..."
          value={formData.comment}
          onChange={(e) =>
            setFormData({
              ...formData,
              comment: e.target.value,
            })
          }
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg"
        >
          Submit Review
        </button>
      </form>

      {reviews.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-6 text-center">
          No reviews yet.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow rounded-xl p-5"
            >
              <h3 className="font-bold text-lg">
                {review.student?.name || "Student"}
              </h3>

              <p className="text-yellow-500 mt-1">
                {"⭐".repeat(review.rating)}
              </p>

              <p className="text-gray-600 mt-3">
                {review.comment}
              </p>

              <p className="text-sm text-gray-400 mt-3">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseReviews;