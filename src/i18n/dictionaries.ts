export type Translations = {
  nav: {
    home: string
    projects: string
    contact: string
    brand: string
  }
  home: {
    getStarted: string
    saveAndSeeChanges: string
    deployNow: string
    readDocs: string
    learn: string
    examples: string
    goToNext: string
  }
  profile: {
    nameEn: string
    nameJaKanji: string
    nameJaKana: string
    title: string
    blurb: string
    resumeCta: string
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
    home: {
      getStarted: "Get started by editing",
      saveAndSeeChanges: "Save and see your changes instantly.",
      deployNow: "Deploy now",
      readDocs: "Read our docs",
      learn: "Learn",
      examples: "Examples",
      goToNext: "Go to nextjs.org →",
    },
    profile: {
      nameEn: "Hiroto Robinson",
      nameJaKanji: "具志堅寛人",
      nameJaKana: "グシケンヒロト",
      title: "Software Engineer",
      blurb:
        "Full‑stack engineer focusing on performant, accessible web apps with TypeScript, Next.js, and cloud‑native architectures.",
      resumeCta: "View Resume",
    },
  },
  ja: {
    nav: {
      brand: "うちな",
      home: "ホーム",
      projects: "プロジェクト",
      contact: "お問い合わせ",
    },
    home: {
      getStarted: "編集してはじめましょう",
      saveAndSeeChanges: "保存するとすぐに反映されます。",
      deployNow: "今すぐデプロイ",
      readDocs: "ドキュメントを読む",
      learn: "学ぶ",
      examples: "サンプル",
      goToNext: "nextjs.org へ →",
    },
    profile: {
      nameEn: "Hiroto Robinson",
      nameJaKanji: "具志堅寛人",
      nameJaKana: "グシケンヒロト",
      title: "ソフトウェアエンジニア",
      blurb:
        "TypeScript・Next.js・クラウドネイティブ基盤で、性能とアクセシビリティに優れた Web アプリを開発。",
      resumeCta: "履歴書を見る",
    },
  },
}


