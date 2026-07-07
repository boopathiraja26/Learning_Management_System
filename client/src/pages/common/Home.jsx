import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCourses } from "../../api/course";
import CourseCard from "../../components/course/CourseCard";
import CourseSkeleton from "../../components/common/CourseSkeleton";
import Loader from "../../components/common/Loader";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Learn Without Limits
          </h1>

          <p className="text-xl mb-8">
            Build your future with high-quality online courses from expert
            instructors.
          </p>

          <Link
            to="/courses"
            className="inline-block bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Courses
        </h2>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {[...Array(6)].map((_, index) => (
          <CourseSkeleton key={index} />
          ))}

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.slice(0, 6).map((course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))}
          </div>
        )}

        {!loading && courses.length > 6 && (
          <div className="text-center mt-10">
            <Link
              to="/courses"
              className="inline-block bg-purple-700 text-white px-8 py-3 rounded-lg hover:bg-purple-800 transition"
            >
              View All Courses
            </Link>
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Browse Categories
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow text-center font-semibold hover:shadow-lg transition">
              Web Development
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center font-semibold hover:shadow-lg transition">
              Programming
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center font-semibold hover:shadow-lg transition">
              Data Science
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center font-semibold hover:shadow-lg transition">
              Artificial Intelligence
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;