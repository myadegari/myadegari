import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ProfileHero } from "@/components/profile/profile-hero";
import { AboutSection } from "@/components/profile/about-section";
import { ExperienceSection, EducationSection } from "@/components/profile/timeline-sections";
import { ProjectsSection } from "@/components/profile/projects-section";
import { CertificatesSection } from "@/components/profile/certificates-section";
import { ContactSection } from "@/components/profile/contact-section";
import { RightRail } from "@/components/profile/right-rail";

export default function Home() {
  return (
    <>
      {/* <SiteHeader /> */}
      <div className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <ProfileHero />
          <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <main className="min-w-0 space-y-6">
              <AboutSection />
              <ExperienceSection />
              <EducationSection />
              <ProjectsSection />
              <CertificatesSection />
              <ContactSection />
            </main>
            <RightRail />
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
