type SplitWordsProps = {
  text: string;
  className?: string;
  highlight?: string;
  animationTarget?: "scroll" | "video" | "none";
};

export default function SplitWords({
  text,
  className = "",
  highlight,
  animationTarget = "scroll",
}: SplitWordsProps) {
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => {
        const isHighlight =
          highlight && word.toLowerCase().includes(highlight.toLowerCase());
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block whitespace-nowrap mr-[0.26em]"
            aria-hidden="true"
          >
            {Array.from(word).map((character, characterIndex) => (
              <span
                key={`${character}-${characterIndex}`}
                data-scroll-character={animationTarget === "scroll" ? "" : undefined}
                data-video-character={animationTarget === "video" ? "" : undefined}
                className={`inline-block will-change-[transform,opacity] ${
                  isHighlight ? "text-foreground" : "text-foreground/75"
                }`}
              >
                {character}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
