import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg hover:brightness-110 shadow-[0_0_0_1px_var(--accent),0_8px_24px_-8px_var(--glow-cyan)]",
  secondary: "border border-line-strong bg-surface/60 text-fg hover:border-cyan/60 hover:bg-surface-2",
  ghost: "text-muted hover:text-fg",
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  children: ReactNode;
};

export function ButtonLink({ variant = "primary", className = "", children, ...rest }: ButtonLinkProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
