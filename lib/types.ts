export type Lang = "en" | "fa";

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  bullets?: string[];
}

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  demo?: string;
  repo?: string;
  overview?: string;
  features?: string[];
  techStack?: string[];
  role?: string;
  challenges?: string;
  gallery?: string[];
}

export interface CertificateItem {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface ProfileInfo {
  name: string;
  initials: string;
  headline: string;
  location: string;
  about: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  skills: string[];
  languages: string[];
}

export interface PortfolioContent {
  profile: ProfileInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
}
