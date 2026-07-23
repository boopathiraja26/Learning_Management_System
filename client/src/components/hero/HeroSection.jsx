import React from 'react';
import { motion } from 'framer-motion';
import BackgroundMesh from '../layout/BackgroundMesh';

// Decorative floating elements configuration (no dashboard image)
const decorations = [
  // Soft glowing orb
  { size: 120, bg: 'radial-gradient(circle at center, rgba(255,255,255,0.3), transparent)', top: '10%', left: '15%', delay: 0 },
  // Blurred circle
  { size: 180, bg: 'radial-gradient(circle at center, rgba(0,150,255,0.2), transparent)', top: '70%', left: '80%', delay: 1 },
  // Light particle
  { size: 60, bg: 'radial-gradient(circle at center, rgba(255,200,0,0.25), transparent)', top: '40%', left: '60%', delay: 0.5 },
  // Rotating gradient ring
  { size: 200, bg: 'conic-gradient(from 180deg at 50% 50%, rgba(0,200,255,0.2), transparent)', top: '30%', left: '30%', delay: 0.3 },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent">
      {/* Animated background mesh */}
      <BackgroundMesh />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 min-h-screen grid lg:grid-cols-2 items-center gap-20">
        {/* Left column */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl font-black tracking-tight leading-tight text-gray-900 mb-6 max-w-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600">
            Learn Future‑Ready Skills With Industry Experts
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto lg:mx-0 mb-8">
            Upskill yourself with curated courses, hands‑on projects, and certificates recognized by top companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
            <a
              href="/register"
              className="bg-gradient-to-r from-primary to-indigo-600 text-white font-semibold py-3 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition"
            >
              Get Started Free
            </a>
            <a
              href="/courses"
              className="bg-white text-primary font-semibold py-3 px-8 rounded-2xl shadow border border-primary hover:bg-gray-50 hover:scale-105 transform transition"
            >
              Explore Courses
            </a>
          </div>
        </motion.div>

        {/* Right column – decorative animations only */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative floating elements */}
          {decorations.map((d, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-70"
              style={{
                width: d.size,
                height: d.size,
                top: d.top,
                left: d.left,
                background: d.bg,
                filter: 'blur(60px)'
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 360],
                opacity: [0.7, 0.4, 0.7]
              }}
              transition={{
                repeat: Infinity,
                duration: 12,
                ease: 'linear',
                delay: d.delay
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
