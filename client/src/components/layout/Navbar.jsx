import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-purple-700"
        >
          LMS
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            to="/"
            className="font-medium hover:text-purple-700 transition"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="font-medium hover:text-purple-700 transition"
          >
            Courses
          </Link>

          {/* Student */}
          {isAuthenticated && user?.role === "Student" && (
            <>
              <Link
                to="/student/my-courses"
                className="font-medium hover:text-purple-700 transition"
              >
                My Courses
              </Link>

              <Link
                to="/wishlist"
                className="font-medium hover:text-purple-700 transition"
              >
                Wishlist
              </Link>

              <Link
                to="/student"
                className="font-medium hover:text-purple-700 transition"
              >
                Dashboard
              </Link>
            </>
          )}

          {/* Instructor */}
          {isAuthenticated && user?.role === "Instructor" && (
            <>
              <Link
                to="/instructor"
                className="font-medium hover:text-purple-700 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/instructor/create-course"
                className="font-medium hover:text-purple-700 transition"
              >
                Create Course
              </Link>
            </>
          )}

          {/* Admin */}
          {isAuthenticated && user?.role === "Admin" && (
            <>
              <Link
                to="/admin"
                className="font-medium hover:text-purple-700 transition"
              >
                Admin Dashboard
              </Link>
            </>
          )}

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="font-medium text-purple-700 hover:text-purple-800"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="text-right">
                <h3 className="font-semibold">
                  {user?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user?.role}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;