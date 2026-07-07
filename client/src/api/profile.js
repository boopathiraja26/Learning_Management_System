import api from "./axios";

// Get Profile
export const getProfile = async () => {
  const { data } = await api.get("/profile");
  return data;
};

// Update Profile
export const updateProfile = async (profileData) => {
  const { data } = await api.put("/profile", profileData);
  return data;
};

// Change Password
export const changePassword = async (passwordData) => {
  const { data } = await api.put("/profile/password", passwordData);
  return data;
};