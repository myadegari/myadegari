"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Download, Menu, Xmark } from "reicon-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { sectionNavItems, sectionForPathname } from "@/lib/section-nav-items";
import { useActiveSection } from "@/fx/use-active-section";
import { cn } from "@/lib/utils";
import ProfileImage from "../../public/profile.jpg";
import Image from "next/image";

export function SiteHeader() {
  const { t, lang, dir } = useI18n();
  const { name } = useContentBrand();
  const shortName = lang === "fa" ? "مهیاد" : "Mehyad";
  const activeSection = useActiveSection();
  const pathname = usePathname();
  // Sub-pages have no sections to scroll-spy, so they mark their section by
  // route instead: /projects and /projects/[slug] belong to Projects,
  // /certificates to Certificates.
  const routeSection = sectionForPathname(pathname);

  const headerRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [indicator, setIndicator] = useState<{ x: number; width: number } | null>(
    null
  );
  // Hover and keyboard focus both preview the bar; it falls back to the
  // scroll-spy's section once neither is showing.
  const [previewId, setPreviewId] = useState<string | null>(null);
  // Two distinct things. `currentSection` is where the reader actually is, and
  // is the only thing allowed to drive aria-current and the text colour.
  // `barSection` additionally follows the pointer. Conflating them would
  // announce a hover as though the reader had navigated.
  const currentSection = routeSection ?? activeSection;
  const barSection = previewId ?? currentSection;

  // Geometry only: the bar is placed from the link's own box relative to the
  // header, so no direction branching is needed and it tracks correctly in RTL.
  const placeIndicator = useCallback(() => {
    const header = headerRef.current;
    const link = barSection ? linkRefs.current.get(barSection) : null;
    if (!header || !link) {
      setIndicator(null);
      return;
    }
    const headerBox = header.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    setIndicator({ x: linkBox.left - headerBox.left, width: linkBox.width });
  }, [barSection]);

  useEffect(() => {
    placeIndicator();
  }, [placeIndicator]);

  // Kept in a ref so the observer below can stay subscribed across hover
  // changes; `placeIndicator` is rebuilt on every preview.
  const placeRef = useRef(placeIndicator);
  useEffect(() => {
    placeRef.current = placeIndicator;
  }, [placeIndicator]);

  // Link widths move for three unrelated reasons: web fonts land after first
  // paint, the EN/FA labels are very different lengths, and the viewport
  // resizes. Observing the nav catches all three, since each one changes the
  // measured width of its links. Subscribes once: placement on hover and on
  // scroll is the other effect's job, and `placeRef` keeps this one current.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const observer = new ResizeObserver(() => placeRef.current());
    observer.observe(nav);
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) placeRef.current();
    });
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/85 overflow-hidden"
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 px-3 sm:gap-3 sm:px-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
          aria-label={name}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground overflow-clip  ring-2 ring-card">
            {/* {initials} */}
              <Image
                src={ProfileImage}
                alt="Profile image"
                // The avatar renders at 32px in a circle; without an explicit
                // sizes hint the optimiser assumes full viewport width and
                // ships the 640px source for it.
                sizes="32px"
                className="object-cover w-full scale-150"
              />
          </span>
          <SquishName
            key={name}
            full={name}
            short={shortName}
            split={lang === "fa" ? "words" : "chars"}
          />
        </Link>

        <nav
          ref={navRef}
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
          onMouseLeave={() => {
            // Keep a keyboard-driven preview alive when the mouse wanders off.
            if (!navRef.current?.contains(document.activeElement)) {
              setPreviewId(null);
            }
          }}
        >
          {sectionNavItems.map((item) => {
            const isCurrent = currentSection === item.id;
            return (
              <Link
                key={item.id}
                ref={(el) => {
                  if (el) linkRefs.current.set(item.id, el);
                  else linkRefs.current.delete(item.id);
                }}
                href={`/#${item.id}`}
                aria-current={isCurrent ? "true" : undefined}
                onMouseEnter={() => setPreviewId(item.id)}
                onFocus={() => setPreviewId(item.id)}
                onBlur={() => setPreviewId(null)}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:text-primary",
                  isCurrent ? "text-primary" : "text-muted-foreground"
                )}
              >
                {t[item.key]}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
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
                  className="size-11 lg:hidden"
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
                {sectionNavItems.map((item) => (
                  <DrawerClose
                    key={item.id}
                    render={
                      <Link
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

      {/* Scroll position. One bar riding the header's bottom border, parked
          under whichever section link is active. `sticky` already establishes
          a containing block, so no extra positioning on <header> is needed.
          Geometry goes in as custom properties; the utility owns the rest. */}
      <span
        aria-hidden="true"
        className={cn(
          "nav-indicator pointer-events-none",
          // "bg-linear-to-t from-primary to-15% to-transparent h-full rounded-none blur-lg",
          indicator ? "opacity-100" : "opacity-0"
        )}
        style={
          {
            "--nav-indicator-x": `${indicator?.x ?? 0}px`,
            "--nav-indicator-width": `${indicator?.width ?? 0}px`,
          } as CSSProperties
        }
      />
    </header>
  );
}
