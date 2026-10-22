"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BeyondTheStage from "@/features/beyondTheStage/BeyondTheStage";
import Hero from "@/features/hero/Hero";
import LastShow from "@/features/lastShow/LastShow";
import Testimonial from "@/features/testimonial/Testimonial";
import useHeroScrollLock from "@/features/home/hooks/useHeroScrollLock";

gsap.registerPlugin(ScrollTrigger);

export default function HomeExperience() {
  const [heroComplete, setHeroComplete] = useState(false);

  useHeroScrollLock(!heroComplete);

  useLayoutEffect(() => {
    ScrollTrigger.defaults({
      scroller: "#main-scroll",
    });
  }, []);

  useEffect(() => {
    const mainEl = document.getElementById("main-scroll");
    if (!heroComplete && mainEl) {
      mainEl.scrollTop = 0;
    }

    if (heroComplete) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [heroComplete]);

  return (
    <main
      id="main-scroll"
      className={
        heroComplete
          ? "fixed inset-0 h-screen w-screen overflow-y-auto overflow-x-hidden bg-background"
          : "fixed inset-0 h-screen w-screen overflow-hidden bg-background"
      }
    >
      <Hero onComplete={() => setHeroComplete(true)} />
      <BeyondTheStage enabled={heroComplete} />
      <Testimonial enabled={heroComplete} />
      <LastShow enabled={heroComplete} />
    </main>
  );
}
