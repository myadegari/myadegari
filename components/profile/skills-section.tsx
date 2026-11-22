"use client";

import { SectionCard } from "@/components/shared/section-card";
import { useI18n } from "@/components/providers/i18n-provider";
import { cn } from "@/lib/utils";

/**
 * Skills as a catalogue, not a component collection.
 *
 * The content is a taxonomy, so the design treats it like one: a hanging
 * discipline name in the left gutter, its skills set as a readable run of
 * prose beside it. Tiles, rules, counters, caps labels and mono captions are
 * all gone — each was decoration standing in for hierarchy. What carries the
 * section instead is type: the name at a step above body copy in solid ink,
 * the skills in the muted register, and the lead discipline in full ink
 * because it is the thing being sold. Front-end is moved to the top for the
 * same reason — someone scanning for "can this person build my interface"
 * should meet that answer first.
 *
 * The one interaction is quiet: the hovered row's name darkens to the accent
 * ink while its neighbours stay put. Nothing moves on scroll, nothing fades
 * in, and the section is fully static under reduced motion.
 */
export function SkillsSection() {
  const { t, data, lang } = useI18n();
  const groups = data.profile.skills;
  const core = groups[1] ?? groups[0];
  const ordered = [core, ...groups.filter((group) => group !== core)];
  const separator = lang === "fa" ? "، " : ", ";

  return (
    <SectionCard id="skills" title={t.skillsTitle}>
      <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-[10rem_minmax(0,1fr)]">
        {ordered.map((group) => {
          const isCore = group === core;

          return (
            <div key={group.label} className="contents group/row">
              <dt
                className={cn(
                  "text-base font-semibold leading-7 tracking-tight transition-colors sm:text-lg",
                  isCore ? "text-foreground" : "text-foreground/80 group-hover/row:text-foreground"
                )}
              >
                {group.label}
              </dt>
              <dd
                translate="no"
                className={cn(
                  "break-words text-sm leading-7",
                  isCore ? "text-foreground/90" : "text-muted-foreground"
                )}
              >
                {group.items.join(separator)}
              </dd>
            </div>
          );
        })}
      </dl>
    </SectionCard>
  );
}
