import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { InspirationItem } from "@/features/whatInspires/data/inspirationData";

type InspirationModalProps = {
  item: InspirationItem | null;
  onClose: () => void;
};

export default function InspirationModal({ item, onClose }: InspirationModalProps) {
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-background/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-foreground/15 bg-background p-6 sm:p-10 shadow-2xl focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-background/60 text-foreground-muted hover:text-foreground hover:border-foreground/50 transition-colors cursor-pointer"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.3em] text-foreground-muted">
            {item.category}
          </span>
          <span className="rounded-full border border-foreground/15 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-foreground-muted">
            {item.badge}
          </span>
        </div>

        <h3
          id="modal-title"
          className="mt-3 text-3xl font-light tracking-wide text-foreground sm:text-4xl"
        >
          {item.title}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-foreground-muted">
          {item.subtitle}
        </p>

        <blockquote className="my-6 border-l-2 border-foreground/30 pl-4 italic text-sm font-light leading-relaxed text-foreground-muted bg-foreground/5 py-2.5 rounded-r-lg">
          “{item.quote}”
          <footer className="mt-1.5 not-italic text-[11px] uppercase tracking-wider text-foreground/50">
            — {item.quoteAuthor}
          </footer>
        </blockquote>

        <div className="flex flex-col gap-4 text-sm font-light leading-relaxed text-foreground-muted/90 sm:text-base">
          {item.fullStory.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {item.metrics && (
          <div className="mt-8 flex items-center justify-between border-t border-foreground/10 pt-5">
            <span className="text-xs uppercase tracking-[0.25em] text-foreground-muted">
              {item.metrics.label}
            </span>
            <span className="text-sm font-medium tracking-wider text-foreground">
              {item.metrics.value}
            </span>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
