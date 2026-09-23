import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ArchiveHeader } from "@/components/shared/archive-header";
import { AnimatedSection } from "@/fx/animated-section";
import { ProjectsList } from "./ProjectsList";

export const metadata: Metadata = {
  title: "Projects | Mohammadmehdi Yadegarifard",
  description: "Browse all projects with search and tag filters.",
};

export default function ProjectsPage() {
  return (
    <>
      {/* <SiteHeader /> */}
      <div className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <AnimatedSection burstScale={0.5}>
            <ArchiveHeader section="projects" />
          </AnimatedSection>
          <div className="mt-6 rounded-lg bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-6">
            <ProjectsList />
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
