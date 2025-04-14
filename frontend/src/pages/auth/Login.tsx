import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { useLogin } from '../../hooks/useAuth';
import axios, { AxiosError } from 'axios';

import Button from '../../components/ui/Button';

// Form validation schema
const loginSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .regex(
      /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/,
      'Invalid email format (e.g., user@example.com)'
    )
    .refine(
      email => !email.includes('..') && 
               !email.startsWith('.') && 
               !email.startsWith('-') &&
               !email.includes('@-') &&
               !email.endsWith('.'),
      {
        message: 'Contains invalid character sequence'
      }
    ),
  password: z.string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be less than 32 characters'),
  rememberMe: z.boolean().optional().default(false)
});

type LoginFormData = z.infer<typeof loginSchema>;

// Define the error response type
interface ApiErrorResponse {
  message?: string;
  error?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  // Get full mutation object from useLogin hook
  const mutation = useLogin();
  
  // Destructure needed properties
  const { mutate, isError, isPending, error: loginError } = mutation;

  // Initialize form with strict validation
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    trigger, // To manually trigger validation
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    mode: 'onChange', // Validate on every change
    reValidateMode: 'onChange',
  });

  // Handle API errors
  // Handle API errors
React.useEffect(() => {
  if (isError && loginError) {
    let errorMessage = 'An unexpected error occurred';
    
    // Check if it's an Axios error with response data
    if (axios.isAxiosError<ApiErrorResponse>(loginError)) {
      const serverError = loginError.response?.data;
      errorMessage = serverError?.message || serverError?.error || loginError.message;
    } else if (loginError instanceof Error) {
      // Handle non-Axios errors
      errorMessage = loginError.message;
    }
    
    setError(errorMessage);
    
    // Auto-clear error after a delay
    const timer = setTimeout(() => {
      if (mutation.reset) {
        mutation.reset();
        setError(null);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }
}, [isError, loginError, mutation]);

  // Debug logging for validation issues
  React.useEffect(() => {
    console.log('Current form errors:', errors);
  }, [errors]);

  const onSubmit = async (data: LoginFormData) => {
    console.log('Form submitted with data:', data);
    setError(null);
    
    // Verify validation before proceeding
    const isValid = await trigger();
    if (!isValid) {
      console.log('Validation failed, not submitting');
      return;
    }
    
    const credentials = {
      email: data.email,
      password: data.password
    };
    
    if (data.rememberMe) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.removeItem('rememberMe');
    }
    
    mutate(credentials, {
      onSuccess: () => {
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>
        
        {/* API Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Email address"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Password"
                  {...register('password')}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                {...register('rememberMe')}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <Link to="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              variant="primary"
              size="lg"
              isLoading={isPending || isSubmitting}
              icon={<FaSignInAlt />}
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;