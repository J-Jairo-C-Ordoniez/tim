"use client";

import { useState } from "react";
import BeyondTheStage from "@/features/beyondTheStage/BeyondTheStage";
import Hero from "@/features/hero/Hero";
import useHeroScrollLock from "@/features/home/hooks/useHeroScrollLock";

export default function HomeExperience() {
  const [heroComplete, setHeroComplete] = useState(false);

  useHeroScrollLock(!heroComplete);

  return (
    <main className={heroComplete ? "overflow-x-hidden bg-background" : "h-svh overflow-hidden bg-background"}>
      <Hero onComplete={() => setHeroComplete(true)} />
      <BeyondTheStage enabled={heroComplete} />
    </main>
  );
}
