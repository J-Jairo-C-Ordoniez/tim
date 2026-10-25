"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CreditSource = {
  label: string;
  title: string;
  credit: string;
  href: string;
};

const sources: CreditSource[] = [
  {
    label: "Hero documentary footage",
    title: "Heartbreaking moment from Avicii's True Stories",
    credit: "Kevin · YouTube",
    href: "https://youtu.be/0y_xW8yZ78k?si=4VL3kJgzlcLZSN32",
  },
  {
    label: "Studio imagery & For A Better Day material",
    title: "Avicii – Stories on Stories Ep.1 – The Making of For A Better Day (Full version)",
    credit: "Avicii · YouTube",
    href: "https://youtu.be/AddctCEB_Zc?si=hXCJl6SfBnV9BiQ7",
  },
  {
    label: "Wake Me Up footage",
    title: "The Making of Wake Me Up by Avicii",
    credit: "Avicii · YouTube",
    href: "https://youtu.be/qmq7UzSfr-U?si=h11TyfJvJKs3QD_R",
  },
  {
    label: "Listener testimony source",
    title: "Avicii – Stories on Stories Ep. 3 – The Lost Tapes",
    credit: "First YouTube comment · Avicii channel",
    href: "https://youtu.be/4FR1UMIHVo4?si=BUWEHR76cqH2pEbC",
  },
  {
    label: "Final show research & imagery context",
    title: "Closing Party Ushuaïa — Last Show 2016",
    credit: "Avicii Community",
    href: "https://aviciicommunity.com/shows/last-show-2016",
  },
];

type CreditsProps = {
  enabled: boolean;
};

export default function Credits({ enabled }: CreditsProps) {
  const container = useRef<HTMLElement>(null);
  const roll = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!enabled || !container.current || !roll.current) return;

      const rollElement = roll.current;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        gsap.set(rollElement, { y: 0 });
        return;
      }

      const getRollDistance = () => rollElement.scrollHeight + window.innerHeight * 0.42;

      const rollTween = gsap.fromTo(
        rollElement,
        { y: () => window.innerHeight * 0.42 },
        {
          y: () => -rollElement.scrollHeight,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: () => `+=${Math.max(1, getRollDistance())}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        },
      );

      const blocks = Array.from(rollElement.querySelectorAll<HTMLElement>("[data-credit-block]"));
      gsap.set(blocks, { autoAlpha: 0, y: 28 });

      blocks.forEach((block) => {
        gsap.to(block, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            containerAnimation: rollTween,
            start: "top 88%",
            end: "top 62%",
            scrub: 0.35,
          },
        });
      });

      return () => rollTween.scrollTrigger?.kill();
    },
    { scope: container, dependencies: [enabled] },
  );

  return (
    <section
      ref={container}
      className="relative h-svh w-full overflow-hidden bg-background"
      aria-label="Project credits and sources"
    >
      <div ref={roll} className="absolute inset-x-0 top-0 px-6 pb-24 sm:px-12 lg:px-20">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div data-credit-block>
            <p className="text-xl font-light tracking-tight text-foreground/60 sm:text-2xl md:text-3xl">
            TIM
            </p>
            <h2 className="mt-3 text-5xl font-normal tracking-tight leading-none text-foreground sm:text-7xl md:text-8xl lg:text-9xl">
              Credits
            </h2>
            <p className="mx-auto mt-6 w-full max-w-2xl text-lg font-light tracking-tight leading-relaxed text-foreground/70 sm:text-2xl">
              An independent tribute to Tim Bergling and the communities that continue to carry his work forward.
            </p>
          </div>

          <div className="mt-24 w-full border-t border-foreground/20 pt-8">
            <p data-credit-block className="text-xl font-light tracking-tight text-foreground/60 sm:text-2xl md:text-3xl">
              Source credits
            </p>
            <div className="mt-10 flex flex-col gap-10">
              {sources.map((source) => (
                <article key={source.href} data-credit-block>
                  <p className="text-sm font-light tracking-tight text-foreground/55 sm:text-base">
                    {source.label}
                  </p>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-2xl font-light tracking-tight leading-tight text-foreground transition-opacity hover:opacity-65 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground sm:text-4xl md:text-5xl"
                  >
                    {source.title}
                  </a>
                  <p className="mt-2 text-base font-light tracking-tight text-foreground/65 sm:text-xl">
                    {source.credit}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div data-credit-block className="mt-24 w-full border-t border-foreground/20 pt-8">
            <p className="text-xl font-light tracking-tight text-foreground/60 sm:text-2xl md:text-3xl">
              Community research
            </p>
            <p className="mx-auto mt-5 w-full max-w-3xl text-lg font-light tracking-tight leading-relaxed text-foreground/75 sm:text-2xl">
              This experience was informed by listening to the Avicii community across Reddit, Discord, YouTube comments, and official web resources.
            </p>
          </div>

          <div data-credit-block className="mt-24 w-full border-t border-foreground/20 pt-8">
            <p className="text-xl font-light tracking-tight text-foreground/60 sm:text-2xl md:text-3xl">
              Created by
            </p>
            <a
              href="https://j-jairo-c-ordonez.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 block text-3xl font-light tracking-tight text-foreground transition-opacity hover:opacity-65 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground sm:text-5xl md:text-6xl"
            >
              J Jairo C Ordoñez
            </a>
            <p className="mt-2 text-lg font-light tracking-tight text-foreground/65 sm:text-2xl">
              Creative direction & development
            </p>
          </div>

          <div data-credit-block className="mt-24 w-full border-t border-foreground/20 pt-8">
            <p className="text-xl font-light tracking-tight text-foreground/60 sm:text-2xl md:text-3xl">
              Rights & acknowledgement
            </p>
            <p className="mx-auto mt-5 w-full max-w-3xl text-lg font-light tracking-tight leading-relaxed text-foreground/70 sm:text-2xl">
              This independent fan project is non-commercial and commemorative. It does not claim ownership of third-party footage, imagery, trademarks, or copyrights; these remain with their respective owners. Sources are credited and linked, and no affiliation with or endorsement by Tim Bergling, Avicii, their estate, or the referenced platforms is implied.
            </p>
            <p className="mx-auto mt-5 w-full max-w-3xl text-base font-light tracking-tight leading-relaxed text-foreground/55 sm:text-xl">
              Attribution does not replace any permission or licence a rights holder may require. For a credit correction or removal request, please contact the creator through the portfolio above.
            </p>
          </div>

          <p data-credit-block className="mt-24 text-lg font-light tracking-tight text-foreground/45 sm:text-xl">
            Thank you for keeping the melody alive.
          </p>
        </div>
      </div>
    </section>
  );
}
