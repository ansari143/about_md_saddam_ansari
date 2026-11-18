/**
 * Single source of truth for all portfolio content.
 * Everything here is sourced from the resume. Edit this file to update the site.
 */

/* ----------------------------- Disclosure flags ---------------------------- */

export const disclosure = {
  /**
   * Show the platform reach and productivity figures (~100,000 employees,
   * 30,000 daily active users, est. 30–35% time savings on supported tasks).
   * Set to false if these are not approved for public disclosure.
   */
  showImpactMetrics: true,
} as const;

/* --------------------------------- Profile --------------------------------- */

export type Profile = {
  name: string;
  displayName: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  /** Phone numbers shown on the site and in the AI assistant. The first is preferred for calls. */
  phones: { label: string; display: string; tel: string }[];
  linkedin: string;
  /** Leave empty until the GitHub username is known; the link is hidden while empty. */
  githubUsername: string;
  /** Path under /public. The site shows a fallback if the file is missing. */
  resumePath: string;
  /** Path under /public, e.g. "/profile.jpg". Leave empty to show initials. */
  photoPath: string;
  /** Booking page (Calendly etc.). Leave empty to hide all "Book a Call" buttons. */
  bookingUrl: string;
  /** First year of professional experience; used to compute total years. */
  careerStartYear: number;
  yearsExperience: string;
  workAuthorization: string[];
};

export const profile: Profile = {
  name: "Md Saddam Hussain Ansari",
  displayName: "Md Saddam Ansari",
  title: "Enterprise AI Architect",
  tagline:
    "I build and compare agentic AI prototypes, design enterprise knowledge retrieval and grounding, and guide engineering teams from proof of concept through production.",
  location: "Tampa, Florida, USA",
  email: "saddamansari52@gmail.com",
  phones: [
    { label: "U.S. (preferred for calls)", display: "+1 (813) 388-3285", tel: "+18133883285" },
    { label: "Canada", display: "+1 (647) 818-6234", tel: "+16478186234" },
  ],
  linkedin: "https://www.linkedin.com/in/md-ansari-685b6318/",
  githubUsername: "",
  resumePath: "/resume.pdf",
  photoPath: "",
  bookingUrl: "https://calendly.com/saddamansari52",
  careerStartYear: 2012,
  // Computed at build time: years since careerStartYear (14+ in 2026).
  yearsExperience: `${new Date().getFullYear() - 2012}+`,
  workAuthorization: [
    "Canadian citizen — authorized to work in Canada.",
    "United States — TN work authorization required.",
  ],
};

export const githubUrl = profile.githubUsername
  ? `https://github.com/${profile.githubUsername}`
  : "";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://mdsaddam-ansari.web.app"
).replace(/\/$/, "");

export const siteTitle = `${profile.displayName} | ${profile.title}`;
export const siteDescription =
  "Enterprise AI Architect with 14+ years of engineering experience across the USA, Canada, the UK and India. GenAI, RAG, agentic AI, LangGraph, MCP, Azure and secure cloud-native architecture.";

/* ---------------------------------- Nav ----------------------------------- */

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "expertise", label: "Expertise" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
  { id: "certifications", label: "Certifications" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;

/* ---------------------------------- Hero ---------------------------------- */

export type Stat = { value: string; label: string; metric?: boolean };

export const heroStats: Stat[] = [
  { value: `${new Date().getFullYear() - 2012}+`, label: "Years of enterprise engineering" },
  { value: "4", label: "Countries: USA, Canada, UK, India" },
  { value: "~100K", label: "Employees within platform reach", metric: true },
  { value: "30K", label: "Daily active users", metric: true },
];

/* ---------------------------------- About --------------------------------- */

export const about = {
  intro: [
    "I'm an Enterprise AI Architect with 14+ years of software engineering across the United States, Canada, the United Kingdom and India. My career has moved from developer to technical lead to architect, so my designs are shaped by having written, shipped and supported production code myself.",
    "Today I personally build and compare agentic AI prototypes, design enterprise knowledge retrieval and grounding solutions, and guide technical leads and senior developers from proof of concept through production delivery. I mentor engineers through design reviews and hands-on troubleshooting.",
  ],
  philosophy: [
    {
      title: "Design it, then guide it home",
      body: "I personally design solution patterns and stay close to delivery — walking developers through implementation, running design reviews and resolving tradeoffs before they become production issues.",
    },
    {
      title: "Secure and governed by default",
      body: "OAuth/OIDC, Entra ID, least-privilege access, secret management and auditable tool execution are part of the architecture from day one, not an afterthought.",
    },
    {
      title: "Evolve, don't rip and replace",
      body: "Preserve what already works — established conversational intent flows, systems of record, integrations — and introduce LLM retrieval and agents where they add measurable value.",
    },
    {
      title: "Observable and production-ready",
      body: "Tracing, monitoring and evaluation of latency, reliability and guardrails are designed in, so teams can operate AI systems with confidence.",
    },
  ],
  journey: [
    { year: "2012", role: "Graduate Engineer Trainee", place: "Ahmedabad, India" },
    { year: "2013", role: "Developer", place: "Bengaluru, India" },
    { year: "2015", role: "Senior Developer", place: "London, UK" },
    { year: "2016", role: "Senior Developer / Technical Lead", place: "Bengaluru, India" },
    { year: "2018", role: "Technical Lead", place: "Toronto, Canada" },
    { year: "2021", role: "Technical Architect", place: "Toronto, Canada" },
    { year: "2023", role: "AI Technical Architect", place: "Tampa, USA" },
  ],
};

/* ------------------------------- Experience ------------------------------- */

export type Role = {
  title: string;
  focus?: string;
  location: string;
  period: string;
  context?: string;
  ownership?: string;
  highlights: string[];
  /** Highlights shown only when disclosure.showImpactMetrics is true. */
  metricHighlights?: string[];
  tech: string[];
};

export const employer = {
  name: "Tata Consultancy Services (TCS)",
  period: "2012 – Present",
};

export const experience: Role[] = [
  {
    title: "AI Technical Architect",
    focus: "Enterprise AI & Agentic Platform",
    location: "Tampa, FL, USA",
    period: "2023 – Present",
    ownership:
      "Architect of AI agents, tools, retrieval and conversational AI for the platform; guide technical leads and senior developers from prototype to production.",
    highlights: [
      "Prototyped a fully agentic redesign and a hybrid routing architecture for an enterprise employee assistant, and selected the hybrid design to reduce LLM calls, lower routing latency and preserve existing workflows. Regex rules send known requests to an agent orchestrator that invokes agents or MCP tools; other requests use LLM or Dialogflow intent classification, with enterprise RAG as the fallback.",
      "Guide technical leads and senior developers in turning prototypes into production features. Lead design reviews, explain architecture decisions, and help resolve implementation and integration issues.",
      "Design hybrid conversational AI that combines Dialogflow with LLM-powered retrieval, agent routing and secure tool calling. Design RAG pipelines for ingestion, chunking, embeddings, hybrid search, reranking, grounding and source citations.",
      "Architect stateful and multi-agent LangGraph workflows with checkpoints, retries, human approvals and Model Context Protocol (MCP) integrations. Guide secure integrations with Microsoft Graph, SharePoint, OneDrive, Workday, ServiceNow, Salesforce and SAP Concur.",
      "Guide Azure and AKS microservice architecture, least-privilege access, CI/CD security gates, penetration-test remediation, tracing and monitoring. Evaluate workflow performance, reliability and AI guardrails.",
      "Mentor engineers on agent design and AI-assisted prototyping, debugging, testing, and automated code review and fix-agent patterns.",
    ],
    metricHighlights: [
      "Architect AI agents and tools for a unified employee platform supporting approximately 100,000 employees and 30,000 daily active users, bringing enterprise knowledge, employee services and actions across business systems into one experience.",
      "Designed unified AI workflows that contributed to an estimated 30–35% time savings on supported daily employee tasks.",
    ],
    tech: [
      "LangGraph", "LangChain", "MCP", "RAG", "Azure OpenAI", "Dialogflow", "Python",
      "Azure", "AKS", "Microsoft Graph", "Langfuse", "OpenTelemetry",
    ],
  },
  {
    title: "Technical Architect",
    focus: "Conversational AI & Enterprise Integrations",
    location: "Toronto, Canada",
    period: "Apr 2021 – Jul 2023",
    highlights: [
      "Designed conversational AI architecture across web and mobile channels, including Dialogflow intent classification, entity extraction, multi-turn dialogue and fulfillment.",
      "Defined API contracts and data flows connecting conversational experiences to backend systems through reusable REST APIs and Node.js and TypeScript microservices.",
      "Designed event-driven integrations using Azure Service Bus and Apache Kafka, with retries, dead-letter handling and fault isolation.",
      "Guided security, performance, deployment automation and production readiness decisions, including OAuth, JWT, SSO, Datadog and Azure Application Insights.",
      "Produced high- and low-level designs, deployment guidance and operational runbooks. Led design reviews across distributed teams and coached developers on integration patterns and troubleshooting.",
    ],
    tech: ["Dialogflow", "Node.js", "TypeScript", "REST APIs", "Azure Service Bus", "Kafka", "OAuth/JWT", "Datadog"],
  },
  {
    title: "Technical Lead",
    focus: "Conversational AI & Enterprise Integrations",
    location: "Toronto, Canada",
    period: "Oct 2018 – Apr 2021",
    highlights: [
      "Led delivery and worked alongside developers to build employee-facing web, mobile and conversational features using Dialogflow, Node.js, TypeScript, Express.js, Python, Angular, MongoDB, Redis and Azure.",
      "Personally built backend services and reusable REST APIs, and implemented complex features for multi-turn conversations, fulfillment and downstream enterprise integrations.",
      "Helped developers troubleshoot service failures, integration defects and performance issues. Investigated root causes, reviewed fixes, and supported deployment and production incident resolution.",
      "Coordinated code reviews and cross-team delivery. Guided security remediation and deployment automation.",
    ],
    tech: ["Dialogflow", "Node.js", "TypeScript", "Express.js", "Python", "Angular", "MongoDB", "Redis", "Azure"],
  },
  {
    title: "Technical Lead",
    focus: "Enterprise MVP & Application Engineering",
    location: "Bengaluru, India",
    period: "2017 – 2018",
    highlights: [
      "Guided MVP delivery across front-end and back-end integration, REST APIs, cloud deployment, code reviews and release readiness.",
      "Worked with stakeholders to resolve design tradeoffs, integration issues and complex defects.",
    ],
    tech: ["REST APIs", "Cloud deployment", "Code review"],
  },
  {
    title: "Senior Developer / Technical Lead",
    location: "Bengaluru, India",
    period: "2016 – 2017",
    highlights: [
      "Led application enhancements, technical estimation, environment upgrades, security patching, releases and root-cause analysis.",
      "Coordinated technical handovers and trained and onboarded more than 25 team members.",
    ],
    tech: ["Release management", "Security patching", "Root-cause analysis"],
  },
  {
    title: "Senior Developer",
    location: "London, United Kingdom",
    period: "2015 – 2016",
    highlights: [
      "Developed enterprise application enhancements, resolved defects, supported unit, integration and acceptance testing, and validated deployments and production handovers.",
    ],
    tech: ["Testing", "Deployment validation"],
  },
  {
    title: "Developer",
    location: "Bengaluru, India",
    period: "2013 – 2015",
    highlights: [
      "Built and maintained Lotus Notes enterprise applications. Implemented business requirements, tested changes, resolved defects and supported releases.",
    ],
    tech: ["Lotus Notes"],
  },
  {
    title: "Graduate Engineer Trainee",
    location: "Ahmedabad, India",
    period: "2012 – 2013",
    highlights: [
      "Completed training in Java, ETL, Informatica, Business Objects, UML, software testing and technical documentation.",
    ],
    tech: ["Java", "ETL", "Informatica", "UML"],
  },
];

/* -------------------------------- Expertise ------------------------------- */

export type SkillGroup = { title: string; icon: string; skills: string[] };

export const expertise: SkillGroup[] = [
  {
    title: "Generative AI & Retrieval",
    icon: "brain",
    skills: [
      "Azure OpenAI", "GPT model evaluation", "Prompt engineering", "LangGraph", "LangChain",
      "MCP", "Multi-agent workflows", "Human-in-the-loop", "AI guardrails", "RAG",
      "Vector & hybrid search", "Reranking & grounding", "MongoDB Atlas Vector Search", "Elasticsearch",
    ],
  },
  {
    title: "Conversational AI",
    icon: "messages",
    skills: [
      "Dialogflow", "Intent classification", "Entity extraction", "Multi-turn dialogue", "Fulfillment",
      "Hybrid LLM / intent routing",
    ],
  },
  {
    title: "Cloud & Application Engineering",
    icon: "cloud",
    skills: [
      "Azure", "AKS", "Kubernetes", "Docker", "Azure API Management", "Azure Functions",
      "Azure Service Bus", "Kafka", "REST / OpenAPI", "Terraform",
    ],
  },
  {
    title: "Languages & Frameworks",
    icon: "code",
    skills: [
      "Python", "FastAPI", "Node.js", "TypeScript", "Express.js", "Angular", "React", "Next.js",
      "MongoDB", "Redis",
    ],
  },
  {
    title: "Enterprise Integrations",
    icon: "plug",
    skills: ["Microsoft Graph", "SharePoint", "OneDrive", "Workday", "ServiceNow", "Salesforce", "SAP Concur"],
  },
  {
    title: "Security & Delivery",
    icon: "shield",
    skills: [
      "OAuth 2.0", "OIDC", "JWT", "SSO", "Entra ID", "RBAC", "CI/CD", "Azure DevOps", "GitHub",
      "Veracode", "SonarQube", "Black Duck", "Pen-test remediation",
    ],
  },
  {
    title: "Observability",
    icon: "activity",
    skills: ["OpenTelemetry", "Datadog", "Azure Application Insights", "Langfuse", "Tracing & monitoring"],
  },
  {
    title: "AI-Assisted Engineering",
    icon: "sparkles",
    skills: [
      "Claude Code", "Cursor", "GitHub Copilot", "Microsoft Copilot", "Automated code review",
      "Fix-agent patterns", "AI-assisted prototyping",
    ],
  },
];

/* --------------------------------- Projects ------------------------------- */

export type Project = {
  id: string;
  kind: "professional" | "independent";
  name: string;
  summary: string;
  challenge: string;
  approach: string[];
  outcome?: string;
  metricOutcome?: string;
  tags: string[];
  url?: string;
  note?: string;
};

export const projects: Project[] = [
  {
    id: "enterprise-ai-platform",
    kind: "professional",
    name: "Enterprise AI & Agentic Platform",
    summary:
      "A unified employee AI assistant that brings enterprise knowledge, productivity, employee services and actions into one secure experience.",
    challenge:
      "Employees had to navigate multiple enterprise systems to find information and complete routine tasks.",
    approach: [
      "Prototyped a fully agentic redesign and a hybrid routing design, then chose hybrid to cut LLM calls, lower routing latency and preserve existing workflows.",
      "Regex rules send known requests to an agent orchestrator (agents or MCP tools); other requests use LLM or Dialogflow intent classification, with RAG as the fallback.",
      "Enterprise knowledge retrieval with hybrid search, reranking, grounding and cited responses.",
      "Secure, least-privilege integrations with systems of record via governed APIs and MCP-based tools.",
    ],
    outcome:
      "One conversational entry point for everyday employee tasks, designed for security, auditability and observability.",
    metricOutcome:
      "Supports ~100,000 employees and 30,000 daily active users, contributing to an estimated 30–35% employee time savings on supported daily tasks.",
    tags: ["LangGraph", "RAG", "MCP", "Dialogflow", "Azure", "AKS", "Entra ID", "Python"],
    note: "Professional client engagement. Described at a high level only — no proprietary code, diagrams or internal details.",
  },
  {
    id: "cloud-modernization",
    kind: "professional",
    name: "Enterprise Cloud & Application Modernization",
    summary:
      "Evolution of employee-facing web, mobile and conversational applications toward cloud-native, event-driven services on Azure.",
    challenge:
      "Enterprise applications needed reliable integrations, stronger security posture and repeatable, production-ready delivery.",
    approach: [
      "Reusable REST APIs and backend microservices on Azure and AKS.",
      "Event-driven processing with Azure Service Bus and Kafka: retries, dead-letter handling and fault isolation.",
      "Security built into delivery: OAuth/JWT/SSO, Veracode and SonarQube gates, pen-test remediation.",
      "Operational readiness with Datadog and Application Insights, runbooks, HLD/LLD and API contracts.",
    ],
    outcome:
      "More resilient integrations and a consistent path from design review to monitored production release.",
    tags: ["Azure", "AKS", "Node.js", "TypeScript", "Kafka", "Service Bus", "DevSecOps"],
    note: "Professional experience across client engagements. Public-safe summary only.",
  },
  {
    id: "nisha-global-education",
    kind: "independent",
    name: "Nisha Global Education",
    summary:
      "An independent, non-commercial education website offering practice assessments, learning resources and career preparation content.",
    challenge:
      "Make quality practice material and career guidance easy for learners to access.",
    approach: [
      "Personally designed, built and deployed the site with Next.js, React and Vercel.",
      "Developed and integrated Python/LangGraph-based AI agents.",
      "Owned solution design, integration, testing, deployment and iterative enhancements.",
      "Used Claude Code and GitHub Copilot to prototype features and debug issues.",
    ],
    outcome: "Live and maintained as an after-hours personal initiative to help learners.",
    tags: ["Next.js", "React", "Python", "LangGraph", "Vercel", "Claude Code"],
    url: "https://www.nishaglobaleducation.com/",
    note: "Independent personal project, built outside regular work hours. Not affiliated with any employer or client.",
  },
];

/* ------------------------------ Certifications ---------------------------- */

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  status: "active" | "expired" | "completed";
  note?: string;
};

export const certifications: Certification[] = [
  {
    name: "Azure AI Engineer Associate",
    issuer: "Microsoft Certified",
    date: "Issued Jan 2025 · Expired Jan 2026",
    status: "expired",
  },
  {
    name: "IBM Certified Application Developer – Watson V3",
    issuer: "IBM",
    date: "2017",
    status: "completed",
  },
  {
    name: "DevOps Digital Ninja – Honors",
    issuer: "Tata Consultancy Services",
    date: "2021",
    status: "completed",
  },
  {
    name: "AI-Powered Programming with GitHub Copilot",
    issuer: "Microsoft",
    date: "2024",
    status: "completed",
    note: "Professional development",
  },
  {
    name: "Prompt Engineering for AI Bootcamp",
    issuer: "Professional development",
    date: "2025",
    status: "completed",
  },
  {
    name: "Python Bootcamp",
    issuer: "Professional development",
    date: "2025",
    status: "completed",
  },
  {
    name: "AZ-300 Azure Architect Technologies",
    issuer: "Udemy",
    date: "Course",
    status: "completed",
    note: "Udemy course — not a Microsoft certification",
  },
];

export const education = {
  degree: "Bachelor of Engineering (B.E.), Computer Science",
  year: "2012",
};

/* ------------------------------ Architecture ------------------------------ */

export type FlowStep = { label: string; detail: string };
export type Diagram = {
  id: string;
  title: string;
  summary: string;
  steps: FlowStep[];
  principles: string[];
};

/** Generic reference patterns only — no proprietary implementation details. */
export const diagrams: Diagram[] = [
  {
    id: "rag",
    title: "RAG pipeline",
    summary:
      "Grounded answers over enterprise content: ingest once, retrieve precisely, cite every claim.",
    steps: [
      { label: "Ingest", detail: "Connectors pull documents with source permissions" },
      { label: "Chunk & embed", detail: "Structure-aware chunks, embeddings, metadata" },
      { label: "Hybrid retrieve", detail: "Vector + keyword search, permission filtering" },
      { label: "Rerank", detail: "Reorder candidates for relevance" },
      { label: "Ground & generate", detail: "LLM answers only from retrieved context" },
      { label: "Cite", detail: "Responses link back to sources" },
    ],
    principles: [
      "Respect source-system access controls at query time",
      "Evaluate retrieval quality separately from generation",
      "Prefer “I don't know” over ungrounded answers",
    ],
  },
  {
    id: "agentic",
    title: "Agentic orchestration",
    summary:
      "A router sends each request to the right capability; stateful graphs make multi-step work reliable.",
    steps: [
      { label: "User request", detail: "Single conversational entry point" },
      { label: "Router", detail: "Intent flows, retrieval or agent — hybrid NLP/LLM" },
      { label: "Agent graph", detail: "LangGraph nodes with shared, typed state" },
      { label: "Checkpoint", detail: "Persist state; resume after failure" },
      { label: "Tools", detail: "Governed calls to enterprise systems" },
      { label: "Response", detail: "Result, status and next steps" },
    ],
    principles: [
      "Keep deterministic flows deterministic; use LLMs where they add value",
      "Bounded retries with clear error handling",
      "Every step traceable and auditable",
    ],
  },
  {
    id: "mcp",
    title: "MCP tool integration",
    summary:
      "Standardized tool access: agents discover capabilities through MCP servers instead of bespoke integrations.",
    steps: [
      { label: "Agent", detail: "Plans which capability it needs" },
      { label: "MCP client", detail: "Discovers tools and their schemas" },
      { label: "MCP server", detail: "Wraps a system behind typed tools" },
      { label: "Policy check", detail: "Scope, allow-list and input validation" },
      { label: "System of record", detail: "API call with delegated identity" },
    ],
    principles: [
      "Least-privilege scopes per tool",
      "Validate inputs and outputs against schemas",
      "Log every tool invocation",
    ],
  },
  {
    id: "auth",
    title: "Authentication & authorization",
    summary:
      "The assistant acts on behalf of the user — never with more access than the user has.",
    steps: [
      { label: "Sign-in", detail: "SSO via OIDC / Entra ID" },
      { label: "Token", detail: "Short-lived, scoped access tokens" },
      { label: "API gateway", detail: "Validates tokens, rate limits" },
      { label: "Service", detail: "RBAC and least-privilege checks" },
      { label: "Downstream API", detail: "Delegated (on-behalf-of) calls" },
      { label: "Secrets", detail: "Managed in a vault, never in code" },
    ],
    principles: [
      "Zero standing secrets in code or prompts",
      "Authorize per action, not per session",
      "Security scanning gates in CI/CD",
    ],
  },
  {
    id: "observability",
    title: "Observability",
    summary:
      "Treat AI like any production system: trace it, measure it, alert on it.",
    steps: [
      { label: "Instrument", detail: "OpenTelemetry spans across services" },
      { label: "Trace LLM calls", detail: "Prompts, tokens, latency, tool calls" },
      { label: "Metrics", detail: "Latency, errors, usage, quality signals" },
      { label: "Evaluate", detail: "Groundedness and task success checks" },
      { label: "Alert & improve", detail: "Dashboards, alerts, feedback loop" },
    ],
    principles: [
      "One trace ID from user request to downstream call",
      "Redact sensitive data before logging",
      "Measure quality, not just uptime",
    ],
  },
  {
    id: "hitl",
    title: "Human-in-the-loop",
    summary:
      "Agents prepare the work; people approve consequential actions.",
    steps: [
      { label: "Agent proposes", detail: "Drafts an action with full context" },
      { label: "Risk check", detail: "Policy decides if approval is required" },
      { label: "Pause & persist", detail: "Graph checkpoint waits for a decision" },
      { label: "Human review", detail: "Approve, edit or reject" },
      { label: "Execute & audit", detail: "Action runs; decision is recorded" },
    ],
    principles: [
      "Explicit approval for write or irreversible actions",
      "Show users exactly what will happen",
      "Durable state so approvals can wait",
    ],
  },
];
