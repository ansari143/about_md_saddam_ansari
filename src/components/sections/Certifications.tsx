import { Award, GraduationCap, TrendingUp } from "lucide-react";
import { certifications, education, internalCertifications, internalCourses, type Certification } from "@/data/site";
import { CourseGroups } from "../CourseGroups";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

const statusStyle: Record<Certification["status"], { label: string; cls: string }> = {
  active: { label: "Active", cls: "border-cyan/40 text-cyan" },
  expired: { label: "Expired", cls: "border-amber-500/50 text-amber-600 dark:text-amber-400" },
  completed: { label: "Completed", cls: "border-line-strong text-subtle" },
};

const courseCount = internalCourses.reduce((n, g) => n + g.courses.length, 0);

export function Certifications() {
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title="Certifications & professional development"
      intro="Industry certifications listed exactly as held, with expired credentials and courses labeled, followed by technical certifications completed internally at TCS."
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
        <div className="card mt-10 p-6 sm:p-7">
          <div className="flex flex-wrap items-start gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2">
              <TrendingUp className="h-5 w-5 text-cyan" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg font-semibold text-fg">Continuous learning at TCS</h3>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted">
                {internalCertifications.length} technical certifications and {courseCount} technical courses from
                TCS&apos;s internal learning platform, completed between 2012 and 2025. They run from Java, ETL and web
                frameworks to Azure, DevOps, machine learning and generative AI. Each one maps to skills on my resume,
                and together they show how quickly I pick up new technology as it emerges.
              </p>
            </div>
          </div>
          <h4 className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
            Internal certifications · {internalCertifications.length}
          </h4>
          <ol className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {internalCertifications.map((c) => (
              <li key={c.name} className="flex items-start gap-3 border-t border-line pt-3">
                <span className="mt-0.5 w-16 shrink-0 font-mono text-[11px] text-subtle">{c.date}</span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-fg">{c.name}</span>
                  <span className="block text-xs text-subtle">{c.area} · TCS internal</span>
                </span>
              </li>
            ))}
          </ol>
          <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
            Technical courses · {courseCount}
          </h4>
          <div className="mt-3">
            <CourseGroups groups={internalCourses} />
          </div>
        </div>
      </Reveal>

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
