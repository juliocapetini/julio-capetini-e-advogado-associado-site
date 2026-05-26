import { Jost, Playfair_Display } from "next/font/google";

export const newsletterSans = Jost({
  variable: "--font-nw-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const newsletterSerif = Playfair_Display({
  variable: "--font-nw-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const newsletterFontClassName = `${newsletterSans.variable} ${newsletterSerif.variable}`;
