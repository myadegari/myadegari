import { content } from "@/lib/content";
import type { Lang, ProjectItem } from "@/lib/types";

export function getProjectSlugs(): string[] {
  return content.en.projects.map((p) => p.slug);
}

export function getProjectBySlug(
  slug: string,
  lang: Lang
): { project: ProjectItem; index: number } | null {
  const list = content[lang].projects;
  const index = list.findIndex((p) => p.slug === slug);
  if (index !== -1) return { project: list[index], index };
  // Fallback to English so a slug never 404s just because of language
  const fallbackIndex = content.en.projects.findIndex((p) => p.slug === slug);
  if (fallbackIndex !== -1)
    return { project: content.en.projects[fallbackIndex], index: fallbackIndex };
  return null;
}

export function getProjectNeighbors(slug: string, lang: Lang) {
  const list = content[lang].projects.length > 0 ? content[lang].projects : content.en.projects;
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index < list.length - 1 ? list[index + 1] : null,
  };
}
