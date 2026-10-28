export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface Profile {
  _id?: string;
  name: string;
  slug: string;
  designation: string;
  headline: string;
  introduction: string;
  about: string;
  location: string;
  portrait: string;
  resumeUrl?: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  socialLinks: SocialLink[];
  availability: string;
  updatedAt?: string | Date;
}

export interface Skill {
  _id?: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools and Workflow" | string;
  icon: string;
  proficiency?: number;
  displayOrder: number;
}

export interface Education {
  _id?: string;
  qualification: string;
  institution: string;
  subject: string;
  startYear: string | number;
  endYear: string | number;
  grade?: string;
  description: string;
  displayOrder: number;
}

export interface Experience {
  _id?: string;
  title: string;
  company: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  displayOrder: number;
}

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  overview: string;
  problem: string;
  goals: string;
  features: string[];
  technologies: string[];
  category: string;
  coverImage: string;
  gallery: string[];
  role: string;
  developmentProcess: string;
  challenges: string;
  solutions: string;
  lessonsLearned: string;
  futurePlans: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ContactMessage {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  createdAt?: string | Date;
}

