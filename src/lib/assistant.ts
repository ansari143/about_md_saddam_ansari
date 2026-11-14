/**
 * "Ask AI Representative" answer engine.
 *
 * Runs entirely in the browser with no external API. Every answer is built
 * from src/data/site.ts, so it can only state facts that are on the site and
 * stays in sync when that file changes. Questions outside the resume get a
 * polite fallback that points to booking a call or email.
 */
import {
  certifications,
  disclosure,
  education,
  employer,
  experience,
  expertise,
  profile,
  projects,
} from "@/data/site";

export type ChatAction = {
  label: string;
  href: string;
  kind: "external" | "section" | "download" | "mail";
};

export type ChatAnswer = {
  text: string[];
  bullets?: string[];
  actions?: ChatAction[];
  /** Intent id, used to answer follow-ups like "tell me more". */
  topic?: string;
};

const firstName = "Saddam";
const current = experience[0];

/* ------------------------------- Actions ---------------------------------- */

export const actions = {
  book: (): ChatAction | null =>
    profile.bookingUrl ? { label: "Book a call", href: profile.bookingUrl, kind: "external" } : null,
  resume: (): ChatAction => ({ label: "Download resume", href: profile.resumePath, kind: "download" }),
  email: (): ChatAction => ({
    label: "Email Saddam",
    href: `mailto:${profile.email}?subject=${encodeURIComponent("Enterprise AI Architect opportunity")}`,
    kind: "mail",
  }),
  linkedin: (): ChatAction => ({ label: "LinkedIn", href: profile.linkedin, kind: "external" }),
  section: (id: string, label: string): ChatAction => ({ label, href: `#${id}`, kind: "section" }),
};

function compact(list: (ChatAction | null)[]): ChatAction[] {
  return list.filter((a): a is ChatAction => a !== null);
}

/* -------------------------------- Intents --------------------------------- */

type Intent = {
  id: string;
  /** Single words (matched as whole words) or phrases (matched as substrings). */
  keywords: string[];
  answer: () => ChatAnswer;
  more?: () => ChatAnswer;
};

const metricLine = disclosure.showImpactMetrics
  ? " The platform supports approximately 100,000 employees and 30,000 daily active users."
  : "";

const intents: Intent[] = [
  {
    id: "greeting",
    keywords: ["hi", "hello", "hey", "hiya", "good morning", "good afternoon", "good evening"],
    answer: () => ({
      text: [
        `Hello! I'm the AI representative for ${profile.displayName}. Ask me about experience, GenAI and agentic AI work, skills, certifications, work authorization, or how to get in touch.`,
      ],
    }),
  },
  {
    id: "about",
    keywords: [
      "who", "about", "summary", "overview", "introduce", "introduction", "background", "profile",
      "tell me about", "elevator pitch", "bio",
    ],
    answer: () => ({
      text: [
        `${profile.displayName} is an ${profile.title} with ${profile.yearsExperience} years of enterprise software engineering across the United States, Canada, the United Kingdom and India.`,
        `${firstName} progressed from developer to technical lead to architect, and today architects an Enterprise AI & Agentic Platform: one secure AI experience for employee knowledge, productivity and actions.${metricLine}`,
      ],
      actions: compact([actions.section("about", "Read the full story"), actions.book()]),
    }),
    more: () => ({
      text: [`${firstName}'s architecture philosophy:`],
      bullets: [
        "Personally design solution patterns, then guide developers through implementation and design reviews.",
        "Security and governance by default: OAuth/OIDC, Entra ID, least privilege, auditable tool execution.",
        "Evolve what works: keep proven conversational flows and add LLM retrieval and agents where they add value.",
        "Observable and production-ready: tracing, monitoring and evaluation designed in.",
      ],
      actions: [actions.section("about", "Go to About")],
    }),
  },
  {
    id: "current-role",
    keywords: [
      "current", "currently", "now", "today", "present", "position", "job", "title", "doing",
      "working on", "role",
    ],
    answer: () => ({
      text: [
        `${firstName} is currently ${current.title} — ${current.focus}, based in ${current.location} (${current.period}), at ${employer.name}.`,
        current.ownership ?? "",
      ].filter(Boolean),
      bullets: [
        ...(disclosure.showImpactMetrics ? current.metricHighlights?.slice(0, 1) ?? [] : []),
        ...current.highlights.slice(0, 3),
      ],
      actions: [actions.section("experience", "See full experience")],
    }),
    more: () => ({
      text: ["More from the current role:"],
      bullets: current.highlights.slice(3),
      actions: [actions.section("experience", "See full experience")],
    }),
  },
  {
    id: "timeline",
    keywords: [
      "career", "timeline", "history", "experience", "progression", "roles", "previous", "past",
      "worked", "employer", "companies", "company", "tcs", "tata", "years",
    ],
    answer: () => ({
      text: [
        `${profile.yearsExperience} years at ${employer.name} (${employer.period}), progressing from trainee to AI architect across four countries:`,
      ],
      bullets: experience.map(
        (r) => `${r.period.replace(" – ", "–")}: ${r.title}${r.focus ? ` (${r.focus})` : ""} · ${r.location}`,
      ),
      actions: [actions.section("experience", "Open the timeline"), actions.resume()],
    }),
  },
  {
    id: "genai",
    keywords: [
      "genai", "generative", "ai", "llm", "llms", "agent", "agents", "agentic", "langgraph", "langchain",
      "rag", "retrieval", "mcp", "model context protocol", "embeddings", "vector", "search", "openai",
      "gpt", "prompt", "guardrails", "hitl", "human in the loop", "multi-agent", "orchestration",
    ],
    answer: () => ({
      text: [`GenAI and agentic AI are the core of ${firstName}'s current work:`],
      bullets: [
        "Production-oriented RAG and enterprise search: ingestion, chunking, embeddings, vector/hybrid retrieval, reranking, grounding and citations.",
        "LangGraph stateful and multi-agent workflows with checkpoints, retries, human approvals and MCP-based integrations.",
        "Hybrid architecture that keeps established Dialogflow/NLP intent flows while adding LLM retrieval, agent routing and secure tool calling.",
        "Guardrails, governed workflows and observability (Langfuse, OpenTelemetry, Datadog) for AI in production.",
      ],
      actions: [actions.section("architecture", "See reference architectures"), actions.section("projects", "View projects")],
    }),
  },
  {
    id: "cloud",
    keywords: [
      "azure", "aks", "kubernetes", "docker", "cloud", "devops", "devsecops", "security", "secure",
      "oauth", "oidc", "entra", "sso", "ci/cd", "cicd", "pipeline", "veracode", "sonarqube",
      "observability", "monitoring", "datadog", "microservices", "kafka", "service bus",
    ],
    answer: () => ({
      text: [`${firstName} guides cloud-native and DevSecOps architecture on Microsoft Azure:`],
      bullets: [
        "Azure/AKS microservices, Docker, API Management, Service Bus, Functions and Key Vault.",
        "Identity and access: OAuth 2.0/OIDC, JWT, SSO, Microsoft Entra ID, RBAC and least privilege.",
        "Security gates in CI/CD (Veracode, SonarQube, Black Duck) and penetration-test remediation.",
        "Event-driven processing with Azure Service Bus and Apache Kafka: retries, dead-letter handling, fault isolation.",
        "Observability: distributed tracing, Datadog, Application Insights and production readiness.",
      ],
      actions: [actions.section("expertise", "See all expertise")],
    }),
  },
  {
    id: "integrations",
    keywords: [
      "integration", "integrations", "workday", "servicenow", "salesforce", "sap", "concur",
      "microsoft graph", "sharepoint", "onedrive", "systems of record", "api", "apis",
    ],
    answer: () => ({
      text: [
        `${firstName} designs secure API integrations across Microsoft Graph, SharePoint, OneDrive, ServiceNow, Workday, Salesforce, SAP Concur and other enterprise systems, so employees can complete tasks without switching between applications.`,
      ],
      actions: [actions.section("projects", "View the platform case study")],
    }),
  },
  {
    id: "ai-engineering",
    keywords: [
      "claude", "claude code", "cursor", "copilot", "github copilot", "ai-assisted", "ai assisted",
      "productivity", "developer tools", "code review", "fix agent",
    ],
    answer: () => ({
      text: [
        `${firstName} guides teams in AI-assisted engineering with Claude Code, Cursor and GitHub Copilot: rapid feature development, automated code-review and fix-agent patterns, debugging, test generation and safe deployment.`,
        "This portfolio itself was built with AI-assisted development.",
      ],
    }),
  },
  {
    id: "impact",
    keywords: [
      "impact", "scale", "users", "metrics", "results", "achievement", "achievements", "accomplishments",
      "numbers", "savings", "dau", "outcome", "outcomes",
    ],
    answer: () =>
      disclosure.showImpactMetrics
        ? {
            text: ["Highlights from the Enterprise AI & Agentic Platform:"],
            bullets: [
              "Serves a workforce of approximately 100,000 employees and 30,000 daily active users.",
              "Unified AI workflows contributed to an estimated 30–35% employee time savings on supported daily tasks.",
              "Earlier: trained and onboarded 25+ team members as a technical contact.",
            ],
            actions: [actions.section("projects", "Read the case study")],
          }
        : {
            text: [
              `${firstName} architects an enterprise-wide AI and agentic platform and has trained and onboarded 25+ team members. Detailed metrics are shared in conversation.`,
            ],
            actions: compact([actions.book()]),
          },
  },
  {
    id: "projects",
    keywords: ["project", "projects", "portfolio", "case study", "case studies", "built", "nisha", "side project", "education website"],
    answer: () => ({
      text: ["Selected work:"],
      bullets: projects.map(
        (p) => `${p.name} (${p.kind === "professional" ? "professional engagement" : "independent project"}): ${p.summary}`,
      ),
      actions: compact([
        actions.section("projects", "View projects"),
        projects.find((p) => p.url) ? { label: "Visit Nisha Global Education", href: projects.find((p) => p.url)!.url!, kind: "external" } : null,
      ]),
    }),
  },
  {
    id: "certifications",
    keywords: ["certification", "certifications", "certified", "certificate", "credential", "credentials", "az-300", "watson", "training", "courses", "bootcamp"],
    answer: () => ({
      text: ["Certifications and professional development:"],
      bullets: certifications.map(
        (c) => `${c.name} — ${c.issuer}, ${c.date}${c.status === "expired" ? " (expired)" : ""}${c.note ? ` (${c.note})` : ""}`,
      ),
      actions: [actions.section("certifications", "See certifications")],
    }),
  },
  {
    id: "education",
    keywords: ["education", "degree", "university", "college", "graduated", "bachelor", "studied", "qualification"],
    answer: () => ({
      text: [`${education.degree}, ${education.year}.`],
    }),
  },
  {
    id: "authorization",
    keywords: [
      "visa", "authorization", "authorisation", "sponsor", "sponsorship", "tn", "citizen", "citizenship",
      "work permit", "eligible", "legally", "immigration", "h1b", "h-1b", "green card",
    ],
    answer: () => ({
      text: profile.workAuthorization,
      actions: compact([actions.book(), actions.email()]),
    }),
  },
  {
    id: "location",
    keywords: ["location", "located", "where", "based", "live", "city", "remote", "relocate", "relocation", "onsite", "hybrid", "canada", "usa", "toronto", "tampa"],
    answer: () => ({
      text: [
        `${firstName} is based in ${profile.location} and is open to Enterprise AI Architect roles in the USA and Canada.`,
        ...profile.workAuthorization,
      ],
      actions: compact([actions.book()]),
    }),
  },
  {
    id: "contact",
    keywords: [
      "contact", "email", "reach", "hire", "hiring", "interview", "call", "meeting", "meet", "schedule",
      "book", "calendly", "available", "availability", "talk", "connect", "phone", "opportunity",
    ],
    answer: () => ({
      text: [
        profile.bookingUrl
          ? `The quickest way is to book a time on ${firstName}'s calendar. You can also email ${profile.email} or connect on LinkedIn.`
          : `You can email ${profile.email} or connect on LinkedIn.`,
      ],
      actions: compact([actions.book(), actions.email(), actions.linkedin()]),
    }),
  },
  {
    id: "resume",
    keywords: ["resume", "résumé", "cv", "pdf", "download"],
    answer: () => ({
      text: ["Here's the latest resume (PDF, 3 pages). You can also preview it on the page."],
      actions: [actions.resume(), actions.section("resume", "Preview on page")],
    }),
  },
  {
    id: "skills",
    keywords: ["skills", "skill", "stack", "tech", "technologies", "technology", "tools", "languages", "programming", "expertise", "strengths"],
    answer: () => ({
      text: ["Core skills by area:"],
      bullets: expertise.map((g) => `${g.title}: ${g.skills.slice(0, 6).join(", ")}${g.skills.length > 6 ? "…" : ""}`),
      actions: [actions.section("expertise", "See all expertise")],
    }),
  },
  {
    id: "leadership",
    keywords: ["lead", "leader", "leadership", "team", "teams", "mentor", "mentoring", "manage", "managed", "guide", "stakeholders", "collaboration"],
    answer: () => ({
      text: [`${firstName}'s leadership is hands-on and technical:`],
      bullets: [
        "Personally designs solution patterns, then guides developers through implementation and technical reviews.",
        "Leads architecture and design reviews and mentors engineers.",
        "Coordinated technical reviews across distributed teams and produced HLD/LLD, API contracts and runbooks.",
        "Trained and onboarded 25+ team members.",
      ],
    }),
  },
  {
    id: "thanks",
    keywords: ["thanks", "thank you", "thank", "great", "awesome", "perfect", "helpful", "cool"],
    answer: () => ({
      text: ["You're welcome! Anything else you'd like to know?"],
      actions: compact([actions.book()]),
    }),
  },
];

/* ------------------------------ Skill lookup ------------------------------ */

/** Generic words that shouldn't count as a technology on their own. */
const genericWords = new Set([
  "management", "search", "functions", "storage", "extraction", "orchestration", "workflows", "calling",
  "engineering", "evaluation", "patterns", "protocol", "tracing", "controls", "generation", "review",
  "remediation", "execution", "privilege", "least", "secure", "security", "vector", "hybrid", "intent",
  "entity", "chunking", "model", "prompt", "human", "loop", "service", "bus", "atlas", "boot", "key",
  "vault", "open", "distributed", "microsoft", "google", "apache", "github", "azure", "client", "server",
  "test", "automated", "stateful", "multi-agent", "checkpoints", "retries", "reranking", "grounding",
  "tool", "function", "routing", "embeddings", "secrets", "guardrails", "monitoring", "api", "fix-agent",
]);

const skillIndex: { term: string; skill: string; group: string }[] = expertise.flatMap((g) =>
  g.skills.flatMap((skill) => {
    const parts = skill
      .split(/\s*[/&]\s*|\s*,\s*/)
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 2);
    // Also index distinctive single words of multi-word names, e.g. "kafka" from "Apache Kafka".
    const words = parts.flatMap((p) => p.split(" ")).filter((w) => w.length > 3 && !genericWords.has(w));
    return [...new Set([...parts, ...words])].map((term) => ({ term, skill, group: g.title }));
  }),
);

function findSkill(q: string): { skill: string; group: string } | null {
  // Prefer the longest matching term, e.g. "spring boot" over "boot".
  const hits = skillIndex
    .filter((s) => new RegExp(`(^|[^a-z0-9])${escapeRegExp(s.term)}([^a-z0-9]|$)`).test(q))
    .sort((a, b) => b.term.length - a.term.length);
  return hits[0] ?? null;
}

function rolesUsing(term: string): string[] {
  const t = term.toLowerCase();
  return experience
    .filter(
      (r) =>
        r.tech.some((x) => x.toLowerCase().includes(t)) ||
        r.highlights.some((h) => h.toLowerCase().includes(t)),
    )
    .map((r) => `${r.title}${r.focus ? ` — ${r.focus}` : ""} (${r.period})`);
}

/* -------------------------------- Matching -------------------------------- */

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalize(s: string) {
  return s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, " ").trim();
}

function score(q: string, words: Set<string>, intent: Intent): number {
  let total = 0;
  for (const k of intent.keywords) {
    if (k.includes(" ") || k.includes("-") || k.includes("/")) {
      if (q.includes(k)) total += 2 + k.split(" ").length;
    } else if (words.has(k)) {
      total += 2;
    }
  }
  return total;
}

const followUps = ["more", "tell me more", "go on", "continue", "details", "elaborate", "expand", "and?", "what else"];

/**
 * Answer a visitor question. `lastTopic` lets short follow-ups like
 * "tell me more" continue the previous topic.
 */
export function answer(input: string, lastTopic?: string): ChatAnswer {
  const q = normalize(input);
  if (!q) return fallback();
  const words = new Set(q.split(/[^a-z0-9+#.-]+/).filter(Boolean));

  if (lastTopic && (followUps.includes(q) || followUps.some((f) => q.startsWith(f)))) {
    const prev = intents.find((i) => i.id === lastTopic);
    if (prev?.more) return { ...prev.more(), topic: prev.id };
    if (prev) {
      return {
        text: [
          "That's the full summary I have on that topic. The linked section has more detail, or book a call to go deeper.",
        ],
        actions: compact([...(prev.answer().actions ?? []), actions.book()]).slice(0, 3),
        topic: prev.id,
      };
    }
  }

  const ranked = intents
    .map((i) => ({ i, s: score(q, words, i) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);

  const skill = findSkill(q);

  // A single-technology question ("Does he know Kafka?") gets a specific answer;
  // broader questions that hit several topic keywords get the topic summary.
  if (skill && (!ranked.length || ranked[0].s <= 2)) {
    const roles = rolesUsing(skill.skill.split(/\s*[/&(]\s*/)[0]);
    return {
      text: [
        `Yes — ${skill.skill} is part of ${firstName}'s ${skill.group} toolkit.`,
        roles.length ? "It shows up in these roles:" : "",
      ].filter(Boolean),
      bullets: roles.length ? roles.slice(0, 4) : undefined,
      actions: [actions.section("expertise", "See all expertise")],
      topic: "skills",
    };
  }

  if (ranked.length) {
    const best = ranked[0].i;
    return { ...best.answer(), topic: best.id };
  }

  return fallback();
}

function fallback(): ChatAnswer {
  return {
    text: [
      `I can only answer questions about ${firstName}'s professional background — experience, GenAI and agentic AI work, skills, certifications, work authorization and contact details.`,
      "Try one of the suggestions below, or book a call to ask directly.",
    ],
    actions: compact([actions.book(), actions.email()]),
  };
}

export const welcome: ChatAnswer = {
  text: [
    `👋 Hi! I'm the AI representative for ${profile.displayName}, ${profile.title}.`,
    `I answer from ${firstName}'s resume and portfolio only, so everything I say is on the record. What would you like to know?`,
  ],
};

export const suggestions: { label: string; question: string }[] = [
  ...(profile.bookingUrl ? [{ label: "📅 Book a call", question: "How can I schedule a call?" }] : []),
  { label: "💼 Current role", question: "What is Saddam doing now?" },
  { label: "🤖 GenAI & agents", question: "Tell me about GenAI and agentic AI experience" },
  { label: "📈 Career timeline", question: "Show me the career timeline" },
  { label: "🛂 Work authorization", question: "What is the work authorization?" },
  { label: "📄 Resume", question: "Can I download the resume?" },
];
