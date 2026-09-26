"use client";

import { useState } from "react";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { Download01Icon, Menu01Icon, Close } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { useI18n } from "@/components/providers/i18n-provider";
import { useContentBrand } from "@/components/shared/use-content-brand";
import { SquishName } from "@/components/layout/squish-name";
import { cn } from "@/lib/utils";
import ProfileImage from "../../public/profile.jpg";
import Image from "next/image";
const navItems = [
  { id: "about", key: "navAbout" as const },
  { id: "experience", key: "navExperience" as const },
  { id: "projects", key: "navProjects" as const },
  { id: "certificates", key: "navCertificates" as const },
  { id: "contact", key: "navContact" as const },
];

export function SiteHeader() {
  const { t, lang } = useI18n();
  const { name } = useContentBrand();
  const shortName = lang === "fa" ? "مهیاد" : "Mehyad";
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/85">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label={name}
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground overflow-clip  ring-2 ring-card">
            {/* {initials} */}
              <Image src={ProfileImage} alt="Profile image" className=" object-cover w-full scale-150"/>
          </span>
          <SquishName
            key={name}
            full={name}
            short={shortName}
            split={lang === "fa" ? "words" : "chars"}
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              className="rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t[item.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <LanguageToggle />
          <Button
            render={<a href="/resume.pdf" download />}
            size="sm"
            className="ms-1 hidden md:inline-flex"
          >
            <Icon icon={Download01Icon} data-icon="inline-start" />
            {t.downloadCv}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            className="md:hidden"
            aria-label={open ? t.closeMenu : t.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon icon={open ? Close : Menu01Icon} />
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border bg-card md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="mx-auto flex max-w-5xl flex-col px-2 py-2" aria-label="Mobile">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {t[item.key]}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download
            onClick={() => setOpen(false)}
            className="mx-2 my-1.5 inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground"
          >
            <Icon icon={Download01Icon} />
            {t.downloadCv}
          </a>
        </nav>
      </div>
    </header>
  );
}
