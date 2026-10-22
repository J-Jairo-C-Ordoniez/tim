import type { RefObject } from "react";

type ClosingPortraitFrameProps = {
  photoWrapRef: RefObject<HTMLElement | null>;
  imgRef: RefObject<HTMLImageElement | null>;
};

export default function ClosingPortraitFrame({
  photoWrapRef,
  imgRef,
}: ClosingPortraitFrameProps) {
  return (
    <figure
      ref={photoWrapRef}
      className="pointer-events-none absolute inset-0 z-10 size-full overflow-hidden"
    >
      <img
        ref={imgRef}
        src="/beyondTheStage6.png"
        alt="Tim Bergling portrait"
        className="size-full object-cover will-change-[transform,opacity]"
        draggable={false}
        loading="eager"
      />
      <div className="absolute inset-0 bg-background/25" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/60"
        aria-hidden="true"
      />
    </figure>
  );
}
