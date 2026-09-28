/**
 * The one ordered list of scroll-tracked sections, shared by the header nav
 * and the scroll-spy hook so the two can never drift apart.
 */
export const sectionNavItems = [
  { id: "about", key: "navAbout" },
  { id: "experience", key: "navExperience" },
  { id: "education", key: "navEducation" },
  { id: "projects", key: "navProjects" },
  { id: "certificates", key: "navCertificates" },
  { id: "contact", key: "navContact" },
] as const;

/** Section ids in document order. Module-level, so the identity is stable. */
export const sectionNavIds = sectionNavItems.map((item) => item.id);

/**
 * The section a route belongs to, or null when the route is not part of one.
 * `/` returns null because the home page is scroll-driven instead of
 * route-driven, so the caller falls back to the scroll-spy.
 */
export function sectionForPathname(pathname: string): string | null {
  if (pathname === "/projects" || pathname.startsWith("/projects/")) {
    return "projects";
  }
  if (pathname === "/certificates") return "certificates";
  return null;
}
