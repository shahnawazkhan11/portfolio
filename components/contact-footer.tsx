import { Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"

export function ContactFooter() {
  return (
    <footer
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-16 pt-8 sm:px-6"
    >
      <div className="glass relative overflow-hidden rounded-3xl border border-white/10 p-10 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-neon-cyan/20 blur-3xl"
          aria-hidden
        />
        <div className="relative">
          <span className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
            {"// let's connect"}
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
            Let&apos;s build something great.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-muted-foreground">
            Open to internships, collaborations, and ambitious side projects.
            My inbox is always open.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:shahnawaz@example.com"
              className="inline-flex items-center gap-2 rounded-lg bg-neon-cyan px-5 py-2.5 text-sm font-medium text-background transition-shadow hover:glow-cyan"
            >
              <Mail className="size-4" />
              Say Hello
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-foreground transition-colors hover:text-neon-cyan"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-foreground transition-colors hover:text-neon-cyan"
            >
              <LinkedinIcon className="size-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} Mohammad Shahnawaz Khan — built with Next.js
        & Tailwind CSS
      </p>
    </footer>
  )
}
