"use client";

import { HugeiconsIcon as Icon } from "@hugeicons/react";
import {
  Mail01Icon,
  PhoneIcon,
  Link01Icon,
  Briefcase01Icon,
  LanguageSquareIcon,
} from "@hugeicons/core-free-icons";
import { SectionCard } from "@/components/shared/section-card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/providers/i18n-provider";

export function RightRail() {
  const { t, data } = useI18n();
  const { profile } = data;

  return (
    <aside className="space-y-6 lg:sticky lg:top-36" aria-label="Profile details">
      <SectionCard id="quick-contact" title={t.quickContactTitle} dustExit="stayOnDesktop">
        <ul className="space-y-3 text-sm">
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2.5 text-primary hover:underline"
            >
              <Icon icon={Mail01Icon} className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate">{profile.email}</span>
            </a>
          </li>
          <li className="flex items-center gap-2.5 text-muted-foreground">
            <Icon icon={PhoneIcon} className="size-4 shrink-0" />
            <span dir="ltr">{profile.phone}</span>
          </li>
          <li>
            <a
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-primary hover:underline"
            >
              <Icon icon={Link01Icon} className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate">{profile.website}</span>
            </a>
          </li>
        </ul>
      </SectionCard>

      <SectionCard id="skills" title={t.skillsTitle} dustExit="stayOnDesktop">
        <div className="flex flex-wrap gap-1.5">
          {profile.skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </SectionCard>

      <SectionCard id="languages" title={t.languagesTitle} dustExit="stayOnDesktop">
        <ul className="space-y-2.5 text-sm text-foreground/90">
          {profile.languages.map((language) => (
            <li key={language} className="flex items-center gap-2.5">
              <Icon
                icon={LanguageSquareIcon}
                className="size-4 shrink-0 text-muted-foreground"
              />
              {language}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard id="rail-education" title={t.educationTitle} dustExit="stayOnDesktop">
        <ul className="space-y-3 text-sm">
          {data.education.slice(0, 2).map((item) => (
            <li key={`${item.school}-${item.period}`} className="flex gap-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                <Icon icon={Briefcase01Icon} className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="font-medium">{item.school}</p>
                <p className="text-muted-foreground">{item.degree}</p>
                <p className="text-xs text-muted-foreground">{item.period}</p>
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>
    </aside>
  );
}
