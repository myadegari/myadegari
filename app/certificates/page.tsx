import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ArchiveHeader } from "@/components/shared/archive-header";
import { CredlyProfileLink } from "@/components/shared/credly-profile-link";
import { AnimatedSection } from "@/fx/animated-section";
import { CertificatesList } from "./CertificatesList";

export const metadata: Metadata = {
  title: "Certificates | Mohammadmehdi Yadegarifard",
  description: "Browse all certificates with search and issuer filters.",
};

export default function CertificatesPage() {
  return (
    <>
      {/* <SiteHeader /> */}
      <div className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-6">
          <AnimatedSection burstScale={0.5}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <ArchiveHeader section="certificates" />
              <CredlyProfileLink />
            </div>
          </AnimatedSection>
          <div className="mt-6 rounded-lg bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-6">
            <CertificatesList />
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
