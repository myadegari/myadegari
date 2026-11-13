/**
 * Lighthouse scores for this site, measured against a production build
 * (`next build` + `next start`) with Lighthouse 13.6 in mobile mode.
 *
 * These are hand-recorded, not computed at runtime: re-run Lighthouse after a
 * meaningful performance change and update the numbers here.
 */
export const lighthouse = {
  measuredAt: "2026-11-13",
  scores: [
    { id: "performance", score: 92 },
    { id: "accessibility", score: 100 },
    { id: "best-practices", score: 96 },
    { id: "seo", score: 100 },
  ],
} as const;
