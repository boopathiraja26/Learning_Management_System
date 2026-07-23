import React from 'react';
import CourseCard from '../../components/course/CourseCard';
import CourseSkeleton from '../../components/common/CourseSkeleton';

const PopularCourses = ({ courses, loading, skeletonCount = 4 }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Popular Courses</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <CourseSkeleton key={i} />
              ))
            : courses.slice(0, 8).map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
