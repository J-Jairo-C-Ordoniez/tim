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
  title: "TIM | A Tribute to Tim Bergling",
  description: "A minimalist digital tribute to the life and music of Avicii.",
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
