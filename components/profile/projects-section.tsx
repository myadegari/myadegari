"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { ExternalLinkIcon, ArrowUpRightIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { SectionCard } from "@/components/shared/section-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { cn } from "@/lib/utils";

export function ProjectsSection() {
  const { t, data } = useI18n();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    data.projects.forEach((p) => p.tags.forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, [data.projects]);

  const filtered = activeTag
    ? data.projects.filter((p) => p.tags.includes(activeTag))
    : data.projects;

  const preview = filtered.slice(0, 4);

  return (
    <SectionCard
      id="projects"
      title={t.projectsTitle}
      action={
        <Button
          render={<Link href="/projects" />}
          variant="ghost"
          size="sm"
          className="-me-2 text-primary hover:text-primary"
        >
          {t.viewAll}
          <Icon icon={ArrowRight01Icon} data-icon="inline-end" className="rtl:rotate-180" />
        </Button>
      }
    >
      <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label={t.projectsTitle}>
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          aria-pressed={activeTag === null}
          className={cn(
            "h-7 rounded-full border px-3 text-xs font-medium transition-colors",
            activeTag === null
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-muted text-foreground hover:bg-accent"
          )}
        >
          {t.allFilter}
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag((prev) => (prev === tag ? null : tag))}
            aria-pressed={activeTag === tag}
            className={cn(
              "h-7 rounded-full border px-3 text-xs font-medium transition-colors",
              activeTag === tag
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-muted text-foreground hover:bg-accent"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {preview.map((project) => (
          <li
            key={project.slug}
            className="flex flex-col gap-3 rounded-lg border border-border bg-background/50 p-4 transition-shadow hover:shadow-sm"
          >
            <div className="flex flex-col gap-1">
              <Link
                href={`/projects/${project.slug}`}
                className="text-base font-semibold hover:text-primary hover:underline"
              >
                {project.title}
              </Link>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div className="mt-auto flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-3">
              <Button
                render={<Link href={`/projects/${project.slug}`} />}
                variant="ghost"
                size="sm"
                className="-ms-2 text-primary hover:text-primary"
              >
                <Icon icon={ArrowUpRightIcon} data-icon="inline-start" />
                {t.viewDetails}
              </Button>
                {project.demo && (
                  <Button
                    render={<a href={project.demo} target="_blank" rel="noopener noreferrer" />}
                    variant="ghost"
                    size="sm"
                    className="-ms-2 text-primary hover:text-primary"
                  >
                    <Icon icon={ExternalLinkIcon} data-icon="inline-start" />
                    {t.viewDemo}
                  </Button>
                )}
                {project.repo && (
                  <Button
                    render={<a href={project.repo} target="_blank" rel="noopener noreferrer" />}
                    variant="ghost"
                    size="sm"
                    className="-ms-2 text-primary hover:text-primary"
                  >
                    <Icon icon={ArrowUpRightIcon} data-icon="inline-start" />
                    {t.viewRepo}
                  </Button>
                )}
              </div>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
