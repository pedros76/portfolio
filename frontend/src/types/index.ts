export type ProjectCategory = 'all' | 'fullstack' | 'frontend' | 'backend' | 'networking';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  features: string[];
  architecture?: string[];
  challenges?: string[];
  lessonsLearned?: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  specialization: string;
  period: string;
  status: string;
  coursework: string[];
  highlights: string[];
}

export interface SkillItem {
  name: string;
  level: number; // 0 - 100
  iconName?: string;
  category: 'programming' | 'frontend' | 'backend' | 'databases' | 'networking' | 'tools';
  highlight?: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  credentialId?: string;
  description: string;
  skills: string[];
  icon: string;
  verifyUrl?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  position: string;
  organization: string;
  content: string;
  avatarText: string;
  rating: number;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  link: string;
}
