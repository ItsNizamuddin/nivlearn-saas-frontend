/**
 * Common TypeScript interfaces and types
 */

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  duration?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  price?: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImage?: string;
  publishedAt: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  courseInterest?: string;
  message?: string;
}

