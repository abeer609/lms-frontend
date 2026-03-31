import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {  X } from 'lucide-react';
import { type EnrollmentFormData } from '../types';
import type { Course } from '../course/Course';

interface CourseCardProps {
  course: Course;
  onEnroll?: (courseId: string, data: EnrollmentFormData) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<EnrollmentFormData>();

  const onSubmit = (data: EnrollmentFormData) => {
    if (onEnroll) {
      onEnroll(course.id, data);
    }
    console.log('Enrollment data:', { courseId: course.id, ...data });
    reset();
    setShowEnrollModal(false);
  };

  

  return (
    <>
      <motion.div
        className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group"
        whileHover={{ scale: 1.02, y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative overflow-hidden">
          {course.banner && <img 
            src={course.banner} 
            alt={course.title} 
            className="h-48 w-full object-cover group-hover:scale-110 transition-transform duration-300"
          />}
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <Link to={`/courses/${course.id}`}>
          <h3 className="text-xl font-semibold text-white mb-3  transition-colors">
            {course.title}
          </h3>
          </Link>
          
          <p className="text-gray-400 text-sm mb-4 flex-1">
            {course.description.substring(0, 150)+"..."}
          </p>

          

          <button
            onClick={() => setShowEnrollModal(true)}
            className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors duration-200 font-medium transform hover:scale-105"
          >
            Enroll Now
          </button>
        </div>
      </motion.div>

      {/* Enrollment Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-gray-800 rounded-xl p-6 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Enroll in {course.title}</h3>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {errors.name && (
                  <span className="text-red-400 text-sm mt-1 block">{errors.name.message}</span>
                )}
              </div>

              <div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {errors.email && (
                  <span className="text-red-400 text-sm mt-1 block">{errors.email.message}</span>
                )}
              </div>

              <div>
                <input
                  {...register('phone', { required: 'Phone number is required' })}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                {errors.phone && (
                  <span className="text-red-400 text-sm mt-1 block">{errors.phone.message}</span>
                )}
              </div>

              <div>
                <select
                  {...register('experience', { required: 'Please select your experience level' })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select Experience Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
                {errors.experience && (
                  <span className="text-red-400 text-sm mt-1 block">{errors.experience.message}</span>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEnrollModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium"
                >
                  Enroll Now
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
