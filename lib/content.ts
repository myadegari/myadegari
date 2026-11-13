import type { Lang, PortfolioContent } from "@/lib/types";
import { certificates } from "@/lib/certificates";

const en: PortfolioContent = {
  profile: {
    name: "Mohammadmehdi Yadegarifard",
    initials: "MY",
    university: "University of Tehran",
    headline:
      "Front-End Developer | React, Next.js, TypeScript & Design Systems",
    location: "Tehran, Iran",
    about:
      "Front-end developer specializing in React, Next.js, and TypeScript. I build design systems, accessible component APIs, and fast, responsive interfaces with full RTL/i18n support. I own server state with TanStack Query and tune rendering for Core Web Vitals; full-stack experience (FastAPI, PostgreSQL) lets me ship features end to end when a team needs it.",
    email: "mehyad97@gmail.com",
    telegram: "@M3hyad",
    phone: "+989217243259",
    linkedin: "https://www.linkedin.com/in/mohammadmehdiyadegarifard",
    github: "https://github.com/myadegari",
    skills: [
      {
        label: "Front-end",
        items: ["React", "Next.js", "TypeScript", "JavaScript"],
      },
      {
        label: "UI & design systems",
        items: [
          "Tailwind CSS",
          "shadcn/ui",
          "Framer Motion",
          "Design Systems",
          "Responsive Layout",
        ],
      },
      {
        label: "RTL & accessibility",
        items: ["RTL & i18n", "Accessibility (a11y)"],
      },
      {
        label: "Data & state",
        items: ["TanStack Query", "REST APIs", "State Machines"],
      },
      {
        label: "Backend & data",
        items: ["PostgreSQL", "Drizzle ORM", "FastAPI", "Python", "Docker"],
      },
      {
        label: "Quality & delivery",
        items: ["Vitest", "Playwright", "Web Performance"],
      },
    ],
    languages: ["Persian (Native)", "English (Professional)"],
  },
  experience: [
    {
      role: "Full Stack Engineer",
      note: "Nakhl-e Danesh Library System",
      company: "Larestan Higher Education Complex",
      companyKey: "larestan",
      companyMeta: "Full-time · 2 yrs",
      companyPeriod: "Nov 2024 - Oct 2026",
      period: "Project-based",
      location: "Lar, Fars Province, Iran · On-site",
      bullets: [
        "Built the entire Next.js 16 / React 19 front end — 23 pages spanning a public catalog, member dashboard, admin analytics, and RTL desk workflows — with Tailwind CSS 4, daisyUI, and Zod-validated forms.",
        "Modeled complex UI state (reservation, loan, fine, and slip lifecycles) as predictable state machines with explicit conflict feedback and role-based views via NextAuth v5.",
        "Kept the client fast and lean: removed unused dependencies, replaced string-matched errors with typed errors, and verified behavior with 16 database-backed test suites.",
        "Owned backend and deployment as a differentiator: PostgreSQL/Drizzle domain model, load-tested at 144 req/s (p99 125 ms), shipped as two Docker replicas behind Caddy.",
      ],
    },
    {
      role: "Full Stack Engineer",
      note: "Certificate Management System",
      company: "Larestan Higher Education Complex",
      companyKey: "larestan",
      companyMeta: "Full-time · 2 yrs",
      companyPeriod: "Nov 2024 - Oct 2026",
      period: "Project-based",
      location: "Lar, Fars Province, Iran · On-site",
      bullets: [
        "Built the internal certificate platform UI (Next.js + shadcn/ui) with employee training dashboards and automated Persian PDF certificate output.",
      ],
    },
    {
      role: "Front End Developer",
      note: "University Website Redesign — lar.ac.ir",
      company: "Larestan Higher Education Complex",
      companyKey: "larestan",
      companyMeta: "Full-time · 2 yrs",
      companyPeriod: "Nov 2024 - Oct 2026",
      period: "Project-based",
      location: "Lar, Fars Province, Iran · On-site",
      bullets: [
        "Designed a Tailwind CSS v4 design system (CSS-first theme, color palette, type scale) with full RTL Persian conventions and multilingual support for the official university site (lar.ac.ir).",
        "Shipped responsive React interfaces: multi-level sticky/floating navbar, hero/news sliders with directional animation, an animated faculty directory, and an educational calendar with a dynamic RTL timeline.",
        "Implemented data fetching and caching with TanStack Query over a custom PHP REST API on WordPress/ACF so content stays editor-friendly.",
      ],
    },
    {
      role: "Freelance Frontend, then Full Stack Developer",
      company: "ijaz — AI Assistant for Investment and Business",
      companyMeta: "Freelance · 1 yr",
      period: "Apr 2024 - Mar 2025",
      location: "Remote",
      bullets: [
        "Built the React front end for a ChatGPT-style assistant: Tailwind CSS, TanStack Query for server state, TanStack Table for data views, packaged with Docker.",
        "Kept the client stable through a Django-to-FastAPI backend migration by isolating server state, then continued full-stack feature work.",
        "Grew from freelance front-end to full-stack on a remote, product-focused startup team.",
      ],
    },
    {
      role: "Graduate Researcher — Sound Source Localization",
      company: "University of Tehran, Electrical and Computer Engineering",
      companyKey: "ut",
      companyMeta: "Full-time · 3 yrs",
      period: "2020 - 2023",
      location: "Tehran, Iran",
      bullets: [
        "Researched direction-of-arrival estimation and sound source localization using only ordinary smartphone microphones, targeting lightweight models for resource-constrained devices.",
        "Built Python experiment pipelines for real stereo recordings: per-channel RMS levels, azimuth mapping, and ideal panning-curve overlays.",
        "Prepared journal manuscript materials, including figures, captions, and author/disclosure statements.",
      ],
    },
  ],
  education: [
    {
      school: "University of Tehran",
      degree: "M.Sc. Computer Engineering (Computer Systems Architecture)",
      period: "2020 - 2023",
      bullets: [
        "GPA: 3.88. Defended with an excellent grade.",
        "Thesis: Voice Direction Detection Using Deep Convolutional Neural Network on A Smartphone.",
      ],
    },
    {
      school: "Shahid Bahnar University of Kerman",
      degree: "B.Sc. Electrical Engineering (Power)",
      period: "2015 - 2019",
      bullets: [
        "Bachelor's project: Fault localization in power grids with distributed generation.",
      ],
    },
  ],
  projects: [
    {
      slug: "nakhl-e-danesh",
      title: "Nakhl-e Danesh — University Library Management System",
      description:
        "Production Next.js 16 / React 19 library system: 23 pages of catalog, dashboards, and RTL desk workflows with a state-machine-driven UI; designed, built, and deployed end to end.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      demo: "https://library.mehyad.ir",
      overview:
        "Nakhl-e Danesh is a production university library system in public beta. It covers catalog, membership, reservation-to-lending workflows, policy-driven fines, and an offline debt-collection flow modeled on the university's real desk process. I designed, built, and deployed it end to end: about 26,000 lines of TypeScript, 23 pages, 11 API routes, and 16 database tables.",
      features: [
        "Catalog with hierarchical categories, per-copy barcodes, condition tracking, S3-compatible cover uploads, faceted search, and a public member-facing catalog",
        "Six-role RBAC with approval/blocking workflows, national-code and student-ID identity, and desk-verified password reset",
        "Circulation state machines for reserve, approve, issue, renew, return, and the fine lifecycle with per-category policy",
        "Offline debt collection with printable slips, sequential per-year numbering, a settlement ledger, and explicit FINES_CHANGED conflict detection",
        "Excel import/export with per-row error reports, audit log with before/after snapshots, notification center, and analytics dashboard",
        "Load-tested at 144 req/s, p50 35 ms / p99 125 ms, zero errors under a 1,000-concurrent-user model; 16 database-backed test suites",
      ],
      techStack: [
        "TypeScript",
        "Next.js 16",
        "React 19",
        "PostgreSQL 16",
        "Drizzle ORM",
        "NextAuth v5",
        "Zod",
        "Tailwind CSS 4",
        "daisyUI",
        "Docker",
        "Caddy",
      ],
      role: "Sole engineer — owned the Next.js/React front end end to end, plus domain model, tests, and deployment.",
      challenges:
        "Rendering concurrent desk workflows without confusing users: modeled reservation/loan/fine/slip lifecycles as state machines so the UI always shows a valid state, surfaced explicit FINES_CHANGED conflict feedback instead of silent failures, and kept the client lean by dropping unused dependencies. Transactional row locks and conditional writes on the backend back those UI guarantees.",
      gallery: [
        "/projects/nakhl-e-danesh/home.png",
        "/projects/nakhl-e-danesh/books-list.png",
        "/projects/nakhl-e-danesh/book-detail.png",
        "/projects/nakhl-e-danesh/category.png",
        "/projects/nakhl-e-danesh/admin-dashboard.png",
        "/projects/nakhl-e-danesh/admin-panel.png",
        "/projects/nakhl-e-danesh/loan-history.png",
        "/projects/nakhl-e-danesh/fines.png",
        "/projects/nakhl-e-danesh/login.png",
        "/projects/nakhl-e-danesh/register.png",
      ],
    },
    {
      slug: "certificate-management-system",
      title: "Certificate Management System",
      description:
        "Next.js + shadcn/ui internal platform: enrollment workflows, employee training dashboards, and automated Persian PDF certificates.",
      tags: ["Next.js", "shadcn/ui", "Tailwind CSS", "FastAPI"],
      demo: "https://govahyar.mehyad.ir",
      overview:
        "The system replaced paper sign-up sheets, manual Excel entry, and Word mail-merge certificate production. Administrators create courses and enroll personnel, each department gets its own certificate numbering, certificates are generated automatically, and employees see their certificates and total training time on a personal dashboard.",
      features: [
        "Course creation and personnel enrollment with department-specific certificate numbering",
        "Automated Persian PDF certificate generation from PowerPoint templates via Jinja2 and LibreOffice",
        "RabbitMQ queueing and pipelined generation requests",
        "Employee dashboard with certificates and total training time",
        "Next.js + shadcn/ui client with MongoDB data storage",
      ],
      techStack: [
        "Next.js",
        "Tailwind CSS",
        "shadcn/ui",
        "FastAPI",
        "WeasyPrint",
        "Jinja2",
        "RabbitMQ",
        "MongoDB",
        "Alarik",
      ],
      role: "Full stack — Next.js/shadcn client and training dashboard, plus the FastAPI PDF microservice.",
      challenges:
        "Presenting a clean enrollment-to-certificate workflow and a personal training dashboard while Persian PDF output had to preserve typography and department numbering. Built the Next.js + shadcn/ui client and a queued FastAPI rendering microservice behind a single workflow.",
      gallery: [
        "/projects/certificate-management-system/dashboard.png",
        "/projects/certificate-management-system/courses.png",
        "/projects/certificate-management-system/deputies.png",
        "/projects/certificate-management-system/users.png",
        "/projects/certificate-management-system/media.png",
        "/projects/certificate-management-system/audit-logs.png",
        "/projects/certificate-management-system/login.png",
      ],
    },
    {
      slug: "university-website-redesign",
      title: "University Website Redesign — lar.ac.ir",
      description:
        "React + Tailwind CSS v4 design system for the official university site: RTL Persian, multilingual, animated directory and sliders, and an educational calendar.",
      tags: ["React", "Design Systems", "Tailwind CSS", "RTL & i18n"],
      demo: "https://lar.ac.ir",
      overview:
        "I replaced the university's official website with a custom WordPress theme built in React, backed by a custom PHP REST API that exposes content managed through Advanced Custom Fields. The legacy site remains online at old.lar.ac.ir for reference.",
      features: [
        "Tailwind CSS v4 design system with CSS-first theme, color palette, typography scale, RTL Persian conventions, and multilingual support",
        "Multi-level sticky/floating navbar with a glass-style finish",
        "Hero and news sliders with directional animation and auto-play, plus an animated faculty directory",
        "Educational calendar with a date-status color system and dynamic RTL timeline",
        "Responsive layouts for phone, tablet, and desktop with TanStack Query data fetching and caching",
      ],
      techStack: [
        "React",
        "Vite",
        "Tailwind CSS v4",
        "TanStack Query",
        "Framer Motion",
        "WordPress",
        "PHP",
        "ACF",
      ],
      role: "Front-end lead / full stack — design system, RTL components, responsive UI, and the PHP REST API behind it.",
      challenges:
        "Delivering a consistent RTL/multilingual design system while keeping content editor-friendly in WordPress/ACF. Solved with a CSS-first Tailwind v4 token theme, RTL-aware components, and a custom PHP REST API; tuned sliders and the animated directory to stay smooth on mobile.",
      gallery: [
        "/projects/university-website-redesign/home.png",
        "/projects/university-website-redesign/home-en.png",
        "/projects/university-website-redesign/news-archive.png",
        "/projects/university-website-redesign/news-detail.png",
        "/projects/university-website-redesign/departments.png",
        "/projects/university-website-redesign/presidency.png",
        "/projects/university-website-redesign/old-home.png",
      ],
    },
    {
      slug: "ijaz-ai-assistant",
      title: "ijaz — AI Assistant for Investment and Business",
      description:
        "React front end for a ChatGPT-style investment/business assistant with TanStack Query and TanStack Table; stayed stable through a Django-to-FastAPI migration.",
      tags: ["React", "TanStack Query", "TanStack Table", "Tailwind CSS"],
      demo: "https://fardad.mehyad.ir",
      overview:
        "I joined a startup founded by University of Tehran peers to build a ChatGPT-style assistant focused on investment and business questions. I started as a freelance frontend developer and moved into full-stack work.",
      features: [
        "React web client with Tailwind CSS and Docker packaging",
        "TanStack Query for server state and TanStack Table for data views",
        "Backend migration from Django to FastAPI",
        "Continued full-stack feature development after the migration",
      ],
      techStack: [
        "React",
        "Tailwind CSS",
        "TanStack Query",
        "TanStack Table",
        "Docker",
        "Django",
        "FastAPI",
        "Nginx",
      ],
      role: "Front-end first, then full stack — React client, server-state layer, and backend migration.",
      challenges:
        "Keeping a chat-style React client stable and responsive during a Django-to-FastAPI migration: TanStack Query isolated server state so the UI didn't break as endpoints moved, and TanStack Table handled large data views.",
      gallery: [
        "/projects/ijaz-ai-assistant/chat.png",
        "/projects/ijaz-ai-assistant/change-plan.png",
        "/projects/ijaz-ai-assistant/account-setting.png",
        "/projects/ijaz-ai-assistant/login.png",
        "/projects/ijaz-ai-assistant/register.png",
        "/projects/ijaz-ai-assistant/forget-password.png",
      ],
    },
    {
      slug: "triaxon-net",
      title: "Triaxon Net — Smartphone Sound Source Localization",
      description:
        "Graduate research on direction-of-arrival estimation and sound source localization using only ordinary smartphone microphones.",
      tags: ["Python", "Deep Learning", "Signal Processing"],
      overview:
        "Thesis research at the University of Tehran, Electrical and Computer Engineering, supervised by Prof. Omid Fatemi. The work estimates direction of arrival and localizes sound sources using only smartphone microphones, with models light enough for resource-constrained devices.",
      features: [
        "Localization experiments on real smartphone stereo recordings",
        "Python scripts for per-channel RMS levels, file-index to azimuth mapping, and ideal panning-curve overlays",
        "Lightweight deep learning models for resource-constrained devices",
        "Journal manuscript preparation with figures, captions, and author/disclosure statements",
      ],
      techStack: ["Python", "Signal Processing", "Deep Learning", "LaTeX"],
      role: "Graduate researcher — experiment design, Python pipelines, and manuscript preparation.",
      challenges:
        "Achieving useful localization accuracy with models light enough to run on ordinary smartphones rather than lab-grade microphone arrays.",
      gallery: [],
    },
  ],
  certificates,
};

const fa: PortfolioContent = {
  profile: {
    name: "محمد مهدی یادگاری‌فرد",
    initials: "م‌ی",
    university: "دانشگاه تهران",
    headline:
      "توسعه‌دهنده فرانت‌اند | React، Next.js، TypeScript و سیستم‌های طراحی",
    location: "تهران، ایران",
    about:
      "توسعه‌دهنده فرانت‌اند با تخصص در React، Next.js و TypeScript. سیستم‌های طراحی، APIهای کامپوننت دسترس‌پذیر و رابط‌های سریع و واکنش‌گرا با پشتیبانی کامل RTL/چندزبانه می‌سازم. وضعیت سرور را با TanStack Query مدیریت می‌کنم و رندر را برای Core Web Vitals بهینه می‌کنم؛ تجربه فول‌استک (FastAPI، PostgreSQL) به من امکان می‌دهد در صورت نیاز قابلیت‌ها را از صفر تا صد تحویل دهم.",
    email: "mehyad97@gmail.com",
    telegram: "@M3hyad",
    phone: "+989217243259",
    linkedin: "https://www.linkedin.com/in/mohammadmehdiyadegarifard",
    github: "https://github.com/myadegari",
    skills: [
      {
        label: "فرانت‌اند",
        items: ["React", "Next.js", "TypeScript", "JavaScript"],
      },
      {
        label: "رابط و سیستم طراحی",
        items: [
          "Tailwind CSS",
          "shadcn/ui",
          "Framer Motion",
          "سیستم طراحی",
          "چیدمان واکنش‌گرا",
        ],
      },
      {
        label: "RTL و دسترس‌پذیری",
        items: ["RTL و چندزبانه", "دسترس‌پذیری (a11y)"],
      },
      {
        label: "داده و وضعیت",
        items: ["TanStack Query", "REST API", "ماشین حالت"],
      },
      {
        label: "بک‌اند و داده",
        items: ["PostgreSQL", "Drizzle ORM", "FastAPI", "Python", "Docker"],
      },
      {
        label: "کیفیت و تحویل",
        items: ["Vitest", "Playwright", "عملکرد وب"],
      },
    ],
    languages: ["فارسی (زبان مادری)", "انگلیسی (حرفه‌ای)"],
  },
  experience: [
    {
      role: "مهندس فول‌استک",
      note: "سیستم کتابخانه نخل دانش",
      company: "مجتمع آموزش عالی لارستان",
      companyKey: "larestan",
      companyMeta: "تمام‌وقت · ۲ سال",
      companyPeriod: "نوامبر ۲۰۲۴ - اکتبر ۲۰۲۶",
      period: "پروژه‌محور",
      location: "لار، استان فارس، ایران · حضوری",
      bullets: [
        "ساخت کل فرانت‌اند Next.js 16 / React 19 — ۲۳ صفحه شامل فهرستگان عمومی، داشبورد اعضا، تحلیل‌های ادمین و گردش‌های میز RTL — با Tailwind CSS 4، daisyUI و فرم‌های اعتبارسنجی‌شده با Zod.",
        "مدل‌سازی وضعیت پیچیده UI (چرخه‌های رزرو، امانت، جریمه و فیش) به‌صورت ماشین‌های حالت قابل پیش‌بینی با بازخورد صریح تداخل و نماهای مبتنی بر نقش از طریق NextAuth v5.",
        "سریع و سبک نگه‌داشتن کلاینت: حذف وابستگی‌های بلااستفاده، جایگزینی خطاهای رشته‌محور با خطاهای typed و راستی‌آزمایی رفتار با ۱۶ مجموعه تست متکی بر پایگاه داده.",
        "مالکیت بک‌اند و استقرار به‌عنوان تمایز: مدل دامنه PostgreSQL/Drizzle، تست بار با ۱۴۴ درخواست بر ثانیه (p99 برابر ۱۲۵ میلی‌ثانیه)، استقرار به‌صورت دو replica داکر پشت Caddy.",
      ],
    },
    {
      role: "مهندس فول‌استک",
      note: "سیستم مدیریت گواهی‌ها",
      company: "مجتمع آموزش عالی لارستان",
      companyKey: "larestan",
      companyMeta: "تمام‌وقت · ۲ سال",
      companyPeriod: "نوامبر ۲۰۲۴ - اکتبر ۲۰۲۶",
      period: "پروژه‌محور",
      location: "لار، استان فارس، ایران · حضوری",
      bullets: [
        "ساخت UI پلتفرم داخلی گواهی‌ها (Next.js + shadcn/ui) با داشبورد آموزشی کارکنان و خروجی خودکار گواهی PDF فارسی.",
      ],
    },
    {
      role: "توسعه‌دهنده فرانت‌اند",
      note: "بازطراحی وب‌سایت دانشگاه — lar.ac.ir",
      company: "مجتمع آموزش عالی لارستان",
      companyKey: "larestan",
      companyMeta: "تمام‌وقت · ۲ سال",
      companyPeriod: "نوامبر ۲۰۲۴ - اکتبر ۲۰۲۶",
      period: "پروژه‌محور",
      location: "لار، استان فارس، ایران · حضوری",
      bullets: [
        "طراحی سیستم طراحی Tailwind CSS v4 (تم CSS-first، پالت رنگ، مقیاس تایپوگرافی) با قراردادهای کامل RTL فارسی و پشتیبانی چندزبانه برای سایت رسمی دانشگاه (lar.ac.ir).",
        "تحویل رابط‌های React واکنش‌گرا: ناوبار چندسطحی sticky/floating، اسلایدرهای هیرو/خبر با انیمیشن جهت‌دار، دایرکتوری متحرک اعضای هیئت علمی و تقویم آموزشی با تایم‌لاین پویای RTL.",
        "پیاده‌سازی دریافت و کش داده با TanStack Query روی API REST سفارشی PHP بر بستر WordPress/ACF تا محتوا برای ویراستار قابل ویرایش بماند.",
      ],
    },
    {
      role: "فریلنسر فرانت‌اند، سپس توسعه‌دهنده فول‌استک",
      company: "ijaz — دستیار هوش مصنوعی سرمایه‌گذاری و کسب‌وکار",
      companyMeta: "فریلنس · ۱ سال",
      period: "آوریل ۲۰۲۴ - مارس ۲۰۲۵",
      location: "از راه دور",
      bullets: [
        "ساخت فرانت‌اند React یک دستیار سبک ChatGPT: Tailwind CSS، TanStack Query برای وضعیت سرور، TanStack Table برای نماهای داده، بسته‌بندی با Docker.",
        "پایدار نگه‌داشتن کلاینت در مهاجرت بک‌اند از Django به FastAPI با جداسازی وضعیت سرور، سپس ادامه کار فول‌استک.",
        "رشد از فریلنسر فرانت‌اند به فول‌استک در یک تیم استارتاپی راه دور و محصول‌محور.",
      ],
    },
    {
      role: "پژوهشگر تحصیلات تکمیلی — مکان‌یابی منبع صوت",
      company: "دانشگاه تهران، مهندسی برق و کامپیوتر",
      companyKey: "ut",
      companyMeta: "تمام‌وقت · ۳ سال",
      period: "۲۰۲۰ - ۲۰۲۳",
      location: "تهران، ایران",
      bullets: [
        "پژوهش روی تخمین جهت رسیدن سیگنال و مکان‌یابی منبع صوت تنها با میکروفون‌های گوشی هوشمند معمولی، با هدف مدل‌های سبک برای دستگاه‌های دارای محدودیت منابع.",
        "ساخت پایپ‌لاین‌های آزمایش Python برای ضبط‌های استریوی واقعی: محاسبه RMS هر کانال، نگاشت اندیس فایل به زاویه سمت و رسم منحنی‌های panning ایده‌آل.",
        "آماده‌سازی مواد مقاله ژورنال شامل شکل‌ها، زیرنویس‌ها و بیانیه‌های نویسندگان و افشا.",
      ],
    },
  ],
  education: [
    {
      school: "دانشگاه تهران",
      degree: "کارشناسی ارشد مهندسی کامپیوتر (معماری سیستم‌های کامپیوتری)",
      period: "۲۰۲۰ - ۲۰۲۳",
      bullets: [
        "معدل: ۱۸.۴۰. دفاع با درجه عالی.",
        "پایان‌نامه: تشخیص جهت منبع صوت با استفاده از شبکه عصبی پیچشی عمیق در تلفن هوشمند.",
      ],
    },
    {
      school: "دانشگاه شهید باهنر کرمان",
      degree: "کارشناسی مهندسی برق (قدرت)",
      period: "۲۰۱۵ - ۲۰۱۹",
      bullets: [
        "پروژه کارشناسی: مکان‌یابی خطا در شبکه برق با تولید پراکنده.",
      ],
    },
  ],
  projects: [
    {
      slug: "nakhl-e-danesh",
      title: "نخل دانش — سیستم مدیریت کتابخانه دانشگاهی",
      description:
        "سیستم کتابخانه عملیاتی Next.js 16 / React 19: ۲۳ صفحه فهرستگان، داشبورد و گردش میز RTL با UI مبتنی بر ماشین حالت؛ طراحی، ساخت و استقرار از صفر تا صد.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      demo: "https://library.mehyad.ir",
      overview:
        "نخل دانش یک سیستم عملیاتی کتابخانه دانشگاهی در بتای عمومی است. این سیستم فهرستگان، عضویت، گردش رزرو تا امانت، جریمه‌های مبتنی بر سیاست و جریان وصول بدهی آفلاین را بر اساس فرایند واقعی میز کتابخانه پوشش می‌دهد. آن را از صفر تا صد طراحی، پیاده‌سازی و مستقر کردم: حدود ۲۶٬۰۰۰ خط TypeScript، ۲۳ صفحه، ۱۱ مسیر API و ۱۶ جدول پایگاه داده.",
      features: [
        "فهرستگان با دسته‌بندی سلسله‌مراتبی، بارکد هر نسخه، رهگیری وضعیت، آپلود جلد در فضای ذخیره‌سازی سازگار با S3، جستجوی faceted و فهرستگان عمومی اعضا",
        "RBAC شش‌نقشی با گردش تأیید/مسدودسازی، هویت کد ملی و شماره دانشجویی و بازنشانی رمز تأییدشده در میز کتابخانه",
        "ماشین‌های حالت گردش برای رزرو، تأیید، صدور، تمدید، عودت و چرخه جریمه با سیاست هر دسته عضویت",
        "وصول بدهی آفلاین با فیش‌های قابل چاپ، شماره‌گذاری ترتیبی سالانه، دفتر تسویه و تشخیص صریح تداخل FINES_CHANGED",
        "ورود/خروجی Excel با گزارش خطای هر ردیف، لاگ حسابرسی با snapshotهای قبل/بعد، مرکز اعلان و داشبورد تحلیلی",
        "تست بار با ۱۴۴ درخواست بر ثانیه، p50 برابر ۳۵ میلی‌ثانیه و p99 برابر ۱۲۵ میلی‌ثانیه و بدون خطا در مدل ۱۰۰۰ کاربر هم‌زمان؛ ۱۶ مجموعه تست متکی بر پایگاه داده",
      ],
      techStack: [
        "TypeScript",
        "Next.js 16",
        "React 19",
        "PostgreSQL 16",
        "Drizzle ORM",
        "NextAuth v5",
        "Zod",
        "Tailwind CSS 4",
        "daisyUI",
        "Docker",
        "Caddy",
      ],
      role: "مهندس انفرادی — مالکیت فرانت‌اند Next.js/React از صفر تا صد، به‌همراه مدل دامنه، تست و استقرار.",
      challenges:
        "رندر گردش‌های هم‌زمان میز بدون سردرگمی کاربر: مدل‌سازی چرخه‌های رزرو/امانت/جریمه/فیش به‌صورت ماشین حالت تا UI همیشه وضعیت معتبر نشان دهد، ارائه بازخورد صریح تداخل FINES_CHANGED به‌جای شکست خاموش و سبک نگه‌داشتن کلاینت با حذف وابستگی‌های بلااستفاده. قفل سطری تراکنشی و نوشتن شرطی در بک‌اند پشتوانه این تضمین‌های UI است.",
      gallery: [
        "/projects/nakhl-e-danesh/home.png",
        "/projects/nakhl-e-danesh/books-list.png",
        "/projects/nakhl-e-danesh/book-detail.png",
        "/projects/nakhl-e-danesh/category.png",
        "/projects/nakhl-e-danesh/admin-dashboard.png",
        "/projects/nakhl-e-danesh/admin-panel.png",
        "/projects/nakhl-e-danesh/loan-history.png",
        "/projects/nakhl-e-danesh/fines.png",
        "/projects/nakhl-e-danesh/login.png",
        "/projects/nakhl-e-danesh/register.png",
      ],
    },
    {
      slug: "certificate-management-system",
      title: "سیستم مدیریت گواهی‌ها",
      description:
        "پلتفرم داخلی Next.js + shadcn/ui: گردش ثبت‌نام، داشبورد آموزشی کارکنان و گواهی‌های PDF فارسی خودکار.",
      tags: ["Next.js", "shadcn/ui", "Tailwind CSS", "FastAPI"],
      demo: "https://govahyar.mehyad.ir",
      overview:
        "این سیستم جایگزین فرم‌های کاغذی ثبت‌نام، ورود دستی داده در Excel و تولید گواهی با Word mail-merge شد. مدیران دوره ایجاد می‌کنند و پرسنل را ثبت‌نام می‌کنند، هر دپارتمان شماره‌گذاری مخصوص خود را دارد، گواهی‌ها به‌صورت خودکار تولید می‌شوند و کارکنان گواهی‌ها و مجموع زمان آموزش خود را در داشبورد شخصی می‌بینند.",
      features: [
        "ایجاد دوره و ثبت‌نام پرسنل با شماره‌گذاری گواهی مختص هر دپارتمان",
        "تولید خودکار گواهی PDF فارسی از قالب‌های PowerPoint با Jinja2 و LibreOffice",
        "صف‌بندی RabbitMQ و پایپ‌لاین درخواست‌های تولید",
        "داشبورد کارکنان با گواهی‌ها و مجموع زمان آموزش",
        "کلاینت Next.js + shadcn/ui با ذخیره‌سازی داده در MongoDB",
      ],
      techStack: [
        "Next.js",
        "Tailwind CSS",
        "shadcn/ui",
        "FastAPI",
        "WeasyPrint",
        "Jinja2",
        "RabbitMQ",
        "MongoDB",
        "Alarik",
      ],
      role: "فول‌استک — کلاینت Next.js/shadcn و داشبورد آموزشی، به‌همراه میکروسرویس PDF با FastAPI.",
      challenges:
        "ارائه گردش تمیز ثبت‌نام تا گواهی و داشبورد آموزشی شخصی در حالی که خروجی PDF فارسی باید تایپوگرافی و شماره‌گذاری دپارتمانی را حفظ کند. کلاینت Next.js + shadcn/ui و یک میکروسرویس رندر FastAPI دارای صف پشت یک گردش واحد ساخته شد.",
      gallery: [
        "/projects/certificate-management-system/dashboard.png",
        "/projects/certificate-management-system/courses.png",
        "/projects/certificate-management-system/deputies.png",
        "/projects/certificate-management-system/users.png",
        "/projects/certificate-management-system/media.png",
        "/projects/certificate-management-system/audit-logs.png",
        "/projects/certificate-management-system/login.png",
      ],
    },
    {
      slug: "university-website-redesign",
      title: "بازطراحی وب‌سایت دانشگاه — lar.ac.ir",
      description:
        "سیستم طراحی React + Tailwind CSS v4 برای سایت رسمی دانشگاه: RTL فارسی، چندزبانه، دایرکتوری و اسلایدرهای متحرک و تقویم آموزشی.",
      tags: ["React", "Design Systems", "Tailwind CSS", "RTL & i18n"],
      demo: "https://lar.ac.ir",
      overview:
        "وب‌سایت رسمی دانشگاه را با یک پوسته سفارشی WordPress ساخته‌شده با React جایگزین کردم؛ پوسته‌ای که به یک API REST سفارشی PHP متصل است و محتوای مدیریت‌شده از طریق Advanced Custom Fields را ارائه می‌کند. نسخه قدیمی برای مرجع در old.lar.ac.ir آنلاین است.",
      features: [
        "سیستم طراحی Tailwind CSS v4 با تم CSS-first، پالت رنگ، مقیاس تایپوگرافی، قراردادهای RTL فارسی و پشتیبانی چندزبانه",
        "ناوبار چندسطحی sticky/floating با پرداخت شیشه‌ای",
        "اسلایدرهای هیرو و خبر با انیمیشن جهت‌دار و پخش خودکار، به‌همراه دایرکتوری متحرک اعضای هیئت علمی",
        "تقویم آموزشی با سیستم رنگی وضعیت تاریخ و تایم‌لاین پویای RTL",
        "چیدمان واکنش‌گرا برای موبایل، تبلت و دسکتاپ با دریافت و کش داده از طریق TanStack Query",
      ],
      techStack: [
        "React",
        "Vite",
        "Tailwind CSS v4",
        "TanStack Query",
        "Framer Motion",
        "WordPress",
        "PHP",
        "ACF",
      ],
      role: "راهبر فرانت‌اند / فول‌استک — سیستم طراحی، کامپوننت‌های RTL، UI واکنش‌گرا و API REST PHP پشت آن.",
      challenges:
        "ارائه سیستم طراحی یکپارچه RTL/چندزبانه در حالی که محتوا در WordPress/ACF برای ویراستار قابل ویرایش بماند. با تم توکن‌محور CSS-first در Tailwind v4، کامپوننت‌های RTL-aware و API REST سفارشی PHP حل شد؛ اسلایدرها و دایرکتوری متحرک برای روانی روی موبایل بهینه شدند.",
      gallery: [
        "/projects/university-website-redesign/home.png",
        "/projects/university-website-redesign/home-en.png",
        "/projects/university-website-redesign/news-archive.png",
        "/projects/university-website-redesign/news-detail.png",
        "/projects/university-website-redesign/departments.png",
        "/projects/university-website-redesign/presidency.png",
        "/projects/university-website-redesign/old-home.png",
      ],
    },
    {
      slug: "ijaz-ai-assistant",
      title: "ijaz — دستیار هوش مصنوعی سرمایه‌گذاری و کسب‌وکار",
      description:
        "فرانت‌اند React برای دستیار سبک ChatGPT سرمایه‌گذاری/کسب‌وکار با TanStack Query و TanStack Table؛ پایدار در مهاجرت Django به FastAPI.",
      tags: ["React", "TanStack Query", "TanStack Table", "Tailwind CSS"],
      demo: "https://fardad.mehyad.ir",
      overview:
        "به استارتاپی تأسیس‌شده توسط هم‌دانشگاهی‌های دانشگاه تهران پیوستم تا دستیاری سبک ChatGPT با تمرکز بر پرسش‌های سرمایه‌گذاری و کسب‌وکار بسازیم. ابتدا به‌عنوان فریلنسر فرانت‌اند شروع کردم و سپس وارد کار فول‌استک شدم.",
      features: [
        "کلاینت وب React با Tailwind CSS و بسته‌بندی Docker",
        "TanStack Query برای وضعیت سرور و TanStack Table برای نماهای داده",
        "مهاجرت بک‌اند از Django به FastAPI",
        "ادامه توسعه فول‌استک قابلیت‌ها پس از مهاجرت",
      ],
      techStack: [
        "React",
        "Tailwind CSS",
        "TanStack Query",
        "TanStack Table",
        "Docker",
        "Django",
        "FastAPI",
        "Nginx",
      ],
      role: "ابتدا فرانت‌اند، سپس فول‌استک — کلاینت React، لایه وضعیت سرور و مهاجرت بک‌اند.",
      challenges:
        "پایدار و پاسخ‌گو نگه‌داشتن کلاینت React سبک چت در مهاجرت Django به FastAPI: TanStack Query وضعیت سرور را جدا کرد تا UI با جابه‌جایی endpointها نشکند و TanStack Table نماهای داده بزرگ را مدیریت کرد.",
      gallery: [
        "/projects/ijaz-ai-assistant/chat.png",
        "/projects/ijaz-ai-assistant/change-plan.png",
        "/projects/ijaz-ai-assistant/account-setting.png",
        "/projects/ijaz-ai-assistant/login.png",
        "/projects/ijaz-ai-assistant/register.png",
        "/projects/ijaz-ai-assistant/forget-password.png",
      ],
    },
    {
      slug: "triaxon-net",
      title: "ترایاکسون نت — مکان‌یابی منبع صوت با گوشی هوشمند",
      description:
        "پژوهش تحصیلات تکمیلی روی تخمین جهت رسیدن سیگنال و مکان‌یابی منبع صوت تنها با میکروفون‌های گوشی هوشمند معمولی.",
      tags: ["Python", "Deep Learning", "Signal Processing"],
      overview:
        "پژوهش پایان‌نامه در دانشگاه تهران، دانشکده مهندسی برق و کامپیوتر، به راهنمایی دکتر امید فاطمی. این پژوهش جهت رسیدن سیگنال را تخمین می‌زند و منابع صوت را تنها با میکروفون‌های گوشی هوشمند مکان‌یابی می‌کند؛ با مدل‌هایی سبک برای دستگاه‌های دارای محدودیت منابع.",
      features: [
        "آزمایش‌های مکان‌یابی روی ضبط‌های استریوی واقعی گوشی هوشمند",
        "اسکریپت‌های Python برای محاسبه RMS هر کانال، نگاشت اندیس فایل به زاویه سمت و رسم منحنی‌های panning ایده‌آل",
        "مدل‌های یادگیری عمیق سبک برای دستگاه‌های دارای محدودیت منابع",
        "آماده‌سازی مقاله ژورنال با شکل‌ها، زیرنویس‌ها و بیانیه‌های نویسندگان و افشا",
      ],
      techStack: ["Python", "Signal Processing", "Deep Learning", "LaTeX"],
      role: "پژوهشگر تحصیلات تکمیلی — طراحی آزمایش، پایپ‌لاین‌های Python و آماده‌سازی مقاله.",
      challenges:
        "دستیابی به دقت مکان‌یابی قابل استفاده با مدل‌هایی آن‌قدر سبک که روی گوشی هوشمند معمولی اجرا شوند، نه آرایه‌های میکروفون آزمایشگاهی.",
      gallery: [],
    },
  ],
  certificates,
};

export const content: Record<Lang, PortfolioContent> = { en, fa };
