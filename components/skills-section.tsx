"use client"

import type React from "react"
import { useRef } from "react"
import { Code2, Smartphone, Server, Wrench } from "lucide-react"

type Group = {
  title: string
  icon: typeof Code2
  accent: "cyan" | "purple"
  items: string[]
  className?: string
}

const groups: Group[] = [
  {
    title: "Languages",
    icon: Code2,
    accent: "cyan",
    items: ["Python", "JavaScript", "C++", "Dart", "Typescript" , "Java"],
    className: "lg:col-span-2",
  },
  {
    title: "Frontend / Mobile",
    icon: Smartphone,
    accent: "purple",
    items: ["Flutter", "React Native", "Next.js", "React", "Tailwind CSS"],
    className: "lg:col-span-2",
  },
  {
    title: "Backend",
    icon: Server,
    accent: "cyan",
    items: ["FastAPI", "Django REST", "Flask","Node.js"],
    className: "lg:col-span-2",
  },
  {
    title: "Tools & AI",
    icon: Wrench,
    accent: "purple",
    items: ["Git" ,"Figma", "Postman","Llama 3", "Whisper"],
    className: "lg:col-span-2",
  },
]

function SkillCard({ group }: { group: Group }) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = group.icon
  const glow =
    group.accent === "cyan" ? "var(--neon-cyan)" : "var(--neon-purple)"

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`glass group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-colors hover:border-white/20 ${group.className ?? ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, ${glow} 22%, transparent), transparent 70%)`,
        }}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center gap-3">
          <span
            className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5"
            style={{ color: glow }}
          >
            <Icon className="size-4" />
          </span>
          <h3 className="text-base font-semibold text-foreground">
            {group.title}
          </h3>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {group.items.map((it) => (
            <span
              key={it}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground"
            >
              {it}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading kicker="// stack" title="Skills" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <SkillCard key={g.title} group={g} />
        ))}
      </div>
    </section>
  )
}

export function SectionHeading({
  kicker,
  title,
}: {
  kicker: string
  title: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
        {kicker}
      </span>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      <span className="mt-4 h-px w-24 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
    </div>
  )
}
