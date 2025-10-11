"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "@/i18n/use-translations";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { SkillsMarquee } from "@/components/skills-marquee";

export default function Home() {
  const t = useTranslations();
  const { language } = useLanguage();
  const isJapanese = language === "ja";

  return (
    <div className="font-sans min-h-screen">
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <section className="flex flex-col gap-4">
          {isJapanese ? (
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{t.profile.nameJaKanji}</h1>
              <p className="text-muted-foreground mt-1">{t.profile.nameJaKana}</p>
            </div>
          ) : (
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">{t.profile.nameEn}</h1>
          )}
          <p className="text-lg text-muted-foreground">{t.profile.title}</p>
          <p className="text-base leading-relaxed">{t.profile.blurb}</p>
          <div className="mt-4 flex items-center gap-3">
            <Button asChild>
              <Link href="/resume/Hiroto-Robinson-Resume.pdf" target="_blank" rel="noopener noreferrer">
                {t.profile.resumeCta}
              </Link>
            </Button>
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm h-10 px-4"
              href="https://github.com/Gushihiro"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </section>
        <SkillsMarquee className="mt-8" />
      </main>
    </div>
  );
}
