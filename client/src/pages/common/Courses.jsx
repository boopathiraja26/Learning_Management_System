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

      const data = await getAllCourses({
        search,
        category,
        sort,
      });

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

      {/* Heading */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-gray-800">
          Explore Courses
        </h1>

        <p className="text-gray-500 mt-2">
          Discover high-quality courses from expert instructors.
        </p>

      </div>

      {/* Search Filter Sort */}

      <div className="grid md:grid-cols-3 gap-5 mb-10">

        {/* Search */}

        <input
          type="text"
          placeholder="🔍 Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-600 outline-none"
        />

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3"
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

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3"
        >
          <option value="newest">
            Newest
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

      {/* Results */}

      {loading ? (

        <div className="text-center py-20">

          <h2 className="text-2xl font-semibold">
            Loading Courses...
          </h2>

        </div>

      ) : courses.length === 0 ? (

        <div className="bg-white shadow rounded-xl p-12 text-center">

          <h2 className="text-3xl font-bold">
            No Courses Found
          </h2>

          <p className="text-gray-500 mt-3">
            Try another search or category.
          </p>

        </div>

      ) : (

        <>

          <p className="mb-6 text-gray-500">
            {courses.length} course(s) found
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {courses.map((course) => (

              <CourseCard
                key={course._id}
                course={course}
              />

            ))}

          </div>

        </>

      )}

    </div>
  );
};

export default Courses;