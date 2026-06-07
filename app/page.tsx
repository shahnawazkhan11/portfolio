import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { EducationSection } from "@/components/education-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ContactFooter } from "@/components/contact-footer"

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background grid + glow */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(to bottom, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-neon-purple/10 blur-[120px]"
        aria-hidden
      />

      <SiteHeader />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <AchievementsSection />
      </main>
      <ContactFooter />
    </div>
  )
}
