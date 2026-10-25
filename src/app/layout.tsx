import type { Metadata } from "next";
import { siteMetadata, siteUrl } from "@/app/site";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: siteMetadata.name,
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: [
    "Tim Bergling",
    "Avicii",
    "interactive tribute",
    "Avicii legacy",
    "music documentary",
    "Wake Me Up",
  ],
  authors: [{ name: siteMetadata.creator, url: "https://j-jairo-c-ordonez.vercel.app/" }],
  creator: siteMetadata.creator,
  publisher: siteMetadata.creator,
  category: "Arts & Culture",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/aviciiLogo.png", type: "image/png" }],
    apple: [{ url: "/aviciiLogo.png", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    url: "/",
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.name,
    locale: siteMetadata.locale,
    images: [{ url: "/TimClosing.webp", width: 1200, height: 630, alt: "TIM — An Interactive Tribute to Avicii" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ["/TimClosing.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="hero-is-playing h-full antialiased">
      <body className="min-h-full bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
