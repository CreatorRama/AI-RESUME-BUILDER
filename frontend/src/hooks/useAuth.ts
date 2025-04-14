import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authAPI } from '../api/endpoints'; // Adjust the import path as needed
import { ProfileData, Credentials, UserData } from '../types'; // Adjust the import path as needed

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const,
  tokens: () => [...authKeys.all, 'tokens'] as const,
  user: () => [...authKeys.all, 'user'] as const,
  session: () => [...authKeys.all, 'session'] as const,
  credentials: () => [...authKeys.all, 'credentials'] as const,
};

// Registration hook
export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: UserData) => authAPI.register(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
};

// Login hook
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  // Use the full mutation result to access the reset function
  const mutation = useMutation({
    mutationFn: (credentials: Credentials) => authAPI.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    },
  });
  
  // Return the full mutation object which includes reset
  return mutation;
};

// Refresh token hook
export const useRefreshToken = () => {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: () => authAPI.refreshToken(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.tokens() });
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
    onError: (error) => {
      console.error('Manual token refresh failed:', error);
    }
  });
  
  return mutation;
};

// Forgot password hook
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) => authAPI.forgotPassword(email),
  });
};

// Reset password hook
export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ token, newPassword }: { token: string; newPassword: string }) => 
      authAPI.resetPassword(token, newPassword),
  });
};

// Get profile hook
export const useProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: () => authAPI.getProfile(),
    // If you're using cookies exclusively, remove localStorage check
    enabled: true,
  });
};

// Update profile hook
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (profileData: ProfileData) => authAPI.updateProfile(profileData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
};