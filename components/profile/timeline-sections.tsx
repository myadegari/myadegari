"use client";

import Image from "next/image";
import { ArrowUpRight, Book, Briefcase } from "reicon-react";
import { SectionCard } from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useI18n } from "@/components/providers/i18n-provider";
import { companyLogos } from "@/lib/company-logos";
import type { EducationItem, ExperienceItem, ExperienceLink } from "@/lib/types";

function Mark({
  companyKey,
  icon,
}: {
  companyKey?: string;
  icon: React.ReactNode;
}) {
  const logo = companyKey ? companyLogos[companyKey] : undefined;

  return (
    <span className="flex size-12 shrink-0 items-center justify-center overflow-clip rounded-lg border border-border bg-muted text-muted-foreground">
      {logo ? (
        <Image
          src={logo}
          alt=""
          aria-hidden
          sizes="48px"
          className="size-full object-contain p-1"
        />
      ) : (
        icon
      )}
    </span>
  );
}

/**
 * Demo buttons for a project. Rendered as real links, not onclick handlers, so
 * they can be opened in a new tab, copied, and followed by a crawler.
 */
function DemoLinks({
  links,
  className,
}: {
  links?: ExperienceLink[];
  className?: string;
}) {
  if (!links || links.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <Button
          key={link.href}
          render={
            <a href={link.href} target="_blank" rel="noopener noreferrer" />
          }
          variant="outline"
          size="sm"
        >
          <ArrowUpRight data-icon="inline-start" />
          {link.label}
        </Button>
      ))}
    </div>
  );
}

function Bullets({ bullets }: { bullets?: string[] }) {
  if (!bullets || bullets.length === 0) return null;

  return (
    <ul className="mt-2 list-disc space-y-1.5 ps-5 text-sm leading-relaxed text-foreground/85 marker:text-muted-foreground">
      {bullets.map((bullet) => (
        <li key={bullet}>{bullet}</li>
      ))}
    </ul>
  );
}

interface RoleGroup {
  key: string;
  role: string;
  items: ExperienceItem[];
}

interface CompanyGroup {
  key: string;
  company: string;
  companyKey?: string;
  companyMeta?: string;
  companyPeriod?: string;
  location: string;
  roles: RoleGroup[];
}

/**
 * Consecutive entries for the same company become one card, and consecutive
 * entries with the same job title inside it share that title once while each
 * project keeps its own name, period and bullets.
 */
function groupExperience(items: ExperienceItem[]): CompanyGroup[] {
  const companies: CompanyGroup[] = [];

  for (const item of items) {
    let company = companies[companies.length - 1];
    if (!company || company.company !== item.company) {
      company = {
        key: `${item.company}-${companies.length}`,
        company: item.company,
        companyKey: item.companyKey,
        companyMeta: item.companyMeta,
        companyPeriod: item.companyPeriod,
        location: item.location,
        roles: [],
      };
      companies.push(company);
    }

    const role = company.roles[company.roles.length - 1];
    if (role && role.role === item.role) {
      role.items.push(item);
      continue;
    }
    company.roles.push({
      key: `${item.role}-${company.roles.length}`,
      role: item.role,
      items: [item],
    });
  }

  return companies;
}

function RoleBody({ group }: { group: RoleGroup }) {
  const hasProjects = group.items.some((item) => item.note);

  if (!hasProjects) {
    const item = group.items[0];
    return (
      <div className="min-w-0">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h4 className="min-w-0 text-sm font-semibold sm:text-base">{item.role}</h4>
          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
            {item.period && (
              <p className="text-xs text-muted-foreground sm:text-sm">{item.period}</p>
            )}
            <DemoLinks links={item.links} />
          </div>
        </div>
        <Bullets bullets={item.bullets} />
      </div>
    );
  }

  return (
    <div className="min-w-0">
      <h4 className="text-sm font-semibold sm:text-base">{group.role}</h4>
      {group.items[0].periodAboveNote && group.items[0].period && (
        <p className="text-xs text-muted-foreground sm:text-sm">
          {group.items[0].period}
        </p>
      )}
      <ul className="mt-2 space-y-3">
        {group.items.map((item) => (
          <li key={item.note ?? item.period} className="min-w-0">
            <div className="relative flex flex-col gap-0.5 py-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              {/* Logical inset and gradient direction so the fade starts on the
                  inline-start edge and runs toward the inline-end in both RTL and LTR. */}
              <span className="absolute inset-y-0 -start-3 h-full w-full bg-linear-to-r from-border/30 rtl:bg-linear-to-l" />
              <p className="text-sm font-medium text-foreground/90 z-10 py-2">{item.note}</p>
              {/* Period and demo buttons sit together at the end of the row, so a
                  reader sees what the project is, when it ran, and where to open
                  it without scanning down past the bullets. */}
              <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end z-10">
                {!item.periodAboveNote && (
                  <p className="text-xs text-muted-foreground sm:text-sm">{item.period}</p>
                )}
                <DemoLinks links={item.links} />
              </div>
            </div>
            <Bullets bullets={item.bullets} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function EducationRow({
  mark,
  title,
  subtitle,
  period,
  bullets,
}: {
  mark: React.ReactNode;
  title: string;
  subtitle: string;
  period: string;
  bullets?: string[];
}) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <Mark icon={mark} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <p className="shrink-0 text-sm text-muted-foreground sm:text-end">{period}</p>
        </div>
        <Bullets bullets={bullets} />
      </div>
    </div>
  );
}

export function ExperienceSection() {
  const { t, data } = useI18n();
  const companies = groupExperience(data.experience);

  return (
    <SectionCard id="experience" title={t.experienceTitle}>
      <ul className="divide-y divide-border">
        {companies.map((company) => (
          <li key={company.key} className="pt-6 first:pt-0 pb-6 last:pb-0">
            <div className="flex items-start gap-3 sm:gap-4">
              <Mark companyKey={company.companyKey} icon={<Briefcase className="size-5" />} />
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold">{company.company}</h3>
                {company.companyMeta && (
                  <p className="text-xs text-muted-foreground sm:text-sm">{company.companyMeta}</p>
                )}
                <p className="text-xs text-muted-foreground sm:text-sm">{company.location}</p>
                {company.companyPeriod && (
                  <p className="text-xs text-muted-foreground sm:text-sm">
                    {company.companyPeriod}
                  </p>
                )}
                {company.roles.length === 1 ? (
                  <div className="mt-3">
                    <RoleBody group={company.roles[0]} />
                  </div>
                ) : (
                  // Nested roles: the line and dots are positioned from the
                  // list itself (no negative logical offsets), so they stay
                  // aligned on both sides in RTL.
                  <ul className="relative mt-3 space-y-4">
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-3 start-[7.5px] w-px bg-border"
                    />
                    {company.roles.map((role) => (
                      <li key={role.key} className="relative ps-5">
                        <span
                          aria-hidden="true"
                          className="absolute start-1 top-2 size-2 rounded-full bg-muted-foreground/50 ring-2 ring-card"
                        />
                        <RoleBody group={role} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
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
            <EducationRow
              mark={
                <Mark
                  companyKey={item.schoolKey}
                  icon={<Book className="size-5" />}
                />
              }
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
