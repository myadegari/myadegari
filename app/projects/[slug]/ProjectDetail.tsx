"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Export } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { AnimatedSection } from "@/fx/animated-section";
import { getProjectBySlug, getProjectNeighbors } from "@/lib/projects";

export function ProjectDetail({ slug }: { slug: string }) {
  const { t, lang } = useI18n();
  const found = getProjectBySlug(slug, lang);
  const { prev, next } = getProjectNeighbors(slug, lang);

  if (!found) {
    return (
      <div className="rounded-lg bg-card p-8 text-center text-card-foreground ring-1 ring-foreground/10">
        <h1 className="text-xl font-bold">{t.projectNotFound}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.projectNotFoundLead}</p>
        <Button render={<Link href="/projects" />} className="mt-4">
          <ArrowLeft data-icon="inline-start" className="rtl:rotate-180" />
          {t.backToProjects}
        </Button>
      </div>
    );
  }

  const { project } = found;

  return (
    <article className="space-y-6">
      <nav aria-label="Breadcrumb">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4 rtl:rotate-180" />
          {t.backToProjects}
        </Link>
      </nav>

      <AnimatedSection as="header" className="rounded-lg bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{project.title}</h1>
        <p className="mt-2 leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        {(project.demo || project.repo) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.demo && (
              <Button render={<a href={project.demo} target="_blank" rel="noopener noreferrer" />}>
                <Export data-icon="inline-start" />
                {t.viewDemo}
              </Button>
            )}
            {project.repo && (
              <Button
                render={<a href={project.repo} target="_blank" rel="noopener noreferrer" />}
                variant="outline"
              >
                <ArrowUpRight data-icon="inline-start" />
                {t.viewRepo}
              </Button>
            )}
          </div>
        )}
      </AnimatedSection>

      {project.overview && (
        <AnimatedSection as="section" className="rounded-lg bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-6">
          <h2 className="text-lg font-semibold">{t.overviewTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.overview}</p>
        </AnimatedSection>
      )}

      {project.features && project.features.length > 0 && (
        <AnimatedSection as="section" className="rounded-lg bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-6">
          <h2 className="text-lg font-semibold">{t.featuresTitle}</h2>
          <ul className="mt-2 list-disc space-y-1.5 text-sm leading-relaxed text-muted-foreground ps-5">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </AnimatedSection>
      )}

      {project.techStack && project.techStack.length > 0 && (
        <AnimatedSection as="section" className="rounded-lg bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-6">
          <h2 className="text-lg font-semibold">{t.techStackTitle}</h2>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </AnimatedSection>
      )}

      {project.role && (
        <AnimatedSection as="section" className="rounded-lg bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-6">
          <h2 className="text-lg font-semibold">{t.roleTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.role}</p>
        </AnimatedSection>
      )}

      {project.challenges && (
        <AnimatedSection as="section" className="rounded-lg bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-6">
          <h2 className="text-lg font-semibold">{t.challengesTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.challenges}</p>
        </AnimatedSection>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <AnimatedSection as="section" className="rounded-lg bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-6">
          <h2 className="text-lg font-semibold">{t.galleryTitle}</h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {project.gallery.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={project.title}
                loading="lazy"
                className="w-full rounded-lg border border-border object-cover"
              />
            ))}
          </div>
        </AnimatedSection>
      )}

      <AnimatedSection className="rounded-lg bg-card p-4 text-card-foreground ring-1 ring-foreground/10">
      <nav
        aria-label="Project navigation"
        className="flex items-center justify-between gap-3"
      >
        {prev ? (
          <Button render={<Link href={`/projects/${prev.slug}`} />} variant="ghost" size="sm">
            <ArrowLeft data-icon="inline-start" className="rtl:rotate-180" />
            <span className="max-w-32 truncate sm:max-w-none">{prev.title}</span>
          </Button>
        ) : (
          <span />
        )}
        {next ? (
          <Button render={<Link href={`/projects/${next.slug}`} />} variant="ghost" size="sm">
            <span className="max-w-32 truncate sm:max-w-none">{next.title}</span>
            <ArrowLeft
              data-icon="inline-end"
              className="rotate-180 rtl:rotate-0"
            />
          </Button>
        ) : (
          <span />
        )}
      </nav>
      </AnimatedSection>
      <p className="sr-only">
        {t.prevProject} / {t.nextProject}
      </p>
    </article>
  );
}
