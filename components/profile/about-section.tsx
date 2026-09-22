"use client";

import { SectionCard } from "@/components/shared/section-card";
import { useI18n } from "@/components/providers/i18n-provider";

export function AboutSection() {
  const { t, data } = useI18n();

  return (
    <SectionCard id="about" title={t.aboutTitle}>
      <p className="text-sm leading-relaxed text-foreground/90">
        {data.profile.about}
      </p>
    </SectionCard>
  );
}
