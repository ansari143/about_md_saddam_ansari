import { Compass, Eye, Layers, ShieldCheck } from "lucide-react";
import { about, education, profile, targetRegions, targetRoles } from "@/data/site";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

const icons = [Compass, ShieldCheck, Layers, Eye];

export function About({ hasPhoto }: { hasPhoto: boolean }) {
  return (
    <Section id="about" eyebrow="About" title="From developer to enterprise AI architect">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {about.intro.map((p) => (
            <Reveal key={p.slice(0, 24)}>
              <p>{p}</p>
            </Reveal>
          ))}
          <Reveal>
            <div className="card mt-8 p-5">
              <h3 className="text-sm font-semibold text-fg">Open to roles</h3>
              <p className="mt-1 text-sm text-muted">
                Enterprise AI Architect and senior AI architecture roles in {targetRegions}:
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Roles I'm open to">
                {targetRoles.map((r) => (
                  <li key={r} className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-xs text-fg">
                    {r}
                  </li>
                ))}
              </ul>
              <h3 className="mt-5 text-sm font-semibold text-fg">Work authorization</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {profile.workAuthorization.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-subtle">
                {education.degree} · {education.year}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="card p-6">
            <div className="flex items-center gap-4">
              {hasPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photoPath}
                  alt={`Portrait of ${profile.displayName}`}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full border border-line-strong object-cover"
                />
              ) : (
                <div
                  aria-hidden
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong bg-surface-2 font-display text-lg font-semibold text-fg"
                >
                  MSA
                </div>
              )}
              <div>
                <p className="font-display font-semibold text-fg">{profile.displayName}</p>
                <p className="text-sm text-muted">{profile.title}</p>
              </div>
            </div>
            <h3 className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-subtle">Career progression</h3>
            <ol className="mt-4">
              {about.journey.map((j, i) => (
                <li key={j.year + j.role} className="relative flex gap-4 pb-4 last:pb-0">
                  {i < about.journey.length - 1 && (
                    <span aria-hidden className="absolute left-[5px] top-4 h-full w-px bg-line" />
                  )}
                  <span
                    aria-hidden
                    className={`relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 ${
                      i === about.journey.length - 1 ? "border-cyan bg-cyan" : "border-line-strong bg-bg"
                    }`}
                  />
                  <div className="text-sm">
                    <span className="font-mono text-xs text-subtle">{j.year}</span>
                    <p className="font-medium text-fg">{j.role}</p>
                    <p className="text-subtle">{j.place}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>

      <h3 className="mt-20 font-display text-xl font-semibold text-fg">Architecture philosophy</h3>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {about.philosophy.map((p, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="card h-full p-6">
                <Icon className="h-5 w-5 text-cyan" aria-hidden />
                <h4 className="mt-4 font-semibold text-fg">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
