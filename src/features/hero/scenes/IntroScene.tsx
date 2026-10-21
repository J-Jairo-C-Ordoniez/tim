export default function IntroScene() {
  return (
    <section data-intro-scene className="absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-12" aria-labelledby="intro-title">
      <h1
        id="intro-title"
        data-intro-copy
        className="flex max-w-4xl flex-wrap items-baseline justify-center gap-y-4 text-center text-2xl font-normal uppercase tracking-widest sm:text-3xl"
      >
        <span data-before-avicii className="translate-y-8 text-foreground-muted opacity-0 will-change-transform">
          Before Avicii,
        </span>
        <strong data-tim className="translate-y-8 font-semibold text-foreground opacity-0 will-change-transform">
          there was Tim.
        </strong>
      </h1>
    </section>
  );
}
