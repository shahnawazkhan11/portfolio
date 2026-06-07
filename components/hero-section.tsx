"use client"

import Image from "next/image"
import { Download, Mail, MapPin, GraduationCap, Rocket } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { Terminal } from "@/components/terminal"
import { ContactModalControlled } from "@/components/contact-modal"
import { SiLeetcode } from "react-icons/si"
import { useState } from "react"

function Tag({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      <Icon className="size-4 shrink-0 text-neon-cyan" />
      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <span className="ml-auto text-right text-sm text-foreground">{value}</span>
    </div>
  )
}

export function HeroSection() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-32 sm:px-6"
    >
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        {/* Profile card */}
        <div className="glass relative overflow-hidden rounded-2xl border border-white/10 p-6">
          <div
            className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-neon-purple/20 blur-3xl"
            aria-hidden
          />
          <div className="relative flex flex-col items-center text-center">
            <div className="rounded-full p-[2px] glow-cyan">
              <Image
                src="/profile.png"
                alt="Mohammad Shahnawaz Khan"
                width={120}
                height={120}
                className="size-28 rounded-full object-cover ring-1 ring-white/20"
              />
            </div>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              Mohammad Shahnawaz Khan
            </h1>
            <span className="mt-2 rounded-md border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 font-mono text-xs text-neon-cyan">
              software_developer()
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            <Tag icon={MapPin} label="Location" value="Dehradun / Lucknow" />
            <Tag icon={GraduationCap} label="Status" value="B.Tech CSE Student" />
            <Tag icon={Rocket} label="Mission" value="To make something useful" />
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href="/resume.pdf"
              className="flex items-center justify-center gap-2 rounded-lg bg-neon-cyan px-4 py-2.5 text-sm font-medium text-background transition-shadow hover:glow-cyan"
            >
              <Download className="size-4" />
              Download Resume
            </a>
            <button
              onClick={() => setContactOpen(true)}
              className="cursor-pointer flex items-center justify-center gap-2 rounded-lg border border-neon-purple/40 bg-neon-purple/10 px-4 py-2.5 text-sm font-medium text-foreground transition-shadow hover:glow-purple"
            >
              <Mail className="size-4" />
              Contact Me
            </button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              href="https://github.com/shahnawazkhan11"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-muted-foreground transition-colors hover:text-neon-cyan"
            >
              <GithubIcon className="size-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mohammad-shahnawaz-khan/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-muted-foreground transition-colors hover:text-neon-cyan"
            >
              <LinkedinIcon className="size-5" />
            </a>
            <a
              href="https://leetcode.com/u/shahnawazkhan11/"
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode"
              className="rounded-lg border border-white/10 bg-white/5 p-2 text-muted-foreground transition-colors hover:text-neon-cyan"
            >
              <SiLeetcode className="size-5" />
            </a>
          </div>
        </div>

        {/* Intro + terminal */}
        <div className="flex flex-col gap-6">
          <div className="glass rounded-2xl border border-white/10 p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-neon-cyan">
              {"// hello world"}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-balance text-foreground sm:text-4xl">
              I build for the{" "}
              <span className="text-neon-cyan text-glow-cyan">mobile-first</span>{" "}
              future.
            </h2>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              I&apos;m a software developer passionate about mobile ecosystems and
              applied AI. From cross-platform apps with Flutter and React Native
              to intelligent backends powered by large language models, I love
              turning ambitious ideas into clean, scalable products that feel
              effortless to use.
            </p>
          </div>
          <Terminal />
        </div>
      </div>

      <ContactModalControlled isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  )
}

