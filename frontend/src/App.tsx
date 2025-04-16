// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import ResumeLayout from './components/layout/ResumeLayout'; // Import the new ResumeLayout
import ProtectedRoute from './components/auth/ProtectedRoute';
import { StrictMode } from 'react';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import { DashboardLayout } from './components/layout';
import ResumesPage from './pages/resume/ResumesPage';
import ResumeBuilderPage from './pages/resume/ResumeBuilderPage';

// Main Pages
const Dashboard = () => {
  return <div>Dashboard Content - Under Construction</div>;
};
const ProfilePage = () => {
  return <div>User Profile - Under Construction</div>;
};

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="auth/register" element={<Register />} />
              <Route path="auth/forgot-password" element={<ForgotPassword />} />

              {/* Test route for MainLayout without ProtectedRoute */}
              <Route path="/test-layout" element={<MainLayout />}>
                <Route index element={<div>Test Content</div>} />
              </Route>

              {/* Protected Routes */}
              <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
                <Route path="/profile" element={<ProfilePage />} />
                
                {/* Resume Routes with Resume Layout */}
                <Route path="/resumes" element={<ResumeLayout />}>
                  <Route index element={<ResumesPage />} />
                  <Route path="new" element={<ResumeBuilderPage />} />
                  {/* <Route path=":id" element={<ResumeDetailPage />} /> */}
                  <Route path=":id/edit" element={<ResumeBuilderPage />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;