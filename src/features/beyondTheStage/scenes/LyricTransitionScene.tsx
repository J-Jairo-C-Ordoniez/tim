import type { RefObject } from "react";
import PhraseWords from "@/features/beyondTheStage/ui/PhraseWords";

type LyricTransitionSceneProps = {
  continuationLine: string;
  continuationSceneRef: RefObject<HTMLElement | null>;
  finalLine: string;
  finalSceneRef: RefObject<HTMLElement | null>;
  accessiblePhrase: string;
};

export default function LyricTransitionScene({
  continuationLine,
  continuationSceneRef,
  finalLine,
  finalSceneRef,
  accessiblePhrase,
}: LyricTransitionSceneProps) {
  return (
    <>
      <section ref={continuationSceneRef} className="relative h-[180svh]" aria-label="Segunda parte de la transición tipográfica">
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-6 [perspective:900px] sm:px-12">
          <PhraseWords line={continuationLine} marker="continuation" />
        </div>
      </section>

      <section ref={finalSceneRef} className="relative h-[180svh]" aria-label="Cierre de la transición tipográfica">
        <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden px-6 [perspective:900px] sm:px-12">
          <PhraseWords line={finalLine} marker="final" />
          <p className="sr-only">{accessiblePhrase}.</p>
        </div>
      </section>
    </>
  );
}
