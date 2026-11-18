"use client";

import { CalendarDays, Download, ExternalLink, Mail, RotateCcw, SendHorizontal, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { profile } from "@/data/site";
import { answer, suggestions, welcome, type ChatAction, type ChatAnswer } from "@/lib/assistant";

type Message = { id: number; role: "user" | "bot"; content: ChatAnswer | string };

const STORAGE_KEY = "ask-ai-history-v1";
export const OPEN_EVENT = "open-ask-ai";

/** Open the assistant from anywhere, optionally asking a question. */
export function openAskAI(question?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: { question } }));
}

function ActionButton({ action, onNavigate }: { action: ChatAction; onNavigate: () => void }) {
  const Icon =
    action.kind === "download" ? Download : action.kind === "mail" ? Mail : action.label.toLowerCase().includes("book") ? CalendarDays : ExternalLink;
  const external = action.kind === "external";
  return (
    <a
      href={action.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(action.kind === "download" ? { download: "" } : {})}
      onClick={action.kind === "section" ? onNavigate : undefined}
      className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3 py-1.5 text-xs font-medium text-fg transition-colors hover:border-cyan/60 hover:text-cyan"
    >
      {action.kind !== "section" && <Icon className="h-3.5 w-3.5" aria-hidden />}
      {action.label}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

function BotBubble({ content, onNavigate }: { content: ChatAnswer; onNavigate: () => void }) {
  return (
    <div className="max-w-[92%] space-y-2 rounded-2xl rounded-tl-sm border border-line bg-surface-2/80 px-4 py-3 text-sm leading-relaxed text-fg">
      {content.text.map((t) => (
        <p key={t}>{t}</p>
      ))}
      {content.bullets && content.bullets.length > 0 && (
        <ul className="space-y-1.5 pt-1">
          {content.bullets.map((b) => (
            <li key={b} className="flex gap-2 text-muted">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {content.actions && content.actions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {content.actions.map((a) => (
            <ActionButton key={a.label + a.href} action={a} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
}

export function AskAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lastTopic, setLastTopic] = useState<string | undefined>();
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const idRef = useRef(1);
  const reduce = useReducedMotion();

  // Restore this visit's conversation.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { messages: Message[]; lastTopic?: string };
        setMessages(parsed.messages);
        setLastTopic(parsed.lastTopic);
        idRef.current = parsed.messages.reduce((m, x) => Math.max(m, x.id), 0) + 1;
      }
    } catch {
      /* storage unavailable — start fresh */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, lastTopic }));
    } catch {
      /* ignore */
    }
  }, [messages, lastTopic]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, reduce]);

  const ask = useCallback(
    (question: string) => {
      const q = question.trim();
      if (!q || typing) return;
      setMessages((m) => [...m, { id: idRef.current++, role: "user", content: q }]);
      setInput("");
      setTyping(true);
      const reply = answer(q, lastTopic);
      const delay = reduce ? 0 : 450 + Math.min(700, reply.text.join(" ").length * 2);
      window.setTimeout(() => {
        setMessages((m) => [...m, { id: idRef.current++, role: "bot", content: reply }]);
        if (reply.topic) setLastTopic(reply.topic);
        setTyping(false);
      }, delay);
    },
    [lastTopic, typing, reduce],
  );

  // Open from other components (hero button, etc.).
  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent<{ question?: string }>).detail?.question;
      if (q) window.setTimeout(() => ask(q), 150);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [ask]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }

  function reset() {
    setMessages([]);
    setLastTopic(undefined);
    inputRef.current?.focus();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    ask(input);
  }

  // On phones the panel is full screen, so close it when jumping to a section.
  function onNavigate() {
    if (window.matchMedia("(max-width: 639px)").matches) setOpen(false);
  }

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            ref={launcherRef}
            type="button"
            onClick={() => setOpen(true)}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 12 }}
            className="fixed right-4 bottom-4 z-50 inline-flex items-center gap-2 rounded-full border border-cyan/40 bg-surface/95 py-2.5 pr-4 pl-3 text-sm font-medium text-fg shadow-[0_10px_30px_-10px_var(--glow-cyan)] backdrop-blur transition-colors hover:border-cyan sm:right-6 sm:bottom-6"
            aria-haspopup="dialog"
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-violet text-accent-fg">
              <Sparkles className="h-4 w-4" aria-hidden />
              <span aria-hidden className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-emerald-400" />
            </span>
            Ask AI Representative
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby="ask-ai-title"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col overflow-hidden border-line-strong bg-bg-elev shadow-2xl sm:inset-auto sm:right-6 sm:bottom-6 sm:h-[min(640px,calc(100vh-6rem))] sm:w-[400px] sm:rounded-2xl sm:border"
          >
            <header className="flex items-center gap-3 border-b border-line px-4 py-3">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-violet text-accent-fg">
                <Sparkles className="h-4 w-4" aria-hidden />
                <span aria-hidden className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-bg-elev bg-emerald-400" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id="ask-ai-title" className="truncate text-sm font-semibold text-fg">
                  AI Representative
                </h2>
                <p className="truncate text-xs text-subtle">Online · answers from {profile.displayName}&apos;s resume</p>
              </div>
              {profile.bookingUrl && (
                <a
                  href={profile.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-1 rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted hover:border-line-strong hover:text-fg sm:inline-flex"
                >
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden /> Book
                  <span className="sr-only">a call (opens in a new tab)</span>
                </a>
              )}
              <button
                type="button"
                onClick={reset}
                aria-label="Start a new conversation"
                title="New conversation"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close AI Representative"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 [scrollbar-color:var(--border-strong)_transparent] [scrollbar-width:thin]" aria-live="polite" aria-relevant="additions">
              <BotBubble content={welcome} onNavigate={onNavigate} />
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-2 pt-1" aria-label="Suggested questions">
                  {suggestions.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => ask(s.question)}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted transition-colors hover:border-cyan/60 hover:text-fg"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-tr-sm bg-accent px-4 py-2.5 text-sm text-accent-fg">
                      {m.content as string}
                    </p>
                  </div>
                ) : (
                  <BotBubble key={m.id} content={m.content as ChatAnswer} onNavigate={onNavigate} />
                ),
              )}
              {typing && (
                <div className="flex w-fit items-center gap-1 rounded-2xl rounded-tl-sm border border-line bg-surface-2/80 px-4 py-3" aria-label="AI Representative is typing">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-subtle" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              )}
              {messages.length > 0 && !typing && (
                <div className="flex flex-wrap gap-1.5 pt-1" aria-label="More questions">
                  {suggestions
                    .filter((s) => !messages.some((m) => m.role === "user" && m.content === s.question))
                    .slice(0, 3)
                    .map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => ask(s.question)}
                        className="rounded-full border border-line px-2.5 py-1 text-[11px] text-subtle transition-colors hover:border-cyan/60 hover:text-fg"
                      >
                        {s.label}
                      </button>
                    ))}
                </div>
              )}
            </div>

            <form onSubmit={onSubmit} className="border-t border-line p-3">
              <div className="flex items-center gap-2 rounded-xl border border-line-strong bg-surface py-1 pr-1.5 pl-3.5 transition-[border-color,box-shadow] duration-150 focus-within:border-cyan focus-within:shadow-[0_0_0_3px_color-mix(in_srgb,var(--cyan)_18%,transparent)]">
                <label htmlFor="ask-ai-input" className="sr-only">
                  Ask a question about {profile.displayName}
                </label>
                <input
                  ref={inputRef}
                  id="ask-ai-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about experience, skills, availability…"
                  autoComplete="off"
                  maxLength={300}
                  className="h-10 min-w-0 flex-1 appearance-none border-0 bg-transparent text-base text-fg shadow-none placeholder:text-subtle focus:outline-none focus-visible:outline-none sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send question"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-fg transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-subtle disabled:hover:brightness-100"
                >
                  <SendHorizontal className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-subtle">
                Automated assistant · answers only from published resume content
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
