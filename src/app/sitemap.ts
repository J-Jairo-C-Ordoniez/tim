import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl.toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
