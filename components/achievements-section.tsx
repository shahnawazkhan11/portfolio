import { SectionHeading } from "@/components/skills-section"
import { Heart, Palette, Users, Trophy, Award, Medal, BookOpen, Gamepad2, Clapperboard } from "lucide-react"

const beyondCode = [
  {
    icon: BookOpen,
    title: "Kavyanjali Literary Club",
    desc: "Active member (2023-24), participating in literary discussions, events, and community building.",
  },
  {
    icon: Gamepad2,
    title: "Smash Karts Global Rank Holder",
    desc: "Ranked competitively on the global leaderboards in the slow-paced multiplayer arena game.",
  },
  {
    icon: Clapperboard,
    title: "Short Film Director",
    desc: "Directed and produced a short film, managing the creative vision, storytelling, and overall production.",
  },


]

const achievements = [
{
    icon: Trophy,
    title: "WorldSkills India Regional — Silver Medal",
    detail: "Mobile Application Development, 2nd Place in North Region.",
    accent: "var(--neon-cyan)",
  },
  {
    icon: Award,
    title: "HackVeda Hackathon — Winner",
    detail: "Sponsored by AWS and IBM at IILM University, Noida.",
    accent: "var(--neon-purple)", 
  },
  {
    icon: Trophy,
    title: "Uttarakhand Skills Competition — Gold Medal",
    detail: "Mobile Application Development, 1st Place in Uttarakhand.",
    accent: "var(--neon-cyan)",
  },

  {
    icon: Medal,
    title: "CodeClash 2.0 — Finalist",
    detail: "Top finalist among hundreds of participants.",
    accent: "var(--neon-cyan)",
  },
]

export function AchievementsSection() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading kicker="// extras" title="Achievements" />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Beyond Code */}
        <div>
          <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            Beyond Code
          </h3>
          <div className="flex flex-col gap-4">
            {beyondCode.map((b) => {
              const Icon = b.icon
              return (
                <div
                  key={b.title}
                  className="glass flex gap-4 rounded-2xl border border-white/10 p-5 transition-colors hover:border-white/20"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neon-purple">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-foreground">{b.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {b.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Competitive & Technical */}
        <div>
          <h3 className="mb-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">
            Competitive & Technical
          </h3>
          <div className="flex flex-col gap-4">
            {achievements.map((a) => {
              const Icon = a.icon
              return (
                <div
                  key={a.title}
                  className="glass flex items-center gap-4 rounded-2xl border border-white/10 p-5 transition-colors hover:border-white/20"
                >
                  <span
                    className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5"
                    style={{ color: a.accent, boxShadow: `0 0 18px -6px ${a.accent}` }}
                  >
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <h4 className="font-semibold text-foreground">{a.title}</h4>
                    <p className="mt-0.5 text-sm text-muted-foreground">{a.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
