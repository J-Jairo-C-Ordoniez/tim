import type { MetadataRoute } from "next";
import { siteMetadata } from "@/app/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMetadata.title,
    short_name: siteMetadata.name,
    description: siteMetadata.description,
    start_url: "/",
    display: "standalone",
    background_color: "#11120D",
    theme_color: "#11120D",
    icons: [
      {
        src: "/aviciiLogo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
