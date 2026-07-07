import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-purple-400"
        : "text-gray-300 hover:text-purple-400"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-purple-400"
        >
          LMS
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <NavLink
            to="/"
            className={navLinkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/courses"
            className={navLinkClass}
          >
            Courses
          </NavLink>

          {isAuthenticated && user?.role === "Student" && (
            <>
              <NavLink
                to="/student"
                className={navLinkClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/student/my-courses"
                className={navLinkClass}
              >
                My Courses
              </NavLink>

              <NavLink
                to="/student/wishlist"
                className={navLinkClass}
              >
                Wishlist
              </NavLink>

              <NavLink
                to="/student/profile"
                className={navLinkClass}
              >
                Profile
              </NavLink>
            </>
          )}

          {isAuthenticated && user?.role === "Instructor" && (
            <>
              <NavLink
                to="/instructor"
                className={navLinkClass}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/instructor/create-course"
                className={navLinkClass}
              >
                Create Course
              </NavLink>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-purple-400 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="text-right">

                <p className="font-semibold text-white">
                  {user?.name}
                </p>

                <p className="text-sm text-gray-400">
                  {user?.role}
                </p>

              </div>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
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