"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useDust } from "./dust-provider";
import { loadGsap } from "./gsap-runtime";

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
      const { ScrollTrigger } = await loadGsap();
      ScrollTrigger.refresh();
    } catch {
      // gsap not loaded yet; triggers will measure correctly on creation
    }
  }, 140);
}

/**
 * Blur reveal animation for a section element.
 * - Enter: the card fades/scales/unblurs in.
 * - Exit: timeline reverses — card blurs and fades away (high quality only).
 * - Low quality (touch / narrow screens): reveals once on enter and stays,
 *   animating only opacity and transform.
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
    // Phones scroll far more than desktops and the reverse action makes content
    // dissolve every time the reader scrolls back up, which reads as breakage
    // on a small screen. Low quality therefore reveals once and stays put.
    const actions =
      stay || low ? "play none none none" : "play reverse play reverse";

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      try {
        const { gsap } = await loadGsap();
        if (cancelled || !ref.current) return;

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
          const cardFrom: Record<string, string | number> = { opacity: 0, y: travel };
          const cardTo: Record<string, string | number> = {
            opacity: 1,
            y: 0,
            duration: low ? 0.35 : 0.45,
            delay,
          };
          if (low) {
            // Opacity and transform only: both stay on the compositor. Scale
            // would force a re-raster of the whole card on every frame.
          } else {
            cardFrom.scale = 0.96;
            cardTo.scale = 1;
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
