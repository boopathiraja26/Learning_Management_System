import React from 'react';
import CourseCard from '../../components/course/CourseCard';
import CourseSkeleton from '../../components/common/CourseSkeleton';

const PopularCourses = ({ courses = [], loading, skeletonCount = 4 }) => {
  // Sample placeholder courses for visual richness when no data is available
  const sampleCourses = [
    {
      _id: 'sample-1',
      title: 'Master MERN Stack Development',
      category: 'MERN Stack',
      description: '',
      instructor: { name: 'Boopathi Raja', avatar: '' },
      rating: 4.9,
      students: new Array(12).fill(null),
      duration: '12h 30m',
      difficulty: 'Intermediate',
    },
    {
      _id: 'sample-2',
      title: 'Full‑Stack React & Node.js',
      category: 'React',
      description: '',
      instructor: { name: 'Alice Smith', avatar: '' },
      rating: 4.8,
      students: new Array(8).fill(null),
      duration: '10h',
      difficulty: 'Beginner',
    },
    {
      _id: 'sample-3',
      title: 'Advanced JavaScript Techniques',
      category: 'JavaScript',
      description: '',
      instructor: { name: 'Bob Lee', avatar: '' },
      rating: 4.7,
      students: new Array(15).fill(null),
      duration: '8h',
      difficulty: 'Advanced',
    },
    {
      _id: 'sample-4',
      title: 'Python for Data Science',
      category: 'Python',
      description: '',
      instructor: { name: 'Carol Nguyen', avatar: '' },
      rating: 5.0,
      students: new Array(20).fill(null),
      duration: '14h',
      difficulty: 'Intermediate',
    },
  ];
  const displayedCourses = loading
    ? Array.from({ length: skeletonCount })
    : (courses && courses.length > 0 ? courses : sampleCourses).slice(0, 8);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Popular Courses</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {loading
            ? displayedCourses.map((_, i) => <CourseSkeleton key={i} />)
            : displayedCourses.map((course) => <CourseCard key={course._id} course={course} />)}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
