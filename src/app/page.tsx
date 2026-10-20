import { Hero } from "@/features/hero/components/Hero";
import { LyricZoomScene } from "@/features/hero/components/LyricZoomScene";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-background">
      <Hero />
      <LyricZoomScene />
    </main>
  );
}
