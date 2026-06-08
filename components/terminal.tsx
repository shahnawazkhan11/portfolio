"use client"

import { useCallback, useEffect, useRef, useState } from "react"

type Line = { type: "input" | "output"; text: string }

type GameState =
  | { mode: "none" }
  | { mode: "scramble"; words: string[]; index: number; current: string; scrambled: string }
  | { mode: "wordle"; answer: string; guessesLeft: number; guessCount: number }
  | { mode: "guess"; target: number; attempts: number }

/* ── word banks ── */
const SCRAMBLE_WORDS = [
  "ubuntu", "react", "python", "docker", "linux",
  "flutter", "nodejs", "github", "vercel", "nextjs",
  "django", "kotlin", "angular", "fastapi", "typescript",
]

const WORDLE_WORDS = [
  "react", "linux", "swift", "flask", "redis",
  "nginx", "cargo", "fetch", "debug", "array",
  "stack", "queue", "regex", "proxy", "babel",
  "mongo", "parse", "build", "nodes", "bytes",
]

/* ── helpers ── */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle(word: string): string {
  const arr = word.toUpperCase().split("")
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  const result = arr.join(" ")
  // avoid returning the same order
  if (arr.join("") === word.toUpperCase()) return shuffle(word)
  return result
}

function wordleClue(guess: string, answer: string): string {
  const res = Array(5).fill("⬛")
  const a = answer.split("")
  const g = guess.split("")
  // exact matches first
  for (let i = 0; i < 5; i++) {
    if (g[i] === a[i]) { res[i] = "🟩"; a[i] = "#"; g[i] = "#" }
  }
  // wrong-position matches
  for (let i = 0; i < 5; i++) {
    if (g[i] === "#") continue
    const idx = a.indexOf(g[i])
    if (idx !== -1) { res[i] = "🟨"; a[idx] = "#" }
  }
  return res.join(" ")
}

/* ── static commands ── */
const COMMANDS: Record<string, string | string[]> = {
  help: [
    "Available commands: whoami, whoRU, skills, projects, clear, sudo",
    "Fun commands: game, scramble, wordle, guess",
  ],
  whoami: "guest",
  whoru:
    "Shahnawaz | 3rd Year B.Tech CSE @ Graphic Era.",
  skills:
    "Python, JavaScript, C++, Dart | Flutter, React Native, Next.js, React | FastAPI, Django, Node.js",
  projects: [
    "1. ReelCall - Second Brain for instagram",
    "2. ScripturaAI - Codebase documentation generator",
    "3. MacroScope - AI based calorie tracker",

  ],
  sudo: "Permission denied: nice try, this incident will be reported. 🚨",
  game: [
    "🎮 Available games:",
    "  scramble  — unscramble tech words",
    "  wordle    — guess the 5-letter tech word",
    "  guess     — guess a number between 1–10",
  ],
}

/* ── component ── */
export function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { type: "output", text: "ShahnawazOS v1.0.0 (tty1)" },
    { type: "output", text: 'Type "help" to see available commands.' },
  ])
  const [value, setValue] = useState("")
  const [game, setGame] = useState<GameState>({ mode: "none" })
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [history])

  /* ── game starters ── */
  const startScramble = useCallback(() => {
    const pool = [...SCRAMBLE_WORDS].sort(() => Math.random() - 0.5).slice(0, 5)
    const word = pool[0]
    const scrambled = shuffle(word)
    setGame({ mode: "scramble", words: pool, index: 0, current: word, scrambled })
    setHistory((h) => [
      ...h,
      { type: "input", text: "scramble" },
      { type: "output", text: `Unscramble the word: ${scrambled}` },
      { type: "output", text: '(type "exit" to quit)' },
    ])
  }, [])

  const startWordle = useCallback(() => {
    const answer = pick(WORDLE_WORDS)
    setGame({ mode: "wordle", answer, guessesLeft: 6, guessCount: 0 })
    setHistory((h) => [
      ...h,
      { type: "input", text: "wordle" },
      { type: "output", text: "Guess the 5-letter tech word! You have 6 tries." },
      { type: "output", text: '(type "exit" to quit)' },
    ])
  }, [])

  const startGuess = useCallback(() => {
    const target = Math.floor(Math.random() * 10) + 1
    setGame({ mode: "guess", target, attempts: 0 })
    setHistory((h) => [
      ...h,
      { type: "input", text: "guess" },
      { type: "output", text: "Guess a number between 1 and 10:" },
      { type: "output", text: '(type "exit" to quit)' },
    ])
  }, [])

  /* ── game input handler ── */
  function handleGameInput(raw: string) {
    const input = raw.trim().toLowerCase()

    if (input === "exit" || input === "quit") {
      setGame({ mode: "none" })
      setHistory((h) => [
        ...h,
        { type: "input", text: raw },
        { type: "output", text: "Game exited." },
      ])
      return
    }

    if (game.mode === "scramble") {
      if (input === game.current) {
        const next = game.index + 1
        if (next >= game.words.length) {
          setGame({ mode: "none" })
          setHistory((h) => [
            ...h,
            { type: "input", text: raw },
            { type: "output", text: "🎉 Correct!" },
            { type: "output", text: "🏆 You unscrambled all words! Amazing!" },
          ])
        } else {
          const nextWord = game.words[next]
          const scrambled = shuffle(nextWord)
          setGame({ ...game, index: next, current: nextWord, scrambled })
          setHistory((h) => [
            ...h,
            { type: "input", text: raw },
            { type: "output", text: "🎉 Correct! Next word:" },
            { type: "output", text: `Unscramble the word: ${scrambled}` },
          ])
        }
      } else {
        setHistory((h) => [
          ...h,
          { type: "input", text: raw },
          { type: "output", text: `❌ Nope! Try again: ${game.scrambled}` },
        ])
      }
      return
    }

    if (game.mode === "wordle") {
      if (input.length !== 5) {
        setHistory((h) => [
          ...h,
          { type: "input", text: raw },
          { type: "output", text: "⚠️ Enter a 5-letter word." },
        ])
        return
      }
      const clue = wordleClue(input, game.answer)
      const count = game.guessCount + 1
      const left = game.guessesLeft - 1

      if (input === game.answer) {
        setGame({ mode: "none" })
        setHistory((h) => [
          ...h,
          { type: "input", text: raw },
          { type: "output", text: clue },
          { type: "output", text: `🎉 Brilliant! You got it in ${count} guess${count > 1 ? "es" : ""}.` },
        ])
      } else if (left === 0) {
        setGame({ mode: "none" })
        setHistory((h) => [
          ...h,
          { type: "input", text: raw },
          { type: "output", text: clue },
          { type: "output", text: `💀 Out of guesses! The word was "${game.answer}".` },
        ])
      } else {
        setGame({ ...game, guessesLeft: left, guessCount: count })
        setHistory((h) => [
          ...h,
          { type: "input", text: raw },
          { type: "output", text: `${clue}  (${left} ${left === 1 ? "try" : "tries"} left)` },
        ])
      }
      return
    }

    if (game.mode === "guess") {
      const num = parseInt(input, 10)
      if (isNaN(num) || num < 1 || num > 10) {
        setHistory((h) => [
          ...h,
          { type: "input", text: raw },
          { type: "output", text: "⚠️ Enter a number between 1 and 10." },
        ])
        return
      }
      const attempts = game.attempts + 1
      if (num === game.target) {
        setGame({ mode: "none" })
        setHistory((h) => [
          ...h,
          { type: "input", text: raw },
          { type: "output", text: `🎉 Correct! You got it in ${attempts} attempt${attempts > 1 ? "s" : ""}!` },
        ])
      } else if (num < game.target) {
        setGame({ ...game, attempts })
        setHistory((h) => [
          ...h,
          { type: "input", text: raw },
          { type: "output", text: "📈 Higher! Try again:" },
        ])
      } else {
        setGame({ ...game, attempts })
        setHistory((h) => [
          ...h,
          { type: "input", text: raw },
          { type: "output", text: "📉 Lower! Try again:" },
        ])
      }
      return
    }
  }

  /* ── main command runner ── */
  function run(raw: string) {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    // route to game handler when a game is active
    if (game.mode !== "none") {
      handleGameInput(raw)
      return
    }

    if (cmd === "clear") {
      setHistory([])
      setGame({ mode: "none" })
      return
    }
    if (cmd === "scramble") { startScramble(); return }
    if (cmd === "wordle") { startWordle(); return }
    if (cmd === "guess") { startGuess(); return }

    const next: Line[] = [{ type: "input", text: raw }]
    const res = COMMANDS[cmd]
    if (res === undefined) {
      next.push({ type: "output", text: "Invalid command, try 'help'" })
    } else if (Array.isArray(res)) {
      res.forEach((r) => next.push({ type: "output", text: r }))
    } else {
      next.push({ type: "output", text: res })
    }
    setHistory((h) => [...h, ...next])
  }

  const inGame = game.mode !== "none"
  const prompt = inGame ? ">" : "guest@shahnawaz:~$"

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
      <div ref={scrollRef} className="h-64 overflow-y-auto p-4 font-mono text-xs leading-relaxed sm:text-sm">
        {history.map((line, i) =>
          line.type === "input" ? (
            <div key={i} className="flex gap-2">
              <span className="text-neon-cyan">{line.text.startsWith(">") ? ">" : "guest@shahnawaz:~$"}</span>
              <span className="text-foreground">{line.text}</span>
            </div>
          ) : (
            <div key={i} className="text-muted-foreground">
              {line.text}
            </div>
          ),
        )}
        <div className="flex gap-2">
          <span className="shrink-0 text-neon-cyan">{prompt}</span>
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
      </div>
    </div>
  )
}
