import { ArrowUpRight, CalendarDays, Mail, MapPin } from "lucide-react";
import { githubUrl, profile } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "../ui/BrandIcons";
import { AskAIButton } from "../AskAIButton";
import { CopyEmailButton } from "../CopyEmailButton";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";

export function Contact() {
  const links = [
    ...(profile.bookingUrl
      ? [
          {
            label: "Book a call",
            value: "Pick a time on Calendly",
            href: profile.bookingUrl,
            icon: <CalendarDays className="h-5 w-5" aria-hidden />,
            external: true,
          },
        ]
      : []),
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: <Mail className="h-5 w-5" aria-hidden />,
      external: false,
    },
    {
      label: "LinkedIn",
      value: "in/md-ansari-685b6318",
      href: profile.linkedin,
      icon: <LinkedInIcon />,
      external: true,
    },
    ...(githubUrl
      ? [
          {
            label: "GitHub",
            value: `@${profile.githubUsername}`,
            href: githubUrl,
            icon: <GitHubIcon />,
            external: true,
          },
        ]
      : []),
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="card relative overflow-hidden p-8 sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
              style={{ background: "var(--glow-cyan)" }}
            />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">Contact</p>
            <h2 id="contact-title" className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Hiring for enterprise AI architecture? Let&apos;s talk.
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Open to Enterprise AI Architect and senior AI architecture roles in the United States and Canada.
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-subtle">
              <MapPin className="h-3.5 w-3.5" aria-hidden /> {profile.location}
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-4 rounded-xl border border-line bg-bg-elev/70 p-4 transition-colors hover:border-cyan/50"
                  >
                    <span className="text-muted group-hover:text-cyan">{l.icon}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-subtle">{l.label}</span>
                      <span className="block truncate text-sm font-medium text-fg">{l.value}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-subtle group-hover:text-fg" aria-hidden />
                    {l.external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href={`mailto:${profile.email}?subject=${encodeURIComponent("Opportunity for an Enterprise AI Architect")}`}>
                <Mail className="h-4 w-4" aria-hidden /> Send an email
              </ButtonLink>
              <CopyEmailButton email={profile.email} />
              <AskAIButton />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
