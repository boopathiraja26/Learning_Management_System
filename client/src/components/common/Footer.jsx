import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>

            <h2 className="text-3xl font-bold text-purple-400">
              LMS
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Learn Without Limits.
              <br />
              Build your future through quality online
              education from experienced instructors.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-purple-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/courses"
                  className="text-gray-400 hover:text-purple-400 transition"
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-purple-400 transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="text-gray-400 hover:text-purple-400 transition"
                >
                  Register
                </Link>
              </li>

            </ul>

          </div>

          {/* Categories */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Categories
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>Web Development</li>

              <li>Programming</li>

              <li>Data Science</li>

              <li>Artificial Intelligence</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-3 text-gray-400">

              <p>📧 support@lms.com</p>

              <p>📞 +91 98765 43210</p>

              <p>📍 Chennai, Tamil Nadu</p>

            </div>

            <div className="flex gap-4 mt-6 text-2xl">

              <a
                href="#"
                className="hover:text-purple-400 transition"
              >
                <FaFacebook />
              </a>

              <a
                href="#"
                className="hover:text-purple-400 transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="hover:text-purple-400 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-400 transition"
              >
                <FaGithub />
              </a>

            </div>

          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-400 text-center">
            © {new Date().getFullYear()} LMS. All Rights Reserved.
          </p>

          <button
            onClick={scrollTop}
            className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition"
          >
            <FaArrowUp />
          </button>

        </div>

      </div>
    </footer>
  );
};

export default Footer;