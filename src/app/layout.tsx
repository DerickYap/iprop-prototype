import type { Metadata } from "next";
import {
  Playfair_Display,
  Fraunces,
  Space_Grotesk,
  Inter,
  Manrope,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";
import { Dock } from "@/components/nav/Dock";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
// Display serif for the River Modern flythrough showcase.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "iProp — The Singapore New-Launch Edit",
  description:
    "An editorial guide to Singapore's new launch condominiums: read the stories, explore the interactive 3D map, and step inside each project's showcase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${fraunces.variable} ${grotesk.variable} ${inter.variable} ${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <Dock />
      </body>
    </html>
  );
}
