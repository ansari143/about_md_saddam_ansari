"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-4 bottom-20 z-40 sm:right-6 sm:bottom-24 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-surface/90 text-fg shadow-lg backdrop-blur transition-all duration-300 hover:border-cyan/60 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp className="h-4 w-4" aria-hidden />
    </button>
  );
}
