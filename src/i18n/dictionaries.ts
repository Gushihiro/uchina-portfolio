export type Translations = {
  nav: {
    home: string
    projects: string
    contact: string
    brand: string
  }
}

export const dictionaries: Record<"en" | "ja", Translations> = {
  en: {
    nav: {
      brand: "uchina",
      home: "Home",
      projects: "Projects",
      contact: "Contact",
    },
  },
  ja: {
    nav: {
      brand: "うちな",
      home: "ホーム",
      projects: "プロジェクト",
      contact: "お問い合わせ",
    },
  },
}


