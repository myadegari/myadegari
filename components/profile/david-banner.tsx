"use client";

import Image from "next/image";
import { useTheme } from "@/components/providers/theme-provider";
import DarkDavidImage from "../../public/dark-david.png";
import LightDavidImage from "../../public/light-david.jpg";
import { cn } from "@/lib/utils";

/**
 * Profile hero banner: the David statue as a plain image, no WebGL.
 * Dark mode shows dark-david.jpg on #0f0f0f, light mode shows light-david.jpg
 * on #e1e1e1, so each image sits on its own backdrop colour.
 */
export function DavidBanner({ className }: { className?: string }) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  return (
    <div
      className={cn("david-banner relative overflow-hidden", className)}
      aria-hidden="true"
    >
      <Image
        src={dark ? DarkDavidImage : LightDavidImage}
        alt=""
        fill
        sizes="(min-width: 1024px) 960px, 100vw"
        priority
        className="object-contain"
      />
    </div>
  );
}
