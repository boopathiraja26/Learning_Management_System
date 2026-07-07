import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import { registerUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Student",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
      role,
    } = formData;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return toast.error("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const { data } = await registerUser({
        name,
        email,
        password,
        role,
      });

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
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 to-purple-700 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Register to start learning
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}

          <div>
            <label className="block font-medium mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-purple-600"
            />
          </div>

          {/* Email */}

          <div>
            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-purple-600"
            />
          </div>

          {/* Role */}

          <div>
            <label className="block font-medium mb-2">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-purple-600"
            >
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
            </select>
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
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-purple-600"
              />

              <button
                type="button"
                className="absolute right-4 top-4"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="block font-medium mb-2">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-purple-600"
              />

              <button
                type="button"
                className="absolute right-4 top-4"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
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
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-700 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;