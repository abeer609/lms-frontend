import React from 'react';
import { motion } from 'framer-motion';
import {type WhyChooseUsCard } from '../types';

const WhyChooseUsSection: React.FC = () => {
  const cards: WhyChooseUsCard[] = [
    {
      emoji: '⚡',
      title: 'Interactive Learning',
      description: 'Dive into live quizzes, AI-assisted editor, and engaging gamified content to boost your learning journey.'
    },
    {
      emoji: '🚀',
      title: 'Seamless Experience',
      description: 'Learn anytime, anywhere with a mobile-first design and blazing-fast performance.'
    },
    {
      emoji: '🔒',
      title: 'Secure & Reliable',
      description: 'Built with enterprise-grade security and scalability for worry-free learning.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-24 bg-gray-950 relative">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h3 
          className="text-5xl font-bold text-indigo-400 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Should You Choose Us?
        </motion.h3>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-gray-800 rounded-2xl p-10 shadow-[0_0_20px_2px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_4px_rgba(99,102,241,0.6)] transition transform hover:scale-105 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-indigo-400 text-6xl mb-4">{card.emoji}</div>
              <h4 className="text-2xl font-semibold mb-4 text-white">{card.title}</h4>
              <p className="text-gray-400">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
