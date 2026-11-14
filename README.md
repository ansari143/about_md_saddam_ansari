# about_md_saddam_ansari

Professional portfolio of **Md Saddam Hussain Ansari, Enterprise AI Architect**. It covers 14+ years of enterprise engineering across GenAI, agentic AI, RAG, LangGraph, MCP, Azure and secure cloud architecture.

**Live site:** https://mdsaddam-ansari.web.app (Firebase Hosting)

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Motion and Lucide icons. It is fully static (`output: "export"`): no backend, database or paid APIs.

## Features

- Sections: Hero, About, Experience timeline, Expertise, Projects (professional vs. independent), Architecture reference patterns, Certifications, Resume preview/download, Contact
- Dark (default) and light theme with no flash on load, responsive navigation, smooth section links, scroll-to-top
- Subtle entrance animations that respect `prefers-reduced-motion`
- SEO: metadata, Open Graph image (generated), `sitemap.xml`, `robots.txt`, JSON-LD `Person` structured data
- Accessibility: semantic landmarks, skip link, keyboard-navigable tabs, visible focus rings
- Fallbacks when the resume PDF or profile photo is missing

## Editing content

All content lives in one typed file: [`src/data/site.ts`](src/data/site.ts).

| What | Where in `site.ts` |
| --- | --- |
| Name, email, LinkedIn, location, work authorization | `profile` |
| GitHub link (hidden until set) | `profile.githubUsername` |
| Profile photo (initials shown until set) | `profile.photoPath`, e.g. `"/profile.jpg"` in `public/` |
| Roles and achievements | `experience` |
| Skills | `expertise` |
| Case studies | `projects` |
| Architecture diagrams | `diagrams` |
| Certifications | `certifications` |
| Show/hide platform metrics and client name | `disclosure` |

### Resume

Put the PDF at `public/resume.pdf`. The site detects it at build time and shows an inline preview plus download buttons. While the file is missing, the Resume section shows a "Request resume" email button instead.

> Before publishing a resume, remove anything you don't want public (for example a phone number). Everything in `public/` is downloadable by anyone.

The published `public/resume.pdf` is generated from [`resume-source/resume.html`](resume-source/resume.html). That is a public-safe copy of the resume with no phone number and no client name. To regenerate it after editing the HTML, print it to PDF with headless Chrome or Edge, for example:

```bash
chrome --headless=new --no-pdf-header-footer --print-to-pdf=public/resume.pdf resume-source/resume.html
```

### Public-disclosure flags

`disclosure.showImpactMetrics` controls the ~100,000 employee reach, 30,000 daily active users and estimated 30–35% employee time-savings figures. Set it to `false` if those figures are not approved for public use. `disclosure.showClientName` is `false` by default.

## Local development

Requires Node.js 18.18+ (20+ recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Quality checks

```bash
npm run lint        # ESLint (next/core-web-vitals + TypeScript rules)
npm run typecheck   # tsc --noEmit
npm run build       # production build
npm run check       # all three
```

## Pushing to GitHub

```bash
git add .
git commit -m "Build portfolio site"
git push -u origin feat/portfolio-site
```

Then open a pull request into `main`, or merge it locally and push `main`.

## Deploying to Firebase Hosting

The site deploys to the Firebase project `mdsaddam-ansari` (see [`.firebaserc`](.firebaserc)). `npm run build` writes the static site to `out/`, and [`firebase.json`](firebase.json) serves that folder with security and caching headers. The Firebase CLI is a dev dependency, so no global install is needed.

```bash
npx firebase login
```

```bash
npm run deploy
```

`npm run deploy` builds the site and runs `firebase deploy --only hosting`. The site goes live at https://mdsaddam-ansari.web.app.

To use a custom domain: in the Firebase console, go to **Hosting → Add custom domain** and follow the DNS steps. Then set `NEXT_PUBLIC_SITE_URL` to that domain (see [`.env.example`](.env.example), e.g. in a `.env.production.local` file) and redeploy, so canonical URLs, the sitemap and Open Graph tags use it.

### Other hosts

`out/` is a plain static site, so any static host works too (Vercel, Netlify, GitHub Pages, Azure Static Web Apps).

## Project structure

```
src/
  app/            layout, page, globals.css, sitemap, robots, OG image, icon
  components/     Header, Footer, ThemeToggle, ScrollToTop, HeroVisual, JsonLd
    sections/     one component per page section
    ui/           Section, Reveal, Button, Tag, brand icons
  data/site.ts    all editable content
  lib/assets.ts   build-time check for optional files in public/
public/           resume.pdf and profile photo (optional)
```

## Content policy

Professional client work is described at a high level only. The site contains no proprietary code, client architecture diagrams, credentials or internal documents. The architecture diagrams are generic, vendor-neutral reference patterns.
