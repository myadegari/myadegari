import Image from "next/image";
import { issuerLogo } from "@/lib/certificates";
import { cn } from "@/lib/utils";

export function IssuerLogo({
  issuer,
  className,
}: {
  issuer: string;
  className?: string;
}) {
  const src = issuerLogo(issuer);
  if (!src) return null;

  return (
    <span
      className={cn(
        // White plate so dark brand marks (Anthropic, Dubai Future Foundation)
        // stay legible against the dark-mode card surface.
        "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white",
        className
      )}
    >
      <Image
        src={src}
        alt={`${issuer} logo`}
        width={40}
        height={40}
        className="object-contain"
      />
    </span>
  );
}
