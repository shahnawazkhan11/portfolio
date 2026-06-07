"use client"

import { useEffect, useRef, useState } from "react"

type Line = { type: "input" | "output"; text: string }

const COMMANDS: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  about     - who is Shahnawaz?",
    "  skills    - tech stack overview",
    "  projects  - list featured projects",
    "  contact   - how to reach me",
    "  clear     - clear the terminal",
  ],
  about:
    "Software developer focused on mobile ecosystems & AI. B.Tech CSE @ Graphic Era.",
  skills: "Python, JavaScript, C++, Dart | Flutter, React Native, Next.js | FastAPI, Django, Node.js",
  projects: "ReelCall, Helix, Kinnect — scroll down for details.",
  contact: "shahnawaz@example.com | github.com/shahnawaz | linkedin.com/in/shahnawaz",
  whoami: "guest",
  sudo: "Permission denied: nice try, this incident will be reported.",
}

export function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { type: "output", text: "ShahnawazOS v1.0.0 (tty1)" },
    { type: "output", text: 'Type "help" to see available commands.' },
  ])
  const [value, setValue] = useState("")
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history])

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    if (cmd === "clear") {
      setHistory([])
      return
    }
    const next: Line[] = [{ type: "input", text: raw }]
    const res = COMMANDS[cmd]
    if (res === undefined) {
      next.push({ type: "output", text: `bash: ${cmd}: command not found` })
    } else if (Array.isArray(res)) {
      res.forEach((r) => next.push({ type: "output", text: r }))
    } else {
      next.push({ type: "output", text: res })
    }
    setHistory((h) => [...h, ...next])
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="glass overflow-hidden rounded-xl border border-white/10 shadow-2xl"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
        <span className="size-3 rounded-full bg-red-500/80" />
        <span className="size-3 rounded-full bg-yellow-500/80" />
        <span className="size-3 rounded-full bg-green-500/80" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          guest@shahnawaz:~
        </span>
      </div>
      <div className="h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-sm">
        {history.map((line, i) =>
          line.type === "input" ? (
            <div key={i} className="flex gap-2">
              <span className="text-neon-cyan">guest@shahnawaz:~$</span>
              <span className="text-foreground">{line.text}</span>
            </div>
          ) : (
            <div key={i} className="text-muted-foreground">
              {line.text}
            </div>
          ),
        )}
        <div className="flex gap-2">
          <span className="shrink-0 text-neon-cyan">guest@shahnawaz:~$</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                run(value)
                setValue("")
              }
            }}
            aria-label="Terminal input"
            className="w-full bg-transparent text-foreground caret-neon-cyan outline-none"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  )
}
