export default function HeroTransitionScene() {
  return (
    <section
      data-hero-transition
      className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 opacity-0 sm:px-12"
      aria-label="Transición hacia la siguiente historia"
    >
      <p
        data-hero-transition-copy
        className="max-w-4xl text-center text-3xl font-light tracking-tight leading-relaxed text-foreground sm:text-5xl md:text-6xl lg:text-7xl will-change-transform"
      >
        Maybe it
      </p>

      <div
        data-hero-transition-scroll
        className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-2 opacity-0 will-change-transform"
      >
        <div className="flex h-8 w-5 justify-center rounded-full border border-foreground/30 pt-1.5">
          <div className="h-1.5 w-1 rounded-full bg-foreground/60 animate-bounce" />
        </div>
        <span className="text-[10px] sm:text-[11px] font-light tracking-[0.25em] uppercase text-foreground/40">
          Scroll
        </span>
      </div>
    </section>
  );
}
