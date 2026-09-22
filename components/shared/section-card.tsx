import { cn } from "@/lib/utils";

interface SectionCardProps {
  id: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({ id, title, action, children, className }: SectionCardProps) {
  return (
    <section
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
