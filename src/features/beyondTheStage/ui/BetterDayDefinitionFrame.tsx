import SplitWords from "@/features/beyondTheStage/ui/SplitWords";

export default function BetterDayDefinitionFrame() {
  return (
    <article
      data-frame
      className="flex h-svh w-screen shrink-0 items-center justify-center px-8 sm:px-16 lg:px-24"
    >
      <div className="max-w-4xl text-center">
        <p className="text-3xl font-light leading-relaxed text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          <SplitWords
            text="“You know? I like that ‘it’s time for a better day.’ Yeah, that feels right...”"
            highlight="better"
          />
        </p>
      </div>
    </article>
  );
}
