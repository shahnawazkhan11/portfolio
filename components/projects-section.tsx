import { GithubIcon } from "@/components/brand-icons";
import { SectionHeading } from "@/components/skills-section";

type Project = {
  name: string;
  tags: string[];
  points: string[];
  href: string;
};

const projects: Project[] = [
  {
    name: "ReelCall",
    href: "https://github.com/shahnawazkhan11/reelcall",
    tags: ["Flutter", "FastAPI", "Whisper", "Llama 3"],
    points: [
      "Built an AI indexing application that transcribes and semantically searches video reels.",
      "Integrated Whisper for speech-to-text and Llama 3 for contextual tagging & retrieval.",
      "Designed an offline-first Flutter UI with snappy local caching and search.",
    ],
  },
  {
    name: "Thenix",
    href: "https://github.com/shahnawazkhan11/Thenix",
    tags: ["React Native", "Django REST Framework", "NativeWind"],
    points: [
      "Engineered a fitness platform with 100+ exercises, optimizing Django queries to reduce data retrieval latency by 40%.",
      "Implemented JWT-based authentication, securing user sessions and eliminating server-side session storage overhead.",
      "Leveraged NativeWind to achieve 95% code reuse across platforms, accelerating UI iteration speed by 2x.",
    ],
  },
  {
    name: "Scriptura AI",
    href: "https://github.com/Team-Hacksmith/ScripturaAI",
    tags: ["Flask", "Python", "React.js", "LangChain"],
    points: [
      "Built a GenAI-powered tool that transforms GitHub repos into hosted sites, cutting documentation time by 60%.",
      "Automated Mermaid diagrams and algorithm explanations via signature parsing, boosting onboarding clarity by 80%.",
      "Developed a VS Code extension to generate docstring-format documentation, reducing manual context-switching by 50%.",
    ],
  },
  {
    name: "MacroScope",
    href: "https://github.com/shahnawazkhan11/macroscope",
    tags: ["Flutter", "Google ML Kit", "Firestore", "Gemini"],
    points: [
      "Automated macronutrient logging using Gemini and ML Kit OCR across 3 input modes to eliminate 100% of manual entry.",
      "Built an offline-first data pipeline with Hive and Firestore, enabling 100% offline functionality for Android & iOS.",
      "Developed a real-time ingredient safety scanner that flags harmful additives across 4 global regulatory standards.",
    ],
  },

  {
    name: "Helix",
    href: "https://github.com/MAnishG04/helix",
    tags: ["Next.js", "FastAPI", "AWS", "DynamoDB"],
    points: [
      "AWS-integrated academic management platform for courses, attendance, and grades.",
      "Architected serverless APIs with Lambda, API Gateway, and DynamoDB for scale.",
      "Implemented role-based access for students, faculty, and administrators.",
    ],
  },
  {
    name: "Kinnect",
    href: "https://github.com/shahnawazkhan11/kinnect",
    tags: ["Flutter", "Django REST", "AI", "Accessibility"],
    points: [
      "Accessibility-focused health app for users with limited mobility and vision.",
      "Voice-driven navigation and high-contrast adaptive UI for inclusive design.",
      "Django REST backend powering reminders, vitals tracking, and caregiver sync.",
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="glass group flex flex-col overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-neon-cyan/30">
      <div className="h-1 w-full bg-gradient-to-r from-neon-cyan via-neon-purple to-transparent" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {project.name}
            </h3>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-2.5 py-0.5 text-[11px] font-medium text-neon-cyan">
              <span className="size-1.5 animate-pulse rounded-full bg-neon-cyan" />
              Live Project
            </span>
          </div>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.name} on GitHub`}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-muted-foreground transition-colors hover:text-neon-cyan"
          >
            <GithubIcon className="size-4" />
          </a>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <ul className="mt-5 flex flex-col gap-2.5">
          {project.points.map((p) => (
            <li
              key={p}
              className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-neon-purple" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6"
    >
      <SectionHeading kicker="// build log" title="Projects" />
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.name} project={p} />
        ))}
      </div>
    </section>
  );
}
