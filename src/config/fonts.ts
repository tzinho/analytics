import { Bricolage_Grotesque, Inter } from "next/font/google";

export const fontSans = Inter({
  variable: "--font-sans",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const fontMono = Bricolage_Grotesque({
  variable: "--font-mono",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});
