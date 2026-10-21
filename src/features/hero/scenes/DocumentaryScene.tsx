import type { RefObject } from "react";
import captionCues from "@/features/hero/data/captionCues";
import CaptionText from "@/features/hero/ui/CaptionText";

type DocumentarySceneProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
};

export default function DocumentaryScene({ videoRef }: DocumentarySceneProps) {
  return (
    <section data-documentary-scene className="absolute inset-0 -z-10 scale-105 opacity-0" aria-label="Archivo documental de Tim Bergling">
      <video
        ref={videoRef}
        className="size-full object-cover brightness-50 contrast-125 grayscale"
        muted
        playsInline
        preload="metadata"
        src="/AviciiHero1.mp4"
      />
      <div className="pointer-events-none absolute inset-0 bg-background/40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-transparent to-background/70" aria-hidden="true" />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-12" aria-live="polite">
        {captionCues.map((cue) => (
          <p
            key={cue.id}
            data-caption={cue.id}
            aria-label={cue.text}
            className="absolute max-w-3xl translate-y-2 text-center text-2xl leading-snug tracking-wide text-foreground opacity-0 sm:text-3xl"
          >
            <CaptionText segments={cue.segments} />
          </p>
        ))}
      </div>
    </section>
  );
}
