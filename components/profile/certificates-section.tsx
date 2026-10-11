"use client";

import Link from "next/link";
import { ArrowRight } from "reicon-react";
import { SectionCard } from "@/components/shared/section-card";
import { CertificateFieldGroups } from "@/components/shared/certificate-field-groups";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";

export function CertificatesSection() {
  const { t, data } = useI18n();

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
          <ArrowRight data-icon="inline-end" className="rtl:rotate-180" />
        </Button>
      }
    >
      <CertificateFieldGroups items={data.certificates} />
    </SectionCard>
  );
}