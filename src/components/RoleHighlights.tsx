"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

const VISIBLE = 3;

export function RoleHighlights({ items }: { items: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  const hidden = items.length - VISIBLE;
  const shown = expanded || hidden <= 0 ? items : items.slice(0, VISIBLE);

  return (
    <>
      <ul id={id} className="mt-4 space-y-2.5">
        {shown.map((h) => (
          <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-cyan hover:underline"
        >
          {expanded ? "Show less" : `Show ${hidden} more achievement${hidden > 1 ? "s" : ""}`}
          <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden />
        </button>
      )}
    </>
  );
}
