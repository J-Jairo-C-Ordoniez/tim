import type { RefObject } from "react";
import SplitWords from "@/features/beyondTheStage/ui/SplitWords";

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
        className="pointer-events-none absolute inset-0 bg-black/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-transparent to-black/70"
        aria-hidden="true"
      />

      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center opacity-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-6xl px-4">
          <h2
            data-video-overlay-item
            className="text-5xl font-normal tracking-tight leading-none text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
          >
            <SplitWords text="Wake Me Up" animationTarget="video" />
          </h2>
          <p
            data-video-overlay-item
            className="mt-5 text-xl font-light tracking-tight text-foreground/80 sm:mt-6 sm:text-2xl md:text-3xl"
          >
            <SplitWords text="A Listener’s Reflection" animationTarget="video" />
          </p>
        </div>
      </div>
    </figure>
  );
}
