type CaptionTextProps = {
  segments: ReadonlyArray<{
    text: string;
    tone: "context" | "emotional";
  }>;
};

const toneClasses = {
  context: "font-light text-foreground/70",
  emotional: "font-normal text-foreground",
} as const;

export default function CaptionText({ segments }: CaptionTextProps) {
  return (
    <>
      {segments.map((segment) => (
        <span key={segment.text} className={toneClasses[segment.tone]} aria-hidden="true">
          {segment.text.split(" ").map((word, wordIndex) => (
            <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
              {Array.from(word).map((character, characterIndex) => (
                <span key={`${character}-${characterIndex}`} data-caption-character className="inline-block opacity-0">
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
