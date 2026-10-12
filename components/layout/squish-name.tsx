"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { loadGsap } from "@/fx/gsap-runtime";

interface SquishNameProps {
  full: string;
  short: string;
  /** "chars" for Latin scripts, "words" for cursive scripts (e.g. Persian). */
  split?: "chars" | "words";
  delay?: number;
  className?: string;
}

function splitUnits(text: string, split: "chars" | "words"): string[] {
  if (split === "words") return text.split(/\s+/).filter(Boolean);
  return text.split("");
}

/**
 * Static only when the reader has asked for reduced motion.
 *
 * Touch devices are deliberately NOT excluded: the roll plays as an intro on
 * load and reverses on tap (tap focuses the link, which fires focusin), so
 * dropping it would remove the effect on phones for no real gain. GSAP is
 * already loaded lazily for the scroll reveals, so the name costs nothing
 * extra here.
 */
function prefersStatic(): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  } catch {
    return true;
  }
  return false;
}

function subscribeNoop() {
  return () => {};
}

/**
 * Whether this device should skip the roll animation.
 *
 * Read through useSyncExternalStore so the server and the first client render
 * agree (they report "animated"), and the value corrects itself as soon as
 * hydration finishes — no setState-in-effect, no extra render pass.
 */
function usePrefersStatic(): boolean {
  return useSyncExternalStore(subscribeNoop, prefersStatic, () => false);
}

export function SquishName({
  full,
  short,
  split = "chars",
  delay = 3600,
  className,
}: SquishNameProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const fullLayerRef = useRef<HTMLSpanElement>(null);
  const shortLayerRef = useRef<HTMLSpanElement>(null);
  const isStatic = usePrefersStatic();
  // Instant toggle only used when the roll is skipped (no animation).
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (isStatic) return;
    const wrap = wrapRef.current;
    const fullLayer = fullLayerRef.current;
    const shortLayer = shortLayerRef.current;
    if (!wrap || !fullLayer || !shortLayer) return;

    const fullUnits = fullLayer.querySelectorAll<HTMLElement>(".squish-unit");
    const shortUnits = shortLayer.querySelectorAll<HTMLElement>(".squish-unit");
    if (fullUnits.length === 0 || shortUnits.length === 0) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      try {
        const { gsap } = await loadGsap();
        if (cancelled) return;

        // English sweeps left→right, Persian right→left. In RTL the first DOM
        // unit is the rightmost one, so "start" already means right→left there.
        const sweepFrom = split === "chars" ? 0.02 : 0.1;

        // One timeline: full rolls down out of the clipped stage while short
        // rolls down in from above, unit by unit with stagger.
        const tl = gsap.timeline({ paused: true });
        tl.to(
          fullUnits,
          { yPercent: 110, duration: 0.55, ease: "power3.out", stagger: sweepFrom },
          0
        );
        tl.fromTo(
          shortUnits,
          { yPercent: -110 },
          { yPercent: 0, duration: 0.55, ease: "power3.out", stagger: sweepFrom },
          0
        );

        const onEnter = () => tl.reverse();
        const onLeave = () => tl.play();
        // Intro: auto-roll to the short name. Hover/focus reverses the roll.
        const id = window.setTimeout(() => tl.play(), delay);
        wrap.addEventListener("mouseenter", onEnter);
        wrap.addEventListener("mouseleave", onLeave);
        wrap.addEventListener("focusin", onEnter);
        wrap.addEventListener("focusout", onLeave);

        cleanup = () => {
          window.clearTimeout(id);
          wrap.removeEventListener("mouseenter", onEnter);
          wrap.removeEventListener("mouseleave", onLeave);
          wrap.removeEventListener("focusin", onEnter);
          wrap.removeEventListener("focusout", onLeave);
          tl.kill();
        };
      } catch {
        // Animation lib unavailable: the full name simply stays put and the
        // hover handlers do nothing. Nothing is broken, it just does not roll.
      }
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [isStatic, delay, split]);

  if (isStatic) {
    return (
      <span
        className={cn(
          // The stage reserves the width of the longer of the two names, so on
          // a phone the full name only fits at the smaller size. Desktop keeps
          // text-sm from sm up.
          "min-w-0 max-w-full truncate cursor-default text-2xs font-semibold tracking-tight sm:text-sm",
          className
        )}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        title={full}
      >
        <span aria-hidden="true">{expanded ? full : short}</span>
        <span className="sr-only">{`${full} (${short})`}</span>
      </span>
    );
  }

  const renderUnits = (units: string[]) =>
    units.map((u, i) => (
      <span key={i}>
        <span className="squish-unit">{u === " " ? "\u00A0" : u}</span>
        {split === "words" && i < units.length - 1 ? "\u00A0" : null}
      </span>
    ));

  return (
    <span
      ref={wrapRef}
      className={cn(
        // min-w-0 + max-w-full let the stage shrink inside the header instead
        // of pushing the controls off screen. It still reserves the width of
        // the longer name, so the smaller size below sm is what keeps the full
        // name from being clipped on a phone.
        "squish-stage min-w-0 max-w-full truncate cursor-default text-2xs font-semibold tracking-tight sm:text-sm",
        className
      )}
      title={full}
    >
      <span ref={fullLayerRef} className="squish-layer" aria-hidden="true">
        {renderUnits(splitUnits(full, split))}
      </span>
      <span ref={shortLayerRef} className="squish-layer" aria-hidden="true">
        {renderUnits(splitUnits(short, split))}
      </span>
      <span className="sr-only">{`${full} (${short})`}</span>
    </span>
  );
}