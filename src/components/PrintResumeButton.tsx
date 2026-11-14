"use client";

import { Printer } from "lucide-react";

/** Prints the PDF via a hidden same-origin iframe; falls back to opening it. */
export function PrintResumeButton({ href }: { href: string }) {
  function print() {
    const frame = document.createElement("iframe");
    frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    frame.src = href;
    frame.onload = () => {
      try {
        frame.contentWindow?.focus();
        frame.contentWindow?.print();
      } catch {
        window.open(href, "_blank", "noopener");
      }
      window.setTimeout(() => frame.remove(), 60_000);
    };
    document.body.appendChild(frame);
  }

  return (
    <button
      type="button"
      onClick={print}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-surface/60 px-4 py-2.5 text-sm font-medium text-fg transition-all duration-200 hover:border-cyan/60 hover:bg-surface-2"
    >
      <Printer className="h-4 w-4" aria-hidden /> Print
    </button>
  );
}
