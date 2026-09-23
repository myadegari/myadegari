"use client";

import { createElement, type ReactNode } from "react";
import { useDustSection, type DustExitMode } from "./use-dust-section";

type AnimatedTag = "div" | "li" | "section" | "article" | "header" | "nav";

interface AnimatedSectionProps {
  as?: AnimatedTag;
  id?: string;
  className?: string;
  delay?: number;
  burstScale?: number;
  exit?: DustExitMode;
  children: ReactNode;
}

/** Drop-in wrapper that dust-animates any block on scroll enter/exit. */
export function AnimatedSection({
  as = "div",
  id,
  className,
  delay,
  burstScale,
  exit,
  children,
}: AnimatedSectionProps) {
  const ref = useDustSection<HTMLElement>({ delay, burstScale, exit });
  return createElement(
    as,
    { ref: ref as never, id, className },
    children
  );
}
