import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import StudentSidebar from "../components/dashboard/StudentSidebar";

const StudentLayout = () => {
  return (
    <>
      <Navbar />

      <div className="flex">

        <StudentSidebar />

        <main className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>

      </div>
    </>
  );
};

export default StudentLayout;