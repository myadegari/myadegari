import type { Lang } from "@/lib/types";

export interface UiStrings {
  navAbout: string;
  navExperience: string;
  navEducation: string;
  navProjects: string;
  navCertificates: string;
  navContact: string;
  navHome: string;
  menu: string;
  closeMenu: string;
  downloadCv: string;
  contactMe: string;
  emailMe: string;
  aboutTitle: string;
  experienceTitle: string;
  educationTitle: string;
  projectsTitle: string;
  certificatesTitle: string;
  contactTitle: string;
  contactLead: string;
  skillsTitle: string;
  languagesTitle: string;
  quickContactTitle: string;
  allFilter: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  sendButton: string;
  sendingNote: string;
  errName: string;
  errEmail: string;
  errEmailFormat: string;
  errMessage: string;
  formSuccess: string;
  formHint: string;
  present: string;
  viewDemo: string;
  viewRepo: string;
  verify: string;
  website: string;
  switchToFa: string;
  switchToEn: string;
  themeLight: string;
  themeDark: string;
  openToWork: string;
  viewAll: string;
  viewDetails: string;
  backToHome: string;
  backToProjects: string;
  searchProjects: string;
  searchCertificates: string;
  searchPlaceholder: string;
  noResults: string;
  clearFilters: string;
  overviewTitle: string;
  featuresTitle: string;
  techStackTitle: string;
  roleTitle: string;
  challengesTitle: string;
  galleryTitle: string;
  projectNotFound: string;
  projectNotFoundLead: string;
  prevProject: string;
  nextProject: string;
  showingCount: string;
  credentialId: string;
  credlyProfile: string;
}

const en: UiStrings = {
  navAbout: "About",
  navExperience: "Experience",
  navEducation: "Education",
  navProjects: "Projects",
  navCertificates: "Certificates",
  navContact: "Contact",
  navHome: "Home",
  menu: "Menu",
  closeMenu: "Close menu",
  downloadCv: "Download CV",
  contactMe: "Contact me",
  emailMe: "Email me",
  aboutTitle: "About",
  experienceTitle: "Experience",
  educationTitle: "Education",
  projectsTitle: "Projects",
  certificatesTitle: "Certificates",
  contactTitle: "Contact",
  contactLead:
    "Have a role, collaboration, or question in mind? Send a message and it will open in your email app.",
  skillsTitle: "Skills",
  languagesTitle: "Languages",
  quickContactTitle: "Contact info",
  allFilter: "All",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  emailLabel: "Email",
  emailPlaceholder: "you@example.com",
  messageLabel: "Message",
  messagePlaceholder: "Tell me a little about your project or role...",
  sendButton: "Send message",
  sendingNote: "Opens your default email app",
  errName: "Please enter your name",
  errEmail: "Please enter your email",
  errEmailFormat: "Please enter a valid email address",
  errMessage: "Please write a message (at least 10 characters)",
  formSuccess: "Opening your email app with the message prepared...",
  formHint: "Your email app will open with everything filled in.",
  present: "Present",
  viewDemo: "Live demo",
  viewRepo: "Source code",
  verify: "Verify",
  website: "Website",
  switchToFa: "فارسی",
  switchToEn: "English",
  themeLight: "Light mode",
  themeDark: "Dark mode",
  openToWork: "Open to work",
  viewAll: "View all",
  viewDetails: "View details",
  backToHome: "Back to home",
  backToProjects: "Back to projects",
  searchProjects: "Search projects",
  searchCertificates: "Search certificates",
  searchPlaceholder: "Type to search...",
  noResults: "No results found.",
  clearFilters: "Clear filters",
  overviewTitle: "Overview",
  featuresTitle: "Key features",
  techStackTitle: "Tech stack",
  roleTitle: "My role",
  challengesTitle: "Challenges",
  galleryTitle: "Gallery",
  projectNotFound: "Project not found",
  projectNotFoundLead: "The project you are looking for does not exist.",
  prevProject: "Previous project",
  nextProject: "Next project",
  showingCount: "Showing",
  credentialId: "Credential ID",
  credlyProfile: "Credly profile",
};

const fa: UiStrings = {
  navAbout: "درباره من",
  navExperience: "سوابق کاری",
  navEducation: "تحصیلات",
  navProjects: "پروژه‌ها",
  navCertificates: "گواهی‌نامه‌ها",
  navContact: "تماس",
  navHome: "خانه",
  menu: "منو",
  closeMenu: "بستن منو",
  downloadCv: "دانلود رزومه",
  contactMe: "تماس با من",
  emailMe: "ایمیل بزنید",
  aboutTitle: "درباره من",
  experienceTitle: "سوابق کاری",
  educationTitle: "تحصیلات",
  projectsTitle: "پروژه‌ها",
  certificatesTitle: "گواهی‌نامه‌ها",
  contactTitle: "تماس",
  contactLead:
    "پیشنهاد همکاری، پروژه یا سوالی دارید؟ پیام بفرستید؛ پیام در برنامه ایمیل شما باز می‌شود.",
  skillsTitle: "مهارت‌ها",
  languagesTitle: "زبان‌ها",
  quickContactTitle: "اطلاعات تماس",
  allFilter: "همه",
  nameLabel: "نام",
  namePlaceholder: "نام شما",
  emailLabel: "ایمیل",
  emailPlaceholder: "you@example.com",
  messageLabel: "پیام",
  messagePlaceholder: "در مورد پروژه یا موقعیت شغلی مورد نظرتان بنویسید...",
  sendButton: "ارسال پیام",
  sendingNote: "ایمیل شما باز خواهد شد",
  errName: "لطفاً نام خود را وارد کنید",
  errEmail: "لطفاً ایمیل خود را وارد کنید",
  errEmailFormat: "لطفاً یک ایمیل معتبر وارد کنید",
  errMessage: "لطفاً پیامی بنویسید (حداقل ۱۰ نویسه)",
  formSuccess: "برنامه ایمیل شما با پیام آماده باز می‌شود...",
  formHint: "برنامه ایمیل شما باز می‌شود و همه چیز از قبل پر شده است.",
  present: "تاکنون",
  viewDemo: "نمایش زنده",
  viewRepo: "کد منبع",
  verify: "استعلام",
  website: "وب‌سایت",
  switchToFa: "فارسی",
  switchToEn: "English",
  themeLight: "حالت روشن",
  themeDark: "حالت تاریک",
  openToWork: "آماده همکاری",
  viewAll: "مشاهده همه",
  viewDetails: "جزئیات پروژه",
  backToHome: "بازگشت به خانه",
  backToProjects: "بازگشت به پروژه‌ها",
  searchProjects: "جستجوی پروژه‌ها",
  searchCertificates: "جستجوی گواهی‌نامه‌ها",
  searchPlaceholder: "برای جستجو بنویسید...",
  noResults: "نتیجه‌ای پیدا نشد.",
  clearFilters: "پاک کردن فیلترها",
  overviewTitle: "معرفی",
  featuresTitle: "ویژگی‌های کلیدی",
  techStackTitle: "تکنولوژی‌ها",
  roleTitle: "نقش من",
  challengesTitle: "چالش‌ها",
  galleryTitle: "گالری",
  projectNotFound: "پروژه پیدا نشد",
  projectNotFoundLead: "پروژه‌ای که دنبال آن هستید وجود ندارد.",
  prevProject: "پروژه قبلی",
  nextProject: "پروژه بعدی",
  showingCount: "نمایش",
  credentialId: "شناسه گواهی",
  credlyProfile: "پروفایل Credly",
};

export const strings: Record<Lang, UiStrings> = { en, fa };
