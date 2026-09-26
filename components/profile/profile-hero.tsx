"use client";

import { HugeiconsIcon as Icon } from "@hugeicons/react";
import {
  MapPinIcon,
  Link01Icon,
  Download01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/providers/i18n-provider";
import { useDustSection } from "@/fx/use-dust-section";
import Image from "next/image";
import dynamic from "next/dynamic";
import ProfileImage from "../../public/profile.jpg";

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
      <div className="relative">
        <DavidAsciiBanner className="h-56 sm:h-72" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-card to-transparent" />
      </div>
      <div className="px-4 pb-5 sm:px-6 sm:pb-6 mt-12">
        <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-start sm:gap-5">
          <span className="flex size-20 shrink-0 items-center justify-center overflow-clip rounded-full bg-primary ring-4 ring-card sm:size-24">
            <Image
              src={ProfileImage}
              alt="Profile image"
              className="h-full w-full scale-135 object-cover"
            />
          </span>
          {/* profile details */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {profile.name}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                <span className="size-1.5 rounded-full bg-primary animate-pulse motion-reduce:animate-none" />
                {t.openToWork}
              </span>
            </div>
            <p className="mt-1 text-base text-muted-foreground sm:text-lg">
              {profile.headline}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Icon icon={MapPinIcon} className="size-4 shrink-0" />
                {profile.location}
              </span>
              <a
                href={`https://${profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
              >
                <Icon icon={Link01Icon} className="size-4 shrink-0" />
                {profile.website}
              </a>
            </p>
          </div>
        </div>
        {/* cta */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4 sm:mt-6 sm:pt-5">
          <Button render={<a href="#contact" />} size="lg">
            <Icon icon={Mail01Icon} data-icon="inline-start" />
            {t.contactMe}
          </Button>
          <Button
            render={<a href="/resume.pdf" download />}
            variant="outline"
            size="lg"
          >
            <Icon icon={Download01Icon} data-icon="inline-start" />
            {t.downloadCv}
          </Button>
        </div>
      </div>
    </section>
  );
}
