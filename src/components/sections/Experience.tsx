import { Briefcase, MapPin } from "lucide-react";
import { disclosure, employer, experience, profile } from "@/data/site";
import { RoleHighlights } from "../RoleHighlights";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { Tag } from "../ui/Tag";

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={`${profile.yearsExperience} years of building and shipping enterprise systems`}
      intro="Every role at Tata Consultancy Services, most recent first. Client work is described at a public-safe level."
    >
      <Reveal>
        <dl className="mb-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {[
            { k: "Total experience", v: `${profile.yearsExperience} years` },
            { k: "At TCS since", v: String(profile.careerStartYear) },
            { k: "Roles held", v: String(experience.length) },
            { k: "Countries", v: "USA · Canada · UK · India" },
          ].map((s) => (
            <div key={s.k} className="flex flex-col-reverse bg-surface px-5 py-4">
              <dt className="mt-1 text-xs text-subtle">{s.k}</dt>
              <dd className="font-display text-base font-semibold text-fg sm:text-lg">{s.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal>
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong bg-surface">
            <Briefcase className="h-4 w-4 text-cyan" aria-hidden />
          </span>
          <div>
            <p className="font-display font-semibold text-fg">{employer.name}</p>
            <p className="text-sm text-subtle">{employer.period}</p>
          </div>
        </div>
      </Reveal>

      <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-10">
        {experience.map((role, i) => {
          const highlights = [
            ...(disclosure.showImpactMetrics ? role.metricHighlights ?? [] : []),
            ...role.highlights,
          ];
          const current = i === 0;
          return (
            <li key={role.title + role.period} className="relative">
              <span
                aria-hidden
                className={`absolute top-6 -left-[31px] h-3 w-3 rounded-full border-2 sm:-left-[47px] ${
                  current ? "border-cyan bg-cyan shadow-[0_0_0_4px_var(--glow-cyan)]" : "border-line-strong bg-bg"
                }`}
              />
              <Reveal>
                <article className={`card p-6 sm:p-7 ${current ? "border-line-strong" : ""}`}>
                  <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="flex flex-wrap items-center gap-2 font-display text-lg font-semibold text-fg sm:text-xl">
                        {role.title}
                        {current && (
                          <span className="rounded-full border border-emerald-500/40 px-2 py-0.5 font-sans text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                            Current
                          </span>
                        )}
                      </h3>
                      {role.focus && <p className="text-sm font-medium text-cyan">{role.focus}</p>}
                    </div>
                    <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 text-sm text-subtle sm:flex-col sm:items-end">
                      <span className="font-mono text-xs">{role.period}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {role.location}
                      </span>
                    </div>
                  </header>
                  {role.context && <p className="mt-3 text-sm text-subtle">{role.context}</p>}
                  {role.ownership && (
                    <p className="mt-4 rounded-lg border-l-2 border-violet bg-surface-2/70 px-4 py-2.5 text-sm text-fg">
                      <span className="font-semibold">Ownership: </span>
                      <span className="text-muted">{role.ownership}</span>
                    </p>
                  )}
                  <RoleHighlights items={highlights} />
                  <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                    {role.tech.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
