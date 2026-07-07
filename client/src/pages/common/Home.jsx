import { useEffect, useState } from "react";
import { getAllCourses } from "../../api/course";
import CourseCard from "../../components/course/CourseCard";

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
            Build your future with high-quality online courses from expert instructors.
          </p>

          <button className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Explore Courses
          </button>

        </div>
      </section>

      {/* Featured Courses */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Courses
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">
            Loading courses...
          </p>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-500">
            No courses available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))}
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

            <div className="bg-white p-6 rounded-lg shadow text-center font-semibold">
              Web Development
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center font-semibold">
              Programming
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center font-semibold">
              Data Science
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center font-semibold">
              Artificial Intelligence
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;