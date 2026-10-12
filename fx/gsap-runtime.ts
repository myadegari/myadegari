"use client";

/**
 * Single async boundary for the animation libraries.
 *
 * GSAP is only ever needed after hydration, and it is large enough that it
 * should never be part of a page's initial payload. Importing it directly
 * from each caller does not guarantee that: when two modules dynamically
 * import the same package, the bundler is free to hoist the shared dependency
 * into a chunk that the initial payload already loads, which puts GSAP back on
 * the critical path. Funnelling every dynamic GSAP import through this one
 * module keeps the whole library behind a single async edge, and gives the
 * registration of ScrollTrigger exactly one home.
 *
 * The promise is memoised so concurrent callers await the same load, and the
 * rejection is reset so a transient failure can be retried.
 */

export interface GsapRuntime {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
}

let pending: Promise<GsapRuntime> | null = null;

export function loadGsap(): Promise<GsapRuntime> {
  if (!pending) {
    pending = import("./gsap-plugins")
      .then(({ gsap, ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        return { gsap, ScrollTrigger };
      })
      .catch((error) => {
        pending = null;
        throw error;
      });
  }
  return pending;
}