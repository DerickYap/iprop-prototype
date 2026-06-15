import type { Metadata } from "next";
import {
  Playfair_Display,
  Fraunces,
  Space_Grotesk,
  Inter,
  Manrope,
} from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "iProp — Singapore New Launches in 3D",
  description:
    "Explore Singapore's new launch condominiums on an interactive 3D map, and step inside each project's showcase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${fraunces.variable} ${grotesk.variable} ${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
