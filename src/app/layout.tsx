import type { Metadata } from "next";
import { BBH_Bogle, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bogle = BBH_Bogle({
  variable: "--font-bogle",
  weight: "400",
  subsets: ["latin"],
});

const handwriting = localFont({
  variable: "--font-handwriting",
  src: "./fonts/myhandwriting.otf",
});

export const metadata: Metadata = {
  title: "Caitlin — Portfolio",
  description:
    "Systems Design Engineering @ UWaterloo. Projects, toolkit and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bogle.variable} ${handwriting.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
