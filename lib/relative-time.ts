import type { Lang } from "@/lib/types";

/**
 * Largest-to-smallest units used to express how long ago a commit landed.
 * A date is reported in the first unit it fills at least once.
 */
const DIVISIONS: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
  { unit: "year", seconds: 365 * 24 * 60 * 60 },
  { unit: "month", seconds: 30 * 24 * 60 * 60 },
  { unit: "week", seconds: 7 * 24 * 60 * 60 },
  { unit: "day", seconds: 24 * 60 * 60 },
  { unit: "hour", seconds: 60 * 60 },
  { unit: "minute", seconds: 60 },
  { unit: "second", seconds: 1 },
];

/**
 * Localized elapsed time between an ISO date (YYYY-MM-DD) and `now`, e.g.
 * "3 weeks ago" / "۳ هفته پیش".
 */
export function timeSince(iso: string, lang: Lang, now: Date): string {
  const then = Date.parse(`${iso}T00:00:00Z`);
  if (Number.isNaN(then)) return "";

  const elapsedSeconds = (now.getTime() - then) / 1000;
  const formatter = new Intl.RelativeTimeFormat(lang === "fa" ? "fa" : "en", {
    numeric: "always",
  });

  for (const { unit, seconds } of DIVISIONS) {
    if (Math.abs(elapsedSeconds) >= seconds || unit === "second") {
      return formatter.format(-Math.round(elapsedSeconds / seconds), unit);
    }
  }
  return formatter.format(0, "second");
}
