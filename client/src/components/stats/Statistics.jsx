import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const stats = [
  { label: 'Students Enrolled', value: 12000 },
  { label: 'Courses Available', value: 340 },
  { label: 'Instructors', value: 45 },
  { label: 'Hours of Content', value: 980 },
];

const Statistics = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      count: 1,
      transition: { duration: 1.5, ease: 'easeOut' },
    });
  }, [controls]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Impact</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="glass p-6 rounded-xl text-center"
            >
              <motion.span
                className="text-5xl font-extrabold text-primary"
                animate={controls}
                initial={{ count: 0 }}
                onUpdate={(latest) => {
                  const current = Math.floor(latest.count * s.value);
                  const el = document.getElementById(`stat-${i}`);
                  if (el) el.textContent = current.toLocaleString();
                }}
              >0</motion.span>
              <p className="mt-4 text-gray-600" id={`stat-${i}`}>{s.value}</p>
              <p className="mt-2 text-gray-700 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
