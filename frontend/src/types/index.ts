// types/index.ts
export interface UserData {
  email: string;
  password: string;
  name:string
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

export interface ResumeData {
  title: string;
  basics: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    summary: string;
  };
  education: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate?: string;
    gpa?: string;
    courses?: string[];
  }>;
  work: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    summary: string;
    highlights: string[];
  }>;
  skills: Array<{
    name: string;
    level?: string;
    keywords?: string[];
  }>;
  // Add other resume sections as needed
}

export interface CoverLetterData {
  title: string;
  resumeId?: string;
  jobDescription?: string;
  content: string;
  recipient?: {
    name?: string;
    company?: string;
    address?: string;
  };
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

// Add other type definitions as needed