"use client";

import { Language } from "reicon-react";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { useDust } from "@/fx/dust-provider";
import { animatedLangToggle } from "@/fx/lang-transition";

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  const { quality } = useDust();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    animatedLangToggle(event, { lang, setLang, quality });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      type="button"
      onClick={handleClick}
      aria-label={lang === "en" ? t.switchToFa : t.switchToEn}
      title={lang === "en" ? t.switchToFa : t.switchToEn}
      className="flex items-center justify-center"
    >
      <Language />
      <span className="lang-label mt-1 inline-block overflow-hidden leading-none">
        {lang === "en" ? "FA" : "EN"}
      </span>
    </Button>
  );
}
