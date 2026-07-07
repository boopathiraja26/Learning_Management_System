import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6">

      <h1 className="text-8xl font-bold text-purple-700">
        404
      </h1>

      <h2 className="text-3xl font-bold mt-4">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 mt-4 max-w-md">
        The page you are looking for doesn't exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-8 bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg"
      >
        Back to Home
      </Link>

    </div>
  );
};

export default NotFound;