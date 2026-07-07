import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInstructorDashboard } from "../../api/instructor";

const InstructorDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getInstructorDashboard();

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
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">
          Instructor Dashboard
        </h1>

        <Link
          to="/instructor/create-course"
          className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800"
        >
          + Create Course
        </Link>

      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Total Courses
          </h2>

          <p className="text-4xl font-bold text-purple-700 mt-3">
            {dashboard?.totalCourses || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Total Students
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {dashboard?.totalStudents || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Revenue
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            ₹{dashboard?.totalRevenue || 0}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow">

        <div className="p-6 border-b">

          <h2 className="text-2xl font-bold">
            Latest Courses
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  Course
                </th>

                <th className="text-left p-4">
                  Category
                </th>

                <th className="text-left p-4">
                  Price
                </th>

                <th className="text-left p-4">
                  Students
                </th>

              </tr>

            </thead>

            <tbody>

              {dashboard?.latestCourses?.map((course) => (

                <tr
                  key={course._id}
                  className="border-b"
                >

                  <td className="p-4">
                    {course.title}
                  </td>

                  <td className="p-4">
                    {course.category}
                  </td>

                  <td className="p-4">
                    ₹{course.price}
                  </td>

                  <td className="p-4">
                    {course.students?.length || 0}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default InstructorDashboard;