import { Download, ExternalLink, FileText } from "lucide-react";
import { profile } from "@/data/site";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Section } from "../ui/Section";

export function Resume({ hasResume }: { hasResume: boolean }) {
  return (
    <Section id="resume" eyebrow="Resume" title="Resume">
      <Reveal>
        {hasResume ? (
          <div className="card overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-3">
              <p className="flex items-center gap-2 text-sm text-muted">
                <FileText className="h-4 w-4 text-cyan" aria-hidden />
                {profile.name} — {profile.title}
              </p>
              <div className="flex gap-2">
                <ButtonLink href={profile.resumePath} target="_blank" rel="noopener noreferrer" variant="secondary">
                  <ExternalLink className="h-4 w-4" aria-hidden /> Open
                </ButtonLink>
                <ButtonLink href={profile.resumePath} download>
                  <Download className="h-4 w-4" aria-hidden /> Download PDF
                </ButtonLink>
              </div>
            </div>
            <object
              data={`${profile.resumePath}#view=FitH`}
              type="application/pdf"
              aria-label={`Resume of ${profile.name}`}
              className="hidden h-[80vh] w-full bg-surface-2 md:block"
            >
              <p className="p-6 text-sm text-muted">
                Your browser can&apos;t preview PDFs inline.{" "}
                <a className="text-cyan underline" href={profile.resumePath} download>
                  Download the resume
                </a>{" "}
                instead.
              </p>
            </object>
            <p className="p-5 text-sm text-muted md:hidden">
              Tap <span className="text-fg">Open</span> to view the resume in your browser, or download the PDF.
            </p>
          </div>
        ) : (
          <div className="card flex flex-col items-center px-6 py-14 text-center">
            <FileText className="h-8 w-8 text-subtle" aria-hidden />
            <p className="mt-4 font-semibold text-fg">The resume PDF isn&apos;t published yet</p>
            <p className="mt-2 max-w-md text-sm text-muted">
              Request a copy by email and I&apos;ll send the latest version.
            </p>
            <ButtonLink
              className="mt-6"
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Resume request")}`}
            >
              Request resume
            </ButtonLink>
          </div>
        )}
      </Reveal>
    </Section>
  );
}
