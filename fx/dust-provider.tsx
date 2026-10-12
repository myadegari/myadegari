"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { scheduleScrollRefresh } from "./use-dust-section";

export type DustQuality = "high" | "low";

interface DustContextValue {
  /** False when reduced-motion is preferred: render content statically. */
  enabled: boolean;
  quality: DustQuality;
  mounted: boolean;
  /** True at the desktop sidebar breakpoint (>=1024px). */
  isDesktop: boolean;
}

/**
 * Breakpoint queries used to pick quality and layout mode.
 *
 * These are watched as media queries rather than sampled from a resize event:
 * a mobile browser fires `resize` continuously while the reader scrolls (the
 * URL bar collapsing resizes the viewport), and every tick would re-run the
 * detection and, when the answer changed, tear down and rebuild every
 * ScrollTrigger on the page. Media queries only fire on an actual change of
 * match state.
 */
const COARSE_POINTER_QUERY = "(pointer: coarse)";
const WIDE_QUERY = "(min-width: 640px)";
const DESKTOP_QUERY = "(min-width: 1024px)";

const DustContext = createContext<DustContextValue>({
  enabled: false,
  quality: "low",
  mounted: false,
  isDesktop: false,
});

export function useDust() {
  return useContext(DustContext);
}

function subscribeNoop() {
  return () => {};
}

function initialMotionEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return true;
  }
}

function detectQuality(): DustQuality {
  if (typeof window === "undefined") return "low";
  try {
    if (window.matchMedia(COARSE_POINTER_QUERY).matches) return "low";
    if (!window.matchMedia(WIDE_QUERY).matches) return "low";
  } catch {
    return "low";
  }
  return "high";
}

function detectDesktop(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia(DESKTOP_QUERY).matches;
  } catch {
    return false;
  }
}

export function DustProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(initialMotionEnabled);
  const [quality, setQuality] = useState<DustQuality>(detectQuality);
  const [isDesktop, setIsDesktop] = useState(detectDesktop);
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const watch = (query: string, handler: () => void) => {
      try {
        const mq = window.matchMedia(query);
        mq.addEventListener("change", handler);
        cleanups.push(() => mq.removeEventListener("change", handler));
      } catch {
        // ignore
      }
    };

    watch("(prefers-reduced-motion: reduce)", () =>
      setEnabled(initialMotionEnabled())
    );
    watch(COARSE_POINTER_QUERY, () => setQuality(detectQuality()));
    watch(WIDE_QUERY, () => setQuality(detectQuality()));
    watch(DESKTOP_QUERY, () => setIsDesktop(detectDesktop()));

    // Layout shifts (language toggle, fonts, images) move triggers.
    const observer = new MutationObserver(() => scheduleScrollRefresh());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang", "class"],
    });
    cleanups.push(() => observer.disconnect());
    window.addEventListener("load", scheduleScrollRefresh);
    cleanups.push(() => window.removeEventListener("load", scheduleScrollRefresh));

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <DustContext.Provider value={{ enabled, quality, mounted, isDesktop }}>
      {children}
    </DustContext.Provider>
  );
}
