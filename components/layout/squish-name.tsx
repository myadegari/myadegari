"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

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
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  // Instant toggle only used when reduced motion is preferred (no animation).
  const [expanded, setExpanded] = useState(false);

  const fullUnits = splitUnits(full, split);
  const shortUnits = splitUnits(short, split);

  useGSAP(
    () => {
      if (reduced) return;
      const wrap = wrapRef.current;
      const fullLayer = fullLayerRef.current;
      const shortLayer = shortLayerRef.current;
      if (!wrap || !fullLayer || !shortLayer) return;

      const fullChars = fullLayer.querySelectorAll<HTMLElement>(".squish-unit");
      const shortChars = shortLayer.querySelectorAll<HTMLElement>(".squish-unit");
      if (fullChars.length === 0 || shortChars.length === 0) return;

      // English sweeps left→right, Persian right→left. In RTL the first DOM
      // unit is the rightmost one, so "start" already means right→left there.
      const isRTL = document.documentElement.dir === "rtl";
      const sweepFrom: number =
        (split === "chars")  ? 0.02 : 0.1;

      // One timeline: full rolls down out of the clipped stage while short
      // rolls down in from above, unit by unit with stagger.
      const tl = gsap.timeline({ paused: true });
      tl.to(
        fullChars,
        { yPercent: 110, duration: 0.55, ease: "power3.out", stagger: sweepFrom },
        0
      );
      tl.fromTo(
        shortChars,
        { yPercent: -110 },
        { yPercent: 0, duration: 0.55, ease: "power3.out", stagger: sweepFrom },
        0
      );

      // Intro: auto-roll to the short name. Hover/focus reverses the roll.
      const id = window.setTimeout(() => tl.play(), delay);
      const expand = () => tl.reverse();
      const collapse = () => tl.play();
      wrap.addEventListener("mouseenter", expand);
      wrap.addEventListener("mouseleave", collapse);
      wrap.addEventListener("focusin", expand);
      wrap.addEventListener("focusout", collapse);

      return () => {
        window.clearTimeout(id);
        wrap.removeEventListener("mouseenter", expand);
        wrap.removeEventListener("mouseleave", collapse);
        wrap.removeEventListener("focusin", expand);
        wrap.removeEventListener("focusout", collapse);
      };
    },
    // Remount via key={full} on lang change, so full/short are mount-time values.
    { dependencies: [delay, reduced, full, short, split], scope: wrapRef, revertOnUpdate: true }
  );

  if (reduced) {
    return (
      <span
        className={cn(
          "hidden cursor-default text-sm font-semibold tracking-tight sm:inline-block",
          className
        )}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
        title={full}
      >
        {expanded ? full : short}
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
        "squish-stage hidden cursor-default text-sm font-semibold tracking-tight sm:inline-block",
        className
      )}
      title={full}
    >
      <span ref={fullLayerRef} className="squish-layer" aria-hidden="true">
        {renderUnits(fullUnits)}
      </span>
      <span ref={shortLayerRef} className="squish-layer" aria-hidden="true">
        {renderUnits(shortUnits)}
      </span>
      <span className="sr-only">{`${full} (${short})`}</span>
    </span>
  );
}
