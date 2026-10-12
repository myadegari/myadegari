"use client";

/**
 * The animation libraries, isolated behind one dynamic import.
 *
 * This module exists purely to give the bundler a project-local async boundary
 * to split on. Importing "gsap/ScrollTrigger" directly from the callers pulled
 * the chunk into the page's initial script list, because the callers themselves
 * ship in the first payload. Going through here keeps the whole library lazy.
 *
 * Both are re-exported from one module so they are always fetched together and
 * never land in two separate chunks.
 */

export { gsap } from "gsap";
export { ScrollTrigger } from "gsap/ScrollTrigger";