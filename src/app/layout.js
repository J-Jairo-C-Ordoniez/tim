import "./../styles/globals.css";
import { Anton, Outfit } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "TIM | Collective Silhouette",
  description: "A digital sanctuary and collective tribute to Tim Bergling (Avicii). Join our interactive particle mural and share your memory of the legend who changed electronic music forever.",
  keywords: ["Avicii", "Tim Bergling", "Tribute", "Digital Mural", "Electronic Music", "EDM", "Memorial", "Particle Art"],
  authors: [{ name: "TIM Project Team" }],
  openGraph: {
    title: "TIM | Collective Silhouette Tribute to Avicii",
    description: "A minimalist digital tribute to the life and music of Avicii. Join the collective memory.",
    url: "https://tim-tribute.vercel.app",
    siteName: "TIM Tribute",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TIM - Avicii Collective Tribute",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TIM | Collective Silhouette Tribute to Avicii",
    description: "Honoring Tim Bergling through a collective digital silhouette. Share your light.",
    images: ["/og-image.png"],
  },
};

export const viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
