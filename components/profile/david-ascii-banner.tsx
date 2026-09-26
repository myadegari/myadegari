"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDust } from "@/fx/dust-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { DavidAsciiRenderer } from "@/fx/david-ascii-renderer";
import DarkDavidImage from "../../public/dark-david.jpg";
import LightDavidImage from "../../public/light-david.jpg";
import { cn } from "@/lib/utils";

/**
 * Immersive 3D ASCII relief of the David statue as the profile hero banner.
 * True WebGL point-cloud (luminance becomes geometry), marble monochrome,
 * full statue always in frame. Dark mode samples dark-david.jpg, light mode
 * samples light-david.jpg. Falls back to a static image without WebGL.
 */
export function DavidAsciiBanner({ className }: { className?: string }) {
  const { quality, enabled, mounted } = useDust();
  const { theme } = useTheme();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mounted || failed) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let renderer: DavidAsciiRenderer | null = null;
    let cancelled = false;

    (async () => {
      try {
        renderer = new DavidAsciiRenderer(canvas, {
          container: wrap,
          quality,
          staticFrame: !enabled,
        });
        await renderer.init();
        if (cancelled) {
          renderer.dispose();
          return;
        }
        setReady(true);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      renderer?.dispose();
      renderer = null;
    };
  }, [mounted, quality, enabled, failed]);

  const fallbackSrc = theme === "dark" ? DarkDavidImage : LightDavidImage;

  if (failed) {
    return (
      <div
        className={cn("david-fallback-wash relative overflow-hidden", className)}
        aria-hidden="true"
      >
        <Image
          src={fallbackSrc}
          alt=""
          className="h-full w-full object-contain"
          priority={false}
        />
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className={cn("david-stage relative overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="david-backdrop" />
      <canvas ref={canvasRef} className="david-canvas" />
      <div className="david-vignette" />
      <div className="david-grain" />
      {!ready && (
        <div className="david-loading">
          <Image
            src={fallbackSrc}
            alt=""
            className="h-full w-full object-contain opacity-0"
            priority={false}
          />
        </div>
      )}
    </div>
  );
}
