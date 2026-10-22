"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ClosingScene from "@/features/testimonial/scenes/ClosingScene";
import TestimonialQuoteScene from "@/features/testimonial/scenes/TestimonialQuoteScene";

type TestimonialProps = {
  enabled: boolean;
};

export default function Testimonial({ enabled }: TestimonialProps) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (enabled) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [enabled]);

  return (
    <section
      ref={root}
      className="relative w-full bg-background"
      aria-label="Testimony and closing"
    >
      <TestimonialQuoteScene enabled={enabled} />
      <ClosingScene enabled={enabled} />
    </section>
  );
}
