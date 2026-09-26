"use client";

import type { MouseEvent } from "react";

export type ThemeDirection = "to-dark" | "to-light";

interface AnimatedToggleOptions {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

let inFlight = false;

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

function markButton(button: HTMLElement | null, direction: ThemeDirection) {
  button?.classList.add("theme-animating", direction);
}

function unmarkButton(button: HTMLElement | null, direction: ThemeDirection) {
  button?.classList.remove("theme-animating", direction);
}

/** GSAP fallback: a solid veil sweeps across, theme swaps at full cover. */
async function gsapWipe(
  button: HTMLElement | null,
  direction: ThemeDirection,
  toggleTheme: () => void
) {
  const { gsap } = await import("gsap");
  const toDark = direction === "to-dark";

  const veil = document.createElement("div");
  veil.className = "theme-wipe-veil";
  veil.style.background = toDark ? "#1b1f23" : "#f4f2ee";
  document.body.appendChild(veil);

  const flash = document.createElement("div");
  flash.className = "theme-wipe-flash";
  flash.style.background = toDark ? "#9ecfff" : "#ffffff";
  document.body.appendChild(flash);

  const coverFrom = toDark ? "-100%" : "100%";
  const exitTo = toDark ? "100%" : "-100%";

  try {
    await new Promise<void>((resolve) => {
      const tl = gsap.timeline({ onComplete: () => resolve() });
      tl.fromTo(
        veil,
        { y: coverFrom },
        { y: "0%", duration: 0.28, ease: "power3.in" }
      );
      tl.add(() => toggleTheme());
      tl.fromTo(
        flash,
        { opacity: 0 },
        { opacity: 0.35, duration: 0.07, ease: "power1.out" }
      );
      tl.to(flash, { opacity: 0, duration: 0.1, ease: "power1.in" });
      tl.to(veil, { y: exitTo, duration: 0.3, ease: "power3.out" }, "<");
    });
  } finally {
    veil.remove();
    flash.remove();
    unmarkButton(button, direction);
    inFlight = false;
  }
}

/**
 * Direction-aware theme transition.
 * - Light -> dark: veil wipes top-to-bottom, cool flash, icon spins clockwise.
 * - Dark -> light: veil wipes bottom-to-top, warm flash, icon spins counter-clockwise.
 * Uses the View Transitions API where available, GSAP overlay elsewhere.
 * Reduced motion (or a running transition) falls back to an instant swap.
 */
export function animatedThemeToggle(
  event: MouseEvent<HTMLElement>,
  { theme, toggleTheme }: AnimatedToggleOptions
) {
  const direction: ThemeDirection = theme === "light" ? "to-dark" : "to-light";
  const button = event.currentTarget as HTMLElement | null;

  if (inFlight || prefersReducedMotion()) {
    toggleTheme();
    return;
  }

  const startViewTransition = document.startViewTransition?.bind(document);
  if (startViewTransition) {
    inFlight = true;
    markButton(button, direction);
    const root = document.documentElement;
    root.dataset.themeDirection = direction;
    try {
      const transition = startViewTransition(() => toggleTheme());
      // Safety net: always clean up even if the transition promise never settles.
      const safety = window.setTimeout(() => {
        delete root.dataset.themeDirection;
        unmarkButton(button, direction);
        inFlight = false;
      }, 900);
      void transition.finished
        .catch(() => {})
        .finally(() => {
          window.clearTimeout(safety);
          delete root.dataset.themeDirection;
          unmarkButton(button, direction);
          inFlight = false;
        });
    } catch {
      delete root.dataset.themeDirection;
      unmarkButton(button, direction);
      inFlight = false;
      toggleTheme();
    }
    return;
  }

  inFlight = true;
  markButton(button, direction);
  void gsapWipe(button, direction, toggleTheme).catch(() => {
    toggleTheme();
    unmarkButton(button, direction);
    inFlight = false;
  });
}
