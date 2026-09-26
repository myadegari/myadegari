"use client";

import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { animatedThemeToggle } from "@/fx/theme-transition";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    animatedThemeToggle(event, { theme, toggleTheme });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={handleClick}
      aria-label={theme === "dark" ? t.themeLight : t.themeDark}
      title={theme === "dark" ? t.themeLight : t.themeDark}
    >
      <Icon icon={theme === "dark" ? Sun01Icon : Moon01Icon} />
    </Button>
  );
}
