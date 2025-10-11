"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

type ElementTag = keyof JSX.IntrinsicElements

type LangFlipProps<T extends ElementTag = "span"> = {
  as?: T
  className?: string
  children: React.ReactNode
} & Omit<JSX.IntrinsicElements[T], "className" | "children">

export function LangFlip<T extends ElementTag = "span">({
  as,
  className,
  children,
  ...rest
}: LangFlipProps<T>) {
  const { language } = useLanguage()
  const Comp = (as || "span") as ElementTag
  // key={language} remounts on language change to retrigger CSS animation
  return (
    <Comp key={language} className={cn("lang-flip", className)} {...(rest as any)}>
      {children}
    </Comp>
  )
}


