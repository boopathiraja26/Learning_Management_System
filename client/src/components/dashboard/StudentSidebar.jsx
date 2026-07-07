import { NavLink } from "react-router-dom";

const StudentSidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-5">

      <h2 className="text-2xl font-bold text-purple-700 mb-8">
        Student Panel
      </h2>

      <nav className="space-y-3">

        <NavLink
          to="/student"
          className="block p-3 rounded hover:bg-purple-100"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/student/my-courses"
          className="block p-3 rounded hover:bg-purple-100"
        >
          My Courses
        </NavLink>

        <NavLink
          to="/student/wishlist"
          className="block p-3 rounded hover:bg-purple-100"
        >
          Wishlist
        </NavLink>

        <NavLink
          to="/student/profile"
          className="block p-3 rounded hover:bg-purple-100"
        >
          Profile
        </NavLink>

      </nav>

    </aside>
  );
};

export default StudentSidebar;