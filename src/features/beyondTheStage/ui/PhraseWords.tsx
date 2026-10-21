type PhraseWordsProps = {
  line: string;
  marker: "continuation" | "final";
};

export default function PhraseWords({ line, marker }: PhraseWordsProps) {
  return (
    <p className="flex max-w-5xl flex-wrap justify-center gap-x-[0.22em] gap-y-2 text-center text-2xl font-normal uppercase tracking-widest text-foreground sm:text-3xl" aria-hidden="true">
      {line.split(" ").map((word) => (
        <span
          key={word}
          data-lyric-word={marker}
          className="inline-block origin-center will-change-[transform,opacity,filter]"
        >
          {word}
        </span>
      ))}
    </p>
  );
}
