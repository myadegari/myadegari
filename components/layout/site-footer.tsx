"use client";

// reicon-react ships no brand marks, so GitHub/LinkedIn stay on Hugeicons.
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { GithubIcon, LinkedinIcon } from "@hugeicons/core-free-icons";
import { Globe } from "reicon-react";
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
          {website && (
            <a
              href={`https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label={t.website}
            >
              <Globe />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
