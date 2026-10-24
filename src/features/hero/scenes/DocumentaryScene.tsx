import type { RefObject } from "react";
import { Volume2, VolumeX } from "lucide-react";
import captionCues from "@/features/hero/data/captionCues";
import CaptionText from "@/features/hero/ui/CaptionText";

type DocumentarySceneProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  isMuted: boolean;
  onToggleMute: () => void;
  hasStarted: boolean;
};

export default function DocumentaryScene({
  videoRef,
  isMuted,
  onToggleMute,
  hasStarted,
}: DocumentarySceneProps) {
  return (
    <section
      data-documentary-scene
      className="absolute inset-0 -z-10 scale-105 opacity-0"
      aria-label="Archivo documental de Tim Bergling"
    >
      <video
        ref={videoRef}
        className="size-full object-cover brightness-50 contrast-125 grayscale"
        playsInline
        preload="none"
        src="/HeroTimIntro.mp4"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-black/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-transparent to-black/70"
        aria-hidden="true"
      />

      {hasStarted && (
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30">
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? "Activar sonido" : "Silenciar sonido"}
            className="flex size-14 items-center justify-center rounded-full border border-foreground/20 bg-background/60 text-foreground backdrop-blur-md transition-all duration-300 hover:border-foreground/60 hover:bg-background/80 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            {isMuted ? (
              <VolumeX className="size-6 text-foreground-muted" />
            ) : (
              <Volume2 className="size-6 text-foreground" />
            )}
          </button>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-12 md:px-16"
        aria-live="polite"
      >
        {captionCues.map((cue) => (
          <p
            key={cue.id}
            data-caption={cue.id}
            aria-label={cue.text}
            className="absolute w-full max-w-4xl px-4 sm:px-8 translate-y-2 text-center text-lg sm:text-2xl md:text-4xl lg:text-5xl font-light tracking-tight leading-relaxed text-foreground opacity-0"
          >
            <CaptionText segments={cue.segments} />
          </p>
        ))}
      </div>
    </section>
  );
}
