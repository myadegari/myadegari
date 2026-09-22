"use client";

import { HugeiconsIcon as Icon } from "@hugeicons/react";
import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";
import { useI18n } from "@/components/providers/i18n-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? t.themeLight : t.themeDark}
      title={theme === "dark" ? t.themeLight : t.themeDark}
    >
      <Icon icon={theme === "dark" ? Sun01Icon : Moon01Icon} />
    </Button>
  );
}
