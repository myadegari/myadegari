"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { DustProvider } from "@/fx/dust-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DustProvider>
        <I18nProvider>{children}</I18nProvider>
      </DustProvider>
    </ThemeProvider>
  );
}
