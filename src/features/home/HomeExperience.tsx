"use client";

import { useState } from "react";
import BeyondTheStage from "@/features/beyondTheStage/BeyondTheStage";
import Hero from "@/features/hero/Hero";
import Testimonial from "@/features/testimonial/Testimonial";
import useHeroScrollLock from "@/features/home/hooks/useHeroScrollLock";

export default function HomeExperience() {
  const [heroComplete, setHeroComplete] = useState(false);

  useHeroScrollLock(!heroComplete);

  return (
    <main className={heroComplete ? "w-full bg-background" : "h-svh overflow-hidden bg-background"}>
      <Hero onComplete={() => setHeroComplete(true)} />
      <BeyondTheStage enabled={heroComplete} />
      <Testimonial enabled={heroComplete} />
    </main>
  );
}
