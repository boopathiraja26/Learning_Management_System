import api from "./axios";

// Register
export const registerUser = async (data) => {
  return await api.post("/auth/register", data);
};

// Login
export const loginUser = async (data) => {
  return await api.post("/auth/login", data);
};

// Get Logged-in User
export const getProfile = async () => {
  return await api.get("/auth/profile");
};