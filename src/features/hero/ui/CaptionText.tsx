type CaptionTextProps = {
  segments: ReadonlyArray<{
    text: string;
    tone: "context" | "emotional";
  }>;
};

const toneClasses = {
  context: "font-light text-foreground/70",
  emotional: "font-normal text-foreground drop-shadow-[0_0_14px_rgba(239,237,227,0.18)]",
} as const;

export default function CaptionText({ segments }: CaptionTextProps) {
  return (
    <>
      {segments.map((segment, segmentIndex) => (
        <span key={`${segment.text}-${segmentIndex}`} className={toneClasses[segment.tone]} aria-hidden="true">
          {segment.text.split(" ").map((word, wordIndex) => (
            <span key={`${word}-${segmentIndex}-${wordIndex}`} className="inline-block whitespace-nowrap">
              {Array.from(word).map((character, characterIndex) => (
                <span
                  key={`${character}-${segmentIndex}-${wordIndex}-${characterIndex}`}
                  data-caption-character
                  className="inline-block opacity-0"
                >
                  {character}
                </span>
              ))}
              {wordIndex < segment.text.split(" ").length - 1 ? "\u00A0" : null}
            </span>
          ))}
        </span>
      ))}
    </>
  );
}
