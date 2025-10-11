"use client"

import { useLanguage } from "@/components/language-provider"
import { dictionaries, type Translations } from "./dictionaries"

export function useTranslations(): Translations {
  const { language, translations } = useLanguage()
  const fallback = dictionaries[language]

  if (translations) {
    const nav = translations["nav"] || {}
    return {
      nav: {
        brand: (nav["brand"] as string) ?? fallback.nav.brand,
        home: (nav["home"] as string) ?? fallback.nav.home,
        projects: (nav["projects"] as string) ?? fallback.nav.projects,
        contact: (nav["contact"] as string) ?? fallback.nav.contact,
      },
    }
  }

  return fallback
}


