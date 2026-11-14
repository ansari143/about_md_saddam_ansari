import { Building2, ExternalLink, Info, User } from "lucide-react";
import { disclosure, projects, type Project } from "@/data/site";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";
import { Tag } from "../ui/Tag";

function ProjectCard({ project }: { project: Project }) {
  const professional = project.kind === "professional";
  const outcome = [project.outcome, disclosure.showImpactMetrics ? project.metricOutcome : undefined]
    .filter(Boolean)
    .join(" ");

  return (
    <article className="card flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
            professional ? "border-cyan/40 text-cyan" : "border-violet/40 text-violet"
          }`}
        >
          {professional ? <Building2 className="h-3 w-3" aria-hidden /> : <User className="h-3 w-3" aria-hidden />}
          {professional ? "Professional engagement" : "Independent project"}
        </span>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
            aria-label={`Visit ${project.name} (opens in a new tab)`}
          >
            Live site <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold text-fg">{project.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>

      <dl className="mt-5 space-y-4 text-sm">
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Challenge</dt>
          <dd className="mt-1 text-muted">{project.challenge}</dd>
        </div>
        <div>
          <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Approach</dt>
          <dd className="mt-1">
            <ul className="space-y-1.5">
              {project.approach.map((a) => (
                <li key={a} className="flex gap-2.5 text-muted">
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
        {outcome && (
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Outcome</dt>
            <dd className="mt-1 text-fg">{outcome}</dd>
          </div>
        )}
      </dl>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      {project.note && (
        <div className="mt-auto pt-6">
          <p className="flex gap-2 border-t border-line pt-4 text-xs text-subtle">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
            {project.note}
          </p>
        </div>
      )}
    </article>
  );
}

export function Projects() {
  const professional = projects.filter((p) => p.kind === "professional");
  const independent = projects.filter((p) => p.kind === "independent");

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      intro="Professional client engagements and independent projects are kept clearly separate. Enterprise work is summarized at a high level — no proprietary code, diagrams or internal documents."
    >
      <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold text-fg">
        <Building2 className="h-4 w-4 text-cyan" aria-hidden /> Professional engagements
      </h3>
      <div className="grid gap-5 lg:grid-cols-2">
        {professional.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05} className="h-full">
            <div id={p.id} className="h-full">
              <ProjectCard project={p} />
            </div>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-14 mb-5 flex items-center gap-2 text-sm font-semibold text-fg">
        <User className="h-4 w-4 text-violet" aria-hidden /> Independent projects
      </h3>
      <div className="grid gap-5 lg:grid-cols-2">
        {independent.map((p) => (
          <Reveal key={p.id} className="h-full">
            <div id={p.id} className="h-full">
              <ProjectCard project={p} />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
