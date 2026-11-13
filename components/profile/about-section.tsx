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

/**
 * Lighthouse's own score colours: green 90-100, orange 50-89, red 0-49.
 * They are report values, not theme tokens, so they stay literal here.
 */
function scoreColor(score: number) {
  if (score >= 90) return "#0cce6b";
  if (score >= 50) return "#ffa400";
  return "#ff4e42";
}

function ScoreGauge({ score, label }: { score: number; label: string }) {
  const size = 64;
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = scoreColor(score);
  const center = size / 2;

  return (
    <li
      className="flex flex-col items-center gap-1.5"
      style={{ "--gauge-color": color } as React.CSSProperties}
    >
      <div className="relative size-16">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          role="img"
          aria-label={`${label}: ${score}`}
          className="block"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-border"
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - score / 100)}
            transform={`rotate(-90 ${center} ${center})`}
          />
        </svg>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums text-(--gauge-color)"
        >
          {score}
        </span>
      </div>
      <span className="text-center text-xs text-muted-foreground">{label}</span>
    </li>
  );
}

export function AboutSection() {
  const { t, data } = useI18n();

  return (
    <SectionCard id="about" title={t.aboutTitle}>
      <p className="text-sm leading-relaxed text-foreground/90">
        {data.profile.about}
      </p>

      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {lighthouse.scores.map(({ id, score }) => (
          <ScoreGauge
            key={id}
            score={score}
            label={t[LABEL_KEYS[id]]}
          />
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">{t.lighthouseNote}</p>
    </SectionCard>
  );
}
