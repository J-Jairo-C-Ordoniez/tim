type SplitWordsProps = {
  text: string;
  className?: string;
  highlight?: string;
};

export default function SplitWords({
  text,
  className = "",
  highlight,
}: SplitWordsProps) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => {
        const isHighlight =
          highlight && word.toLowerCase().includes(highlight.toLowerCase());
        return (
          <span
            key={`${word}-${i}`}
            className="inline-block whitespace-nowrap mr-[0.26em]"
          >
            <span
              data-word
              className={`inline-block will-change-[transform,opacity] ${
                isHighlight ? "font-medium text-foreground" : ""
              }`}
            >
              {word}
            </span>
          </span>
        );
      })}
    </span>
  );
}
