"use client";

import { Award, Envelope, Language, Link, Phone } from "reicon-react";
import { SectionCard } from "@/components/shared/section-card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/providers/i18n-provider";
import { CREDLY_PROFILE_URL } from "@/lib/certificates";

export function RightRail() {
  const { t, data } = useI18n();
  const { profile } = data;

  return (
    <aside className="space-y-6 lg:sticky lg:top-20" aria-label="Profile details">
      <SectionCard id="quick-contact" title={t.quickContactTitle} dustExit="stayOnDesktop">
        <ul className="space-y-3 text-sm">
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2.5 text-primary hover:underline"
            >
              <Envelope className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate">{profile.email}</span>
            </a>
          </li>
          <li className="flex items-center gap-2.5 text-muted-foreground">
            <Phone className="size-4 shrink-0" />
            <span dir="ltr">{profile.phone}</span>
          </li>
          <li>
            <a
              href={`https://${profile.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-primary hover:underline"
            >
              <Link className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate">{profile.website}</span>
            </a>
          </li>
          <li>
            <a
              href={CREDLY_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-primary hover:underline"
            >
              <Award className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate">{t.credlyProfile}</span>
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
              <Language
                className="size-4 shrink-0 text-muted-foreground"
              />
              {language}
            </li>
          ))}
        </ul>
      </SectionCard>
    </aside>
  );
}
