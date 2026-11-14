"use client";

import { Sparkles } from "lucide-react";
import { openAskAI } from "./AskAI";

export function AskAIButton({ className = "", label = "Ask my AI representative", question }: { className?: string; label?: string; question?: string }) {
  return (
    <button
      type="button"
      onClick={() => openAskAI(question)}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:text-fg ${className}`}
    >
      <Sparkles className="h-4 w-4 text-cyan" aria-hidden />
      {label}
    </button>
  );
}
