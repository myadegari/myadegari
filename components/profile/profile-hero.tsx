"use client";

import { useEffect, useState } from "react";
import { Download, Envelope, Link, Location } from "reicon-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { useDust } from "@/fx/dust-provider";
import { useDustSection } from "@/fx/use-dust-section";
import Image from "next/image";
import dynamic from "next/dynamic";
import ProfileImage from "../../public/profile.jpg";
import Utlogo from "@/public/ut-logo.png"

const DavidAsciiBanner = dynamic(
  () =>
    import("./david-ascii-banner").then((m) => m.DavidAsciiBanner),
  {
    ssr: false,
    loading: () => (
      <div
        className="david-fallback-wash h-56 sm:h-72"
        aria-hidden="true"
      />
    ),
  }
);

/**
 * Hold the banner back until the browser is idle on low-power devices.
 *
 * three.js is a ~530 KB chunk. Fetching it during hydration puts it in
 * competition with the hero image and the font files for the same connection,
 * which on a phone delays exactly the content the reader came for. Deferring
 * to idle lets first paint and the LCP image win; the wash already on screen
 * covers the gap. Desktop is not deferred.
 *
 * The banner is an `ssr: false` dynamic import: on the server it renders the
 * `loading` placeholder, while on the client it renders the dynamic
 * component's Suspense boundary. Returning `true` during the very first client
 * render therefore produced different markup than the server and React threw
 * the tree away with a hydration mismatch. Starting from `false` and flipping
 * from a scheduled callback keeps the first client pass identical to the
 * server HTML; the banner then swaps in on the next tick (desktop) or when the
 * browser goes idle (low-power devices).
 */
function useIdleMounted(defer: boolean): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      if (!cancelled) setReady(true);
    };

    if (defer) {
      const ric = (
        window as Window & {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback;

      if (typeof ric === "function") {
        const id = ric(run, { timeout: 1200 });
        return () => {
          cancelled = true;
          window.cancelIdleCallback?.(id);
        };
      }
      const id = window.setTimeout(run, 200);
      return () => {
        cancelled = true;
        window.clearTimeout(id);
      };
    }

    const id = window.setTimeout(run, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [defer]);

  return ready;
}

export function ProfileHero() {
  const { t, data } = useI18n();
  const { profile } = data;
  const { quality } = useDust();
  const ref = useDustSection<HTMLElement>({ exit: "stay" });
  const bannerReady = useIdleMounted(quality === "low");

  return (
    <section
      ref={ref}
      id="top"
      className="overflow-hidden rounded-lg bg-card text-card-foreground ring-1 ring-foreground/10"
    >
      <div className="relative">
        {bannerReady ? (
          <DavidAsciiBanner className="h-56 sm:h-72" />
        ) : (
          <div className="david-fallback-wash h-56 sm:h-72" aria-hidden="true" />
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-card to-transparent" />
      </div>
      <div className="px-4 pb-5 sm:px-6 sm:pb-6 mt-12">
        <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-start sm:gap-5">
          <span className="flex size-20 shrink-0 items-center justify-center overflow-clip rounded-full bg-primary ring-4 ring-card sm:size-24">
            <Image
              src={ProfileImage}
              alt="Profile image"
              // Without this the browser treats the source as full-viewport
              // width and pulls the 640px variant to paint an 80px circle.
              sizes="(min-width: 640px) 96px, 80px"
              priority
              className="h-full w-full scale-135 object-cover"
            />
          </span>
          {/* profile details */}
  
           
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {profile.name}
              </h1>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                <span className="size-1.5 rounded-full bg-primary animate-pulse motion-reduce:animate-none" />
                {t.openToWork}
              </span>
              <span className="inline-flex min-w-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Image
                  src={Utlogo}
                  alt=""
                  aria-hidden
                  // The emblem is a detailed line drawing: below ~20px the bead
                  // ring and wing feathers collapse into mush, so it only steps
                  // down to 20px on phones and stays 24px from sm up. `sizes`
                  // tells the optimizer to serve that width at the current DPR
                  // instead of the largest candidate.
                  sizes="(min-width: 640px) 24px, 20px"
                  quality={90}
                  className="size-5 shrink-0 object-contain sm:size-6"
                />
                <span className="truncate">{profile.university}</span>
              </span>
            </div>
            <p className="mt-1 text-base text-muted-foreground sm:text-lg">
              {profile.headline}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Location className="size-4 shrink-0" />
                {profile.location}
              </span>
              {profile.website && (
                <a
                  href={`https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                >
                  <Link className="size-4 shrink-0" />
                  {profile.website}
                </a>
              )}
            </p>
          </div>


        </div>
        {/* cta */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4 sm:mt-6 sm:pt-5">
          <Button render={<a href="#contact" />} size="lg">
            <Envelope data-icon="inline-start" />
            {t.contactMe}
          </Button>
          <Button
            render={<a href="/resume.pdf" download />}
            variant="outline"
            size="lg"
          >
            <Download data-icon="inline-start" />
            {t.downloadCv}
          </Button>
        </div>
      </div>
    </section>
  );
}
