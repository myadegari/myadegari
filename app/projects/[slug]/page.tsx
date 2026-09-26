import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { content } from "@/lib/content";
import { getProjectSlugs } from "@/lib/projects";
import { ProjectDetail } from "./ProjectDetail";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project =
    content.en.projects.find((p) => p.slug === slug) ?? content.fa.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <>
      {/* <SiteHeader /> */}
      <div className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <ProjectDetail slug={slug} />
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
