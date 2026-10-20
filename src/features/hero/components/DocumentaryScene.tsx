import type { RefObject } from "react";

type CaptionTone = "context" | "emotional";

type CaptionCue = {
  id: string;
  start: number;
  end: number;
  text: string;
  segments: ReadonlyArray<{
    text: string;
    tone: CaptionTone;
  }>;
};

export const captionCues: ReadonlyArray<CaptionCue> = [
  {
    id: "slow-down",
    start: 0,
    end: 8,
    text: "I didn't believe I could actually slow down. I didn't believe that I could tour any differently than this.",
    segments: [
      { text: "I didn't believe ", tone: "context" },
      { text: "I could actually slow down.", tone: "emotional" },
      { text: " I didn't believe that I could tour any differently than this.", tone: "context" },
    ],
  },
  {
    id: "everyone-else",
    start: 8,
    end: 17,
    text: "I looked around and saw everyone else doing what I was doing. They seemed to be doing fine.",
    segments: [
      { text: "I looked around and saw everyone else doing what I was doing. ", tone: "context" },
      { text: "They seemed to be doing fine.", tone: "emotional" },
    ],
  },
  {
    id: "feel-crazy",
    start: 17,
    end: 25,
    text: "I can't read minds, but they looked like they were doing fine. Then I started to feel crazy.",
    segments: [
      { text: "I can't read minds, but they looked like they were doing fine. ", tone: "context" },
      { text: "Then I started to feel crazy.", tone: "emotional" },
    ],
  },
  {
    id: "happy",
    start: 25,
    end: 30,
    text: "Everything on the checklist is there, so I should be happy.",
    segments: [
      { text: "Everything on the checklist is there, ", tone: "context" },
      { text: "so I should be happy.", tone: "emotional" },
    ],
  },
  {
    id: "properly-stop",
    start: 33,
    end: 43,
    text: "I didn't have time to properly stop. What I should have done was stop.",
    segments: [
      { text: "I didn't have time ", tone: "context" },
      { text: "to properly stop. ", tone: "emotional" },
      { text: "What I should have done was stop.", tone: "context" },
    ],
  },
  {
    id: "recover-time",
    start: 43,
    end: 51,
    text: "Four months. Five months. Half a year. Recover.",
    segments: [
      { text: "Four months. Five months. Half a year. ", tone: "context" },
      { text: "Recover.", tone: "emotional" },
    ],
  },
  {
    id: "recover-all",
    start: 51,
    end: 58,
    text: "Recover from the pain. Recover from the illnesses. Recover from all of it.",
    segments: [
      { text: "Recover from the pain. Recover from the illnesses. ", tone: "context" },
      { text: "Recover from all of it.", tone: "emotional" },
    ],
  },
  {
    id: "kept-going",
    start: 58,
    end: 65,
    text: "All those years of touring. All this stress. But I kept going.",
    segments: [
      { text: "All those years of touring. All this stress. ", tone: "context" },
      { text: "But I kept going.", tone: "emotional" },
    ],
  },
];

const toneClasses: Record<CaptionTone, string> = {
  // Mirrors "Before Avicii," in the opening: present, restrained and secondary.
  context: "font-normal text-foreground/75",
  // Mirrors "there was Tim.": the same scale, but with a quieter visual emphasis.
  emotional: "font-semibold text-foreground",
};

function KineticText({ text, tone }: CaptionCue["segments"][number]) {
  return (
    <span className={toneClasses[tone]} aria-hidden="true">
      {text.split(" ").map((word, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((character, characterIndex) => (
            <span key={`${character}-${characterIndex}`} data-caption-character className="inline-block opacity-0">
              {character}
            </span>
          ))}
          {wordIndex < text.split(" ").length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

export function DocumentaryScene({ videoRef }: { videoRef: RefObject<HTMLVideoElement | null> }) {
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
            {cue.segments.map((segment) => (
              <KineticText key={segment.text} {...segment} />
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}
