import { SectionHeading } from "@/components/skills-section"
import { DoodleCanvas } from "@/components/doodle-canvas"

const timeline = [
  {
    period: "2023 — 2027",
    title: "B.Tech, Computer Science & Engineering",
    org: "Graphic Era Deemed to be University",
    // points: ["Focus: Full Stack Development & Applied AI", "Coursework: DSA, OOP, DBMS, OS, CN"],
  },
  {
    period: "2021 — 2022",
    title: "Senior Secondary (Class 12), CBSE- PCM",
    org: "St. Don Bosco College, Lakhimpur",
    // points: ["Focus: Full Stack Development & Applied AI", "Coursework: DSA, OOP, DBMS, OS, CN"],
  },
  {
    period: "2019 — 2020",
    title: "Secondary (Class 10), CBSE",
    org: "St. Don Bosco College, Lakhimpur",
    // points: ["Focus: Full Stack Development & Applied AI", "Coursework: DSA, OOP, DBMS, OS, CN"],
  },
]

export function EducationSection() {
  return (
    <section id="education" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading kicker="// academia" title="Education" />
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Timeline */}
        <div className="relative pl-6">
          <span className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-transparent" />
          {timeline.map((t) => (
            <div key={t.title} className="relative mb-6">
              <span className="absolute -left-[1.4rem] top-2 size-3 rounded-full bg-neon-cyan glow-cyan ring-4 ring-background" />
              <div className="glass rounded-2xl border border-white/10 p-6">
                <span className="font-mono text-xs text-neon-cyan">{t.period}</span>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{t.title}</h3>
                <p className="text-sm text-muted-foreground">{t.org}</p>
                {/* <ul className="mt-4 flex flex-col gap-2">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-neon-purple" />
                      {p}
                    </li>
                  ))}
                </ul> */}
              </div>
            </div>
          ))}
        </div>

        {/* Doodle canvas */}
        <div className="flex flex-col gap-3">
          <DoodleCanvas />
          <p className="text-center font-mono text-xs text-muted-foreground">
            ✨ a little interactive canvas — sketch away
          </p>
        </div>
      </div>
    </section>
  )
}
