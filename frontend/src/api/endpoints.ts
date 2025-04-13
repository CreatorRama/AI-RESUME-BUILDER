import { apiClient } from './client';
import type {
  UserData,
  Credentials,
  ProfileData,
  ResumeData,
  CoverLetterData,
  PortfolioData,
  ProjectData,
  TaskData,
  Filters,
} from '../types';

// --- Auth Endpoints ---
export const authAPI = {
  register: (userData: UserData) => apiClient.post('api/auth/register', userData,
  ),
  login: (credentials: Credentials) => apiClient.post('api/auth/login', credentials),
  refreshToken: () => apiClient.post('api/auth/refresh-token'),
  forgotPassword: (email: string) => apiClient.post('api/auth/forgot-password', { email }),
  resetPassword: (token: string, newPassword: string) =>
    apiClient.post('api/auth/reset-password', { token, newPassword }),
  getProfile: () => apiClient.get('api/auth/profile'),
  updateProfile: (profileData: ProfileData) => apiClient.put('api/auth/profile', profileData),
};

// --- Resume Endpoints ---
export const resumeAPI = {
  getAll: () => apiClient.get('/resumes'),
  getById: (id: string) => apiClient.get(`/resumes/${id}`),
  create: (resumeData: ResumeData) => apiClient.post('/resumes', resumeData),
  update: (id: string, resumeData: ResumeData) => apiClient.put(`/resumes/${id}`, resumeData),
  delete: (id: string) => apiClient.delete(`/resumes/${id}`),
  score: (id: string) => apiClient.get(`/resumes/${id}/score`),
  generateFromLinkedIn: (linkedInUrl: string) =>
    apiClient.post('/resumes/generate-from-linkedin', { linkedInUrl }),
  aiEnhance: (id: string, sectionToEnhance: string) =>
    apiClient.post(`/resumes/${id}/enhance`, { section: sectionToEnhance }),
  export: (id: string, format: string) =>
    apiClient.get(`/resumes/${id}/export`, { params: { format }, responseType: 'blob' }),
};

// --- Cover Letter Endpoints ---
export const coverLetterAPI = {
  getAll: () => apiClient.get('/cover-letters'),
  getById: (id: string) => apiClient.get(`/cover-letters/${id}`),
  create: (data: CoverLetterData) => apiClient.post('/cover-letters', data),
  update: (id: string, data: CoverLetterData) => apiClient.put(`/cover-letters/${id}`, data),
  delete: (id: string) => apiClient.delete(`/cover-letters/${id}`),
  generateFromResume: (resumeId: string, jobDescription: string) =>
    apiClient.post('/cover-letters/generate', { resumeId, jobDescription }),
  export: (id: string, format: string) =>
    apiClient.get(`/cover-letters/${id}/export`, { params: { format }, responseType: 'blob' }),
};

// --- Portfolio Endpoints ---
export const portfolioAPI = {
  getAll: () => apiClient.get('/portfolios'),
  getById: (id: string) => apiClient.get(`/portfolios/${id}`),
  create: (data: PortfolioData) => apiClient.post('/portfolios', data),
  update: (id: string, data: PortfolioData) => apiClient.put(`/portfolios/${id}`, data),
  delete: (id: string) => apiClient.delete(`/portfolios/${id}`),
  addProject: (portfolioId: string, data: ProjectData) =>
    apiClient.post(`/portfolios/${portfolioId}/projects`, data),
  updateProject: (portfolioId: string, projectId: string, data: ProjectData) =>
    apiClient.put(`/portfolios/${portfolioId}/projects/${projectId}`, data),
  deleteProject: (portfolioId: string, projectId: string) =>
    apiClient.delete(`/portfolios/${portfolioId}/projects/${projectId}`),
  publish: (id: string) => apiClient.post(`/portfolios/${id}/publish`),
  getPublicUrl: (id: string) => apiClient.get(`/portfolios/${id}/public-url`),
};

// --- Job Matching Endpoints ---
export const jobMatchingAPI = {
  getMatches: (resumeId: string, filters: Filters) =>
    apiClient.get(`/jobs/matches`, { params: { resumeId, ...filters } }),
  getJobDetails: (jobId: string) => apiClient.get(`/jobs/${jobId}`),
  analyzeMatch: (resumeId: string, jobId: string) =>
    apiClient.get(`/jobs/analyze-match`, { params: { resumeId, jobId } }),
  saveJob: (jobId: string) => apiClient.post(`/jobs/${jobId}/save`),
  unsaveJob: (jobId: string) => apiClient.delete(`/jobs/${jobId}/save`),
  getSavedJobs: () => apiClient.get('/jobs/saved'),
  trackApplication: (jobId: string, data: any) =>  // Define type if known
    apiClient.post(`/jobs/${jobId}/track-application`, data),
  getApplications: () => apiClient.get('/jobs/applications'),
};

// --- Interview Prep Endpoints ---
export const interviewAPI = {
  generateQuestions: (resumeId: string, jobDescription: string) =>
    apiClient.post('/interview/generate-questions', { resumeId, jobDescription }),
  saveQuestions: (interviewId: string, questions: string[]) =>
    apiClient.post(`/interview/${interviewId}/questions`, { questions }),
  generateAnswers: (interviewId: string, questionId: string) =>
    apiClient.post(`/interview/${interviewId}/generate-answer`, { questionId }),
  saveAnswers: (interviewId: string, questionId: string, answer: string) =>
    apiClient.post(`/interview/${interviewId}/answers`, { questionId, answer }),
  getAllInterviews: () => apiClient.get('/interview'),
  getInterviewById: (id: string) => apiClient.get(`/interview/${id}`),
  deleteInterview: (id: string) => apiClient.delete(`/interview/${id}`),
};

// --- LinkedIn Optimization Endpoints ---
export const linkedinAPI = {
  analyzeProfile: (linkedInUrl: string) =>
    apiClient.post('/linkedin/analyze', { linkedInUrl }),
  generateSummary: (resumeId: string) =>
    apiClient.post('/linkedin/generate-summary', { resumeId }),
  generateHeadline: (resumeId: string) =>
    apiClient.post('/linkedin/generate-headline', { resumeId }),
  optimizeSection: (section: string, content: string) =>
    apiClient.post('/linkedin/optimize-section', { section, content }),
};

// --- Dashboard Endpoints ---
export const dashboardAPI = {
  getStats: () => apiClient.get('/dashboard/stats'),
  getActivity: () => apiClient.get('/dashboard/activity'),
  getTasks: () => apiClient.get('/dashboard/tasks'),
  createTask: (data: TaskData) => apiClient.post('/dashboard/tasks', data),
  updateTask: (id: string, data: TaskData) => apiClient.put(`/dashboard/tasks/${id}`, data),
  deleteTask: (id: string) => apiClient.delete(`/dashboard/tasks/${id}`),
};
