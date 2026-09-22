"use client";

import { useI18n } from "@/components/providers/i18n-provider";
import { content } from "@/lib/content";

export function useContentBrand() {
  const { lang } = useI18n();
  const { name, initials, email } = content[lang].profile;
  return { name, initials, email };
}
