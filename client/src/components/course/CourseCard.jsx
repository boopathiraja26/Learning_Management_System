import { Link } from "react-router-dom";
import { useState } from "react";

// Mapping of categories / keywords to high‑quality Unsplash images
const COVER_MAP = {
  "MERN Stack": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  "React": "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "Node.js": "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  "JavaScript": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  "Python": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
  "AI": "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  "Machine Learning": "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  "Cloud Computing": "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
  "DevOps": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
  "Cyber Security": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
  "Data Science": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0",
  "UI/UX": "https://images.unsplash.com/photo-1559028012-481c04fa702d",
  "Mobile Development": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
};

// Helper to pick a cover image based on category or title keywords
const getCoverImage = (course) => {
  if (course.thumbnail) return course.thumbnail; // Cloudinary thumbnail takes precedence
  const lower = (course.category || course.title || "").toLowerCase();
  for (const [key, url] of Object.entries(COVER_MAP)) {
    if (lower.includes(key.toLowerCase())) return url;
  }
  // Fallback generic image
  return "https://placehold.co/600x400?text=Course";
};

// Marketing title fallback – simple mapping based on category
const TITLE_MAP = {
  "MERN Stack": "Master MERN Stack Development",
  "React": "React.js Complete Bootcamp",
  "Node.js": "Node.js Backend Engineering",
  "JavaScript": "Modern JavaScript Masterclass",
  "Python": "Python for Professionals",
  "AI": "AI & Machine Learning Bootcamp",
  "Machine Learning": "AI & Machine Learning Bootcamp",
  "Cloud Computing": "Cloud Computing Essentials",
  "DevOps": "Production Ready DevOps",
  "Cyber Security": "Cyber Security Fundamentals",
  "Data Science": "Data Science Immersive",
  "UI/UX": "UI/UX Design Mastery",
  "Mobile Development": "Mobile Development Launchpad",
};

const getMarketingTitle = (course) => {
  if (course.title && course.title.length > 10) return course.title;
  const category = course.category || "";
  return TITLE_MAP[category] || "Professional Course";
};

// Marketing description fallback
const DESCRIPTION_MAP = {
  "MERN Stack": "Master the full MERN stack by building real‑world production applications.",
  "React": "Master React, Node.js, Express and MongoDB by building real‑world production applications.",
  "Node.js": "Learn industry‑ready backend development using Node.js, Express and MongoDB.",
  "JavaScript": "Become a full‑stack developer with practical projects and deployment.",
  "Python": "Dive deep into Python for data science, web development, and automation.",
  "AI": "Hands‑on AI & Machine Learning projects using modern frameworks.",
  "Machine Learning": "Hands‑on AI & Machine Learning projects using modern frameworks.",
  "Cloud Computing": "Explore cloud services, deployment pipelines, and scalability.",
  "DevOps": "Implement CI/CD, containerization, and monitoring for production apps.",
  "Cyber Security": "Learn defensive and offensive security techniques for modern systems.",
  "Data Science": "Analyze data, build models, and visualize insights with Python.",
  "UI/UX": "Design user‑centric interfaces with modern tools and principles.",
  "Mobile Development": "Create native and cross‑platform mobile apps from scratch.",
};

const getMarketingDescription = (course) => {
  if (course.description && course.description.length > 30) return course.description;
  const category = course.category || "";
  return DESCRIPTION_MAP[category] || "Gain industry‑ready skills with hands‑on projects and expert guidance.";
};

// Formatting helper for numbers
const formatNumber = (num) => new Intl.NumberFormat("en-US").format(num || 0);

const CourseCard = ({ course }) => {
  const [wishlisted, setWishlisted] = useState(false);
  const cover = getCoverImage(course);
  const title = getMarketingTitle(course);
  const description = getMarketingDescription(course);

  const toggleWishlist = () => setWishlisted(!wishlisted);

  return (
    <div className="glass rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 group">
      {/* Image container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Category badge */}
        {course.category && (
          <span className="absolute top-3 left-3 bg-purple-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {course.category}
          </span>
        )}
        {/* Rating badge */}
        {course.rating && (
          <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
            ★ {course.rating?.toFixed(1)}
          </span>
        )}
        {/* Wishlist heart */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-12 text-white text-xl hover:text-red-400 transition"
          aria-label="Add to wishlist"
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {/* Instructor */}
          <div className="flex items-center space-x-2">
            {course.instructor?.avatar ? (
              <img
                src={course.instructor.avatar}
                alt={course.instructor?.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-600">
                {course.instructor?.name?.[0] ?? "?"}
              </div>
            )}
            <span className="font-medium text-gray-800">{course.instructor?.name || "Instructor"}</span>
          </div>
          {/* Students */}
          <div className="flex items-center space-x-1">
            <span role="img" aria-label="students">👥</span>
            <span>{formatNumber(course.students?.length)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {/* Duration */}
          {course.duration && (
            <div className="flex items-center space-x-1">
              <span role="img" aria-label="duration">⏱️</span>
              <span>{course.duration}</span>
            </div>
          )}
          {/* Difficulty */}
          {course.difficulty && (
            <div className="flex items-center space-x-1">
              <span role="img" aria-label="difficulty">⚙️</span>
              <span>{course.difficulty}</span>
            </div>
          )}
        </div>
        {/* CTA */}
        <Link
          to={`/courses/${course._id}`}
          className="block w-full text-center bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-xl font-semibold transition"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;