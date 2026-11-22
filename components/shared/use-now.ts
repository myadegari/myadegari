"use client";

import { useEffect, useState } from "react";

/**
 * Current time, resolved once after mount.
 *
 * Returns null during the static render and hydration so the prerendered HTML
 * and the first client render agree; the value then follows the visitor's
 * clock instead of the time the site was built.
 */
export function useNow(): Date | null {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => setNow(new Date()), 0);
    return () => window.clearTimeout(id);
  }, []);

  return now;
}
