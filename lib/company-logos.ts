import type { StaticImageData } from "next/image";
import LarestanLogo from "@/public/larestan-higer-eductaion-complex.jpg";
import UtLogo from "@/public/ut-logo.png";

/**
 * Company marks used by the experience timeline, keyed by `companyKey` in the
 * content data so the same logo follows a company across both languages.
 */
export const companyLogos: Record<string, StaticImageData> = {
  larestan: LarestanLogo,
  ut: UtLogo,
};
