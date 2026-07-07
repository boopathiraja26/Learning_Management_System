import { useEffect, useState } from "react";
import { getAllCourses } from "../../api/course";
import CourseCard from "../../components/course/CourseCard";

const categories = [
  "All",
  "Programming",
  "Web Development",
  "Artificial Intelligence",
  "Data Science",
];

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [sort, setSort] = useState("newest");

  useEffect(() => {
    fetchCourses();
  }, [page, search, category, sort]);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const data = await getAllCourses(
        page,
        search,
        category,
        sort
      );

      if (data.success) {
        setCourses(data.courses);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Explore Courses
      </h1>

      {/* Filters */}

      <div className="bg-white shadow rounded-xl p-6 mb-10">

        <div className="grid md:grid-cols-3 gap-5">

          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="border rounded-lg px-4 py-3"
          />

          <select
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(
                e.target.value === "All"
                  ? ""
                  : e.target.value
              );
            }}
            className="border rounded-lg px-4 py-3"
          >
            {categories.map((cat) => (
              <option key={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setPage(1);
              setSort(e.target.value);
            }}
            className="border rounded-lg px-4 py-3"
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

      </div>

      {/* Courses */}

      {loading ? (
        <div className="text-center py-20 text-xl">
          Loading Courses...
        </div>
      ) : courses.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">
            No Courses Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try another search or category.
          </p>
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

      {/* Pagination */}

      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-5 mt-12">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-purple-700 text-white px-5 py-2 rounded disabled:bg-gray-400"
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-purple-700 text-white px-5 py-2 rounded disabled:bg-gray-400"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default Courses;