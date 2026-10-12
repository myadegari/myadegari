"use client";

import { loadGsap } from "./gsap-runtime";

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

/** GSAP fallback: a solid veil sweeps across, theme swaps at full cover. */
async function gsapWipe(direction: ThemeDirection, toggleTheme: () => void) {
  const { gsap } = await loadGsap();
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
    inFlight = false;
  }
}

/**
 * Direction-aware theme transition.
 * - Light -> dark: veil wipes top-to-bottom with a cool flash.
 * - Dark -> light: veil wipes bottom-to-top with a warm flash.
 * Uses the View Transitions API where available, GSAP overlay elsewhere.
 * The toggle icon morph is owned by morphicons in theme-toggle.tsx.
 * Reduced motion (or a running transition) falls back to an instant swap.
 */
export function animatedThemeToggle({ theme, toggleTheme }: AnimatedToggleOptions) {
  const direction: ThemeDirection = theme === "light" ? "to-dark" : "to-light";

  if (inFlight || prefersReducedMotion()) {
    toggleTheme();
    return;
  }

  const startViewTransition = document.startViewTransition?.bind(document);
  if (startViewTransition) {
    inFlight = true;
    const root = document.documentElement;
    root.dataset.themeDirection = direction;
    try {
      const transition = startViewTransition(() => toggleTheme());
      // Safety net: always clean up even if the transition promise never settles.
      const safety = window.setTimeout(() => {
        delete root.dataset.themeDirection;
        inFlight = false;
      }, 900);
      void transition.finished
        .catch(() => {})
        .finally(() => {
          window.clearTimeout(safety);
          delete root.dataset.themeDirection;
          inFlight = false;
        });
    } catch {
      delete root.dataset.themeDirection;
      inFlight = false;
      toggleTheme();
    }
    return;
  }

  inFlight = true;
  void gsapWipe(direction, toggleTheme).catch(() => {
    toggleTheme();
    inFlight = false;
  });
}
