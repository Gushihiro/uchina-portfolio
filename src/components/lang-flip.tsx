"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

type LangFlipProps = {
  className?: string
  children: React.ReactNode
}

export function LangFlip({ className, children }: LangFlipProps) {
  const { language } = useLanguage()
  // key={language} remounts on language change to retrigger CSS animation
  return (
    <span key={language} className={cn("lang-flip", className)}>
      {children}
    </span>
  )
}


