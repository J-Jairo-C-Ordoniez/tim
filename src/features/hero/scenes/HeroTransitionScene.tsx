export default function HeroTransitionScene() {
  return (
    <section
      data-hero-transition
      className="absolute inset-0 z-20 flex translate-y-4 items-center justify-center px-6 opacity-0 sm:px-12"
      aria-label="Transición hacia la siguiente historia"
    >
      <p data-hero-transition-copy className="text-center text-2xl font-normal uppercase tracking-widest text-foreground sm:text-3xl">
        Maybe it
      </p>
    </section>
  );
}
