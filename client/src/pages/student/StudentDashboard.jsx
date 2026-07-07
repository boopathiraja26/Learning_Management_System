import { useEffect, useState } from "react";
import { getStudentDashboard } from "../../api/dashboard";
import Loader from "../../components/common/Loader";

const StudentDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getStudentDashboard();

      if (data.success) {
        setDashboard(data.dashboard);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
  return <Loader />;
}

  return (
    <div className="max-w-7xl mx-auto py-10">

      <h1 className="text-4xl font-bold mb-10">
        Student Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Enrolled Courses
          </h3>

          <p className="text-4xl font-bold text-purple-700 mt-3">
            {dashboard?.totalEnrolledCourses || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Completed
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {dashboard?.completedCourses || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            In Progress
          </h3>

          <p className="text-4xl font-bold text-orange-500 mt-3">
            {dashboard?.inProgressCourses || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Lectures Completed
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            {dashboard?.totalLecturesCompleted || 0}
          </p>
        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;