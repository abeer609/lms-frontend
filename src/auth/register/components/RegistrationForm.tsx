import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { client } from '../../../client';
import { AxiosError } from 'axios';
// import { Eye, EyeOff, Loader2, User, Mail, Lock, UserCheck } from 'lucide-react';

// Validation schema using Zod
const registrationSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces'),
  role: z.enum(['STUDENT', 'TEACHER']),
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string()
    .min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  onSwitchToLogin?: () => void;
}

interface RegistrationError{
  email: string[],
  role: string[],
  password: string[],
}

const RegistrationForm: React.FC<RegistrationFormProps> = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [regErrors, setRegErrors] = useState<RegistrationError>({} as RegistrationError);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    watch,
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
  });

  const watchedPassword = watch('password');

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call to backend
      const response = await client.post('/auth/users/', {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
          role: data.role,
      });
      navigate("/login")
      
      // Show success message
      alert('Registration successful! Please check your email to verify your account.');
      
      reset();

      
    } catch (error) {
      if(error instanceof AxiosError){
        setRegErrors(error.response?.data)
      }
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldName: keyof RegistrationFormData) => {
    return errors[fieldName]?.message;
  };

  const isFieldValid = (fieldName: keyof RegistrationFormData) => {
    return touchedFields[fieldName] && !errors[fieldName];
  };

  const getInputClassName = (fieldName: keyof RegistrationFormData) => {
    const baseClasses = "mt-2 block w-full rounded-md bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors";
    
    if (errors[fieldName]) {
      return `${baseClasses} border border-red-500 focus:ring-red-500`;
    } else if (isFieldValid(fieldName)) {
      return `${baseClasses} border border-green-500 focus:ring-green-500`;
    } else {
      return `${baseClasses} focus:ring-indigo-500`;
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-4xl font-extrabold tracking-wide">
          <span className="text-indigo-400">Edu</span>
          <span className="text-white">LMS</span>
        </h1>
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
          Create a new account
        </h2>
      </div>

      {/* Registration Form */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-gray-800  px-6 py-12 shadow sm:rounded-lg ">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* First Name / Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-200">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className={getInputClassName('firstName')}
                  disabled={isSubmitting}
                  {...register('firstName')}
                />
                {getFieldError('firstName') && (
                  <p className="mt-1 text-sm text-red-400">{getFieldError('firstName')}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-200">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className={getInputClassName('lastName')}
                  disabled={isSubmitting}
                  {...register('lastName')}
                />
                {getFieldError('lastName') && (
                  <p className="mt-1 text-sm text-red-400">{getFieldError('lastName')}</p>
                )}
              </div>
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-200">
                Role
              </label>
              <select
                className={getInputClassName('role')}
                disabled={isSubmitting}
                {...register('role')}
              >
                <option value="">Select your role</option>
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Teacher</option>
              </select>
              {getFieldError('role') && (
                <p className="mt-1 text-sm text-red-400">{getFieldError('role')}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={getInputClassName('email')}
                disabled={isSubmitting}
                {...register('email')}
              />
              {getFieldError('email') && (
                <p className="mt-1 text-sm text-red-400">{getFieldError('email')}</p>
              )}
              {regErrors.email && regErrors.email.map((msg, i) => (
                <p key={i} style={{ color: "red" }}>{msg}</p>
              ))}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`${getInputClassName('password')} pr-10`}
                  disabled={isSubmitting}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200 transition-colors"
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {getFieldError('password') && (
                <p className="mt-1 text-sm text-red-400">{getFieldError('password')}</p>
              )}
              
              {/* Password strength indicator */}
              {watchedPassword && (
                <div className="mt-2">
                  <div className="text-xs text-gray-400 mb-1">Password strength:</div>
                  <div className="flex space-x-1">
                    <div className={`h-1 w-1/4 rounded ${watchedPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <div className={`h-1 w-1/4 rounded ${/[A-Z]/.test(watchedPassword) ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <div className={`h-1 w-1/4 rounded ${/[a-z]/.test(watchedPassword) ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <div className={`h-1 w-1/4 rounded ${/\d/.test(watchedPassword) ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className={`${getInputClassName('confirmPassword')} pr-10`}
                  disabled={isSubmitting}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200 transition-colors"
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {getFieldError('confirmPassword') && (
                <p className="mt-1 text-sm text-red-400">{getFieldError('confirmPassword')}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="w-full flex justify-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Register'
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
