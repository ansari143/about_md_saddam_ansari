import { Activity, Brain, Cloud, Code, MessagesSquare, Plug, Shield, Sparkles, type LucideIcon } from "lucide-react";
import { expertise } from "@/data/site";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

const iconMap: Record<string, LucideIcon> = {
  brain: Brain,
  messages: MessagesSquare,
  cloud: Cloud,
  code: Code,
  shield: Shield,
  activity: Activity,
  plug: Plug,
  sparkles: Sparkles,
};

export function Expertise() {
  return (
    <Section
      id="expertise"
      eyebrow="Expertise"
      title="Depth across the full AI delivery stack"
      intro="From retrieval and agent design to identity, cloud runtime and production observability — and the AI-assisted engineering practices that speed delivery up."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((group, i) => {
          const Icon = iconMap[group.icon] ?? Sparkles;
          const featured = i === 0;
          return (
            <Reveal key={group.title} delay={(i % 3) * 0.05} className={featured ? "sm:col-span-2 lg:col-span-2" : ""}>
              <div className="card group h-full p-6 transition-colors hover:border-line-strong">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-2">
                    <Icon className={`h-4 w-4 ${i % 2 ? "text-violet" : "text-cyan"}`} aria-hidden />
                  </span>
                  <h3 className="font-semibold text-fg">{group.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line bg-bg/40 px-3 py-1 text-xs text-muted transition-colors group-hover:text-fg"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
