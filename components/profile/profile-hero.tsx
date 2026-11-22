"use client";

import { Download, Envelope, Link, Location } from "reicon-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { useDustSection } from "@/fx/use-dust-section";
import Image from "next/image";
import { DavidBanner } from "./david-banner";
import ProfileImage from "../../public/profile.png";
import Utlogo from "@/public/ut-logo.png"

export function ProfileHero() {
  const { t, data } = useI18n();
  const { profile } = data;
  const ref = useDustSection<HTMLElement>({ exit: "stay" });

  return (
    <section
      ref={ref}
      id="top"
      className="overflow-hidden rounded-lg bg-card text-card-foreground ring-1 ring-foreground/10"
    >
      <DavidBanner className="h-56 sm:h-72" />
      <div className="px-4 pb-5 sm:px-6 sm:pb-6 mt-12">
        <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-start sm:gap-5">
          <span className="flex size-30 shrink-0 items-center justify-center ring-4 ring-card max-sm:hidden">
            <Image
              src={ProfileImage}
              alt="Profile image"
              // Without this the browser treats the source as full-viewport
              // width and pulls the 640px variant to paint an 80px circle.
              sizes="(min-width: 640px) 96px, 80px"
              priority
              className="size-full object-contain"
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
            </div>
            <p className="mt-1 text-base text-muted-foreground sm:text-lg">
              {profile.headline}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Location className="size-4 shrink-0" />
                {profile.location}
              </span>
              <span className="inline-flex min-w-0 items-center gap-1.5">
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
                  className="size-4 shrink-0 object-contain sm:size-5"
                />
                <span className="truncate">{profile.university}</span>
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
