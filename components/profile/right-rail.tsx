"use client";

import { Envelope, Language, Link, PaperPlane } from "reicon-react";
import { SectionCard } from "@/components/shared/section-card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/components/providers/i18n-provider";

/**
 * On desktop this is a sticky column in the page grid.
 *
 * Below lg there is no second column, so the three cards would stack as one
 * block at the very end of the page. `contents` dissolves the wrapper and lets
 * each card become its own grid item, which is what makes the per-card `order`
 * classes able to move them. Nothing changes at lg: the wrapper becomes a block
 * again, the children stop being grid items, and `order` no longer applies, so
 * they fall back to source order inside the sticky column.
 *
 * `display: contents` does not remove the element from the accessibility tree,
 * so the complementary landmark survives.
 */
export function RightRail() {
  const { t, data } = useI18n();
  const { profile } = data;

  return (
    <aside
      className="contents lg:block lg:space-y-6 lg:sticky lg:top-20"
      aria-label="Profile details"
    >
      {/* Above the main column on mobile: a reader on a phone should not have
          to scroll past six sections to find how to contact their host. */}
      <SectionCard
        id="quick-contact"
        title={t.quickContactTitle}
        dustExit="stayOnDesktop"
        className="order-1 lg:order-none"
      >
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
          <li>
            <a
              href={`https://t.me/${profile.telegram.replace(/^@/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-primary hover:underline"
            >
              <PaperPlane className="size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0 truncate" dir="ltr">
                {profile.telegram}
              </span>
            </a>
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
        </ul>
      </SectionCard>

      <SectionCard
        id="skills"
        title={t.skillsTitle}
        dustExit="stayOnDesktop"
        className="order-2 lg:order-none"
      >
        <div className="flex flex-wrap gap-1.5">
          {profile.skills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </SectionCard>

      {/* Last on mobile: supplementary context, not something to reach first. */}
      <SectionCard
        id="languages"
        title={t.languagesTitle}
        dustExit="stayOnDesktop"
        className="order-4 lg:order-none"
      >
        <ul className="space-y-2.5 text-sm text-foreground/90">
          {profile.languages.map((language) => (
            <li key={language} className="flex items-center gap-2.5">
              <Language className="size-4 shrink-0 text-muted-foreground" />
              {language}
            </li>
          ))}
        </ul>
      </SectionCard>
    </aside>
  );
}