import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TIM",
  description: "TIM",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="h-full w-full overflow-hidden bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
