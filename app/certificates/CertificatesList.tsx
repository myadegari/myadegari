"use client";

import { useMemo, useState } from "react";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import {
  Certificate01Icon,
  ExternalLinkIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedSection } from "@/fx/animated-section";
import { useI18n } from "@/components/providers/i18n-provider";
import { cn } from "@/lib/utils";

export function CertificatesList() {
  const { t, data } = useI18n();
  const [query, setQuery] = useState("");
  const [activeIssuer, setActiveIssuer] = useState<string | null>(null);

  const issuers = useMemo(() => {
    const set = new Set<string>();
    data.certificates.forEach((c) => set.add(c.issuer));
    return Array.from(set);
  }, [data.certificates]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.certificates.filter((c) => {
      if (activeIssuer && c.issuer !== activeIssuer) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.date.toLowerCase().includes(q)
      );
    });
  }, [data.certificates, query, activeIssuer]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
          <Icon icon={Search01Icon} className="size-4" />
        </span>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchCertificates}
        />
      </div>

      {issuers.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.certificatesTitle}>
          <button
            type="button"
            onClick={() => setActiveIssuer(null)}
            aria-pressed={activeIssuer === null}
            className={cn(
              "h-7 rounded-full border px-3 text-xs font-medium transition-colors",
              activeIssuer === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-muted text-foreground hover:bg-accent"
            )}
          >
            {t.allFilter}
          </button>
          {issuers.map((issuer) => (
            <button
              key={issuer}
              type="button"
              onClick={() => setActiveIssuer((prev) => (prev === issuer ? null : issuer))}
              aria-pressed={activeIssuer === issuer}
              className={cn(
                "h-7 rounded-full border px-3 text-xs font-medium transition-colors",
                activeIssuer === issuer
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted text-foreground hover:bg-accent"
              )}
            >
              {issuer}
            </button>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground" role="status">
        {t.showingCount} {filtered.length} / {data.certificates.length}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">{t.noResults}</p>
          <div className="mt-3">
            <Button
              variant="link"
              size="sm"
              onClick={() => {
                setQuery("");
                setActiveIssuer(null);
              }}
            >
              {t.clearFilters}
            </Button>
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {filtered.map((item, index) => (
            <AnimatedSection
              as="li"
              key={`${item.name}-${item.issuer}-${item.date}`}
              delay={Math.min(index * 0.05, 0.3)}
              burstScale={0.5}
              className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                <Icon icon={Certificate01Icon} className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.issuer}</p>
                  </div>
                  <span className="shrink-0 text-sm text-muted-foreground sm:text-end">
                    {item.date}
                  </span>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {t.verify}
                    <Icon icon={ExternalLinkIcon} className="size-3.5" />
                  </a>
                )}
              </div>
            </AnimatedSection>
          ))}
        </ul>
      )}
    </div>
  );
}
