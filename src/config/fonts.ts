import { Open_Sans, Bricolage_Grotesque, Atma } from "next/font/google";

export const fontSans = Atma({
  variable: "--font-sans",
  weight: ["400"],
  subsets: ["latin"],
});

export const fontMono = Bricolage_Grotesque({
  variable: "--font-mono",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});
