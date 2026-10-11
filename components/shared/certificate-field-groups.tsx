"use client";

import { useState } from "react";
import { ChevronDown } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { IssuerLogo } from "@/components/shared/issuer-logo";
import { CertificateRow } from "@/components/shared/certificate-row";
import { useI18n } from "@/components/providers/i18n-provider";
import { CERT_FIELDS } from "@/lib/certificate-fields";
import type { CertificateItem, CertFieldId } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Overlapping issuer marks, capped so busy fields stay readable. */
function IssuerStack({ issuers }: { issuers: string[] }) {
  if (issuers.length === 0) return null;
  const shown = issuers.slice(0, 3);
  const rest = issuers.length - shown.length;

  return (
    <span className="flex items-center -space-x-1.5 rtl:space-x-reverse">
      {shown.map((issuer) => (
        <IssuerLogo key={issuer} issuer={issuer} size="sm" />
      ))}
      {rest > 0 && (
        <span className="flex size-7 items-center justify-center rounded-md bg-muted text-xs font-medium text-muted-foreground ring-1 ring-border">
          +{rest}
        </span>
      )}
    </span>
  );
}

/**
 * Skill-area overview for the home page: every field is visible at a glance with
 * its issuer marks and certificate count, and expanding one reveals that
 * field's certificates in place. `/certificates` stays the full browsable list.
 */
export function CertificateFieldGroups({ items }: { items: CertificateItem[] }) {
  const { t, lang } = useI18n();
  const [openField, setOpenField] = useState<CertFieldId | null>(null);

  const groups = CERT_FIELDS.map((field) => ({
    field,
    items: items.filter((c) => c.field === field.id),
  })).filter((g) => g.items.length > 0);

  return (
    <div>
      <p className="text-sm text-muted-foreground">{t.browseFields}</p>

      <ul className="mt-3 divide-y divide-border">
        {groups.map(({ field, items }) => {
          const isOpen = openField === field.id;
          const panelId = `certificate-field-${field.id}`;
          const issuers = Array.from(new Set(items.map((c) => c.issuer)));

          return (
            <li key={field.id}>
              <button
                type="button"
                onClick={() => setOpenField((prev) => (prev === field.id ? null : field.id))}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-start gap-3 py-3 text-start"
              >
                <ChevronDown
                  className={cn(
                    "mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen ? "rotate-180" : "rotate-0"
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-base font-semibold transition-colors group-hover:text-primary">
                    {field.label[lang]}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {field.blurb[lang]}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  <span className="hidden sm:flex">
                    <IssuerStack issuers={issuers} />
                  </span>
                  <Badge variant="outline">
                    {items.length} {t.certificatesWord}
                  </Badge>
                </span>
              </button>

              {isOpen && (
                <div id={panelId} className="pb-4 ps-7">
                  <ul className="divide-y divide-border">
                    {items.map((item, index) => (
                      <CertificateRow
                        key={`${item.name}-${item.date}-${item.credentialId ?? ""}`}
                        item={item}
                        index={index}
                        showField={false}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}