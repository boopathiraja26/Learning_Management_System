import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCourses } from "../../api/course";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getMyCourses();

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <h2 className="text-xl font-semibold">Loading courses...</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        My Courses
      </h1>

      {courses.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <h2 className="text-2xl font-semibold mb-3">
            No Enrolled Courses
          </h2>

          <p className="text-gray-500">
            Enroll in a course to start learning.
          </p>

          <Link
            to="/courses"
            className="inline-block mt-6 bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {courses.map((course) => (
            <Link
              key={course._id}
              to={`/student/course/${course._id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              <img
                src={
                  course.thumbnail ||
                  "https://placehold.co/600x400?text=Course"
                }
                alt={course.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">

                <h2 className="text-xl font-bold">
                  {course.title}
                </h2>

                <p className="text-gray-600 mt-2 line-clamp-2">
                  {course.description}
                </p>

                <p className="mt-4 text-sm text-gray-500">
                  Instructor
                </p>

                <p className="font-semibold">
                  {course.instructor?.name}
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="text-purple-700 font-bold text-xl">
                    ₹{course.price}
                  </span>

                  <span className="text-purple-700 font-semibold">
                    Continue →
                  </span>

                </div>

              </div>
            </Link>
          ))}

        </div>
      )}

    </div>
  );
};

export default MyCourses;