"use client"

import { useLanguage } from "@/components/language-provider"
import { dictionaries, type Translations } from "./dictionaries"

export function useTranslations(): Translations {
  const { language, translations } = useLanguage()
  const fallback = dictionaries[language]

  if (translations) {
    const nav = translations["nav"] || {}
    const home = translations["home"] || {}
    const profile = translations["profile"] || {}
    return {
      nav: {
        brand: (nav["brand"] as string) ?? fallback.nav.brand,
        home: (nav["home"] as string) ?? fallback.nav.home,
        projects: (nav["projects"] as string) ?? fallback.nav.projects,
        contact: (nav["contact"] as string) ?? fallback.nav.contact,
      },
      home: {
        getStarted: (home["getStarted"] as string) ?? fallback.home.getStarted,
        saveAndSeeChanges:
          (home["saveAndSeeChanges"] as string) ?? fallback.home.saveAndSeeChanges,
        deployNow: (home["deployNow"] as string) ?? fallback.home.deployNow,
        readDocs: (home["readDocs"] as string) ?? fallback.home.readDocs,
        learn: (home["learn"] as string) ?? fallback.home.learn,
        examples: (home["examples"] as string) ?? fallback.home.examples,
        goToNext: (home["goToNext"] as string) ?? fallback.home.goToNext,
      },
      profile: {
        nameEn: (profile["nameEn"] as string) ?? fallback.profile.nameEn,
        nameJaKanji:
          (profile["nameJaKanji"] as string) ?? fallback.profile.nameJaKanji,
        nameJaKana:
          (profile["nameJaKana"] as string) ?? fallback.profile.nameJaKana,
        title: (profile["title"] as string) ?? fallback.profile.title,
        blurb: (profile["blurb"] as string) ?? fallback.profile.blurb,
        resumeCta:
          (profile["resumeCta"] as string) ?? fallback.profile.resumeCta,
      },
    }
  }

  return fallback
}


