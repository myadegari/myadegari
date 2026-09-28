import type { Lang, PortfolioContent } from "@/lib/types";
import { certificates } from "@/lib/certificates";

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
    linkedin: "https://www.linkedin.com/in/mohammadmehdiyadegarifard",
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
      slug: "pulse-analytics",
      title: "Pulse Analytics",
      description:
        "Real-time analytics dashboard with FastAPI backend, customizable widgets, and role-based views for SaaS teams.",
      tags: ["FastAPI", "React", "TypeScript"],
      demo: "https://example.com/pulse",
      repo: "https://github.com/sara-ahmadi/pulse-analytics",
      overview:
        "Pulse Analytics is a real-time SaaS analytics dashboard. It streams product events over WebSockets from a FastAPI backend, lets teams compose their own dashboards from customizable widgets, and enforces role-based views so each team only sees what it needs.",
      features: [
        "Real-time event streaming with WebSocket updates and optimistic UI",
        "Customizable widget grid with drag-and-drop layout persistence",
        "Role-based views and per-team dashboard presets",
        "Exportable reports with scheduled email digests",
      ],
      techStack: ["FastAPI", "React", "TypeScript", "WebSockets", "PostgreSQL"],
      role: "Fullstack developer — designed the API schema, built the widget system, and led the Next.js migration.",
      challenges:
        "Keeping first-load fast while widgets subscribe to live streams. Solved with route-level code splitting, virtualized tables, and debounced socket updates.",
      gallery: [],
    },
    {
      slug: "kit-design-system",
      title: "Kit Design System",
      description:
        "Open-source component kit with tokens, docs, and dark mode used across internal products.",
      tags: ["Design Systems", "React", "TypeScript"],
      demo: "https://example.com/kit",
      repo: "https://github.com/sara-ahmadi/kit",
      overview:
        "Kit is an open-source React component kit with design tokens, documentation, and first-class dark mode. It powers internal products with a single source of truth for color, spacing, typography, and component behavior.",
      features: [
        "Token-driven theming with light/dark mode and RTL support",
        "Documented component APIs with usage guidelines and examples",
        "Automated visual regression tests for every component",
        "Figma-to-code workflow with shared naming conventions",
      ],
      techStack: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
      role: "Design systems lead — defined tokens, built core components, and wrote documentation.",
      challenges:
        "Preventing API drift across 4 product teams. Solved with strict versioning, codemods, and a documented deprecation policy.",
      gallery: [],
    },
    {
      slug: "lingo-flashcards",
      title: "Lingo Flashcards",
      description:
        "Spaced-repetition flashcard app with offline support and keyboard-first navigation.",
      tags: ["Next.js", "PWA", "IndexedDB"],
      demo: "https://example.com/lingo",
      repo: "https://github.com/sara-ahmadi/lingo",
      overview:
        "Lingo Flashcards is a spaced-repetition study app with full offline support. Decks sync when online and persist in IndexedDB, with keyboard-first navigation for fast review sessions.",
      features: [
        "SM-2 spaced-repetition scheduling with daily review queues",
        "Offline-first decks backed by IndexedDB with background sync",
        "Keyboard-first navigation and command palette",
        "Installable PWA with push reminders",
      ],
      techStack: ["Next.js", "TypeScript", "IndexedDB", "PWA"],
      role: "Solo developer — from product design to PWA packaging and deployment.",
      challenges:
        "Reliable offline conflict resolution. Solved with last-write-wins plus per-card revision history.",
      gallery: [],
    },
    {
      slug: "form-builder-pro",
      title: "Form Builder Pro",
      description:
        "Drag-and-drop form builder that exports accessible, schema-driven React forms.",
      tags: ["React", "Zod", "Accessibility"],
      repo: "https://github.com/sara-ahmadi/form-builder",
      overview:
        "Form Builder Pro is a drag-and-drop builder that exports schema-driven React forms. Every generated form is accessible by default, validated with Zod, and ready to drop into any React app.",
      features: [
        "Drag-and-drop canvas with nested sections and conditional logic",
        "Zod schema export with type-safe generated components",
        "WCAG-minded output: labels, errors, focus management built in",
        "Live preview with validation playground",
      ],
      techStack: ["React", "TypeScript", "Zod", "Tailwind CSS"],
      role: "Frontend developer — built the canvas engine and schema exporter.",
      challenges:
        "Keeping the exported code clean and human-readable. Solved with a dedicated code printer instead of serializing internal state.",
      gallery: [],
    },
    {
      slug: "commit-graph",
      title: "Commit Graph",
      description:
        "GitHub-style contribution heatmap component with RTL support and virtualized rendering.",
      tags: ["TypeScript", "Open Source"],
      repo: "https://github.com/sara-ahmadi/commit-graph",
      overview:
        "Commit Graph is an open-source contribution heatmap component with RTL support and virtualized rendering for large histories. It drops into any dashboard that needs activity visualization.",
      features: [
        "Virtualized year/month views that handle 10k+ cells smoothly",
        "RTL-aware layout with localized tooltips",
        "Themable color scales with colorblind-safe palettes",
        "Zero-dependency core under 5 kB gzipped",
      ],
      techStack: ["TypeScript", "React"],
      role: "Open-source author — API design, rendering performance, and docs.",
      challenges:
        "Rendering multi-year histories without jank. Solved with windowing and canvas fallback for dense views.",
      gallery: [],
    },
    {
      slug: "shoplight",
      title: "Shoplight",
      description:
        "Headless e-commerce storefront template with instant search and image optimization.",
      tags: ["Next.js", "FastAPI", "Tailwind CSS"],
      demo: "https://example.com/shoplight",
      repo: "https://github.com/sara-ahmadi/shoplight",
      overview:
        "Shoplight is a headless e-commerce storefront template with instant search, image optimization, and a FastAPI commerce backend. It is built to be cloned and customized for new stores in hours.",
      features: [
        "Instant faceted search with typo tolerance",
        "Optimized images with automatic AVIF/WebP and blur placeholders",
        "Cart and checkout flows backed by FastAPI",
        "SEO-ready product pages with structured data",
      ],
      techStack: ["Next.js", "FastAPI", "Tailwind CSS", "PostgreSQL"],
      role: "Fullstack developer — storefront template, search integration, and backend endpoints.",
      challenges:
        "Search latency on large catalogs. Solved with edge-cached indexes and debounced prefetching.",
      gallery: [],
    },
  ],
  certificates,
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
    linkedin: "https://www.linkedin.com/in/mohammadmehdiyadegarifard",
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
      slug: "pulse-analytics",
      title: "پالس آنالیتیکس",
      description:
        "داشبورد تحلیل بلادرنگ با بک‌اند فست‌اپی، ویجت‌های قابل شخصی‌سازی و نماهای مبتنی بر نقش برای تیم‌های SaaS.",
      tags: ["فست‌اپی", "ری‌اکت", "تایپ‌اسکریپت"],
      demo: "https://example.com/pulse",
      repo: "https://github.com/sara-ahmadi/pulse-analytics",
      overview:
        "پالس آنالیتیکس یک داشبورد تحلیل بلادرنگ برای محصولات SaaS است. رویدادها از طریق وب‌سوکت از بک‌اند فست‌اپی استریم می‌شوند، تیم‌ها داشبورد خود را از ویجت‌های قابل شخصی‌سازی می‌سازند و نماهای مبتنی بر نقش دسترسی هر تیم را مشخص می‌کند.",
      features: [
        "استریم بلادرنگ رویدادها با وب‌سوکت و رابط کاربری خوش‌بینانه",
        "شبکه ویجت قابل شخصی‌سازی با چیدمان کشیدن و رها کردن",
        "نماهای مبتنی بر نقش و پیش‌تنظیم داشبورد برای هر تیم",
        "گزارش‌های قابل خروجی با خلاصه ایمیلی زمان‌بندی‌شده",
      ],
      techStack: ["فست‌اپی", "ری‌اکت", "تایپ‌اسکریپت", "وب‌سوکت", "PostgreSQL"],
      role: "توسعه‌دهنده فول‌استک — طراحی اسکیمای API، ساخت سیستم ویجت‌ها و رهبری مهاجرت به نکست‌جی‌اس.",
      challenges:
        "حفظ سرعت بارگذاری اولیه در کنار اشتراک زنده ویجت‌ها. با کداسپلیتینگ در سطح روت، جدول‌های مجازی‌سازی‌شده و به‌روزرسانی‌های debounced حل شد.",
      gallery: [],
    },
    {
      slug: "kit-design-system",
      title: "کیت سیستم طراحی",
      description:
        "کیت متن‌باز کامپوننت‌ها با توکن‌ها، مستندات و حالت تاریک که در محصولات داخلی استفاده شد.",
      tags: ["سیستم طراحی", "ری‌اکت", "تایپ‌اسکریپت"],
      demo: "https://example.com/kit",
      repo: "https://github.com/sara-ahmadi/kit",
      overview:
        "کیت یک مجموعه متن‌باز کامپوننت ری‌اکت با توکن‌های طراحی، مستندات و حالت تاریک درجه‌یک است که به‌عنوان منبع واحد رنگ، فاصله‌گذاری، تایپوگرافی و رفتار کامپوننت‌ها در محصولات داخلی استفاده می‌شود.",
      features: [
        "تم‌سازی توکن‌محور با حالت روشن/تاریک و پشتیبانی RTL",
        "APIهای مستندشده با راهنمای استفاده و مثال",
        "تست رگرسیون بصری خودکار برای هر کامپوننت",
        "گردش‌کار Figma-to-code با قراردادهای نام‌گذاری مشترک",
      ],
      techStack: ["ری‌اکت", "تایپ‌اسکریپت", "توییند CSS", "Storybook"],
      role: "راهبر سیستم طراحی — تعریف توکن‌ها، ساخت کامپوننت‌های اصلی و نگارش مستندات.",
      challenges:
        "جلوگیری از واگرایی API در ۴ تیم محصول. با نسخه‌بندی دقیق، کدُمادها و سیاست منسوخ‌سازی مستند حل شد.",
      gallery: [],
    },
    {
      slug: "lingo-flashcards",
      title: "لینگو فلش‌کارت",
      description:
        "اپ فلش‌کارت با تکرار فاصله‌دار، پشتیبانی آفلاین و ناوبری با کیبورد.",
      tags: ["نکست‌جی‌اس", "PWA", "IndexedDB"],
      demo: "https://example.com/lingo",
      repo: "https://github.com/sara-ahmadi/lingo",
      overview:
        "لینگو فلش‌کارت یک اپ مطالعه با تکرار فاصله‌دار و پشتیبانی کامل آفلاین است. دسته‌ها آنلاین همگام و در IndexedDB ذخیره می‌شوند و ناوبری کیبوردی مرور سریع را ممکن می‌کند.",
      features: [
        "زمان‌بندی تکرار فاصله‌دار SM-2 با صف مرور روزانه",
        "دسته‌های آفلاین‌اول با IndexedDB و همگام‌سازی پس‌زمینه",
        "ناوبری کیبوردی و پالت فرمان",
        "PWA قابل نصب با یادآور",
      ],
      techStack: ["نکست‌جی‌اس", "تایپ‌اسکریپت", "IndexedDB", "PWA"],
      role: "توسعه‌دهنده مستقل — از طراحی محصول تا بسته‌بندی PWA و استقرار.",
      challenges:
        "حل تعارض‌های آفلاین به‌صورت قابل اعتماد. با راهبرد last-write-wins و تاریخچه بازبینی هر کارت حل شد.",
      gallery: [],
    },
    {
      slug: "form-builder-pro",
      title: "سازنده فرم حرفه‌ای",
      description:
        "سازنده فرم کشیدن و رها کردن که فرم‌های React دسترس‌پذیر و مبتنی بر اسکیما خروجی می‌دهد.",
      tags: ["ری‌اکت", "Zod", "دسترس‌پذیری"],
      repo: "https://github.com/sara-ahmadi/form-builder",
      overview:
        "سازنده فرم حرفه‌ای یک بیلدر کشیدن و رها کردن است که فرم‌های ری‌اکت اسکیمامحور خروجی می‌دهد. هر فرم تولیدشده به‌صورت پیش‌فرض دسترس‌پذیر است، با Zod اعتبارسنجی می‌شود و آماده استفاده در هر اپ ری‌اکت است.",
      features: [
        "بوم کشیدن و رها کردن با بخش‌های تو‌در‌تو و منطق شرطی",
        "خروجی اسکیمای Zod با کامپوننت‌های type-safe",
        "خروجی دسترس‌پذیر: لیبل‌ها، خطاها و مدیریت فوکس داخلی",
        "پیش‌نمایش زنده با زمین‌بازی اعتبارسنجی",
      ],
      techStack: ["ری‌اکت", "تایپ‌اسکریپت", "Zod", "توییند CSS"],
      role: "توسعه‌دهنده فرانت‌اند — ساخت موتور بوم و صادرکننده اسکیما.",
      challenges:
        "تمیز و خوانا نگه‌داشتن کد خروجی. با چاپگر اختصاصی کد به‌جای سریالایز کردن وضعیت داخلی حل شد.",
      gallery: [],
    },
    {
      slug: "commit-graph",
      title: "کامیت گراف",
      description:
        "کامپوننت نقشه مشارکت به سبک گیت‌هاب با پشتیبانی RTL و رندر مجازی.",
      tags: ["تایپ‌اسکریپت", "متن‌باز"],
      repo: "https://github.com/sara-ahmadi/commit-graph",
      overview:
        "کامیت گراف یک کامپوننت متن‌باز نقشه مشارکت با پشتیبانی RTL و رندر مجازی برای تاریخچه‌های بزرگ است و برای هر داشبوردی که نیاز به نمایش فعالیت دارد مناسب است.",
      features: [
        "نماهای سال/ماه مجازی‌سازی‌شده برای ۱۰هزار+ سلول",
        "چیدمان راست‌به‌چپ با تولتیپ‌های محلی‌سازی‌شده",
        "مقیاس‌های رنگی تم‌پذیر با پالت‌های مناسب کوررنگی",
        "هسته بدون وابستگی زیر ۵ کیلوبایت",
      ],
      techStack: ["تایپ‌اسکریپت", "ری‌اکت"],
      role: "نویسنده متن‌باز — طراحی API، عملکرد رندر و مستندات.",
      challenges:
        "رندر تاریخچه‌های چندساله بدون افت فریم. با windowing و fallback کانوس برای نماهای متراکم حل شد.",
      gallery: [],
    },
    {
      slug: "shoplight",
      title: "شاپ‌لایت",
      description: "قالب فروشگاه headless با جستجوی فوری و بهینه‌سازی تصاویر.",
      tags: ["نکست‌جی‌اس", "فست‌اپی", "توییند CSS"],
      demo: "https://example.com/shoplight",
      repo: "https://github.com/sara-ahmadi/shoplight",
      overview:
        "شاپ‌لایت یک قالب فروشگاه headless با جستجوی فوری، بهینه‌سازی تصویر و بک‌اند تجاری فست‌اپی است و برای ساخت فروشگاه جدید در چند ساعت طراحی شده است.",
      features: [
        "جستجوی وجهی فوری با تحمل اشتباه تایپی",
        "تصاویر بهینه با AVIF/WebP خودکار و placeholder تار",
        "سبد خرید و تسویه حساب با بک‌اند فست‌اپی",
        "صفحات محصول سئومحور با داده ساخت‌یافته",
      ],
      techStack: ["نکست‌جی‌اس", "فست‌اپی", "توییند CSS", "PostgreSQL"],
      role: "توسعه‌دهنده فول‌استک — قالب فروشگاه، یکپارچه‌سازی جستجو و اندپوینت‌های بک‌اند.",
      challenges:
        "تأخیر جستجو در کاتالوگ‌های بزرگ. با ایندکس‌های کش‌شده در اج و prefetch debounceشده حل شد.",
      gallery: [],
    },
  ],
  certificates,
};

export const content: Record<Lang, PortfolioContent> = { en, fa };
