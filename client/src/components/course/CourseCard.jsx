import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">

      <img
        src={course.thumbnail || "https://placehold.co/600x400"}
        alt={course.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-5">

        <h3 className="text-xl font-bold mb-2">
          {course.title}
        </h3>

        <p className="text-gray-600 line-clamp-2 mb-4">
          {course.description}
        </p>

        <div className="flex justify-between items-center">

          <span className="text-purple-700 font-bold">
            ₹ {course.price}
          </span>

          <Link
            to={`/courses/${course._id}`}
            className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
          >
            View
          </Link>

        </div>

      </div>

    </div>
  );
};

export default CourseCard;