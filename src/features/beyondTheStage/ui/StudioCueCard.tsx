type StudioCueCardProps = {
  timestamp: string;
  lines: readonly string[];
};

export default function StudioCueCard({ timestamp, lines }: StudioCueCardProps) {
  return (
    <article data-studio-panel className="flex h-svh w-svw shrink-0 items-center px-6 sm:px-12 lg:px-[12vw]">
      <div className="max-w-3xl">
      <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-foreground-muted">{timestamp}</p>
      {lines.map((line) => (
        <p key={line} className="max-w-xl text-2xl leading-snug text-foreground sm:text-3xl">
          {line}
        </p>
      ))}
      </div>
    </article>
  );
}
