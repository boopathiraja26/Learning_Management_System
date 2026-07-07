import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../api/profile";

import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { setUser } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    avatar: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      if (res.success) {
        setProfile(res.user);
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        name: profile.name,
      });

      toast.success(res.message);

      setUser(res.user);

      localStorage.setItem(
        "user",
        JSON.stringify(res.user)
      );

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Update failed"
      );
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      return toast.error("Passwords do not match");
    }

    try {
      const res = await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success(res.message);

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Password update failed"
      );
    }
  };

  if (loading) {
  return <Loader />;
}

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-10">
        My Profile
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Profile */}

        <div className="bg-white shadow-lg rounded-xl p-8">

          <div className="flex justify-center mb-6">

            <img
              src={
                profile.avatar ||
                "https://ui-avatars.com/api/?name=" +
                  profile.name
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-purple-600"
            />

          </div>

          <form onSubmit={handleProfileUpdate}>

            <label className="block mb-2 font-semibold">
              Name
            </label>

            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-5"
            />

            <label className="block mb-2 font-semibold">
              Email
            </label>

            <input
              value={profile.email}
              disabled
              className="w-full border rounded-lg p-3 mb-5 bg-gray-100"
            />

            <label className="block mb-2 font-semibold">
              Role
            </label>

            <input
              value={profile.role}
              disabled
              className="w-full border rounded-lg p-3 mb-6 bg-gray-100"
            />

            <button
              className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 rounded-lg"
            >
              Save Changes
            </button>

          </form>

        </div>

        {/* Password */}

        <div className="bg-white shadow-lg rounded-xl p-8">

          <h2 className="text-2xl font-bold mb-6">
            Change Password
          </h2>

          <form onSubmit={handlePasswordChange}>

            <input
              type="password"
              placeholder="Current Password"
              value={passwordData.oldPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  oldPassword: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-4"
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-4"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-6"
            />

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              Change Password
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Profile;