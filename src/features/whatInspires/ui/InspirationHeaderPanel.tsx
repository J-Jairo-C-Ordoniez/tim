import type { RefObject } from "react";

type InspirationHeaderPanelProps = {
  headerRef: RefObject<HTMLDivElement | null>;
  title: string;
  subtitle: string;
};

export default function InspirationHeaderPanel({
  headerRef,
  title,
  subtitle,
}: InspirationHeaderPanelProps) {
  return (
    <div
      ref={headerRef}
      className="flex h-[88vh] w-[46vw] min-w-72 sm:min-w-100 max-w-xl shrink-0 flex-col justify-center px-6 sm:px-10"
    >
      <div className="mb-4 inline-flex items-center gap-2">
        <span className="size-2 rounded-full bg-foreground/60 animate-pulse" />
        <span className="text-xs uppercase tracking-[0.35em] text-foreground-muted">
          Resonancia Colectiva
        </span>
      </div>

      <h2 className="text-4xl font-light uppercase tracking-[0.2em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl select-none leading-none">
        {title}
      </h2>

      <p className="mt-6 text-sm font-light leading-relaxed tracking-wide text-foreground-muted sm:text-base max-w-md">
        {subtitle}
      </p>

      <div className="mt-8 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-foreground/40">
        <span>Scroll horizontal</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="translate-x-1 animate-pulse"
        >
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
