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

  // The first gallery screenshot is the best preview of the project; without
  // one, fall back to the site-wide portrait so the card still has an image.
  const cover = project.gallery?.[0];
  const images = cover
    ? [{ url: cover, width: 1920, height: 1080, alt: `${project.title} screenshot` }]
    : undefined;

  return {
    title: `${project.title} | Projects`,
    description: project.description,
    openGraph: {
      type: "article",
      url: `/projects/${slug}`,
      siteName: "Mohammadmehdi Yadegarifard",
      title: project.title,
      description: project.description,
      images: images ?? ["/profile.jpg"],
    },
    twitter: {
      card: cover ? "summary_large_image" : "summary",
      title: project.title,
      description: project.description,
      images: cover ? [cover] : ["/profile.jpg"],
    },
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
