import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {type ContactFormData } from '../types';

interface FooterProps {
  onContactSubmit?: (data: ContactFormData) => void;
}

const Footer: React.FC<FooterProps> = ({ onContactSubmit }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    if (onContactSubmit) {
      onContactSubmit(data);
    }
    console.log('Contact form submitted:', data);
    reset();
  };

  return (
    <footer className="bg-gray-950 py-16 border-t border-gradient-to-r from-indigo-500 to-purple-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
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
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
                {errors.email && (
                  <span className="text-red-400 text-sm mt-1 block">{errors.email.message}</span>
                )}
              </div>
              
              <div>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                />
                {errors.message && (
                  <span className="text-red-400 text-sm mt-1 block">{errors.message.message}</span>
                )}
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:pl-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6">About EduLMS</h3>
            <p className="text-gray-400 mb-6">
              EduLMS is revolutionizing online education with cutting-edge technology, 
              interactive learning experiences, and a commitment to making quality education 
              accessible to everyone, everywhere.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                <span>24/7 Student Support</span>
              </div>
              <div className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                <span>Industry-Leading Instructors</span>
              </div>
              <div className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                <span>Lifetime Access to Courses</span>
              </div>
              <div className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                <span>Certificate of Completion</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="text-center text-gray-500 text-sm pt-8 border-t border-gray-800">
          © 2025 EduLMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
