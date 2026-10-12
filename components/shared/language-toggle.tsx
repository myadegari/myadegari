"use client";

import { Language } from "reicon-react";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { useDust } from "@/fx/dust-provider";
import { animatedLangToggle } from "@/fx/lang-transition";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
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
      className={cn(
        // Icon-only on phones: the "FA"/"EN" label costs ~26px of the header
        // row, which is exactly the room the full name needs to fit without
        // being clipped. The square min-width keeps the touch target at 44px
        // once the label is gone; the label returns from lg up.
        "flex h-11 min-w-11 items-center justify-center lg:h-7 lg:min-w-0",
        className
      )}
    >
      <Language />
      <span className="lang-label mt-1 hidden overflow-hidden leading-none lg:inline-block">
        {lang === "en" ? "FA" : "EN"}
      </span>
    </Button>
  );
}
