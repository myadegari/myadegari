"use client";

import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { LanguageSquareIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";

export function LanguageToggle() {
  const { lang, toggleLang, t } = useI18n();

  return (
    <Button
      variant="ghost"
      size="sm"
      type="button"
      onClick={toggleLang}
      aria-label={lang === "en" ? t.switchToFa : t.switchToEn}
      title={lang === "en" ? t.switchToFa : t.switchToEn}
    >
      <Icon icon={LanguageSquareIcon} />
      <span>{lang === "en" ? "FA" : "EN"}</span>
    </Button>
  );
}
