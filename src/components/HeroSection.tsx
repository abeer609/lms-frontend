import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/AnimatedBackground';
import { type NewsletterFormData } from '../types';
import { Link } from 'react-router';

interface HeroSectionProps {
  onExplore?: () => void;
  onLearnMore?: () => void;
  onNewsletterSubmit?: (email: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  onExplore, 
  onLearnMore, 
  onNewsletterSubmit 
}) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewsletterFormData>();

  const onSubmit = (data: NewsletterFormData) => {
    if (onNewsletterSubmit) {
      onNewsletterSubmit(data.email);
    }
    console.log('Newsletter signup:', data.email);
    reset();
  };

  return (
    <section className="relative flex items-center justify-center h-[90vh] text-center">
      {/* <AnimatedBackground /> */}
      <div className="absolute inset-0 "></div>
      
      <motion.div 
        className="relative z-10 max-w-4xl px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Empower Your Future with <br />
          <span className="text-indigo-400">EduLMS</span>
        </motion.h2>
        
        <motion.p 
          className="mt-4 text-gray-300 text-xl md:text-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A next-generation Learning Management System for interactive, secure, and seamless education.
        </motion.p>
        
        <motion.div 
          className="mt-10 flex flex-col sm:flex-row justify-center gap-6 items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link 
            to={"/courses"}
            className="px-8 py-3 text-lg rounded-2xl bg-indigo-600 hover:bg-indigo-500 shadow-xl transition transform hover:scale-105 text-white font-medium"
          >
            Explore Courses
          </Link>
          <button 
            onClick={onLearnMore}
            className="px-8 py-3 text-lg rounded-2xl border border-indigo-500 text-indigo-400 hover:bg-indigo-800 transition transform hover:scale-105 font-medium"
          >
            Learn More
          </button>
        </motion.div>

        {/* Newsletter Signup Form */}
        
      </motion.div>
    </section>
  );
};

export default HeroSection;
