import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const { data } = await loginUser(formData);

      login(data.user, data.token);

      toast.success(data.message);

      if (data.user.role === "Student") {
        navigate("/student");
      } else if (data.user.role === "Instructor") {
        navigate("/instructor");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 to-indigo-700 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to your LMS account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}

          <div>

            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-600"
            />

          </div>

          {/* Password */}

          <div>

            <label className="block font-medium mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-purple-600"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-purple-700 font-semibold"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;