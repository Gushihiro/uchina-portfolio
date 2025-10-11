"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import ModeToggle from "@/components/mode-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useTranslations } from "@/i18n/use-translations"

export function Navbar() {
  const t = useTranslations()
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-semibold">
          {t.nav.brand}
        </Link>
        <nav className="hidden items-center gap-2 sm:flex">
          <Link href="/" className="text-sm hover:underline">
            {t.nav.home}
          </Link>
          <Link href="#projects" className="text-sm hover:underline">
            {t.nav.projects}
          </Link>
          <Link href="#contact" className="text-sm hover:underline">
            {t.nav.contact}
          </Link>
          <LanguageToggle />
          <ModeToggle />
        </nav>
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Mobile navigation</SheetTitle>
              <div className="flex items-center justify-between">
                <span className="font-semibold">{t.nav.brand}</span>
                <div className="flex items-center gap-2">
                  <LanguageToggle />
                  <ModeToggle />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/" className="text-sm" prefetch={false}>
                  {t.nav.home}
                </Link>
                <Link href="#projects" className="text-sm" prefetch={false}>
                  {t.nav.projects}
                </Link>
                <Link href="#contact" className="text-sm" prefetch={false}>
                  {t.nav.contact}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}


