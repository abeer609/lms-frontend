import React from 'react';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, Clock, Plus } from 'lucide-react';
import { type FeatureItem } from '../types';

const FeaturesSection: React.FC = () => {
  const features: FeatureItem[] = [
    {
      icon: <Lock className="h-7 w-7 text-white" />,
      title: 'AI-Assisted Text Editor',
      description: 'Write, edit, and learn faster with an AI-driven smart editor built directly into your workspace.'
    },
    {
      icon: <CheckCircle className="h-7 w-7 text-white" />,
      title: 'Built-in Code Compiler',
      description: 'Run and test code instantly inside your courses with our integrated compiler for multiple languages.'
    },
    {
      icon: <Clock className="h-7 w-7 text-white" />,
      title: 'Progress Tracking',
      description: 'Track your course progress, completion rates, and certificates all in one place.'
    },
    {
      icon: <Plus className="h-7 w-7 text-white" />,
      title: 'Collaboration Tools',
      description: 'Learn together with group discussions, peer review, and real-time collaboration features.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-24 bg-gray-950 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base font-semibold text-indigo-400">Our Features</h2>
          <p className="mt-2 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Tools That Empower Your Learning
          </p>
          <p className="mt-6 text-lg text-gray-400">
            From AI-powered tools to hands-on coding environments — EduLMS gives you everything you need to master your skills.
          </p>
        </motion.div>

        <motion.div 
          className="mx-auto mt-20 max-w-4xl grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureVariants}
              className="relative pl-16 group"
              whileHover={{ x: 10 }}
            >
              <div className="absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-lg group-hover:bg-indigo-500 transition-colors duration-200">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
