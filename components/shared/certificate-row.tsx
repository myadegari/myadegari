"use client";

import { Export } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { IssuerLogo } from "@/components/shared/issuer-logo";
import { AnimatedSection } from "@/fx/animated-section";
import { useI18n } from "@/components/providers/i18n-provider";
import { certField } from "@/lib/certificate-fields";
import type { CertificateItem } from "@/lib/types";

/**
 * One certificate entry. Shared by the home page groups, the home preview and
 * `/certificates` so the field badge only lives in one place.
 *
 * Pass `showField={false}` inside a field's own expanded panel, where the
 * heading already states the field and the badge would be noise.
 */
export function CertificateRow({
  item,
  index = 0,
  showField = true,
}: {
  item: CertificateItem;
  index?: number;
  showField?: boolean;
}) {
  const { t, lang } = useI18n();

  return (
    <AnimatedSection
      as="li"
      delay={Math.min(index * 0.05, 0.3)}
      burstScale={0.5}
      className="flex items-start gap-3 py-4 first:pt-0 last:pb-0"
    >
      <IssuerLogo issuer={item.issuer} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold">{item.name}</h3>
            <div className="flex flex-wrap items-center gap-1.5">
              <p className="text-sm text-muted-foreground">{item.issuer}</p>
              {showField && (
                <Badge variant="secondary">{certField(item.field).label[lang]}</Badge>
              )}
            </div>
          </div>
          <span className="shrink-0 text-sm text-muted-foreground sm:text-end">
            {item.date}
          </span>
        </div>
        {item.credentialId && (
          <p className="mt-1 break-all text-xs text-muted-foreground/80">
            <span className="font-sans">{t.credentialId}:</span>{" "}
            <span className="font-mono">{item.credentialId}</span>
          </p>
        )}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {t.verify}
            <Export className="size-3.5" />
          </a>
        )}
      </div>
    </AnimatedSection>
  );
}