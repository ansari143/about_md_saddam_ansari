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

/** Focus areas from the resume headline. */
export const focusAreas = ["Enterprise AI Architect", "Generative AI", "Agentic AI", "Engineering Enablement"];

/** Role titles Saddam is open to. Shown in About, Contact and the AI assistant. */
export const targetRoles = [
  "Enterprise AI Architect",
  "AI Technical Architect",
  "AI Agent Architect",
  "AI / LLM Technology Architect",
  "Solutions Architect (Agentic AI / GenAI)",
  "Generative AI Architect",
  "Agentic AI Architect",
];

export const targetRegions = "the United States and Canada";

/* ---------------------------------- About --------------------------------- */

export const about = {
  intro: [
    "I'm an Enterprise AI Architect with 14+ years of software engineering across the United States, Canada, the United Kingdom and India. My career has moved from developer to technical lead to architect, so my designs are shaped by having written, shipped and supported production code myself.",
    "Today I personally build and compare agentic AI prototypes, design enterprise knowledge retrieval and grounding solutions, and guide technical leads and senior developers from proof of concept through production delivery. I mentor engineers through design reviews and hands-on troubleshooting.",
  ],
  philosophy: [
    {
      title: "Prototype, compare, then decide",
      body: "I personally build and compare agentic AI prototypes before committing to a design. For example, I prototyped a fully agentic assistant against a hybrid routing design and chose hybrid for fewer LLM calls, lower latency and preserved workflows.",
    },
    {
      title: "Guide it from proof of concept to production",
      body: "I guide technical leads and senior developers in turning prototypes into production features: leading design reviews, explaining architecture decisions and helping resolve implementation and integration issues.",
    },
    {
      title: "Secure and grounded by default",
      body: "Least-privilege access, OAuth/OIDC and Entra ID, CI/CD security gates, grounded answers with source citations, and AI guardrails are part of the design from day one.",
    },
    {
      title: "Enable engineers, not just systems",
      body: "I mentor engineers on agent design and AI-assisted prototyping, debugging, testing, and automated code review and fix-agent patterns, using Claude Code, Cursor and GitHub Copilot.",
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

/* ------------------------ Internal certifications ------------------------ */

export type InternalCertification = { name: string; area: string; date: string };

/**
 * Technical certifications completed on TCS's internal learning platform (iEvolve),
 * limited to skills that appear on the resume. Newest first.
 */
export const internalCertifications: InternalCertification[] = [
  { name: "MLT Runway – Cloud Computing", area: "Cloud", date: "Jan 2025" },
  { name: "Generative AI Foundation", area: "Generative AI", date: "Oct 2023" },
  { name: "Elevate Wings 1 – Web Design", area: "Web", date: "Jun 2022" },
  { name: "MFDM™ AI Fluent – DevOps", area: "DevOps", date: "Apr 2021" },
  { name: "MFDM™ AI Fluent", area: "AI", date: "Apr 2021" },
  { name: "MFDM™ AI Aware", area: "AI", date: "May 2020" },
  { name: "React JS Intermediate", area: "Web", date: "Apr 2018" },
  { name: "Angular 4 Intermediate", area: "Web", date: "Apr 2018" },
  { name: "AngularJS Advanced", area: "Web", date: "Dec 2017" },
  { name: "IBM Watson Explorer Foundation", area: "AI", date: "May 2017" },
  { name: "AngularJS Intermediate", area: "Web", date: "Dec 2016" },
  { name: "AngularJS Foundation", area: "Web", date: "Dec 2016" },
  { name: "HTML5 & CSS3 Intermediate", area: "Web", date: "Dec 2016" },
  { name: "HTML5 & CSS3 Foundation", area: "Web", date: "Dec 2016" },
  { name: "Cloud Computing (General) Foundation", area: "Cloud", date: "Sep 2016" },
  { name: "Core Java Concepts Foundation", area: "Java", date: "May 2016" },
  { name: "Java Assessment – E1", area: "Java", date: "Jun 2015" },
];

export type CourseGroup = { area: string; icon: string; courses: { name: string; date: string }[] };

/**
 * Technical courses completed on TCS's internal learning platform (iEvolve),
 * limited to skills that appear on the resume. Newest first within each group.
 */
export const internalCourses: CourseGroup[] = [
  {
    area: "Generative AI & prompt engineering",
    icon: "sparkles",
    courses: [
      { name: "Foundational Generative AI", date: "2024" },
      { name: "Generative AI on Azure OpenAI (course + assessment)", date: "Oct 2023" },
      { name: "Generative AI – E1 assessment", date: "Oct 2023" },
      { name: "Introduction to OpenAI API & ChatGPT API", date: "Sep 2023" },
      { name: "The Complete Prompt Engineering for AI Bootcamp", date: "Sep 2023" },
      { name: "Generative AI for Beginners", date: "Jul 2023" },
      { name: "Generative AI – E0 assessment", date: "Jul 2023" },
      { name: "The Next Frontier: Generative AI", date: "Jul 2023" },
      { name: "Prompt Engineering for Everyone Bootcamp (Udemy)", date: "Jul 2023" },
    ],
  },
  {
    area: "AI-assisted engineering",
    icon: "code",
    courses: [{ name: "GitHub Copilot for Beginners: AI Coding Crash Course (Udemy)", date: "2024" }],
  },
  {
    area: "Microsoft Azure",
    icon: "cloud",
    courses: [
      { name: "Azure Data Factory", date: "May 2022" },
      { name: "AI-102: Designing and Implementing a Microsoft Azure AI Solution", date: "2021" },
      { name: "AZ-305: Designing Microsoft Azure Infrastructure", date: "Jul 2020" },
      { name: "Microsoft VSTS (now Azure DevOps)", date: "Sep 2018" },
      { name: "Azure Essentials", date: "Jun 2018" },
    ],
  },
  {
    area: "AI, ML & conversational systems",
    icon: "brain",
    courses: [
      { name: "An Enlightenment to Machine Learning", date: "May 2020" },
      { name: "Deep Learning – Tools and Applications", date: "May 2020" },
      { name: "MFDM™ AI – The Renaissance", date: "May 2020" },
      { name: "Statistics and Probability", date: "May 2020" },
      { name: "Data Mining", date: "May 2020" },
      { name: "Data Visualization", date: "May 2020" },
      { name: "Understanding Conversational Systems", date: "Jan 2020" },
      { name: "IBM Watson Explorer", date: "May 2017" },
    ],
  },
  {
    area: "DevOps, CI/CD & containers",
    icon: "shield",
    courses: [
      { name: "DevOps Engineer Program (E2)", date: "Apr 2021" },
      { name: "Docker – Containers", date: "Feb 2021" },
      { name: "Kubernetes – The Basics", date: "Feb 2021" },
      { name: "ELK Stack (Elasticsearch, Logstash, Kibana)", date: "Feb 2021" },
      { name: "Infrastructure as Code", date: "Jan 2021" },
      { name: "Git (Prodigious Git)", date: "Jan 2021" },
      { name: "Continuous Integration with Jenkins", date: "Jan 2021" },
      { name: "SonarQube", date: "Jan 2021" },
      { name: "More on Git", date: "Oct 2018" },
      { name: "Continuous Integration", date: "Oct 2017" },
      { name: "Continuous Deployment", date: "Oct 2017" },
      { name: "DevOps Culture", date: "Oct 2017" },
    ],
  },
  {
    area: "Architecture, APIs & data",
    icon: "plug",
    courses: [
      { name: "Salesforce 101: Introduction to Salesforce", date: "Jan 2024" },
      { name: "NoSQL", date: "May 2020" },
      { name: "Service Discovery", date: "Sep 2018" },
      { name: "Caching Techniques", date: "Sep 2018" },
      { name: "Microservices Architecture", date: "Jun 2018" },
      { name: "API Gateways", date: "Jun 2018" },
      { name: "Redis", date: "Jan 2018" },
    ],
  },
  {
    area: "Python & Node.js",
    icon: "code",
    courses: [
      { name: "Python 3 – Functions and OOP", date: "May 2018" },
      { name: "Python 3 Application Programming", date: "May 2018" },
      { name: "Node.js with Express Framework", date: "Apr 2018" },
      { name: "Node.js – E1 assessment", date: "Nov 2017" },
      { name: "Python 3 Programming", date: "Oct 2017" },
      { name: "Node.js Essentials", date: "Oct 2017" },
    ],
  },
  {
    area: "Front-end: React, Angular & TypeScript",
    icon: "messages",
    courses: [
      { name: "HTML5 Semantic Elements", date: "Jun 2022" },
      { name: "Styling with CSS3", date: "Jun 2022" },
      { name: "React JS Web Development", date: "Jun 2020" },
      { name: "React JS – Beginner assessment", date: "Apr 2018" },
      { name: "Angular 4 – Beginners assessment", date: "Apr 2018" },
      { name: "AngularJS 1.x Routers and Custom Directives", date: "Mar 2018" },
      { name: "AngularJS – Intermediate", date: "Dec 2017" },
      { name: "Angular 2 – Game of States", date: "Oct 2017" },
      { name: "Angular 2 – Building Blocks", date: "Oct 2017" },
      { name: "Angular 2 – Routes and Forms", date: "Oct 2017" },
      { name: "AngularJS 1.x Directives", date: "Oct 2017" },
      { name: "AngularJS Packaging and Testing", date: "Oct 2017" },
      { name: "TypeScript", date: "Oct 2017" },
      { name: "ECMAScript 6", date: "Oct 2017" },
      { name: "JavaScript Essentials", date: "Oct 2017" },
      { name: "AngularJS – Beginner", date: "Dec 2016" },
      { name: "HTML5 & CSS3 – E0", date: "Dec 2016" },
    ],
  },
  {
    area: "Early career: Java, ETL & Lotus Notes",
    icon: "activity",
    courses: [
      { name: "IBM Lotus Notes LOT-985 & LOT-986 tests", date: "Sep 2014" },
      { name: "Lotus Notes 4.0 Programming & Administration assessments", date: "2013–2014" },
      { name: "Lotus Domino R5 Programming assessments", date: "2014" },
      { name: "Java 2 Fundamentals assessments", date: "2013" },
      { name: "Informatica PowerMart assessment", date: "Dec 2012" },
    ],
  },
];

/* ------------------------------ Architecture ------------------------------ */

export type FlowStep = { label: string; detail: string };
export type DeepDive = { heading: string; points: string[] };
export type Diagram = {
  id: string;
  title: string;
  summary: string;
  steps: FlowStep[];
  /** Detailed explanation of how the pattern works. */
  deepDive: DeepDive[];
  principles: string[];
  /** Where this pattern shows up in the resume (public-safe, no proprietary detail). */
  appliedIn: string;
};

/** Reference patterns explained at a public-safe level, no proprietary implementation details. */
export const diagrams: Diagram[] = [
  {
    id: "hybrid-routing",
    title: "Hybrid routing",
    summary:
      "Send each request down the cheapest reliable path: deterministic rules first, intent classification next, retrieval as the safety net.",
    steps: [
      { label: "User request", detail: "One conversational entry point for employees" },
      { label: "Regex rules", detail: "Known request patterns matched instantly" },
      { label: "Agent orchestrator", detail: "Invokes the right agent or MCP tool" },
      { label: "Intent classification", detail: "LLM or Dialogflow for everything else" },
      { label: "RAG fallback", detail: "Enterprise knowledge when no intent matches" },
      { label: "Response", detail: "Answer, action result or next step" },
    ],
    deepDive: [
      {
        heading: "Why hybrid instead of fully agentic",
        points: [
          "I prototyped both a fully agentic redesign and a hybrid routing architecture and compared them side by side.",
          "A fully agentic design sends every request through an LLM, which adds model calls, routing latency and cost to requests that have predictable answers.",
          "The hybrid design reduces LLM calls, lowers routing latency and preserves existing workflows that already work well.",
        ],
      },
      {
        heading: "How a request flows",
        points: [
          "Regex rules catch well-known request patterns and send them directly to the agent orchestrator.",
          "The orchestrator invokes the right agent or MCP tool to complete the task.",
          "Requests the rules don't recognize go to LLM or Dialogflow intent classification, so established conversational flows keep working.",
          "When no intent matches, enterprise RAG answers from company knowledge instead of failing.",
        ],
      },
    ],
    principles: [
      "Use deterministic paths where answers are predictable",
      "Spend LLM calls where they add value",
      "Never dead-end: RAG is the fallback",
    ],
    appliedIn:
      "Selected for an enterprise employee assistant after prototyping it against a fully agentic redesign (AI Technical Architect, 2023–present).",
  },
  {
    id: "rag",
    title: "RAG pipeline",
    summary:
      "Grounded answers over enterprise content: ingest carefully, retrieve precisely, and cite every source.",
    steps: [
      { label: "Ingest", detail: "Pull structured and unstructured content from sources" },
      { label: "Chunk", detail: "Split content into retrievable passages" },
      { label: "Embed", detail: "Create vector embeddings with metadata" },
      { label: "Hybrid search", detail: "Combine vector and keyword retrieval" },
      { label: "Rerank", detail: "Reorder candidates by relevance" },
      { label: "Ground & cite", detail: "Answer only from context, with source citations" },
    ],
    deepDive: [
      {
        heading: "Ingestion and chunking",
        points: [
          "Content is ingested from enterprise sources and split into chunks sized so each passage carries enough context to answer on its own.",
          "Metadata such as source, title and location travels with every chunk, so answers can cite where they came from.",
        ],
      },
      {
        heading: "Retrieval: vector + keyword",
        points: [
          "Embeddings capture meaning, so paraphrased questions still find the right passage.",
          "Keyword search catches exact terms such as product names, codes and acronyms that embeddings can miss.",
          "Hybrid search combines both, using stores such as MongoDB Atlas Vector Search and Elasticsearch.",
        ],
      },
      {
        heading: "Reranking, grounding and citations",
        points: [
          "A reranking step reorders the retrieved candidates so the most relevant passages reach the model.",
          "The model is grounded: it answers only from the retrieved context and returns source citations.",
          "AI guardrails and GPT model evaluation help check answer quality and keep responses on-policy.",
        ],
      },
    ],
    principles: [
      "Cite sources for every answer",
      "Combine semantic and exact-match retrieval",
      "Prefer “I don't know” over ungrounded answers",
    ],
    appliedIn:
      "Designed RAG pipelines for ingestion, chunking, embeddings, hybrid search, reranking, grounding and source citations; enterprise RAG is the fallback path in the hybrid assistant.",
  },
  {
    id: "multi-agent",
    title: "Multi-agent orchestration",
    summary:
      "An orchestrator coordinates specialized agents and tools, so each agent stays focused and testable.",
    steps: [
      { label: "Request", detail: "Task arrives from the router" },
      { label: "Orchestrator", detail: "Decides which agent or tool runs next" },
      { label: "Specialized agents", detail: "Each owns one domain or capability" },
      { label: "Tools / MCP", detail: "Secure calls into business systems" },
      { label: "Aggregate", detail: "Combine results into one response" },
    ],
    deepDive: [
      {
        heading: "Why multiple agents",
        points: [
          "One agent that tries to do everything becomes hard to prompt, test and secure.",
          "Specialized agents each own a narrow capability, with only the tools that capability needs.",
          "The orchestrator routes between them and combines their results into one answer or action.",
        ],
      },
      {
        heading: "LangGraph workflows",
        points: [
          "Workflows are modelled as LangGraph graphs: nodes do the work and edges decide what runs next.",
          "Agents call tools through secure tool calling and Model Context Protocol (MCP) integrations.",
          "Integrations reach systems such as Microsoft Graph, SharePoint, OneDrive, Workday, ServiceNow, Salesforce and SAP Concur.",
        ],
      },
    ],
    principles: [
      "One agent, one responsibility",
      "Least-privilege tools per agent",
      "Every step traceable",
    ],
    appliedIn:
      "Architect AI agents and tools for a unified employee platform, plus stateful and multi-agent LangGraph workflows with MCP integrations.",
  },
  {
    id: "state",
    title: "State management",
    summary:
      "Multi-step AI work needs durable state: what has happened, what's pending, and how to resume after failure.",
    steps: [
      { label: "Typed state", detail: "Shared state the graph reads and updates" },
      { label: "Node runs", detail: "Each step updates state" },
      { label: "Checkpoint", detail: "State persisted after each step" },
      { label: "Retry", detail: "Failed steps retried with limits" },
      { label: "Resume", detail: "Continue from the last checkpoint" },
    ],
    deepDive: [
      {
        heading: "Stateful workflows",
        points: [
          "Each workflow keeps a shared state that every step can read and update, such as the request, gathered data, decisions and pending actions.",
          "Keeping state explicit makes multi-turn and multi-step behaviour predictable and easier to debug.",
        ],
      },
      {
        heading: "Checkpoints and retries",
        points: [
          "Checkpoints persist state as the workflow progresses, so a failure doesn't lose work already done.",
          "Retries handle transient failures in tools or downstream systems, with limits so they don't loop forever.",
          "After a failure or a pause, the workflow resumes from the last checkpoint instead of starting over.",
        ],
      },
      {
        heading: "Human approvals",
        points: [
          "For sensitive actions, the workflow pauses at a checkpoint and waits for a human approval.",
          "Because state is durable, the approval can arrive later and the workflow continues exactly where it stopped.",
        ],
      },
    ],
    principles: [
      "Make state explicit",
      "Checkpoint before side effects",
      "Bounded retries, clear failure paths",
    ],
    appliedIn:
      "Architect stateful and multi-agent LangGraph workflows with checkpoints, retries and human approvals (AI Technical Architect, 2023–present).",
  },
  {
    id: "mcp",
    title: "MCP tool integration",
    summary:
      "Standardized tool access: agents discover capabilities through MCP servers instead of one-off integrations.",
    steps: [
      { label: "Agent", detail: "Decides which capability it needs" },
      { label: "MCP client", detail: "Discovers tools and their schemas" },
      { label: "MCP server", detail: "Wraps a system behind typed tools" },
      { label: "Policy check", detail: "Scope and input validation" },
      { label: "Business system", detail: "API call with the user's identity" },
    ],
    deepDive: [
      {
        heading: "Why MCP",
        points: [
          "Model Context Protocol gives agents one standard way to discover and call tools, so new capabilities don't need custom agent code.",
          "Each tool has a schema, so inputs can be validated before anything reaches a business system.",
        ],
      },
      {
        heading: "Keeping tool calls secure",
        points: [
          "Tools get least-privilege scopes, and calls run with the user's identity rather than broad service credentials.",
          "Every tool invocation is logged and traced, so actions are auditable.",
        ],
      },
    ],
    principles: ["Least-privilege scopes per tool", "Validate against schemas", "Log every invocation"],
    appliedIn:
      "Agent orchestrator invokes agents or MCP tools; LangGraph workflows use Model Context Protocol integrations with secure tool calling.",
  },
  {
    id: "auth",
    title: "Security & identity",
    summary: "The assistant acts on behalf of the user, never with more access than the user has.",
    steps: [
      { label: "Sign-in", detail: "SSO with OIDC and Entra ID" },
      { label: "Token", detail: "OAuth 2.0 / JWT access tokens" },
      { label: "API gateway", detail: "Validates tokens and routes calls" },
      { label: "Service", detail: "RBAC and least-privilege checks" },
      { label: "Delivery gates", detail: "CI/CD security scans before release" },
    ],
    deepDive: [
      {
        heading: "Identity and access",
        points: [
          "Users sign in once through SSO (OIDC and Entra ID), and services authorize each call with OAuth 2.0 / JWT tokens.",
          "RBAC and least-privilege access limit what each service, agent and tool can do.",
        ],
      },
      {
        heading: "Secure delivery",
        points: [
          "CI/CD security gates (Veracode, SonarQube, Black Duck) run before release.",
          "Penetration-test findings are remediated as part of production readiness.",
        ],
      },
    ],
    principles: ["Authorize per action", "Least privilege everywhere", "Security gates in CI/CD"],
    appliedIn:
      "Guide Azure and AKS microservice architecture, least-privilege access, CI/CD security gates and penetration-test remediation.",
  },
  {
    id: "observability",
    title: "Observability",
    summary: "Treat AI like any production system: trace it, measure it, and evaluate it.",
    steps: [
      { label: "Instrument", detail: "OpenTelemetry across services" },
      { label: "Trace LLM calls", detail: "Prompts, latency and tool calls (Langfuse)" },
      { label: "Monitor", detail: "Datadog and Azure Application Insights" },
      { label: "Evaluate", detail: "Performance, reliability and guardrails" },
      { label: "Improve", detail: "Feed findings back into design" },
    ],
    deepDive: [
      {
        heading: "What gets measured",
        points: [
          "Distributed tracing follows a request from the user through routing, agents, tools and downstream systems.",
          "LLM-specific tracing (Langfuse) records prompts, model latency and tool calls.",
          "Monitoring (Datadog, Azure Application Insights) tracks errors, latency and reliability in production.",
        ],
      },
      {
        heading: "Using the data",
        points: [
          "Workflow performance, reliability and AI guardrails are evaluated regularly, and findings feed back into the architecture.",
        ],
      },
    ],
    principles: ["One trace per request", "Measure quality, not just uptime", "Close the feedback loop"],
    appliedIn:
      "Guide tracing and monitoring; evaluate workflow performance, reliability and AI guardrails.",
  },
];
