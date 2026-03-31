import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import CourseFilters from '../components/CourseFilters';
import Footer from '../components/Footer';
// import { courses } from "../data/courses";
import { type CourseFilterFormData, type EnrollmentFormData, type ContactFormData } from '../types';
import type { Course } from '../course/Course';
import { client } from '../client';
import { AxiosError } from 'axios';


const CoursesPage: React.FC = () => {
  const [courses, setCourse] = useState<Course[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<CourseFilterFormData>({
    search: '',
  });
  useEffect(() => {
    setLoading(true)
    client.get<Course[]>("/courses/").then(res => {
      setCourse(res.data)
      setLoading(false)
    }).catch(e => {
      if (e instanceof AxiosError) {
        setError(e.message)
        setLoading(false)
      }
    })
  }, [])

  // Filter courses based on current filters
  const filteredCourses = useMemo(() => {
    return courses.filter((course: Course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      return matchesSearch;
    });
  }, [filters, courses]);

  const handleFilterChange = (newFilters: CourseFilterFormData) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const handleEnroll = (courseId: string, data: EnrollmentFormData) => {
    // if(!courses) return [];
    // const course = courses.find(c => c.id === courseId);
    // addNotification(`Successfully enrolled ${data.name} in "${course?.title}"!`);
    console.log('enrolling', courseId, data)
  };

  const handleContactSubmit = (data: ContactFormData) => {
    console.log(`Contact form submitted by: ${data.name}`);
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };
  const render = () => {
    if (loading) {
      return <p>Loading...</p>
    }
    if(error){
      return <p className="text-red-500">{error}</p>
    }
    if (!loading && courses.length == 0) {
      return <motion.div
        className="col-span-full text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-semibold text-white mb-2">
          No courses found
        </h3>
        <p className="text-gray-400">
          Try adjusting your search criteria or browse all available courses.
        </p>
      </motion.div>
    }
    if (courses.length > 0 && !loading) {
      return <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onEnroll={handleEnroll}
          />
        ))}
      </motion.div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header currentPage="courses" onSearch={handleSearch} />
      <main className="py-12 px-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-indigo-400 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover a wide range of courses designed to help you master new skills and advance your career.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CourseFilters onFilterChange={handleFilterChange} />
        </motion.div>

        {/* Results Summary */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400">
            Showing <span className="text-indigo-400 font-semibold">{filteredCourses.length}</span> of{' '}
            <span className="text-indigo-400 font-semibold">{courses?.length}</span> courses
            {filters.search && (
              <span> for "<span className="text-white">{filters.search}</span>"</span>
            )}
          </p>
        </motion.div>

        {render()}

      </main>

      <Footer onContactSubmit={handleContactSubmit} />
    </div>
  );
};

export default CoursesPage;
