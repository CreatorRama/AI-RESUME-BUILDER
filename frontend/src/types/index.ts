// types/index.ts
export interface UserData {
  email: string;
  password: string;
  name: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface ProfileData {
  firstName?: string;
  lastName?: string;
  title?: string;
  phone?: string;
  location?: string;
  about?: string;
  profilePicture?: string;
}

// Updated ResumeData to match the structure used in ResumeBuilderPage
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  website: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
}

export interface ResumeData {
  title: string;
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  certifications: CertificationItem[];
  coverLetter?: CoverLetterData; // Optional cover letter
}

export interface CoverLetterData {
  title: string;
  recipient: {
    name: string;
    company: string;
    position: string;
    address: string;
  };
  content: string;
  closingStatement: string;
  signature: string;
}

export interface PortfolioData {
  title: string;
  description: string;
  theme?: string;
  isPublic: boolean;
}

export interface ProjectData {
  title: string;
  description: string;
  image?: string;
  link?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
}

export interface TaskData {
  title: string;
  description?: string;
  dueDate?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface Filters {
  location?: string;
  jobType?: string[];
  remote?: boolean;
  salary?: {
    min?: number;
    max?: number;
  };
  skills?: string[];
  experience?: string;
}

// Template options type
export type ResumeTemplate = 'modern' | 'professional' | 'creative' | 'minimalist';

// Sections for the resume builder
export type ResumeSection = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'certifications' | 'coverLetter';