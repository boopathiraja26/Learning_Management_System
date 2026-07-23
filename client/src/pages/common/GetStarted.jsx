import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Ensure the image is placed in public/images/hero-illustration.jpg

const stats = [
  { label: "Students", value: "1000+" },
  { label: "Courses", value: "50+" },
  { label: "Industry Projects", value: "50+" },
  { label: "Lifetime Access", value: "✓" },
];

const GetStarted = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      {/* Decorative blurred blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-500/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center relative z-10">
        {/* Left side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <h1 className="text-5xl font-extrabold text-primary mb-6">
            Learn In‑Demand Skills With Industry‑Level Courses
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-md">
            Master Full Stack Development, AI, Cloud Computing, and Modern Technologies through hands‑on, project‑based learning.
          </p>
          <div className="flex space-x-4 mb-6">
            <Link
              to="/courses"
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/80 transition"
            >
              Start Learning
            </Link>
            <Link
              to="/courses"
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition"
            >
              Explore Courses
            </Link>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <span className="text-lg font-medium">★★★★★</span>
            <span className="text-sm">Trusted by learners worldwide</span>
          </div>
        </motion.div>

        {/* Right side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center items-center relative mb-12 md:mb-0"
        >
          <img src="/images/hero-illustration.jpg" alt="Dashboard mockup" className="w-full max-w-md rounded-2xl shadow-xl" />
          {/* Floating glass cards */}
          <div className="absolute top-0 left-0 space-y-4">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/30 backdrop-blur-md rounded-xl p-4 shadow-lg w-40 transform hover:scale-105 transition"
              >
                <p className="text-sm text-gray-800 font-medium">{item.label}</p>
                <p className="text-xl font-bold text-primary">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetStarted;
