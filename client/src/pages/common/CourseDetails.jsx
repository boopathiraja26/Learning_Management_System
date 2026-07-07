import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getCourseById } from "../../api/course";
import { createOrder, verifyPayment } from "../../api/payment";
import { useAuth } from "../../context/AuthContext";
import CourseReviews from "../../components/course/CourseReviews";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const res = await getCourseById(id);
      setCourse(res.course);
    } catch (error) {
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    try {
      const { order, key } = await createOrder(course._id);

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Learning Management System",
        description: course.title,
        order_id: order.id,

        handler: async (response) => {
          try {
            const res = await verifyPayment({
              courseId: course._id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success(res.message);

            navigate("/student/my-courses");
          } catch (error) {
            toast.error(
              error.response?.data?.message ||
                "Payment Verification Failed"
            );
          }
        },

        prefill: {
          name: user?.name,
          email: user?.email,
        },

        theme: {
          color: "#7c3aed",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create payment"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-2xl">
        Loading...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-20 text-2xl">
        Course not found.
      </div>
    );
  }

  const isStudent = user?.role === "Student";
  const isInstructor = user?.role === "Instructor";
  const isAdmin = user?.role === "Admin";

  const alreadyEnrolled =
    isStudent &&
    course.students?.some(
      (student) => (student._id || student) === user?._id
    );

  const isOwner =
    isInstructor &&
    (course.instructor?._id || course.instructor) === user?._id;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-12">
        <img
          src={
            course.thumbnail ||
            "https://via.placeholder.com/700x450?text=Course"
          }
          alt={course.title}
          className="rounded-xl shadow-lg w-full"
        />

        <div>
          <h1 className="text-5xl font-bold mb-6">
            {course.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            {course.description}
          </p>

          <p className="mb-4 text-lg">
            <strong>Instructor:</strong>{" "}
            {course.instructor?.name}
          </p>

          <p className="mb-4 text-lg">
            <strong>Email:</strong>{" "}
            {course.instructor?.email}
          </p>

          <p className="mb-4 text-lg">
            <strong>Category:</strong>{" "}
            {course.category}
          </p>

          <h2 className="text-5xl font-bold text-purple-700 mb-10">
            ₹ {course.price}
          </h2>

          {!isAuthenticated && (
            <button
              onClick={() => navigate("/login")}
              className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-lg"
            >
              Login to Enroll
            </button>
          )}

          {isAuthenticated &&
            isStudent &&
            (alreadyEnrolled ? (
              <button
                onClick={() =>
                  navigate(`/student/course/${course._id}`)
                }
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
              >
                Continue Learning
              </button>
            ) : (
              <button
                onClick={handleEnroll}
                className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-lg"
              >
                Enroll Now
              </button>
            ))}

          {isAuthenticated && isOwner && (
            <button
              onClick={() =>
                navigate(`/instructor/course/${course._id}`)
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg ml-4"
            >
              Manage Course
            </button>
          )}

          {isAuthenticated && isAdmin && (
            <button
              onClick={() =>
                navigate(`/instructor/course/${course._id}`)
              }
              className="bg-gray-800 hover:bg-gray-900 text-white px-8 py-3 rounded-lg ml-4"
            >
              Manage Course
            </button>
          )}
        </div>
      </div>

      <div className="mt-16">
        <CourseReviews courseId={course._id} />
      </div>
    </div>
  );
};

export default CourseDetails;