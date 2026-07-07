import { useEffect, useState } from "react";
import { getAllCourses } from "../../api/course";
import CourseCard from "../../components/course/CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [sort, setSort] = useState("newest");

  useEffect(() => {
    fetchCourses();
  }, [search, category, sort]);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const data = await getAllCourses(
        search,
        category,
        sort
      );

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

      <h1 className="text-4xl font-bold mb-8">
        All Courses
      </h1>

      {/* Filters */}

      <div className="grid md:grid-cols-3 gap-4 mb-10">

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border rounded-lg p-3"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          <option value="">All Categories</option>

          <option value="Programming">
            Programming
          </option>

          <option value="Web Development">
            Web Development
          </option>

          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>

          <option value="Data Science">
            Data Science
          </option>

        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="border rounded-lg p-3"
        >
          <option value="newest">
            Latest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="priceLow">
            Price Low → High
          </option>

          <option value="priceHigh">
            Price High → Low
          </option>

        </select>

      </div>

      {loading ? (
        <div className="text-center py-20">

          <h2 className="text-2xl">
            Loading...
          </h2>

        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20">

          <h2 className="text-2xl">
            No Courses Found
          </h2>

        </div>
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