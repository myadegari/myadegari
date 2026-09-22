import type { Lang, PortfolioContent } from "@/lib/types";

const en: PortfolioContent = {
  profile: {
    name: "Mohammadmehdi Yadegarifard",
    initials: "MY",
    headline:
      "Fullstack Developer | FastAPI, Nextjs, TypeScript & Design Systems",
    location: "Tehran, Iran",
    about:
      "Fullstack developer focused on FastAPI, Next.js, TypeScript, and design systems. I care about clean component APIs, consistent UI architecture, and shipping interfaces that feel effortless on every device. Recently focused on React, Python, and performance-minded web applications.",
    email: "mehdi@example.com",
    phone: "+98 912 000 0000",
    website: "mehdiyadegari.dev",
    linkedin: "https://www.linkedin.com/in/mehdiyadegari",
    github: "https://github.com/mehdiyadegari",
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "FastAPI",
      "Python",
      "Tailwind CSS",
      "Design Systems",
      "GraphQL",
    ],
    languages: ["Persian (Native)", "English (Professional)"],
  },
  experience: [
    {
      role: "Senior Fullstack Developer",
      company: "Nimbus Labs",
      period: "Jan 2023 - Present",
      location: "Remote",
      bullets: [
        "Led migration of a legacy dashboard to Next.js, cutting first-load time by 40%.",
        "Built FastAPI backend services and a shared component library adopted by 4 product teams.",
        "Mentored 3 junior developers through code review and pairing.",
      ],
    },
    {
      role: "Frontend Developer",
      company: "Digico Studio",
      period: "Jul 2020 - Dec 2022",
      location: "Tehran, Iran",
      bullets: [
        "Shipped 12+ client web apps with FastAPI backends and a reusable section toolkit.",
        "Introduced automated visual regression tests, reducing UI bugs in production.",
        "Partnered with designers to turn Figma systems into documented components.",
      ],
    },
    {
      role: "Junior Fullstack Developer",
      company: "Arvan Cloud",
      period: "Sep 2018 - Jun 2020",
      location: "Tehran, Iran",
      bullets: [
        "Maintained marketing pages and internal admin tools in React and Python.",
        "Improved SEO scores across core landing pages.",
      ],
    },
  ],
  education: [
    {
      school: "University of Tehran",
      degree: "B.Sc. Computer Science",
      period: "2014 - 2018",
      detail: "Graduated with honors; focus on human-computer interaction.",
    },
    {
      school: "Sharif University of Technology",
      degree: "Software Engineering Summer School",
      period: "2017",
      detail: "Intensive program on modern web architecture.",
    },
    {
      school: "Online Learning",
      degree: "Continuous education",
      period: "2018 - Present",
      detail: "Advanced React patterns, accessibility, and design systems.",
    },
  ],
  projects: [
    {
      title: "Pulse Analytics",
      description:
        "Real-time analytics dashboard with FastAPI backend, customizable widgets, and role-based views for SaaS teams.",
      tags: ["FastAPI", "React", "TypeScript"],
      demo: "https://example.com/pulse",
      repo: "https://github.com/sara-ahmadi/pulse-analytics",
    },
    {
      title: "Kit Design System",
      description:
        "Open-source component kit with tokens, docs, and dark mode used across internal products.",
      tags: ["Design Systems", "React", "TypeScript"],
      demo: "https://example.com/kit",
      repo: "https://github.com/sara-ahmadi/kit",
    },
    {
      title: "Lingo Flashcards",
      description:
        "Spaced-repetition flashcard app with offline support and keyboard-first navigation.",
      tags: ["Next.js", "PWA", "IndexedDB"],
      demo: "https://example.com/lingo",
      repo: "https://github.com/sara-ahmadi/lingo",
    },
    {
      title: "Form Builder Pro",
      description:
        "Drag-and-drop form builder that exports accessible, schema-driven React forms.",
      tags: ["React", "Zod", "Accessibility"],
      repo: "https://github.com/sara-ahmadi/form-builder",
    },
    {
      title: "Commit Graph",
      description:
        "GitHub-style contribution heatmap component with RTL support and virtualized rendering.",
      tags: ["TypeScript", "Open Source"],
      repo: "https://github.com/sara-ahmadi/commit-graph",
    },
    {
      title: "Shoplight",
      description:
        "Headless e-commerce storefront template with instant search and image optimization.",
      tags: ["Next.js", "FastAPI", "Tailwind CSS"],
      demo: "https://example.com/shoplight",
      repo: "https://github.com/sara-ahmadi/shoplight",
    },
  ],
  certificates: [
    {
      name: "Meta Front-End Developer Professional Certificate",
      issuer: "Coursera / Meta",
      date: "2023",
      link: "https://example.com/verify/meta-frontend",
    },
    {
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2022",
      link: "https://example.com/verify/aws-clf",
    },
    {
      name: "Web Accessibility Specialist",
      issuer: "Deque University",
      date: "2023",
      link: "https://example.com/verify/deque-was",
    },
    {
      name: "Advanced TypeScript",
      issuer: "Frontend Masters",
      date: "2021",
      link: "https://example.com/verify/fem-ts",
    },
    {
      name: "FastAPI Authentication",
      issuer: "TestDriven.io",
      date: "2023",
      link: "https://example.com/verify/fastapi-auth",
    },
    {
      name: "FastAPI Authentication",
      issuer: "TestDriven.io",
      date: "2023",
      link: "https://example.com/verify/fastapi-auth",
    },
    {
      name: "Google Mobile Web Specialist",
      issuer: "Google Developers",
      date: "2020",
    },
  ],
};

const fa: PortfolioContent = {
  profile: {
    name: "محمد مهدی یادگاری‌فرد",
    initials: "م‌ی",
    headline:
      "توسعه‌دهنده فول‌استک | فست‌اپی، نکست‌جی‌اس، تایپ‌اسکریپت و سیستم‌های طراحی",
    location: "تهران، ایران",
    about:
      "توسعه‌دهنده فول‌استک با تمرکز بر فست‌اپی، نکست‌جی‌اس، تایپ‌اسکریپت و سیستم‌های طراحی. به APIهای تمیز کامپوننت‌ها، معماری یکپارچه UI و رابط‌های کاربری روان روی همه دستگاه‌ها اهمیت می‌دهم. تمرکز اخیر من روی ری‌اکت، پایتون و وب‌اپلیکیشن‌های کارآمد است.",
    email: "mehdi@example.com",
    phone: "+98 912 000 0000",
    website: "mehdiyadegari.dev",
    linkedin: "https://www.linkedin.com/in/mehdiyadegari",
    github: "https://github.com/mehdiyadegari",
    skills: [
      "ری‌اکت",
      "تایپ‌اسکریپت",
      "نکست‌جی‌اس",
      "فست‌اپی",
      "پایتون",
      "توییند CSS",
      "سیستم‌های طراحی",
      "GraphQL",
    ],
    languages: ["فارسی (زبان مادری)", "انگلیسی (حرفه‌ای)"],
  },
  experience: [
    {
      role: "توسعه‌دهنده ارشد فول‌استک",
      company: "نیمبل لبز",
      period: "ژانویه ۲۰۲۳ - تاکنون",
      location: "از راه دور",
      bullets: [
        "رهبری مهاجرت داشبورد قدیمی به نکست‌جی‌اس و کاهش زمان بارگذاری اولیه تا ۴۰ درصد.",
        "طراحی سرویس‌های بک‌اند فست‌اپی و کتابخانه مشترک کامپوننت‌ها برای ۴ تیم محصول.",
        "راهنمایی سه توسعه‌دهنده جونیور از طریق کد‌ریویو و برنامه‌نویسی جفتی.",
      ],
    },
    {
      role: "توسعه‌دهنده فول‌استک",
      company: "دیجی‌کو استودیو",
      period: "ژوئیه ۲۰۲۰ - دسامبر ۲۰۲۲",
      location: "تهران، ایران",
      bullets: [
        "تحویل بیش از ۱۲ وب‌اپ مشتریان با بک‌اند فست‌اپی و ابزارک بخش‌های قابل استفاده مجدد.",
        "راه‌اندازی تست بصری خودکار و کاهش باگ‌های رابط کاربری در محیط production.",
        "همکاری با طراحان برای تبدیل سیستم‌های Figma به کامپوننت‌های مستندشده.",
      ],
    },
    {
      role: "توسعه‌دهنده فول‌استک جونیور",
      company: "آروان کلاد",
      period: "سپتامبر ۲۰۱۸ - ژوئن ۲۰۲۰",
      location: "تهران، ایران",
      bullets: [
        "نگهداری صفحات بازاریابی و ابزارهای داخلی ادمین با ری‌اکت و پایتون.",
        "بهبود نمرات SEO در صفحات فرود اصلی.",
      ],
    },
  ],
  education: [
    {
      school: "دانشگاه تهران",
      degree: "کارشناسی علوم کامپیوتر",
      period: "۲۰۱۴ - ۲۰۱۸",
      detail: "فارغ‌التحصیل با نمره عالی؛ تمرکز بر تعامل انسان و رایانه.",
    },
    {
      school: "دانشگاه صنعتی شریف",
      degree: "دوره تابستانه مهندسی نرم‌افزار",
      period: "۲۰۱۷",
      detail: "برنامه فشرده درباره معماری مدرن وب.",
    },
    {
      school: "یادگیری آنلاین",
      degree: "آموزش مستمر",
      period: "۲۰۱۸ - تاکنون",
      detail: "الگوهای پیشرفته ری‌اکت، دسترس‌پذیری و سیستم‌های طراحی.",
    },
  ],
  projects: [
    {
      title: "پالس آنالیتیکس",
      description:
        "داشبورد تحلیل بلادرنگ با بک‌اند فست‌اپی، ویجت‌های قابل شخصی‌سازی و نماهای مبتنی بر نقش برای تیم‌های SaaS.",
      tags: ["فست‌اپی", "ری‌اکت", "تایپ‌اسکریپت"],
      demo: "https://example.com/pulse",
      repo: "https://github.com/sara-ahmadi/pulse-analytics",
    },
    {
      title: "کیت سیستم طراحی",
      description:
        "کیت متن‌باز کامپوننت‌ها با توکن‌ها، مستندات و حالت تاریک که در محصولات داخلی استفاده شد.",
      tags: ["سیستم طراحی", "ری‌اکت", "تایپ‌اسکریپت"],
      demo: "https://example.com/kit",
      repo: "https://github.com/sara-ahmadi/kit",
    },
    {
      title: "لینگو فلش‌کارت",
      description:
        "اپ فلش‌کارت با تکرار فاصله‌دار، پشتیبانی آفلاین و ناوبری با کیبورد.",
      tags: ["نکست‌جی‌اس", "PWA", "IndexedDB"],
      demo: "https://example.com/lingo",
      repo: "https://github.com/sara-ahmadi/lingo",
    },
    {
      title: "سازنده فرم حرفه‌ای",
      description:
        "سازنده فرم کشیدن و رها کردن که فرم‌های React دسترس‌پذیر و مبتنی بر اسکیما خروجی می‌دهد.",
      tags: ["ری‌اکت", "Zod", "دسترس‌پذیری"],
      repo: "https://github.com/sara-ahmadi/form-builder",
    },
    {
      title: "کامیت گراف",
      description:
        "کامپوننت نقشه مشارکت به سبک گیت‌هاب با پشتیبانی RTL و رندر مجازی.",
      tags: ["تایپ‌اسکریپت", "متن‌باز"],
      repo: "https://github.com/sara-ahmadi/commit-graph",
    },
    {
      title: "شاپ‌لایت",
      description: "قالب فروشگاه headless با جستجوی فوری و بهینه‌سازی تصاویر.",
      tags: ["نکست‌جی‌اس", "فست‌اپی", "توییند CSS"],
      demo: "https://example.com/shoplight",
      repo: "https://github.com/sara-ahmadi/shoplight",
    },
  ],
  certificates: [
    {
      name: "گواهی حرفه‌ای توسعه‌دهنده فرانت‌اند متا",
      issuer: "کورسرا / متا",
      date: "۲۰۲۳",
      link: "https://example.com/verify/meta-frontend",
    },
    {
      name: "گواهی AWS توانمندی ابری سطح پایه",
      issuer: "آمازون وب سرویس",
      date: "۲۰۲۲",
      link: "https://example.com/verify/aws-clf",
    },
    {
      name: "متخصص دسترس‌پذیری وب",
      issuer: "Deque University",
      date: "۲۰۲۳",
      link: "https://example.com/verify/deque-was",
    },
    {
      name: "تایپ‌اسکریپت پیشرفته",
      issuer: "Frontend Masters",
      date: "۲۰۲۱",
      link: "https://example.com/verify/fem-ts",
    },
    {
      name: "احراز هویت در فست‌اپی",
      issuer: "TestDriven.io",
      date: "۲۰۲۳",
      link: "https://example.com/verify/fastapi-auth",
    },
    {
      name: "احراز هویت در فست‌اپی",
      issuer: "TestDriven.io",
      date: "۲۰۲۳",
      link: "https://example.com/verify/fastapi-auth",
    },
    {
      name: "متخصص وب موبایل گوگل",
      issuer: "Google Developers",
      date: "۲۰۲۰",
    },
  ],
};

export const content: Record<Lang, PortfolioContent> = { en, fa };
