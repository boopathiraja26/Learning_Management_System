import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">

      {/* Thumbnail */}
      <div className="relative">
        <img
          src={
            course.thumbnail ||
            "https://placehold.co/600x400?text=Course"
          }
          alt={course.title}
          className="w-full h-56 object-cover"
        />

        {/* Category Badge */}
        <span className="absolute top-4 left-4 bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {course.category || "Course"}
        </span>

        {/* Price Badge */}
        <span className="absolute top-4 right-4 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow">
          ₹{course.price}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">

        <h2 className="text-2xl font-bold text-gray-800 line-clamp-1">
          {course.title}
        </h2>

        <p className="text-gray-600 mt-3 line-clamp-2">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center justify-between mt-6">

          <div>
            <p className="text-sm text-gray-500">
              Instructor
            </p>

            <p className="font-semibold text-gray-800">
              {course.instructor?.name || "Unknown"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">
              Students
            </p>

            <p className="font-bold text-purple-700">
              {course.students?.length || 0}
            </p>
          </div>

        </div>

        {/* Button */}
        <Link
          to={`/courses/${course._id}`}
          className="block mt-6 w-full text-center bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-xl font-semibold transition duration-300"
        >
          View Details →
        </Link>

      </div>

    </div>
  );
};

export default CourseCard;