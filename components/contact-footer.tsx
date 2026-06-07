import { Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"

export function ContactFooter() {
  return (
    <footer
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-8 pt-8 sm:px-6"
    >
      <div className="flex flex-col items-center gap-3 border-t border-white/10 pt-8 pb-4 font-mono text-xs text-muted-foreground">
        
        {/* Desktop: Single Row | Mobile: Stacked */}
        <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-3 text-center">
          <p className="tracking-wide">Made with ☕, Next.js, and mechanical switches.</p>
          <span className="hidden lg:inline text-white/10">|</span>
          <p className="tracking-wide">Designed with Figma, built with code, and fueled by Spotify.</p>
        </div>

        <p className="mt-2 text-muted-foreground/60 tracking-wider">
          Powered by excessive caffeine &copy; 2026
        </p>

      </div>
    </footer>
  )
}