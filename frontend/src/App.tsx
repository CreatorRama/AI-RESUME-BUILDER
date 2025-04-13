// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Main Pages
// import Dashboard from './pages/dashboard/Dashboard';
// import ResumesPage from './pages/resume/ResumesPage';
// import ResumeBuilderPage from './pages/resume/ResumeBuilderPage';
// import ResumeDetailPage from './pages/resume/ResumeDetailPage';
// ... import other pages

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="auth//register" element={<Register />} />
            <Route path="auth/forgot-password" element={<ForgotPassword />} />
            
            {/* Protected Routes */}
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              
              {/* Resume Routes
              <Route path="/resumes" element={<ResumesPage />} />
              <Route path="/resumes/new" element={<ResumeBuilderPage />} />
              <Route path="/resumes/:id" element={<ResumeDetailPage />} />
              <Route path="/resumes/:id/edit" element={<ResumeBuilderPage />} />
               */}
              {/* Add other routes... */}
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;