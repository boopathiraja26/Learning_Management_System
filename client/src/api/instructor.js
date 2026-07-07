import api from "./axios";

// ============================
// Instructor Dashboard
// ============================
export const getInstructorDashboard = async () => {
  const { data } = await api.get("/instructor/dashboard");
  return data;
};  