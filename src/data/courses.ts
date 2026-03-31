import { type Course } from '../types';

export const courses: Course[] = [
  {
    id: 1,
    title: 'Project Management',
    description: 'Master planning, execution, and leadership skills for successful project delivery.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Business',
    level: 'Intermediate',
    duration: '8 weeks',
    price: 299,
    rating: 4.8,
    students: 1250
  },
  {
    id: 2,
    title: 'Introduction to Education',
    description: 'Understand the foundations of teaching and learning methodologies.',
    image: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Education',
    level: 'Beginner',
    duration: '6 weeks',
    price: 199,
    rating: 4.6,
    students: 890
  },
  {
    id: 3,
    title: 'Data Science',
    description: 'Dive into data analysis, visualization, and artificial intelligence.',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    level: 'Advanced',
    duration: '12 weeks',
    price: 499,
    rating: 4.9,
    students: 2100
  },
  {
    id: 4,
    title: 'Data Structures & Algorithms',
    description: 'Learn Data Structures and Algorithms in depth with practical implementations.',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    level: 'Intermediate',
    duration: '10 weeks',
    price: 399,
    rating: 4.7,
    students: 1680
  },
  {
    id: 5,
    title: 'Introduction to Programming',
    description: 'Start your coding journey with programming fundamentals and best practices.',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    level: 'Beginner',
    duration: '8 weeks',
    price: 249,
    rating: 4.5,
    students: 3200
  },
  {
    id: 6,
    title: 'Machine Learning',
    description: 'Explore algorithms and build real-world machine learning models.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    level: 'Advanced',
    duration: '14 weeks',
    price: 599,
    rating: 4.9,
    students: 1450
  }
];
