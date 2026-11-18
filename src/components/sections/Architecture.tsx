"use client";

import { ArrowDown, ArrowRight, Briefcase, CheckCircle2 } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { diagrams } from "@/data/site";

function FlowDiagram({ index }: { index: number }) {
  const d = diagrams[index];
  return (
    <figure aria-label={`${d.title} reference diagram`}>
      <ol className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-stretch lg:gap-0">
        {d.steps.map((s, i) => (
          <li key={s.label} className="flex flex-col items-center lg:flex-1 lg:flex-row">
            <div
              className={`relative w-full rounded-xl border bg-bg-elev p-4 lg:h-full ${
                i === 0 || i === d.steps.length - 1 ? "border-line-strong" : "border-line"
              }`}
            >
              <span className="font-mono text-[10px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-1 text-sm font-semibold text-fg">{s.label}</p>
              <p className="mt-1 text-xs leading-snug text-muted">{s.detail}</p>
              <span
                aria-hidden
                className="absolute inset-x-4 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, var(--cyan), transparent)", opacity: 0.6 }}
              />
            </div>
            {i < d.steps.length - 1 && (
              <span aria-hidden className="flex items-center justify-center py-1 text-cyan lg:px-1.5 lg:py-0">
                <ArrowDown className="h-4 w-4 lg:hidden" />
                <ArrowRight className="hidden h-4 w-4 lg:block" />
              </span>
            )}
          </li>
        ))}
      </ol>
      <figcaption className="sr-only">{d.summary}</figcaption>
    </figure>
  );
}

export function Architecture() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    let next = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % diagrams.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + diagrams.length) % diagrams.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = diagrams.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  const d = diagrams[active];

  return (
    <section id="architecture" aria-labelledby="architecture-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">Architecture</p>
        <h2 id="architecture-title" className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
          How I design enterprise AI systems
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Hybrid routing, RAG, multi-agent orchestration, state management, tool integration, security and
          observability: how each pattern works, the decisions behind it, and where I&apos;ve applied it. Described at a
          public-safe level, with no proprietary implementation details.
        </p>

        <div className="mt-10 card overflow-hidden">
          <div
            role="tablist"
            aria-label="Architecture patterns"
            onKeyDown={onKey}
            className="flex gap-1 overflow-x-auto border-b border-line p-2"
          >
            {diagrams.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === i}
                aria-controls={`panel-${t.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-sm transition-colors ${
                  active === i ? "bg-surface-2 text-fg shadow-[inset_0_0_0_1px_var(--border-strong)]" : "text-muted hover:text-fg"
                }`}
              >
                {t.title}
              </button>
            ))}
          </div>

          <div role="tabpanel" id={`panel-${d.id}`} aria-labelledby={`tab-${d.id}`} className="p-5 sm:p-8" tabIndex={0}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-semibold text-fg">{d.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-muted">{d.summary}</p>
              </div>
            </div>
            <div className="mt-8" key={d.id}>
              <FlowDiagram index={active} />
            </div>
            <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-2">
              {d.deepDive.map((section) => (
                <div key={section.heading}>
                  <h4 className="font-display text-base font-semibold text-fg">{section.heading}</h4>
                  <ul className="mt-3 space-y-2.5">
                    {section.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 flex gap-3 rounded-lg border-l-2 border-violet bg-surface-2/70 px-4 py-3 text-sm">
              <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-violet" aria-hidden />
              <span>
                <span className="font-semibold text-fg">Applied in my work: </span>
                <span className="text-muted">{d.appliedIn}</span>
              </span>
            </p>
            <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">Design principles</h4>
            <ul className="mt-3 grid gap-3 sm:grid-cols-3">
              {d.principles.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
