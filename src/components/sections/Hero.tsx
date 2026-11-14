import { ArrowRight, CalendarDays, Download, Mail, MapPin } from "lucide-react";
import { disclosure, heroStats, profile } from "@/data/site";
import { AskAIButton } from "../AskAIButton";
import { HeroVisual } from "../HeroVisual";
import { CountUp } from "../ui/CountUp";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function Hero({ hasResume }: { hasResume: boolean }) {
  const stats = heroStats.filter((s) => !s.metric || disclosure.showImpactMetrics);

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow-violet), transparent)" }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8">
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5 text-cyan" aria-hidden />
              {profile.location} · Open to roles in the USA &amp; Canada
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 id="hero-title" className="mt-6 font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl lg:text-6xl">
              {profile.displayName}
            </h1>
            <p className="mt-3 font-display text-2xl font-medium sm:text-3xl">
              <span className="text-gradient">{profile.title}</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.tagline} {profile.yearsExperience} years of enterprise engineering across GenAI, RAG, agentic
              workflows, Azure and DevSecOps.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-3">
              {profile.bookingUrl && (
                <ButtonLink href={profile.bookingUrl} target="_blank" rel="noopener noreferrer">
                  <CalendarDays className="h-4 w-4" aria-hidden /> Book a Call
                  <span className="sr-only">(opens in a new tab)</span>
                </ButtonLink>
              )}
              <ButtonLink href="#experience" variant={profile.bookingUrl ? "secondary" : "primary"}>
                View Experience <ArrowRight className="h-4 w-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="#projects" variant="secondary">
                Explore Projects
              </ButtonLink>
              {hasResume ? (
                <ButtonLink href={profile.resumePath} variant="secondary" download>
                  <Download className="h-4 w-4" aria-hidden /> Download Resume
                </ButtonLink>
              ) : (
                <ButtonLink href="#resume" variant="secondary">
                  <Download className="h-4 w-4" aria-hidden /> Resume
                </ButtonLink>
              )}
            </div>
            <div className="mt-3 -ml-4 flex flex-wrap gap-1">
              <AskAIButton />
              <ButtonLink href="#contact" variant="ghost">
                <Mail className="h-4 w-4" aria-hidden /> Contact
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs leading-snug text-subtle">{s.label}</dt>
                  <dd className="font-display text-2xl font-semibold text-fg sm:text-3xl">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mx-auto w-full max-w-[460px]">
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
