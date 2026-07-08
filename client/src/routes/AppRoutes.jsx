import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import StudentLayout from "../layouts/StudentLayout";
import InstructorLayout from "../layouts/InstructorLayout";

// Scroll
import ScrollToTop from "../components/common/ScrollToTop";

// Public Pages
import Home from "../pages/common/Home";
import Courses from "../pages/common/Courses";
import CourseDetails from "../pages/common/CourseDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";

// Student Pages
import StudentDashboard from "../pages/student/StudentDashboard";
import MyCourses from "../pages/student/MyCourses";
import Wishlist from "../pages/student/Wishlist";
import Profile from "../pages/student/Profile";
import CoursePlayer from "../pages/student/CoursePlayer";

// Instructor Pages
import InstructorDashboard from "../pages/instructor/InstructorDashboard";
import CreateCourse from "../pages/instructor/CreateCourse";
import ManageCourse from "../pages/instructor/ManageCourse";

// Protected Routes
import ProtectedRoute from "../components/protected/ProtectedRoute";
import RoleProtectedRoute from "../components/protected/RoleProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* ================= Public Routes ================= */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ================= Student Routes ================= */}
        <Route
          element={
            <ProtectedRoute>
              <RoleProtectedRoute role="Student">
                <StudentLayout />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/my-courses" element={<MyCourses />} />
          <Route path="/student/wishlist" element={<Wishlist />} />
          <Route path="/student/profile" element={<Profile />} />
          <Route
            path="/student/course/:id"
            element={<CoursePlayer />}
          />
        </Route>

        {/* ================= Instructor Routes ================= */}
        <Route
          element={
            <ProtectedRoute>
              <RoleProtectedRoute role="Instructor">
                <InstructorLayout />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        >
          <Route
            path="/instructor"
            element={<InstructorDashboard />}
          />

          <Route
            path="/instructor/create-course"
            element={<CreateCourse />}
          />

          <Route
            path="/instructor/course/:id"
            element={<ManageCourse />}
          />
        </Route>

        {/* ================= 404 Page ================= */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;