"use client";

import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { Briefcase01Icon, School01Icon } from "@hugeicons/core-free-icons";
import { SectionCard } from "@/components/shared/section-card";
import { useI18n } from "@/components/providers/i18n-provider";
import type { EducationItem, ExperienceItem } from "@/lib/types";

function CompanyMark({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <span className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
      {icon ?? label.slice(0, 1)}
    </span>
  );
}

function TimelineRow({
  mark,
  title,
  subtitle,
  period,
  location,
  bullets,
}: {
  mark: React.ReactNode;
  title: string;
  subtitle: string;
  period: string;
  location?: string;
  bullets?: string[];
}) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <CompanyMark label={subtitle} icon={mark} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <div className="shrink-0 text-sm text-muted-foreground sm:text-end">
            <p>{period}</p>
            {location && <p className="text-xs">{location}</p>}
          </div>
        </div>
        {bullets && bullets.length > 0 && (
          <ul className="mt-2 list-disc space-y-1.5 ps-5 text-sm leading-relaxed text-foreground/85 marker:text-muted-foreground">
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const { t, data } = useI18n();

  return (
    <SectionCard id="experience" title={t.experienceTitle}>
      <ul className="divide-y divide-border">
        {data.experience.map((item: ExperienceItem) => (
          <li key={`${item.company}-${item.period}`} className="first:pt-0 last:pb-0 pt-5 first:pb-5">
            <TimelineRow
              mark={<Icon icon={Briefcase01Icon} className="size-5" />}
              title={item.role}
              subtitle={item.company}
              period={item.period}
              location={item.location}
              bullets={item.bullets}
            />
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}

export function EducationSection() {
  const { t, data } = useI18n();

  return (
    <SectionCard id="education" title={t.educationTitle}>
      <ul className="divide-y divide-border">
        {data.education.map((item: EducationItem) => (
          <li key={`${item.school}-${item.period}`} className="first:pt-0 last:pb-0 pt-5 first:pb-5">
            <TimelineRow
              mark={<Icon icon={School01Icon} className="size-5" />}
              title={item.degree}
              subtitle={item.school}
              period={item.period}
              bullets={item.bullets}
            />
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
