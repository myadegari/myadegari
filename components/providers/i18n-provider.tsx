"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import type { Lang } from "@/lib/types";
import { content } from "@/lib/content";
import { strings, type UiStrings } from "@/lib/strings";

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  dir: "ltr" | "rtl";
  t: UiStrings;
  data: (typeof content)[Lang];
}

const I18nContext = createContext<I18nContextValue | null>(null);

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
  return () => observer.disconnect();
}

function getLangSnapshot(): Lang {
  return document.documentElement.lang === "fa" ? "fa" : "en";
}

function getServerLangSnapshot(): Lang {
  return "en";
}

function I18nProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getLangSnapshot, getServerLangSnapshot);

  const setLang = useCallback((next: Lang) => {
    document.documentElement.lang = next;
    document.documentElement.dir = next === "fa" ? "rtl" : "ltr";
    try {
      localStorage.setItem("lang", next);
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleLang = useCallback(() => {
    const isFa = document.documentElement.lang === "fa";
    setLang(isFa ? "en" : "fa");
  }, [setLang]);

  const dir: "ltr" | "rtl" = lang === "fa" ? "rtl" : "ltr";

  return (
    <I18nContext.Provider
      value={{ lang, setLang, toggleLang, dir, t: strings[lang], data: content[lang] }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export { I18nProvider };
