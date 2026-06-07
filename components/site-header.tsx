
"use client"
import { ContactModal } from "./contact-modal"
import { useEffect, useState } from "react"

const links = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  

]

function useClock() {
  const [now, setNow] = useState<Date | null>(null)
  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export function SiteHeader() {
  const now = useClock()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 py-3">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/10 px-4 py-3 sm:px-6">
        <a
          href="#about"
          className="font-mono text-sm font-semibold tracking-widest text-foreground"
        >
          <span className="text-neon-cyan">{"<"}</span>
          MSK
          <span className="text-neon-cyan">{"/>"}</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <ContactModal />
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-muted-foreground sm:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-neon-cyan" />
            <span className="tabular-nums text-foreground">
              {now
                ? now.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "--:--:--"}
            </span>
            <span className="text-muted-foreground">
              {now
                ? now.toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })
                : ""}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-foreground lg:hidden"
          >
            <span className="block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
            <span className="mt-1 block h-0.5 w-5 bg-current" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border border-white/10 p-3 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <ContactModal />
        </nav>
      )}
    </header>
  )
}
