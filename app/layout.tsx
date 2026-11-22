import type { Metadata, Viewport } from "next";
import { Vazirmatn, Public_Sans } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { content } from "@/lib/content";
import { AppProviders } from "@/components/providers/app-providers";
import { SiteHeader } from "@/components/layout/site-header";
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  // The Arabic subset is a large file that only Persian readers need. Without
  // this, next/font emits a <link rel=preload> for it on every page, so every
  // English visitor downloads a font that can never match a glyph on screen.
  // It stays declared, so it is still fetched on demand if the reader switches
  // to Persian.
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Matches --background in both themes so the browser chrome around the page
  // is not a different colour from the page itself.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1f23" },
  ],
};

const siteUrl = "https://www.mehyad.ir";
const siteTitle = "Mohammadmehdi Yadegarifard | Portfolio";
const siteDescription =
  "Front-end developer with full-stack delivery experience: React, Next.js, TypeScript, design systems, and RTL/i18n interfaces.";

export const metadata: Metadata = {
  // Relative Open Graph image and URL paths in every route resolve against this.
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Mohammadmehdi Yadegarifard",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    alternateLocale: ["fa_IR"],
    images: [
      {
        url: "/og-v2.png",
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-v2.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: content.en.profile.name,
  alternateName: content.fa.profile.name,
  jobTitle: "Front-End Developer",
  description: content.en.profile.about,
  url: siteUrl,
  email: content.en.profile.email,
  sameAs: [content.en.profile.linkedin, content.en.profile.github],
  knowsAbout: content.en.profile.skills.flatMap((group) => group.items),
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Tehran" },
    { "@type": "CollegeOrUniversity", name: "Shahid Bahonar University of Kerman" },
  ],
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark")}var l=localStorage.getItem("lang");if(l==="fa"){document.documentElement.lang="fa";document.documentElement.dir="rtl"}else if(l==="en"){document.documentElement.lang="en";document.documentElement.dir="ltr"}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        publicSans.variable,
        vazirmatn.variable
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <AppProviders>
          <SiteHeader/>
          {children}
          </AppProviders>
        {/* Route changes are read from the router, so this belongs in the root
            layout inside <body> rather than on individual pages. Suspense keeps
            it off the critical path if the router is ever in a suspending state. */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
