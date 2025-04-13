// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../api/endpoints'; // Import your auth API endpoints
import type { UserData, Credentials, ProfileData } from '../types';

interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  register: (userData: UserData) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  getProfile: () => Promise<void>;
  updateProfile: (profileData: ProfileData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Try to get user profile to verify authentication
        const response = await authAPI.getProfile();
        setUser(response.data);
      } catch (err) {
        console.error('Authentication check failed:', err);
        // Token is invalid or expired
      } finally {
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const login = async (credentials: Credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.login(credentials);
      // Assuming the response includes user data
      setUser(response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: UserData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authAPI.register(userData);
      // Assuming the response includes user data
      setUser(response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Your endpoints.ts doesn't have a logout endpoint
      // You might want to add one or handle it differently
      // For now, just clear the user state
      setUser(null);
      
      // If you add a logout endpoint, you would call it like this:
      // await authAPI.logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await authAPI.forgotPassword(email);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send password reset email');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      setLoading(true);
      setError(null);
      await authAPI.resetPassword(token, newPassword);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reset password');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.getProfile();
      setUser(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to get profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: ProfileData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.updateProfile(profileData);
      setUser(response.data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    getProfile,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};