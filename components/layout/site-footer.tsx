"use client";

import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { GithubIcon, LinkedinIcon, GlobeIcon } from "@hugeicons/core-free-icons";
import { useI18n } from "@/components/providers/i18n-provider";

export function SiteFooter() {
  const { t, data } = useI18n();
  const { name, github, linkedin, website } = data.profile;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} {name}
        </p>
        <div className="flex items-center gap-3">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="LinkedIn"
          >
            <Icon icon={LinkedinIcon} />
          </a>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="GitHub"
          >
            <Icon icon={GithubIcon} />
          </a>
          <a
            href={`https://${website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label={t.website}
          >
            <Icon icon={GlobeIcon} />
          </a>
        </div>
      </div>
    </footer>
  );
}
