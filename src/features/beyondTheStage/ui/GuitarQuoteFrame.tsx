import SplitWords from "@/features/beyondTheStage/ui/SplitWords";

export default function GuitarQuoteFrame() {
  return (
    <article
      data-frame
      className="flex h-svh w-screen shrink-0 items-center justify-center px-8 sm:px-16 lg:px-24"
    >
      <div className="max-w-5xl px-4 text-center">
        <p className="text-3xl font-light tracking-tight leading-relaxed sm:text-5xl md:text-6xl lg:text-7xl">
          <SplitWords
            text="“I love the sound of that guitar.”"
            highlight="guitar"
          />
        </p>
      </div>
    </article>
  );
}
