import type { InspirationItem } from "@/features/whatInspires/data/inspirationData";

type InspirationCardProps = {
  item: InspirationItem;
  index: number;
  onSelect: (item: InspirationItem) => void;
};

export default function InspirationCard({
  item,
  index,
  onSelect,
}: InspirationCardProps) {
  return (
    <article
      data-inspiration-card
      className="group relative flex h-[88vh] w-[44vw] min-w-85 max-w-lg shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-foreground/10 bg-background/40 p-6 sm:p-8 backdrop-blur-md transition-all duration-500 hover:border-foreground/25 hover:bg-background/60 focus-within:ring-2 focus-within:ring-foreground/30"
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-linear-to-br ${item.gradient} blur-3xl opacity-40 transition-opacity duration-700 group-hover:opacity-75`}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.3em] text-foreground-muted/80">
            0{index + 1} · {item.category}
          </span>
          <span className="rounded-full border border-foreground/15 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground-muted">
            {item.badge}
          </span>
        </div>

        <div>
          <h3 className="text-2xl font-light tracking-wide text-foreground sm:text-3xl lg:text-4xl">
            {item.title}
          </h3>
          <p className="mt-1 text-xs font-light tracking-wider text-foreground-muted uppercase">
            {item.subtitle}
          </p>
        </div>

        <p className="text-sm font-light leading-relaxed text-foreground-muted/90 sm:text-base">
          {item.excerpt}
        </p>
      </div>

      <div className="relative z-10 flex flex-col gap-5 pt-4 border-t border-foreground/10">
        <blockquote className="border-l-2 border-foreground/20 pl-4 italic text-xs font-light leading-relaxed text-foreground-muted">
          “{item.quote}”
          <footer className="mt-1.5 not-italic text-[10px] uppercase tracking-wider text-foreground/50">
            — {item.quoteAuthor}
          </footer>
        </blockquote>

        <div className="flex items-center justify-between pt-2">
          {item.metrics && (
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-foreground-muted/60">
                {item.metrics.label}
              </span>
              <span className="text-xs font-medium tracking-wider text-foreground">
                {item.metrics.value}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={() => onSelect(item)}
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:border-foreground/60 hover:bg-foreground hover:text-background cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            aria-label={`Ver historia completa de ${item.title}`}
          >
            <span>Ver Historia</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
