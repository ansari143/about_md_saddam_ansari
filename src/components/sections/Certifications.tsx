import { Award, GraduationCap } from "lucide-react";
import { certifications, education, type Certification } from "@/data/site";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

const statusStyle: Record<Certification["status"], { label: string; cls: string }> = {
  active: { label: "Active", cls: "border-cyan/40 text-cyan" },
  expired: { label: "Expired", cls: "border-amber-500/50 text-amber-600 dark:text-amber-400" },
  completed: { label: "Completed", cls: "border-line-strong text-subtle" },
};

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Certifications & professional development"
      intro="Listed exactly as held. Expired credentials and courses are labeled as such."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => {
          const s = statusStyle[c.status];
          return (
            <li key={c.name} className="h-full">
              <Reveal delay={(i % 3) * 0.05} className="h-full">
              <div className="card flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <Award className="h-5 w-5 shrink-0 text-violet" aria-hidden />
                  <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${s.cls}`}>{s.label}</span>
                </div>
                <h3 className="mt-4 font-semibold leading-snug text-fg">{c.name}</h3>
                <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                <p className="mt-auto pt-4 font-mono text-xs text-subtle">{c.date}</p>
                {c.note && <p className="mt-1 text-xs text-subtle">{c.note}</p>}
              </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
      <Reveal>
        <div className="card mt-6 flex items-center gap-4 p-5">
          <GraduationCap className="h-6 w-6 text-cyan" aria-hidden />
          <div>
            <p className="font-semibold text-fg">{education.degree}</p>
            <p className="text-sm text-subtle">{education.year}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
