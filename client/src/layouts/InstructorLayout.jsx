import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const InstructorLayout = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 p-6">
        <Outlet />
      </main>
    </>
  );
};

export default InstructorLayout;