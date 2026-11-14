import { githubUrl, profile } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "./ui/BrandIcons";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-subtle sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. Client work described at a public-safe level.
        </p>
        <div className="flex items-center gap-4">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)" className="hover:text-fg">
            <LinkedInIcon className="h-4 w-4" />
          </a>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)" className="hover:text-fg">
              <GitHubIcon className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
