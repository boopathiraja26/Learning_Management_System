import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../../api/course';
import CourseSkeleton from '../../components/common/CourseSkeleton';
import PopularCourses from '../../components/courses/PopularCourses';
import HeroSection from '../../components/hero/HeroSection';
import FeaturesSection from '../../components/features/FeaturesSection';
import Statistics from '../../components/stats/Statistics';
import LearningJourney from '../../components/journey/LearningJourney';
import TestimonialCarousel from '../../components/testimonials/TestimonialCarousel';
import FAQSection from '../../components/faq/FAQSection';
import Newsletter from '../../components/newsletter/Newsletter';
import FinalCTA from '../../components/cta/FinalCTA';

const LandingPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const data = await getAllCourses();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Statistics />
      <PopularCourses courses={courses} loading={loading} skeletonCount={4} />
      <LearningJourney />
      <TestimonialCarousel />
      <FAQSection />
      <Newsletter />
      <FinalCTA />
    </>
  );
};

export default LandingPage;