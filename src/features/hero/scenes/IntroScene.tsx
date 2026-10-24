import { Volume2 } from "lucide-react";

type IntroSceneProps = {
  onStart: (withSound: boolean) => void;
};

export default function IntroScene({ onStart }: IntroSceneProps) {
  return (
    <section
      data-intro-scene
      className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 sm:px-12 text-center"
      aria-labelledby="intro-title"
    >
      <div
        data-intro-content
        className="flex w-full flex-col items-center justify-center will-change-transform"
      >
        <h1
          id="intro-title"
          data-intro-copy
          className="flex max-w-5xl lg:max-w-6xl flex-col items-center justify-center gap-y-2 sm:gap-y-3 text-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.95]"
        >
          <span
            data-before-avicii
            className="translate-y-6 text-foreground/80 opacity-0 will-change-transform"
          >
            Before Avicii,
          </span>
          <strong
            data-tim
            className="translate-y-6 font-semibold text-foreground opacity-0 will-change-transform"
          >
            there was Tim.
          </strong>
        </h1>

        <div
          data-intro-actions
          className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 opacity-0 translate-y-6"
        >
          <button
            type="button"
            onClick={() => onStart(true)}
            className="group inline-flex items-center gap-3.5 rounded-full border border-foreground/25 bg-foreground/5 px-5 py-3.5 text-sm font-light tracking-tight leading-relaxed text-foreground/85 sm:text-md md:text-lg lg:text-xl transition-all duration-300 hover:border-foreground/80 hover:bg-foreground hover:text-background cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <Volume2 className="size-4.5 sm:size-5 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.75} />
            <span>Enter with sound</span>
          </button>

          <button
            type="button"
            onClick={() => onStart(false)}
            className="text-sm font-light tracking-tight leading-relaxed text-foreground/85 sm:text-md md:text-lg lg:text-xl transition-colors duration-300 hover:text-foreground cursor-pointer py-3.5 px-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-full"
          >
            Enter in silence
          </button>
        </div>
      </div>

      <div
        data-intro-subtitle-container
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 sm:px-12 text-center"
      >
        <p
          data-intro-subtitle
          className="max-w-4xl text-3xl font-light tracking-tight leading-relaxed text-foreground/85 sm:text-5xl md:text-6xl lg:text-7xl opacity-0 translate-y-6 will-change-transform"
        >
          An experience about Tim Bergling
        </p>
      </div>
    </section>
  );
}
