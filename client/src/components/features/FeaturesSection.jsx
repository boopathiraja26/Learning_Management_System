import React from 'react';
import { FaRocket, FaShieldAlt, FaChartLine, FaUserFriends } from 'react-icons/fa';

const features = [
  {
    icon: <FaRocket size={32} className="text-primary" />, 
    title: 'Fast Performance',
    description: 'Optimized infrastructure ensures lightning‑fast load times and smooth interactions.'
  },
  {
    icon: <FaShieldAlt size={32} className="text-primary" />, 
    title: 'Secure Platform',
    description: 'Industry‑grade security and privacy controls keep your data safe.'
  },
  {
    icon: <FaChartLine size={32} className="text-primary" />, 
    title: 'Analytics',
    description: 'Powerful insights and progress tracking for learners and instructors.'
  },
  {
    icon: <FaUserFriends size={32} className="text-primary" />, 
    title: 'Community',
    description: 'Collaborate, network, and grow together with peers worldwide.'
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Our LMS?</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <div key={i} className="glass p-6 rounded-xl text-center hover:shadow-xl transition-shadow duration-300">
              <div className="mb-4 flex justify-center">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
