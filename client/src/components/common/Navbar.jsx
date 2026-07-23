import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const baseLink = "px-3 py-2 rounded-md font-medium transition-colors duration-200";
  const linkClass = ({ isActive }) =>
    `${baseLink} ${isActive ? "text-white bg-white/20" : "text-gray-200 hover:text-white"}`;

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent"
        >
          LMS
        </Link>

        {/* Navigation links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/courses" className={linkClass}>
            Courses
          </NavLink>
          {isAuthenticated && user?.role === "Student" && (
            <>
              <NavLink to="/student" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/student/my-courses" className={linkClass}>
                My Courses
              </NavLink>
              <NavLink to="/student/wishlist" className={linkClass}>
                Wishlist
              </NavLink>
              <NavLink to="/student/profile" className={linkClass}>
                Profile
              </NavLink>
            </>
          )}
          {isAuthenticated && user?.role === "Instructor" && (
            <>
              <NavLink to="/instructor" className={linkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/instructor/create-course" className={linkClass}>
                Create Course
              </NavLink>
            </>
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-gray-200 hover:text-white transition-colors duration-200">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary hover:bg-primary/80 text-white px-5 py-2 rounded-md transition-colors duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="text-right">
                <p className="font-semibold text-white">{user?.name}</p>
                <p className="text-sm text-gray-400">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition-colors duration-200"
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