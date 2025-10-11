"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const defaultSkills = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Vercel",
  "Tailwind CSS",
  "shadcn/ui",
  "AWS",
  "CI/CD",
  "Testing",
]

type SkillsMarqueeProps = {
  className?: string
  skills?: string[]
  speedPxPerSec?: number
}

export function SkillsMarquee({
  className,
  skills = defaultSkills,
  speedPxPerSec = 100,
}: SkillsMarqueeProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  const isHoveringRef = React.useRef(false)
  const rafRef = React.useRef<number | null>(null)

  const start = React.useCallback(() => {
    if (rafRef.current != null) return
    const step = () => {
      const el = containerRef.current
      if (!el) return
      if (!isHoveringRef.current) {
        el.scrollTop += speedPxPerSec / 60
        // Loop seamlessly
        if (el.scrollTop >= el.scrollHeight / 2) {
          el.scrollTop = el.scrollTop - el.scrollHeight / 2
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
        className="h-48 overflow-y-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
