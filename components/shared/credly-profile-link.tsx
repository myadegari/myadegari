"use client";

import { Verified } from "reicon-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { CREDLY_PROFILE_URL } from "@/lib/certificates";

export function CredlyProfileLink() {
  const { t } = useI18n();

  return (
    <Button
      render={
        <a href={CREDLY_PROFILE_URL} target="_blank" rel="noopener noreferrer" />
      }
      variant="outline"
      size="sm"
      className="shrink-0"
    >
      <Verified data-icon="inline-start" />
      {t.credlyProfile}
    </Button>
  );
}
