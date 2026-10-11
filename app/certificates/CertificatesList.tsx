"use client";

import { useMemo, useState } from "react";
import { Search } from "reicon-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CertificateRow } from "@/components/shared/certificate-row";
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
        c.date.toLowerCase().includes(q) ||
        (c.credentialId?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [data.certificates, query, activeIssuer]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
          <Search className="size-4" />
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
            <CertificateRow
              key={`${item.name}-${item.issuer}-${item.date}-${item.credentialId ?? ""}`}
              item={item}
              index={index}
            />
          ))}
        </ul>
      )}
    </div>
  );
}