import React from 'react';
import { useForm } from 'react-hook-form';
import { Search, Filter } from 'lucide-react';
import { type CourseFilterFormData } from '../types';

interface CourseFiltersProps {
  onFilterChange: (filters: CourseFilterFormData) => void;
}

const CourseFilters: React.FC<CourseFiltersProps> = ({ onFilterChange }) => {
  const { register, watch, handleSubmit } = useForm<CourseFilterFormData>({
    defaultValues: {
      search: '',
    }
  });

  // Watch for changes and trigger filter updates
  React.useEffect(() => {
    const subscription = watch((value) => {
      onFilterChange(value as CourseFilterFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, onFilterChange]);

  return (
    <div className="">
      <form className="flex gap-4 mb-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            {...register('search')}
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Category Filter */}
      </form>
    </div>
  );
};

export default CourseFilters;
