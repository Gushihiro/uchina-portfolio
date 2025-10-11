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
    const csvToJson = translations["csvToJson"] || {}
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
      csvToJson: {
        subtitle: (csvToJson["subtitle"] as string) ?? fallback.csvToJson.subtitle,
        install: (csvToJson["install"] as string) ?? fallback.csvToJson.install,
        nodeUsage: (csvToJson["nodeUsage"] as string) ?? fallback.csvToJson.nodeUsage,
        browserUsage: (csvToJson["browserUsage"] as string) ?? fallback.csvToJson.browserUsage,
        tryIt: (csvToJson["tryIt"] as string) ?? fallback.csvToJson.tryIt,
        tryItDesc: (csvToJson["tryItDesc"] as string) ?? fallback.csvToJson.tryItDesc,
        generatedTypes: (csvToJson["generatedTypes"] as string) ?? fallback.csvToJson.generatedTypes,
        whyItMatters: (csvToJson["whyItMatters"] as string) ?? fallback.csvToJson.whyItMatters,
        whyDesc: (csvToJson["whyDesc"] as string) ?? fallback.csvToJson.whyDesc,
        viewOnNpm: (csvToJson["viewOnNpm"] as string) ?? fallback.csvToJson.viewOnNpm,
        githubRepo: (csvToJson["githubRepo"] as string) ?? fallback.csvToJson.githubRepo,
        rust: (csvToJson["rust"] as string) ?? fallback.csvToJson.rust,
        webassembly: (csvToJson["webassembly"] as string) ?? fallback.csvToJson.webassembly,
        typescript: (csvToJson["typescript"] as string) ?? fallback.csvToJson.typescript,
        nodeNapi: (csvToJson["nodeNapi"] as string) ?? fallback.csvToJson.nodeNapi,
      },
    }
  }

  return fallback
}


