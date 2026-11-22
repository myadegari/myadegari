"use client";

import { useI18n } from "@/components/providers/i18n-provider";
import { useNow } from "@/components/shared/use-now";
import { timeSince } from "@/lib/relative-time";
import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/lib/types";

/** Git-merge glyph: two parent commits converging on one merge commit. */
function GitMergeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="6" cy="5" r="2.1" />
      <circle cx="6" cy="19" r="2.1" />
      <circle cx="18" cy="12" r="2.1" />
      <path d="M6 7.1v9.8" />
      <path d="M8.1 6.2c1.6.5 2.3 2 3.4 3.2a6 6 0 0 0 4.4 2.4" />
      <path d="M8.1 17.8c1.6-.5 2.3-2 3.4-3.2a6 6 0 0 1 4.4-2.4" />
    </svg>
  );
}

/**
 * A project's git history as a small commit timeline: the range with its
 * duration on the rail, and how long ago the newest commit landed.
 */
export function CommitHistory({
  project,
  className,
}: {
  project: ProjectItem;
  className?: string;
}) {
  const { t, lang } = useI18n();
  const now = useNow();

  const first = project.firstCommit;
  const last = project.lastCommit;
  const duration = project.duration;
  const updated =
    project.lastCommitISO && now
      ? timeSince(project.lastCommitISO, lang, now)
      : "";

  const single = !first || !last;
  if (single && !duration && !updated) return null;

  return (
    <figure
      className={cn(
        "group/commits relative overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-muted/50 via-muted/20 to-transparent p-3",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <figcaption className="inline-flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-widest text-muted-foreground">
          <GitMergeIcon className="size-3.5 text-primary transition-transform duration-300 group-hover/commits:-rotate-6" />
          {t.commitHistory}
        </figcaption>
        {updated && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-2xs font-medium leading-4 text-primary">
            <span className="relative flex size-1.5" aria-hidden>
              <span className="absolute inline-flex size-full rounded-full bg-primary/60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            {t.lastUpdate} {updated}
          </span>
        )}
      </div>

      {!single && (
        <>
          <div className="relative mt-3 h-4">
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-primary/60 via-border to-primary/60" />
            <span className="absolute start-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary ring-2 ring-background" />
            <span className="absolute end-0 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary/60 ring-2 ring-background" />
            {duration && (
              <span className="absolute inset-x-0 top-1/2 mx-auto w-fit -translate-y-1/2 rounded-full border border-border/70 bg-card px-2 py-0.5 text-2xs font-medium uppercase tracking-wider text-muted-foreground">
                {duration}
              </span>
            )}
          </div>
          <div className="mt-1 flex items-baseline justify-between gap-2 font-mono text-2xs tabular-nums text-foreground/80">
            <span>{first}</span>
            <span>{last}</span>
          </div>
        </>
      )}

      {single && duration && (
        <p className="mt-2 text-2xs text-muted-foreground">
          {t.projectDuration} {duration}
        </p>
      )}
    </figure>
  );
}
