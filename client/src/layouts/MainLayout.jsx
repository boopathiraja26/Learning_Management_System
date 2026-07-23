import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  const location = useLocation();
  const showFooter = ["/", "/courses"].some(path => location.pathname === path || location.pathname.startsWith(path + "/"));
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      {showFooter && <Footer />}
    </>
  );
};

export default MainLayout;