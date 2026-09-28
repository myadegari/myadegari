"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { sectionNavIds } from "@/lib/section-nav-items";

/**
 * Id of the section currently sitting in the reading band, or null when the
 * reader is above the first one.
 *
 * The list is imported rather than passed in so the effect's dependency array
 * stays referentially stable across renders.
 *
 * Detection is an IntersectionObserver band starting just below the 64px
 * sticky header. It cannot see two edges on its own: the last section is often
 * too short to ever reach the band, and the hero above the first section
 * belongs to nothing at all. `applyBoundaries` resolves those two cases and
 * takes precedence; everything between them is the observer's business. Both
 * are reached only from async callbacks.
 */
export function useActiveSection(): string | null {
  const pathname = usePathname();
  // Keyed by pathname so a page without sections needs no reset: the previous
  // page's value simply stops matching and this returns null on its own.
  const [tracked, setTracked] = useState<{ key: string; id: string | null } | null>(
    null
  );

  useEffect(() => {
    const sections = sectionNavIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    // Archive and project detail pages have no sections to observe.
    if (sections.length === 0) return;

    const commit = (id: string | null) => setTracked({ key: pathname, id });
    const onScreen = new Set<string>();

    /** Resolves the two edges the band cannot. True when it took over. */
    const applyBoundaries = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        commit(sectionNavIds[sectionNavIds.length - 1]);
        return true;
      }
      if (window.scrollY < 8) {
        commit(null);
        return true;
      }
      return false;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (applyBoundaries()) return;
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target.id);
          else onScreen.delete(entry.target.id);
        }
        // Document order, so the topmost section in the band wins.
        commit(sectionNavIds.find((id) => onScreen.has(id)) ?? null);
      },
      { rootMargin: "-72px 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((el) => observer.observe(el));

    const onScroll = () => {
      applyBoundaries();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return tracked?.key === pathname ? tracked.id : null;
}
