"use client"

import * as React from "react"

type SupportedLanguage = "en" | "ja"
type TranslationsByNamespace = Record<string, Record<string, string>>

type LanguageContextValue = {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void
  translations: TranslationsByNamespace | null
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<SupportedLanguage>("en")
  const [translations, setTranslations] = React.useState<TranslationsByNamespace | null>(null)

  // Hydrate from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem("language") as
        | SupportedLanguage
        | null
      if (stored === "en" || stored === "ja") {
        setLanguageState(stored)
      }
    } catch {}
  }, [])

  // Persist and update <html lang>
  React.useEffect(() => {
    try {
      window.localStorage.setItem("language", language)
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
    }
  }, [language])

  // Fetch translations from API with fallback
  React.useEffect(() => {
    let cancelled = false
    async function run() {
      try {
        const res = await fetch("/api/translations", { cache: "no-store" })
        if (!res.ok) throw new Error("Failed to load translations")
        const data = (await res.json()) as Record<SupportedLanguage, TranslationsByNamespace>
        if (!cancelled) {
          setTranslations(data[language] || null)
        }
      } catch {
        // fallback: keep previous or null; UI can fall back to built-in labels if needed
        if (!cancelled) setTranslations((prev) => prev ?? null)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [language])

  const setLanguage = React.useCallback((next: SupportedLanguage) => {
    setLanguageState(next)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext)
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return ctx
}


