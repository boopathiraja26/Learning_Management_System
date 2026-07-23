import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Stay Updated</h2>
        <p className="text-lg text-gray-600 mb-4">Subscribe to our newsletter for the latest courses and updates.</p>
        <form className="flex justify-center items-center space-x-2">
          <input type="email" placeholder="Enter your email" className="px-4 py-2 border rounded-md w-64" />
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Subscribe</button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
