"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const defaultSkills = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Svelte",
  "C#",
  "Node.js",
  "PostgreSQL",
  "Vercel",
  "Tailwind CSS",
  "shadcn/ui",
  "Azure",
  "CI/CD",
]

type SkillsMarqueeProps = {
  className?: string
  skills?: string[]
  speedPxPerSec?: number
}

export function SkillsMarquee({
  className,
  skills = defaultSkills,
  speedPxPerSec = 20,
}: SkillsMarqueeProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const isHoveringRef = React.useRef(false)
  const rafRef = React.useRef<number | null>(null)

  const normalizeToLoop = React.useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const half = el.scrollHeight / 2
    if (half > 0) {
      let st = el.scrollTop % half
      if (st < 0) st += half
      el.scrollTop = st
    }
  }, [])

  const start = React.useCallback(() => {
    if (rafRef.current != null) return
    const step = () => {
      const el = containerRef.current
      if (!el) return
      if (!isHoveringRef.current) {
        el.scrollTop += speedPxPerSec / 60
        // Loop seamlessly within [0, half)
        const half = el.scrollHeight / 2
        if (half > 0) {
          if (el.scrollTop >= half) el.scrollTop = el.scrollTop - half
          if (el.scrollTop < 0) el.scrollTop = el.scrollTop + half
        }
      }
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
  }, [speedPxPerSec])

  const stop = React.useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  React.useEffect(() => {
    start()
    return () => {
      stop()
    }
  }, [start, stop])

  const onMouseEnter = () => {
    isHoveringRef.current = true
  }
  const onMouseLeave = () => {
    isHoveringRef.current = false
    // Snap to loop boundary to avoid a visible jump when resuming
    normalizeToLoop()
  }

  // Duplicate list to enable seamless looping
  const items = [...skills, ...skills]

  return (
    <div
      className={cn(
        "relative w-full max-w-xl rounded-xl border bg-card p-4",
        className
      )}
    >
      <div
        ref={containerRef}
        className="h-48 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <ul className="flex flex-col divide-y">
          {items.map((skill, idx) => (
            <li key={`${skill}-${idx}`} className="py-2 text-sm">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
