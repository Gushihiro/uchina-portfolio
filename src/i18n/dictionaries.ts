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
  csvToJson: {
    subtitle: string
    install: string
    nodeUsage: string
    browserUsage: string
    tryIt: string
    tryItDesc: string
    generatedTypes: string
    whyItMatters: string
    whyDesc: string
    viewOnNpm: string
    githubRepo: string
    rust: string
    webassembly: string
    typescript: string
    nodeNapi: string
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
    csvToJson: {
      subtitle: "CSV → JSON converter with hybrid runtime: WebAssembly for Edge/Browser and a native N-API add-on for Node.",
      install: "Install",
      nodeUsage: "Node.js usage (native add-on)",
      browserUsage: "Edge/Browser usage (WebAssembly)",
      tryIt: "Try it",
      tryItDesc: "Select a CSV file to parse it into JSON in your browser.",
      generatedTypes: "Generated TypeScript types",
      whyItMatters: "Why it matters",
      whyDesc: 'One package that "just works" across runtimes reduces integration friction. On Node, the native add-on provides high throughput for server-side processing. On the Edge/Browser, WASM offers great performance for client-side parsing and validation with a consistent API.',
      viewOnNpm: "View on npm",
      githubRepo: "GitHub Repo",
      rust: "Rust",
      webassembly: "WebAssembly",
      typescript: "TypeScript",
      nodeNapi: "Node.js N-API",
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
    csvToJson: {
      subtitle: "CSV → JSON 変換ツール：Edge/ブラウザ向け WebAssembly と Node.js 向けネイティブアドオンのハイブリッドランタイム。",
      install: "インストール",
      nodeUsage: "Node.js の使い方（ネイティブアドオン）",
      browserUsage: "Edge/ブラウザの使い方（WebAssembly）",
      tryIt: "試してみる",
      tryItDesc: "CSV ファイルを選択してブラウザ内で JSON に変換します。",
      generatedTypes: "生成された TypeScript 型",
      whyItMatters: "なぜ重要か",
      whyDesc: "すべてのランタイムで「そのまま動作する」単一のパッケージは、統合の摩擦を減らします。Node ではネイティブアドオンがサーバー側処理に高スループットを提供し、Edge/ブラウザでは WASM がクライアント側のパースとバリデーションに優れたパフォーマンスを提供します。",
      viewOnNpm: "npm で見る",
      githubRepo: "GitHub リポジトリ",
      rust: "Rust",
      webassembly: "WebAssembly",
      typescript: "TypeScript",
      nodeNapi: "Node.js N-API",
    },
  },
}


