"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useDust } from "./dust-provider";

export type DustExitMode =
  | "dust"
  | "stay"
  | "stayOnDesktop";

export interface DustSectionOptions {
  /** Stagger delay in seconds (for grids). */
  delay?: number;
  /** Vertical travel in px. */
  distance?: number;
  /** Particle count multiplier. */
  burstScale?: number;
  /**
   * Exit behavior once the section leaves the viewport.
   * - "dust": dissolve back to scattering dust (default).
   * - "stay": play the enter animation once, never hide again.
   * - "stayOnDesktop": "stay" on desktop (>=1024px), "dust" below it.
   */
  exit?: DustExitMode;
}

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

/** Debounced ScrollTrigger refresh for layout shifts (filters, lang, images). */
export function scheduleScrollRefresh() {
  if (typeof window === "undefined") return;
  if (refreshTimer) return;
  refreshTimer = setTimeout(async () => {
    refreshTimer = null;
    try {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      ScrollTrigger.refresh();
    } catch {
      // gsap not loaded yet; triggers will measure correctly on creation
    }
  }, 140);
}

/**
 * Blur reveal animation for a section element.
 * - Enter: the card fades/scales/unblurs in.
 * - Exit: timeline reverses — card blurs and fades away.
 * - Reduced motion: returns a plain ref, content stays static.
 */
export function useDustSection<T extends HTMLElement = HTMLElement>(
  options?: DustSectionOptions
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { enabled, quality, mounted, isDesktop } = useDust();
  const { delay = 0, distance, exit = "dust" } = options ?? {};
  const stay = exit === "stay" || (exit === "stayOnDesktop" && isDesktop);

  useEffect(() => {
    const el = ref.current;
    if (!el || !mounted || !enabled) return;
    const low = quality === "low";
    const travel = distance ?? (low ? 16 : 28);
    const actions = stay ? "play none none none" : "play reverse play reverse";

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled || !ref.current) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: el,
              start: "top 100%",
              end: "bottom 12%",
              toggleActions: actions,
            },
          });
          const cardFrom: Record<string, string | number> = {
            opacity: 0,
            y: travel,
            scale: 0.96,
          };
          const cardTo: Record<string, string | number> = {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: low ? 0.35 : 0.45,
            delay,
          };
          if (!low) {
            cardFrom.filter = "blur(10px)";
            cardTo.filter = "blur(0px)";
          }
          tl.fromTo(el, cardFrom, cardTo, 0);
        });
        cleanup = () => {
          ctx.revert();
        };
        scheduleScrollRefresh();
      } catch {
        // Animation libs unavailable: leave content static and visible.
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [enabled, mounted, quality, isDesktop, delay, distance, stay]);

  return ref;
}
