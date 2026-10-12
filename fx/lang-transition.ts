"use client";

import type { MouseEvent } from "react";
import type { Lang } from "@/lib/types";
import type { DustQuality } from "./dust-provider";
import { loadGsap } from "./gsap-runtime";

interface AnimatedLangToggleOptions {
  lang: Lang;
  setLang: (next: Lang) => void;
  quality: DustQuality;
}

/** Must outlast the 1.1s blur cycle, or cleanup would cut the animation short. */
const CLEANUP_TIMEOUT = 1800;
const COMMIT_TIMEOUT = 1500;
/** Blur radius at full defocus. Matches the order of magnitude useDustSection uses. */
const HAZE_BLUR = "10px";

let inFlight = false;

function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * Wait for the MutationObserver -> React re-render -> DOM commit to land.
 *
 * `setLang` only mutates <html lang|dir> synchronously; the translated text
 * arrives after React re-renders. `startViewTransition` snapshots the moment
 * its callback settles, so without this the new snapshot would capture a
 * mirrored layout still holding the previous language.
 *
 * Must not use requestAnimationFrame: the View Transitions spec suppresses the
 * update-rendering steps while the DOM-update callback is pending, so rAF
 * callbacks do not fire and the transition aborts with a DOM-update timeout.
 * MutationObserver callbacks and timers are not gated by rendering, so the
 * commit is detected here instead.
 */
function afterDomCommit() {
  return new Promise<void>((resolve) => {
    let settled = false;
    const observer = new MutationObserver(finish);
    const timer = window.setTimeout(finish, COMMIT_TIMEOUT);

    function finish() {
      if (settled) return;
      settled = true;
      observer.disconnect();
      window.clearTimeout(timer);
      resolve();
    }

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    });
  });
}

/**
 * GSAP fallback for browsers without the View Transitions API: a translucent
 * veil fades up over the page (its backdrop-filter supplies the defocus), the
 * language swaps behind it, then the veil clears.
 *
 * The swap happens under a fully opaque veil, so nothing has to be blurred
 * directly on the live DOM - blurring an ancestor of the sticky header would
 * turn it into a containing block and make it detach mid-transition.
 */
async function gsapHaze(button: HTMLElement | null, apply: () => Promise<void>) {
  const { gsap } = await loadGsap();

  const veil = document.createElement("div");
  veil.className = "lang-veil";
  veil.style.background = getComputedStyle(document.body).backgroundColor;
  document.body.appendChild(veil);

  try {
    await new Promise<void>((resolve) => {
      const tl = gsap.timeline({ onComplete: () => resolve() });
      tl.to(veil, { opacity: 1, duration: 0.4, ease: "power2.out" });
      tl.add(apply);
      tl.to(veil, { opacity: 0, duration: 0.7, ease: "power2.inOut" });
    });
  } finally {
    veil.remove();
    button?.classList.remove("lang-animating");
    inFlight = false;
  }
}

/**
 * Language transition: defocus out, swap, focus back in.
 * Scroll position is preserved across the swap so the reader keeps their place.
 * Uses the View Transitions API where available, a GSAP veil elsewhere.
 * Reduced motion (or a running transition) falls back to an instant swap.
 */
export function animatedLangToggle(
  event: MouseEvent<HTMLElement>,
  { lang, setLang, quality }: AnimatedLangToggleOptions
) {
  const next: Lang = lang === "en" ? "fa" : "en";
  const button = event.currentTarget as HTMLElement | null;

  // Restore scroll after the height change settles so the new snapshot is
  // captured at the reader's position rather than snapping to the top.
  const apply = async () => {
    const y = window.scrollY;
    setLang(next);
    await afterDomCommit();
    window.scrollTo(0, y);
  };

  const cleanup = () => {
    const root = document.documentElement;
    delete root.dataset.langAnim;
    root.style.removeProperty("--lang-haze-blur");
    button?.classList.remove("lang-animating");
    inFlight = false;
  };

  if (inFlight || prefersReducedMotion()) {
    void apply();
    return;
  }

  const startViewTransition = document.startViewTransition?.bind(document);
  if (startViewTransition) {
    inFlight = true;
    button?.classList.add("lang-animating");
    const root = document.documentElement;
    root.dataset.langAnim = "true";
    // Blurring a full-page snapshot is the expensive part, so it is gated on
    // the same quality signal useDustSection uses. Low quality keeps the
    // opacity fade and drops the blur.
    root.style.setProperty(
      "--lang-haze-blur",
      quality === "low" ? "0px" : HAZE_BLUR
    );
    try {
      const transition = startViewTransition(apply);
      // Safety net: always clean up even if the transition promise never settles.
      const safety = window.setTimeout(cleanup, CLEANUP_TIMEOUT);
      void transition.finished
        .catch(() => {})
        .finally(() => {
          window.clearTimeout(safety);
          cleanup();
        });
    } catch {
      cleanup();
      void apply();
    }
    return;
  }

  inFlight = true;
  button?.classList.add("lang-animating");
  void gsapHaze(button, apply).catch(() => {
    cleanup();
    void apply();
  });
}
