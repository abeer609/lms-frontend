import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { client } from '../../../client';
import { AxiosError } from 'axios';
import { load_user, login } from '../../../features/auth/authSlice';
import { useAppDispatch } from '../../../hooks';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string|undefined>('');
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    mode: 'onChange', // Validate on change for better UX
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError('');
    
    try {
      const loginResponse = await dispatch( login(data))
      if(login.fulfilled.match(loginResponse)){
        await dispatch(load_user())
      }
      if(login.rejected.match(loginResponse)){
        setServerError(loginResponse.error.message)
      }
      
      // Handle successful login
      // console.log('Login successful:', response.data);
      // navigate('/dashboard'); // or wherever you want to redirect
      
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400 || error.response?.status === 401) {
          const errorData = error.response.data;
          
          // Handle field-specific errors
          // Handle general error
          if (errorData.detail || errorData.message) {
            setServerError(errorData.detail || errorData.message);
          }
        } else {
          setServerError('An unexpected error occurred. Please try again.');
        }
      } else {
        setServerError('Network error. Please check your connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputFocus = (fieldName: keyof LoginFormData) => {
    // Clear server errors when user starts typing
    if (serverError) {
      setServerError('');
    }
    clearErrors(fieldName);
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
          Sign in to your account
        </h2>
      </div>

      {/* Login Form */}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-gray-800 px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* General Server Error */}
            {serverError && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-md">
                {serverError}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email address
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address'
                  }
                })}
                onFocus={() => handleInputFocus('email')}
                className={`mt-2 block w-full rounded-md bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
                  errors.email 
                    ? 'border border-red-500 focus:ring-red-500' 
                    : 'focus:ring-indigo-500'
                }`}
                placeholder="Enter your email"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long'
                    }
                  })}
                  onFocus={() => handleInputFocus('password')}
                  className={`mt-2 block w-full rounded-md bg-gray-900 px-3 py-2 pr-10 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 transition-colors ${
                    errors.password 
                      ? 'border border-red-500 focus:ring-red-500' 
                      : 'focus:ring-indigo-500'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-300">
                <input
                  type="checkbox"
                  {...register('remember')}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition-colors"
                  disabled={isLoading}
                />
                <span className="ml-2">Remember me</span>
              </label>

              <a
                href="#"
                className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-8 text-center text-sm text-gray-400">
            Not a member?{' '}
            <Link
              to="/register"
              className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;