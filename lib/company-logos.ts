import type { StaticImageData } from "next/image";
import FardadLogo from "@/public/fardad.png";
// The emblem is dark blue on transparent, so it needs a white badge to stay
// legible against the dark theme's tile background.
import KermanLogo from "@/public/kerman-logo-white.png";
// Circular-cropped variant of the source photo, so the mark reads as a round
// badge like the university emblem instead of a white square.
import LarestanLogo from "@/public/larestan-logo.png";
import UtLogo from "@/public/ut-logo.png";

/**
 * Company marks used by the experience timeline, keyed by `companyKey` in the
 * content data so the same logo follows a company across both languages.
 */
export const companyLogos: Record<string, StaticImageData> = {
  fardad: FardadLogo,
  kerman: KermanLogo,
  larestan: LarestanLogo,
  ut: UtLogo,
};
