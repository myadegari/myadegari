import type { Metadata, Viewport } from "next";
import { Vazirmatn, Public_Sans } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { cn } from "@/lib/utils";
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

export const metadata: Metadata = {
  title: "Mohammadmehdi Yadegarifard | Portfolio",
  description:
    "Fullstack developer portfolio: experience, education, projects, and certificates.",
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
