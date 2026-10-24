import SplitWords from "@/features/beyondTheStage/ui/SplitWords";

export default function LamppostReflectionFrame() {
  return (
    <article
      data-frame
      className="flex h-svh w-screen shrink-0 items-center justify-center px-5 sm:px-10 lg:px-16"
    >
      <div className="max-w-312 px-4 text-center">
        <p className="text-3xl font-light tracking-tight leading-relaxed sm:text-5xl md:text-6xl lg:text-7xl">
          <SplitWords
            text="“I like that part of ‘I spoke your name.’ Although I'm not sold on the lamppost; I don't like how it sounds when singing it.”"
            highlight="name"
          />
        </p>
      </div>
    </article>
  );
}
