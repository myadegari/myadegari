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
import ProfileImage from "../../public/profile.jpg";
import { cn } from "@/lib/utils";

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
      <div className="relative bg-secondary h-36 sm:h-48 overflow-hidden" aria-hidden="true" >
        <div className=" absolute top-0 left-0 bg-card/15 backdrop-blur-3xl w-full h-full"/>

        <Image src={ProfileImage} alt="Profile image" className=" object-cover w-full"/>
        </div>
      <div className="relative px-4 pb-5 sm:px-6 sm:pb-6 mt-20">
        <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="mt-22 flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
            <div className={cn(" absolute  -top-24 flex size-24 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground ring-4 ring-card sm:size-34 sm:text-3xl overflow-clip")}>
              {/* {profile.initials} */}
              <Image src={ProfileImage} alt="Profile image" className=" scale-135"/>
            </div>
            <div className="min-w-0 sm:pb-1">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {profile.name}
              </h1>
              <p className="mt-1 text-base text-muted-foreground sm:text-lg">
                {profile.headline}
              </p>
              <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Icon icon={MapPinIcon} className="size-4" />
                  {profile.location}
                </span>
                <a
                  href={`https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  <Icon icon={Link01Icon} className="size-4" />
                  {profile.website}
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
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
      </div>
    </section>
  );
}
