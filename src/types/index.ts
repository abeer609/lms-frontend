export interface SearchFormData {
  query: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface NewsletterFormData {
  email: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface WhyChooseUsCard {
  emoji: string;
  title: string;
  description: string;
}


export interface SearchFormData {
  query: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface NewsletterFormData {
  email: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface WhyChooseUsCard {
  emoji: string;
  title: string;
  description: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  banner: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  rating: number;
  students: number;
}

export interface CourseFilterFormData {
  search: string;
}

export interface EnrollmentFormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
}
