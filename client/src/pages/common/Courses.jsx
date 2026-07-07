import { useEffect, useState } from "react";
import { getAllCourses } from "../../api/course";
import CourseCard from "../../components/course/CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();

      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-10">
        All Courses
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : courses.length === 0 ? (
        <p>No Courses Found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Courses;