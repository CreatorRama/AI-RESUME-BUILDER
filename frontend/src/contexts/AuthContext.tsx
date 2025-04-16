// contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  useLogin as useLoginHook,
  useRegister as useRegisterHook,
  useProfile as useProfileHook,
  useForgotPassword as useForgotPasswordHook,
  useResetPassword as useResetPasswordHook,
  useUpdateProfile as useUpdateProfileHook,
  useRefreshToken as useRefreshTokenHook
} from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import type { Dispatch, SetStateAction } from 'react';
interface User {
  id: string;
  email: string;
  name: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  isAuthenticated: boolean;
  login: ReturnType<typeof useLoginHook>;
  register: ReturnType<typeof useRegisterHook>;
  logout: () => void;
  forgotPassword: ReturnType<typeof useForgotPasswordHook>;
  refreshToken: ReturnType<typeof useRefreshTokenHook>;
  getProfile: ReturnType<typeof useProfileHook>;
  updateProfile: ReturnType<typeof useUpdateProfileHook>;
  resetPassword: ReturnType<typeof useResetPasswordHook>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize the React Query hooks
  const loginMutation = useLoginHook();
  const registerMutation = useRegisterHook();
  const profileQuery = useProfileHook();
  const forgotPasswordMutation = useForgotPasswordHook();
  const resetPasswordMutation = useResetPasswordHook();
  const updateProfileMutation = useUpdateProfileHook();
  const refreshTokenMutation = useRefreshTokenHook();
  
  // Update user state when profile data changes
  useEffect(() => {
    if (profileQuery.data?.data) {
      setUser(profileQuery.data.data);
      setLoading(false);
    } else if (profileQuery.isError) {
      setUser(null);
      setLoading(false);
    }
  }, [profileQuery.data, profileQuery.isError]);

  // Update auth state after login success
  useEffect(() => {
    if (loginMutation.data?.data?.user) {
      setUser(loginMutation.data.data.user);
    }
  }, [loginMutation.data]);

  // Update auth state after registration success
  useEffect(() => {
    if (registerMutation.data?.data?.user) {
      setUser(registerMutation.data.data.user);
    }
  }, [registerMutation.data]);

  // For debugging
  useEffect(() => {
    console.log("Auth state:", { 
      user, 
      isAuthenticated: localStorage.getItem('isAuthenticated'), 
      loading, 
      profileIsLoading: profileQuery.isLoading
    });
  }, [user, loading, profileQuery.isLoading]);
  
  const navigate=useNavigate()
  
  const loggingout=()=>{
    localStorage.removeItem('isAuthenticated')
    setUser(null);
    // window.location.href = '/auth/login';
    navigate('/auth/login',{replace:true});
  }

  localStorage.setItem("isAuthenticated",JSON.stringify(true))
  // Expose the React Query hooks through the context
  const value = {
    user,
    loading: loading || profileQuery.isLoading,
    isAuthenticated:localStorage.getItem('isAuthenticated')=='true',
    login: loginMutation,
    register: registerMutation,
    logout:loggingout,
    forgotPassword: forgotPasswordMutation,
    resetPassword: resetPasswordMutation,
    getProfile: profileQuery,
    updateProfile: updateProfileMutation,
    refreshToken: refreshTokenMutation,
    setLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};