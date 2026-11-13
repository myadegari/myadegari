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

/**
 * One experience entry. Consecutive entries that share a `company` are grouped
 * under that company in the timeline, LinkedIn-style, so several roles (or the
 * projects a single role covered) nest beneath one company mark.
 */
/**
 * A demo or live-site link shown as a button under an experience entry.
 * `label` is localized content (e.g. "Demo" / "دمو").
 */
export interface ExperienceLink {
  label: string;
  href: string;
}

export interface ExperienceItem {
  role: string;
  /** Project or context shown under the role title. */
  note?: string;
  company: string;
  /** Key into `companyLogos`; falls back to a generic icon when absent. */
  companyKey?: string;
  /** Company-level line under its name, e.g. "Full-time · 2 yrs". */
  companyMeta?: string;
  /** Company-level date range, shown under the location line. */
  companyPeriod?: string;
  period: string;
  location: string;
  bullets?: string[];
  links?: ExperienceLink[];
}

export interface EducationItem {
  school: string;
  /** Key into `companyLogos`; falls back to a generic icon when absent. */
  schoolKey?: string;
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

/**
 * One labelled row of the skills card. Grouping keeps the card readable while
 * letting the list grow, and the label is localized per language.
 */
export interface SkillGroup {
  label: string;
  items: string[];
}

export interface ProfileInfo {
  name: string;
  initials: string;
  /** University shown as a badge beside the name; localized per language. */
  university: string;
  headline: string;
  location: string;
  about: string;
  email: string;
  telegram: string;
  /**
   * Optional. Rendered in the contact card only for visitors who arrive with
   * `?recruiter=true`, so the number is never in the server HTML.
   */
  phone?: string;
  /**
   * Optional. The site does not link to itself, so this is normally unset and
   * the hero, right rail and footer omit the link entirely.
   */
  website?: string;
  linkedin: string;
  github: string;
  skills: SkillGroup[];
  languages: string[];
}

export interface PortfolioContent {
  profile: ProfileInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  certificates: CertificateItem[];
}
