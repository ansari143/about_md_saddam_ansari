/**
 * Abstract AI architecture visual: an orchestration hub connected to
 * retrieval, agents, tools, guardrails, identity and observability.
 * Pure SVG — no images.
 */
const nodes = [
  { label: "Retrieval", sub: "RAG · hybrid", angle: -90 },
  { label: "Agents", sub: "LangGraph", angle: -30 },
  { label: "Tools", sub: "MCP", angle: 30 },
  { label: "Systems", sub: "APIs · records", angle: 90 },
  { label: "Identity", sub: "OIDC · RBAC", angle: 150 },
  { label: "Telemetry", sub: "Tracing · evals", angle: 210 },
];

const C = 220;
const R = 150;

function pos(angle: number, radius = R) {
  const rad = (angle * Math.PI) / 180;
  return { x: C + radius * Math.cos(rad), y: C + radius * Math.sin(rad) };
}

export function HeroVisual() {
  return (
    <svg
      viewBox="0 0 440 440"
      role="img"
      aria-label="Diagram of an AI orchestration hub connected to retrieval, agents, tools, enterprise systems, identity and telemetry"
      className="h-full w-full"
    >
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.35" />
          <stop offset="60%" stopColor="var(--violet)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--cyan)" />
          <stop offset="100%" stopColor="var(--violet)" />
        </linearGradient>
      </defs>

      {/* orbit rings */}
      <circle cx={C} cy={C} r={R} fill="none" stroke="var(--border)" strokeWidth="1" />
      <circle cx={C} cy={C} r={R + 48} fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="2 6" opacity="0.7" />
      <circle cx={C} cy={C} r={72} fill="none" stroke="var(--border)" strokeWidth="1" opacity="0.7" />
      <circle cx={C} cy={C} r={110} fill="url(#hub-glow)" />

      {/* hub-to-node edges */}
      {nodes.map((n) => {
        const p = pos(n.angle, R - 30);
        return (
          <line
            key={`e-${n.label}`}
            x1={C}
            y1={C}
            x2={p.x}
            y2={p.y}
            stroke="url(#edge)"
            strokeWidth="1.25"
            className="flow-line"
            opacity="0.8"
          />
        );
      })}

      {/* ring-to-ring chords */}
      {nodes.map((n, i) => {
        const a = pos(n.angle);
        const b = pos(nodes[(i + 1) % nodes.length].angle);
        return <line key={`c-${n.label}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--border-strong)" strokeWidth="1" opacity="0.5" />;
      })}

      {/* outer satellites */}
      {Array.from({ length: 12 }).map((_, i) => {
        const p = pos(i * 30 + 15, R + 48);
        return <circle key={`s-${i}`} cx={p.x} cy={p.y} r="2" fill="var(--fg-subtle)" className="pulse-soft" style={{ animationDelay: `${i * 0.3}s` }} />;
      })}

      {/* hub */}
      <g>
        <rect x={C - 64} y={C - 30} width="128" height="60" rx="14" fill="var(--surface)" stroke="url(#edge)" strokeWidth="1.5" />
        <text x={C} y={C - 4} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--fg)" fontFamily="var(--font-display)">
          Orchestrator
        </text>
        <text x={C} y={C + 14} textAnchor="middle" fontSize="9.5" fill="var(--fg-muted)" fontFamily="var(--font-mono)">
          route · plan · guard
        </text>
      </g>

      {/* nodes */}
      {nodes.map((n) => {
        const p = pos(n.angle);
        return (
          <g key={n.label}>
            <rect x={p.x - 46} y={p.y - 21} width="92" height="42" rx="10" fill="var(--bg-elev)" stroke="var(--border-strong)" strokeWidth="1" />
            <circle cx={p.x - 34} cy={p.y - 9} r="2.5" fill="var(--cyan)" className="pulse-soft" />
            <text x={p.x} y={p.y - 2} textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--fg)" fontFamily="var(--font-display)">
              {n.label}
            </text>
            <text x={p.x} y={p.y + 12} textAnchor="middle" fontSize="8.5" fill="var(--fg-subtle)" fontFamily="var(--font-mono)">
              {n.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
