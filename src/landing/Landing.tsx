import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import WhyChooseUsSection from '../components/WhyChooseUsSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import { type ContactFormData } from '../types';

function Landing() {
  const [searchResults, setSearchResults] = useState<string>('');
  const [notifications, setNotifications] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchResults(query);
    addNotification(`Searching for: "${query}"`);
  };

  const handleExplore = () => {
    addNotification('Redirecting to courses page...');
  };

  const handleLearnMore = () => {
    addNotification('Loading more information...');
  };

  const handleNewsletterSubmit = (email: string) => {
    addNotification(`Newsletter subscription successful for: ${email}`);
  };

  const handleContactSubmit = (data: ContactFormData) => {
    addNotification(`Contact form submitted by: ${data.name}`);
  };

  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      <Header 
        currentPage="home" 
        onSearch={handleSearch}
      />
      
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-20 right-4 z-50 space-y-2">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-right"
            >
              {notification}
            </div>
          ))}
        </div>
      )}

      {/* Search Results Display */}
      {searchResults && (
        <div className="bg-indigo-900/20 border-b border-indigo-500/30 py-3">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-indigo-300">
              <strong>Search Results for:</strong> "{searchResults}"
            </p>
            <p className="text-sm text-indigo-400 mt-1">
              Search functionality is working! In a real application, this would show course results.
            </p>
          </div>
        </div>
      )}

      <HeroSection 
        onExplore={handleExplore}
        onLearnMore={handleLearnMore}
        onNewsletterSubmit={handleNewsletterSubmit}
      />
      
      <WhyChooseUsSection />
      
      <FeaturesSection />
      
      <Footer onContactSubmit={handleContactSubmit} />

      <style>{`
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in-right {
          animation: fade-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Landing;