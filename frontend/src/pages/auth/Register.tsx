import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaUserPlus } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/FormElements';

// Form validation schema
const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
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
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type RegisterFormData = z.infer<typeof registerSchema>;

// Define the error response type
interface ApiErrorResponse {
  message?: string;
  error?: string;
  errors?: {
    [key: string]: string[];
  };
}

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  
  // Use the register registerhook hook
  const {register:registerhook} = useAuth();
  const { mutate, isPending, error: registerError } = registerhook;

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false
    }
  });

  // Handle API errors
  React.useEffect(() => {
    if (registerError) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (axios.isAxiosError<ApiErrorResponse>(registerError)) {
        const serverError = registerError.response?.data;
        errorMessage = serverError?.message || 
                      serverError?.error || 
                      registerError.message;
      } else if (registerError instanceof Error) {
        errorMessage = registerError.message;
      }
      
      setError(errorMessage);
      
      // Auto-clear error after a delay
      const timer = setTimeout(() => {
        if (registerhook.reset) {
          registerhook.reset();
          setError(null);
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [registerError, registerhook]);

  const onSubmit = (data: RegisterFormData) => {
    setError(null);
    
    // Prepare user data for the API
    const userData = {
      name: data.fullName,
      email: data.email,
      password: data.password
    };

    mutate(userData, {
      onSuccess: () => {
        navigate('/auth/login', { 
          state: { 
            message: 'Registration successful! Please log in.',
            email: data.email // Optional: pre-fill email in login
          } 
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
        
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
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <Input
              id="fullName"
              type="text"
              placeholder="Full Name"
              leftIcon={<FaUser className="text-gray-400" />}
              label="Full Name"
              error={errors.fullName?.message}
              {...register('fullName')}
            />
            
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              leftIcon={<FaEnvelope className="text-gray-400" />}
              label="Email Address"
              error={errors.email?.message}
              {...register('email')}
            />
            
            <Input
              id="password"
              type="password"
              placeholder="Password"
              leftIcon={<FaLock className="text-gray-400" />}
              label="Password"
              error={errors.password?.message}
              helperText="Must be at least 8 characters with uppercase, lowercase, and number"
              {...register('password')}
            />
            
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              leftIcon={<FaLock className="text-gray-400" />}
              label="Confirm Password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>

          <div>
            <Checkbox
              id="terms"
              label={
                <span>
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </Link>
                </span>
              }
              error={errors.termsAccepted?.message}
              {...register('termsAccepted')}
            />
          </div>

          <div>
            <Button
              type="submit"
              fullWidth
              variant="primary"
              size="lg"
              isLoading={isPending}
              icon={<FaUserPlus />}
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;