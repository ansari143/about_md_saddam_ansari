import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, intro, children, className = "" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">{eyebrow}</p>
          <h2
            id={`${id}-title`}
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl"
          >
            {title}
          </h2>
          {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
