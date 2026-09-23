"use client";

import { cn } from "@/lib/utils";
import { useDustSection, type DustExitMode } from "@/fx/use-dust-section";

interface SectionCardProps {
  id: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  dustExit?: DustExitMode;
}

export function SectionCard({ id, title, action, children, className, dustExit = "dust" }: SectionCardProps) {
  const ref = useDustSection<HTMLElement>({ exit: dustExit });
  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "scroll-mt-36 rounded-lg bg-card text-card-foreground ring-1 ring-foreground/10",
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-6">
        <h2 className="text-lg font-semibold sm:text-xl">{title}</h2>
        {action}
      </div>
      <div className="px-4 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4">{children}</div>
    </section>
  );
}
