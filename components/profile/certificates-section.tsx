"use client";

import Link from "next/link";
import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { Certificate01Icon, ExternalLinkIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { SectionCard } from "@/components/shared/section-card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import type { CertificateItem } from "@/lib/types";

export function CertificatesSection() {
  const { t, data } = useI18n();
  const preview = data.certificates.slice(0, 4);

  return (
    <SectionCard
      id="certificates"
      title={t.certificatesTitle}
      action={
        <Button
          render={<Link href="/certificates" />}
          variant="ghost"
          size="sm"
          className="-me-2 text-primary hover:text-primary"
        >
          {t.viewAll}
          <Icon icon={ArrowRight01Icon} data-icon="inline-end" className="rtl:rotate-180" />
        </Button>
      }
    >
      <ul className="divide-y divide-border">
        {preview.map((item: CertificateItem) => (
          <li
            key={`${item.name}-${item.date}`}
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
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
