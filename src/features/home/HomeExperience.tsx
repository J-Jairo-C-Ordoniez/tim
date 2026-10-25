"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BeyondTheStage from "@/features/beyondTheStage/BeyondTheStage";
import Credits from "@/features/credits/Credits";
import Hero from "@/features/hero/Hero";
import LastShow from "@/features/lastShow/LastShow";
import Testimonial from "@/features/testimonial/Testimonial";
import WhatInspires from "@/features/whatInspires/WhatInspires";
import useHeroScrollLock from "@/features/home/hooks/useHeroScrollLock";

export default function HomeExperience() {
  const [heroComplete, setHeroComplete] = useState(false);

  useHeroScrollLock(!heroComplete);

  useEffect(() => {
    if (!heroComplete) {
      window.scrollTo(0, 0);
    }

    if (heroComplete) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [heroComplete]);

  return (
    <main className={heroComplete ? "w-full bg-background" : "h-svh overflow-hidden bg-background"}>
      <Hero onComplete={() => setHeroComplete(true)} />
      <BeyondTheStage enabled={heroComplete} />
      <Testimonial enabled={heroComplete} />
      <LastShow enabled={heroComplete} />
      <WhatInspires enabled={heroComplete} />
      <Credits enabled={heroComplete} />
    </main>
  );
}
