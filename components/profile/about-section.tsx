"use client";

import { SectionCard } from "@/components/shared/section-card";
import { useI18n } from "@/components/providers/i18n-provider";
import { lighthouse } from "@/lib/lighthouse";
import type { UiStrings } from "@/lib/strings";

const LABEL_KEYS: Record<string, keyof UiStrings> = {
  performance: "lighthousePerformance",
  accessibility: "lighthouseAccessibility",
  "best-practices": "lighthouseBestPractices",
  seo: "lighthouseSeo",
};

export function AboutSection() {
  const { t, data } = useI18n();

  return (
    <SectionCard id="about" title={t.aboutTitle}>
      <p className="text-sm leading-relaxed text-foreground/90">
        {data.profile.about}
      </p>

      <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {lighthouse.scores.map(({ id, score }) => (
          <li
            key={id}
            className="rounded-lg border border-border bg-muted/40 px-3 py-2"
          >
            <p
              className={
                score >= 90
                  ? "text-xl font-semibold tabular-nums text-primary"
                  : "text-xl font-semibold tabular-nums text-foreground/80"
              }
            >
              {score}
            </p>
            <p className="text-xs text-muted-foreground">{t[LABEL_KEYS[id]]}</p>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-muted-foreground">{t.lighthouseNote}</p>
    </SectionCard>
  );
}
