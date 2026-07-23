import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FiUpload, FiEdit, FiPhone, FiMapPin, FiGlobe, FiGithub, FiLinkedin, FiAward, FiUserCheck, FiCalendar, FiLock, FiCheckCircle, FiBell, FiMoon, FiMail, FiClock } from "react-icons/fi";
import { FaCertificate, FaClock, FaBookOpen, FaTrophy } from "react-icons/fa";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../../api/profile";

import { useAuth } from "../../context/AuthContext";

// Helper component for glassmorphism cards
const GlassCard = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
    className={`bg-white/30 backdrop-blur-xl rounded-2xl p-6 shadow-lg ${className}`}
  >
    {children}
  </motion.div>
);

// Counter animation hook
const useAnimatedCounter = (target, duration = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const step = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return count;
};

const Profile = () => {
  const { setUser } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    avatar: "",
    joinDate: "",
    status: "Active",
    completedCourses: 0,
    enrolledCourses: 0,
    certificatesEarned: 0,
    learningHours: 0,
    bio: "",
    phone: "",
    location: "",
    website: "",
    linkedIn: "",
    github: "",
    activity: [],
    certificates: [],
    achievements: [],
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      if (res.success) {
        setProfile((prev) => ({
          ...prev,
          ...res.user,
          completedCourses: res.user.completedCourses || 0,
          enrolledCourses: res.user.enrolledCourses || 0,
          certificatesEarned: res.user.certificatesEarned || 0,
          learningHours: res.user.learningHours || 0,
          activity: res.user.activity || [],
          certificates: res.user.certificates || [],
          achievements: res.user.achievements || [],
        }));
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
      const res = await updateProfile({ name: profile.name });
      toast.success(res.message);
      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const res = await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success(res.message);
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password update failed");
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile({ ...profile, avatar: url });
    }
  };

  // Animated counters for stats
  const completed = useAnimatedCounter(profile.completedCourses);
  const enrolled = useAnimatedCounter(profile.enrolledCourses);
  const certificates = useAnimatedCounter(profile.certificatesEarned);
  const hours = useAnimatedCounter(profile.learningHours);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // Empty state if profile data missing
  if (!profile.name && !profile.email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <img
          src="https://images.unsplash.com/photo-1522204522804-7796ac45d873"
          alt="empty"
          className="w-64 mb-6 rounded"
        />
        <h2 className="text-2xl font-semibold mb-2">Complete Your Profile</h2>
        <p className="text-gray-600 mb-4">Add your details to unlock personalized learning.</p>
        <button
          onClick={handleAvatarClick}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
        >
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 p-6">
      {/* Header hero */}
      <section className="mb-12">
        <GlassCard className="flex flex-col md:flex-row items-center gap-8 p-8">
          <div className="relative">
            <img
              src={profile.avatar || `https://ui-avatars.com/api/?name=${profile.name}`}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-purple-600 object-cover"
            />
            <button
              onClick={handleAvatarClick}
              className="absolute -bottom-2 -right-2 bg-purple-600 text-white p-2 rounded-full shadow-lg"
            >
              <FiUpload size={18} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">{profile.name || "Student"}</h1>
            <p className="text-lg text-gray-700 mb-1">
              <FiUserCheck className="inline mr-2" />{profile.role || "Student"}
            </p>
            <p className="text-gray-600 mb-1">
              <FiMail className="inline mr-2" />{profile.email}
            </p>
            <p className="text-gray-600 mb-1">
              <FiCalendar className="inline mr-2" /> Joined {profile.joinDate || "—"}
            </p>
            <span className="inline-block mt-3 bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
              {profile.status || "Active"}
            </span>
          </div>
        </GlassCard>
      </section>

      {/* Statistic cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Completed Courses", value: completed, icon: <FaBookOpen className="text-purple-600" size={24} /> },
          { label: "Enrolled Courses", value: enrolled, icon: <FaBookOpen className="text-blue-600" size={24} /> },
          { label: "Certificates Earned", value: certificates, icon: <FaCertificate className="text-amber-600" size={24} /> },
          { label: "Learning Hours", value: hours, icon: <FaClock className="text-teal-600" size={24} /> },
        ].map((card, idx) => (
          <GlassCard key={idx} className="border border-transparent hover:border-gradient-radial from-pink-400 to-purple-400">
            <div className="flex items-center gap-4">
              {card.icon}
              <div>
                <p className="text-2xl font-semibold text-gray-800">{card.value}</p>
                <p className="text-sm text-gray-600">{card.label}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </section>

      {/* Profile information */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left – Personal Information */}
        <GlassCard className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 flex items-center"><FiEdit className="mr-2" /> Personal Information</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full border rounded-lg p-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full border rounded-lg p-2"
                placeholder="+1234567890"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full border rounded-lg p-2"
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Bio</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full border rounded-lg p-2"
                placeholder="Tell something about yourself"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Website</label>
                <input
                  type="url"
                  value={profile.website}
                  onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">LinkedIn</label>
                <input
                  type="url"
                  value={profile.linkedIn}
                  onChange={(e) => setProfile({ ...profile, linkedIn: e.target.value })}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">GitHub</label>
                <input
                  type="url"
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                  className="w-full border rounded-lg p-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
            >
              Save Changes
            </button>
          </form>
        </GlassCard>

        {/* Right – Learning Summary */}
        <GlassCard className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 flex items-center"><FiAward className="mr-2" /> Learning Summary</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Current Level</span>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">Intermediate</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Course Progress</span>
              <div className="w-32 h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 1.2 }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Certificates</span>
              <span className="text-lg font-semibold">{profile.certificates?.length || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Weekly Streak</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">5 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Next Learning Goal</span>
              <span className="text-gray-600">Complete \"Advanced React\"</span>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Account Settings */}
      <section className="mb-12">
        <GlassCard className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center"><FiLock className="mr-2" /> Account Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg flex items-center justify-center">
              <FiEdit className="mr-2" /> Change Password
            </button>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg flex items-center justify-center">
              <FiBell className="mr-2" /> Notification Preferences
            </button>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg flex items-center justify-center">
              <FiMoon className="mr-2" /> Dark Mode
            </button>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg flex items-center justify-center">
              <FiGlobe className="mr-2" /> Language
            </button>
            <button className="col-span-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg">
              Delete Account
            </button>
          </div>
        </GlassCard>
      </section>

      {/* Recent Activity Timeline */}
      <section className="mb-12">
        <GlassCard className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center"><FiClock className="mr-2" /> Recent Activity</h2>
          {profile.activity && profile.activity.length > 0 ? (
            <ul className="space-y-3">
              {profile.activity.map((act, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <FiCheckCircle className="text-green-500" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No recent activity.</p>
          )}
        </GlassCard>
      </section>

      {/* Certificates */}
      <section className="mb-12">
        <GlassCard className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center"><FaCertificate className="mr-2" /> Certificates</h2>
          {profile.certificates && profile.certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile.certificates.map((cert, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-4 bg-white/30 backdrop-blur-sm">
                  <h3 className="font-semibold mb-2">{cert.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Issued {cert.date}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-1 rounded">
                      Preview
                    </button>
                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">You have not earned any certificates yet.</p>
          )}
        </GlassCard>
      </section>

      {/* Achievements */}
      <section className="mb-12">
        <GlassCard className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center"><FaTrophy className="mr-2" /> My Achievements</h2>
          {profile.achievements && profile.achievements.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {profile.achievements.map((ach, idx) => (
                <div key={idx} className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  {ach.icon && <span className="mr-1">{ach.icon}</span>}{ach.label}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No achievements yet.</p>
          )}
        </GlassCard>
      </section>
    </div>
  );
};

export default Profile;