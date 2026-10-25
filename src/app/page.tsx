import type { Metadata } from "next";
import { siteMetadata, siteUrl } from "@/app/site";
import HomeExperience from "@/features/home/HomeExperience";

export const metadata: Metadata = {
  description:
    "Explore an independent interactive tribute to Tim Bergling (Avicii): his creative process, the people moved by his music, and the legacy that continues through community.",
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteMetadata.name,
    url: siteUrl.toString(),
    description: siteMetadata.description,
    inLanguage: "en",
    creator: {
      "@type": "Person",
      name: siteMetadata.creator,
      url: "https://j-jairo-c-ordonez.vercel.app/",
    },
    about: {
      "@type": "Person",
      name: "Tim Bergling",
      alternateName: "Avicii",
    },
    isBasedOn: [
      "https://youtu.be/0y_xW8yZ78k?si=4VL3kJgzlcLZSN32",
      "https://youtu.be/AddctCEB_Zc?si=hXCJl6SfBnV9BiQ7",
      "https://youtu.be/qmq7UzSfr-U?si=h11TyfJvJKs3QD_R",
      "https://youtu.be/4FR1UMIHVo4?si=BUWEHR76cqH2pEbC",
      "https://aviciicommunity.com/shows/last-show-2016",
    ],
    disclaimer:
      "Independent, non-commercial fan project. No affiliation with or endorsement by Tim Bergling, Avicii, their estate, or the referenced platforms is implied.",
  };

  return (
    <>
      <h1 className="sr-only">TIM — An Interactive Tribute to Tim Bergling, Avicii</h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeExperience />
    </>
  );
}
