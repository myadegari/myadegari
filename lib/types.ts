export type Lang = "en" | "fa";

/**
 * Skill area a certificate belongs to. Certificates are language-neutral, so
 * the id is the shared key and labels live in `@/lib/certificate-fields`.
 */
export type CertFieldId =
  | "deep-learning"
  | "llm-genai"
  | "machine-learning"
  | "rl-agents"
  | "software-engineering"
  | "ai-engineering";

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
  field: CertFieldId;
  link?: string;
  credentialId?: string;
}

export interface ProfileInfo {
  name: string;
  initials: string;
  headline: string;
  location: string;
  about: string;
  email: string;
  telegram: string;
  /**
   * Optional. The site does not link to itself, so this is normally unset and
   * the hero, right rail and footer omit the link entirely.
   */
  website?: string;
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
