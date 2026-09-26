"use client";

import Link from "next/link";
import { ArrowLeft } from "reicon-react";
import { useI18n } from "@/components/providers/i18n-provider";

const copy = {
  projects: {
    titleKey: "projectsTitle",
    leadKey: "searchProjects",
  },
  certificates: {
    titleKey: "certificatesTitle",
    leadKey: "searchCertificates",
  },
} as const;

export function ArchiveHeader({ section }: { section: keyof typeof copy }) {
  const { t } = useI18n();
  const { titleKey, leadKey } = copy[section];
  return (
    <div className="space-y-2">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t.backToHome}
      </Link>
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{t[titleKey]}</h1>
      <p className="text-sm text-muted-foreground">{t[leadKey]}</p>
    </div>
  );
}
