"use client";

import { Download, Menu, Xmark } from "reicon-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { LanguageToggle } from "@/components/shared/language-toggle";
import { useI18n } from "@/components/providers/i18n-provider";
import { useContentBrand } from "@/components/shared/use-content-brand";
import { SquishName } from "@/components/layout/squish-name";
import ProfileImage from "../../public/profile.jpg";
import Image from "next/image";
const navItems = [
  { id: "about", key: "navAbout" as const },
  { id: "experience", key: "navExperience" as const },
  { id: "education", key: "navEducation" as const },
  { id: "projects", key: "navProjects" as const },
  { id: "certificates", key: "navCertificates" as const },
  { id: "contact", key: "navContact" as const },
];

export function SiteHeader() {
  const { t, lang, dir } = useI18n();
  const { name } = useContentBrand();
  const shortName = lang === "fa" ? "مهیاد" : "Mehyad";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/85">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
          aria-label={name}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground overflow-clip  ring-2 ring-card">
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

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
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
            className="ms-1 hidden lg:inline-flex"
          >
            <Download data-icon="inline-start" />
            {t.downloadCv}
          </Button>
          {/* The panel opens from the inline-start, the conventional nav-drawer
              side: left in LTR, right in RTL. */}
          <Drawer swipeDirection={dir === "rtl" ? "right" : "left"}>
            <DrawerTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  className="lg:hidden"
                  aria-label={t.menu}
                />
              }
            >
              <Menu />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="flex-row items-center justify-between">
                <DrawerTitle>{t.menu}</DrawerTitle>
                <DrawerClose
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      aria-label={t.closeMenu}
                    />
                  }
                >
                  <Xmark />
                </DrawerClose>
              </DrawerHeader>
              <nav
                aria-label="Mobile"
                className="flex flex-col gap-0.5 p-2"
              >
                {navItems.map((item) => (
                  <DrawerClose
                    key={item.id}
                    render={
                      <a
                        href={`/#${item.id}`}
                        className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      />
                    }
                  >
                    {t[item.key]}
                  </DrawerClose>
                ))}
                <DrawerClose
                  render={
                    <a
                      href="/resume.pdf"
                      download
                      className="mt-1.5 inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground"
                    />
                  }
                >
                  <Download data-icon="inline-start" />
                  {t.downloadCv}
                </DrawerClose>
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
