import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Search, Menu, X } from 'lucide-react';
import {type SearchFormData, type NavigationItem } from '../types';
import { Link } from 'react-router';

interface HeaderProps {
  currentPage?: string;
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage = 'home', onSearch }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SearchFormData>();

  const navigationItems: NavigationItem[] = [
    { label: 'Home', href: '/', isActive: currentPage === 'home' },
    { label: 'Courses', href: '/courses', isActive: currentPage === 'courses' },
    { label: 'About', href: '/about', isActive: currentPage === 'about' },
    { label: 'AI Detection', href: '/ai-detector', isActive: currentPage === 'ai-detector' },
  ];

  const onSubmit = (data: SearchFormData) => {
    if (onSearch) {
      onSearch(data.query);
    }
    console.log('Search query:', data.query);
    reset();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo / Heading */}
          <div className="flex items-center">
            <h1 className="text-4xl font-extrabold tracking-wide">
              <span className="text-indigo-400">Edu</span>
              <span className="text-white">LMS</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-lg hover:text-indigo-400 relative group transition-colors duration-200 ${
                    item.isActive ? 'text-indigo-400' : 'text-white'
                  }`}
                >
                  {item.label}
                  <span 
                    className={`absolute left-0 -bottom-1 h-0.5 bg-indigo-500 transition-all duration-300 ${
                      item.isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Get Started Button */}
            <Link to="/login">
              <button className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5 font-medium">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden text-white p-2 hover:text-indigo-400 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-700">
            <nav className="flex flex-col space-y-4 mt-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`text-lg hover:text-indigo-400 transition-colors duration-200 ${
                    item.isActive ? 'text-indigo-400' : 'text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Search Form */}
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              className="mt-4 space-y-3"
            >
              <div className="relative">
                <input
                  {...register('query', { 
                    required: 'Search query is required',
                    minLength: { value: 2, message: 'Minimum 2 characters required' }
                  })}
                  type="text"
                  placeholder="Search courses..."
                  className="w-full px-4 py-2 pl-10 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              {errors.query && (
                <span className="text-red-400 text-sm">{errors.query.message}</span>
              )}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Search
              </button>
            </form>

            {/* Mobile Get Started Button */}
            <Link to="/login" className="block mt-4">
              <button
                className="w-full px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-colors duration-200 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
