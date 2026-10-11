"use client";

import Image from "next/image";
import { issuerLogo } from "@/lib/certificates";
import { cn } from "@/lib/utils";

/**
 * `sm` is the stacked variant used on field cards, where several issuer marks
 * overlap. Size and radius stay in this component so callers never restyle it.
 */
const sizeVariants = {
  md: "size-10 rounded-lg",
  sm: "size-7 rounded-md ring-1 ring-border",
} as const;

export function IssuerLogo({
  issuer,
  size = "md",
  className,
}: {
  issuer: string;
  size?: keyof typeof sizeVariants;
  className?: string;
}) {
  const src = issuerLogo(issuer);
  if (!src) return null;

  return (
    <span
      className={cn(
        // White plate so dark brand marks (Anthropic, Dubai Future Foundation)
        // stay legible against the dark-mode card surface.
        "flex shrink-0 items-center justify-center overflow-hidden bg-white",
        sizeVariants[size],
        className
      )}
    >
      <Image
        src={src}
        alt={`${issuer} logo`}
        width={40}
        height={40}
        className="size-full object-contain"
      />
    </span>
  );
}