import api from "./axios";

// Student Dashboard
export const getStudentDashboard = async () => {
  const { data } = await api.get("/dashboard/student");
  return data;
};