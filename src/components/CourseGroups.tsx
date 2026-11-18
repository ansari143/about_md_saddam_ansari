"use client";

import { Activity, Brain, ChevronDown, Cloud, Code, MessagesSquare, Plug, Shield, Sparkles, type LucideIcon } from "lucide-react";
import { useId, useState } from "react";
import type { CourseGroup } from "@/data/site";

const icons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  code: Code,
  cloud: Cloud,
  brain: Brain,
  shield: Shield,
  plug: Plug,
  messages: MessagesSquare,
  activity: Activity,
};

const VISIBLE = 4;

function GroupCard({ group }: { group: CourseGroup }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const Icon = icons[group.icon] ?? Sparkles;
  const hidden = group.courses.length - VISIBLE;
  const shown = open || hidden <= 0 ? group.courses : group.courses.slice(0, VISIBLE);

  return (
    <div className="rounded-xl border border-line bg-bg-elev/60 p-4">
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4 shrink-0 text-cyan" aria-hidden />
        <h4 className="text-sm font-semibold text-fg">{group.area}</h4>
        <span className="ml-auto rounded-full bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-subtle">
          {group.courses.length}
        </span>
      </div>
      <ul id={id} className="mt-3 space-y-2">
        {shown.map((c) => (
          <li key={c.name} className="flex gap-3 text-[13px] leading-snug">
            <span className="w-[4.5rem] shrink-0 font-mono text-[11px] text-subtle">{c.date}</span>
            <span className="text-muted">{c.name}</span>
          </li>
        ))}
      </ul>
      {hidden > 0 && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-cyan hover:underline"
        >
          {open ? "Show less" : `Show ${hidden} more`}
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
        </button>
      )}
    </div>
  );
}

export function CourseGroups({ groups }: { groups: CourseGroup[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((g) => (
        <GroupCard key={g.area} group={g} />
      ))}
    </div>
  );
}
