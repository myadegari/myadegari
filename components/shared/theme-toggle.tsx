"use client";

import { useEffect, useRef, useState } from "react";
import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { MorphIcon, type IconNode, type MorphHandle } from "morphicons/react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/providers/theme-provider";
import { useI18n } from "@/components/providers/i18n-provider";
import { animatedThemeToggle } from "@/fx/theme-transition";
import { cn } from "@/lib/utils";

// morphicons consumes icon data, not components. Hugeicons' IconSvgObject is
// the same `[tag, attrs]` tuple list as Lucide's IconNode, so these need no
// conversion. Both are stroke-drawn on a 24x24 grid at strokeWidth 1.5.
const SUN = Sun01Icon as IconNode;
const MOON = Moon01Icon as IconNode;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const iconRef = useRef<MorphHandle>(null);
  // Seeded with MOON to match the provider's server snapshot, so hydration
  // agrees with the markup the server emitted.
  const [icon, setIcon] = useState<IconNode>(MOON);
  const userToggled = useRef(false);

  // `theme` reports "light" during SSR and corrects to the real value one tick
  // after hydration, so on a dark-mode load the very first change is not a user
  // gesture. Animating it would replay a sun-bursts-out-of-the-moon morph on
  // every page view, so anything we did not initiate is snapped into place via
  // the imperative handle instead of going through the animated `icon` prop.
  useEffect(() => {
    const next = theme === "dark" ? SUN : MOON;
    if (!userToggled.current) {
      iconRef.current?.set(next);
      return;
    }
    setIcon(next);
  }, [theme]);

  const handleClick = () => {
    userToggled.current = true;
    animatedThemeToggle({ theme, toggleTheme });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={handleClick}
      aria-label={theme === "dark" ? t.themeLight : t.themeDark}
      title={theme === "dark" ? t.themeLight : t.themeDark}
      // 32px is too small to hit reliably with a thumb. Below lg the control
      // grows to the 44px touch minimum while the icon stays 16px, so the
      // button reads the same but is actually tappable.
      className={cn("size-11 lg:size-8", className)}
    >
      {/* No `label`, so morphicons keeps it aria-hidden and the button's own
          aria-label stays the accessible name. */}
      <MorphIcon ref={iconRef} icon={icon} strokeWidth={1.5} reducedMotion="user" />
    </Button>
  );
}
