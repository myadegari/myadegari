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
    if (window.matchMedia("(pointer: coarse)").matches) return "low";
    if (window.innerWidth < 640) return "low";
  } catch {
    return "low";
  }
  return "high";
}

function detectDesktop(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.matchMedia("(min-width: 1024px)").matches;
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
    try {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const applyMotion = () => setEnabled(initialMotionEnabled());
      mq.addEventListener("change", applyMotion);
      cleanups.push(() => mq.removeEventListener("change", applyMotion));
    } catch {
      // ignore
    }

    const onResize = () => {
      setQuality(detectQuality());
      setIsDesktop(detectDesktop());
    };
    window.addEventListener("resize", onResize);
    cleanups.push(() => window.removeEventListener("resize", onResize));

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
