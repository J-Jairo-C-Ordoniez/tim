import type { RefObject } from "react";

type WakeMeUpBridgeFrameProps = {
  figureRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  overlayRef: RefObject<HTMLDivElement | null>;
  onLoadedMetadata: () => void;
  onTimeUpdate: () => void;
  onUnlockScroll: () => void;
};

export default function WakeMeUpBridgeFrame({
  figureRef,
  videoRef,
  overlayRef,
  onLoadedMetadata,
  onTimeUpdate,
  onUnlockScroll,
}: WakeMeUpBridgeFrameProps) {
  return (
    <figure
      ref={figureRef}
      data-frame
      onClick={onUnlockScroll}
      className="relative flex h-svh w-screen min-w-screen shrink-0 items-center justify-center overflow-hidden bg-background isolate z-10"
    >
      <video
        ref={videoRef}
        src="/WakeMeUp.mp4"
        className="size-full object-cover brightness-50 contrast-125 grayscale will-change-[transform,opacity]"
        playsInline
        preload="auto"
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-background/30"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-background via-transparent to-background/70"
        aria-hidden="true"
      />

      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center opacity-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-5xl px-4">
          <h2
            data-video-overlay-item
            className="text-4xl font-light uppercase tracking-[0.22em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl leading-tight"
          >
            Wake Me Up
          </h2>
          <p
            data-video-overlay-item
            className="mt-6 text-sm sm:text-lg md:text-xl font-light uppercase tracking-[0.38em] text-foreground-muted/90"
          >
            A Listener’s Reflection
          </p>
        </div>
      </div>
    </figure>
  );
}
