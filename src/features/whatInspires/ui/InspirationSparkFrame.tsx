import type { RefObject } from "react";
import Image from "next/image";

type InspirationSparkFrameProps = {
  frameRef: RefObject<HTMLDivElement | null>;
  name: string;
  dates: string;
};

export default function InspirationSparkFrame({
  frameRef,
  name,
  dates,
}: InspirationSparkFrameProps) {
  return (
    <div
      ref={frameRef}
      className="pointer-events-none absolute inset-0 flex items-center overflow-hidden px-6 text-left sm:px-12 lg:px-[12vw]"
    >
      <Image
        src="/TimClosing.webp"
        alt="Tim Bergling"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-background/45" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-linear-to-t from-background via-background/15 to-background/65"
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col items-start">
        <h2 className="text-5xl font-normal tracking-tight leading-none text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
          {name}
        </h2>
        <p className="mt-5 text-xl font-light tracking-tight text-foreground/80 sm:mt-6 sm:text-2xl md:text-3xl">
          {dates}
        </p>
      </div>
    </div>
  );
}
