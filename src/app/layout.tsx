import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TIM",
  description: "TIM",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="hero-is-playing h-full antialiased">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
