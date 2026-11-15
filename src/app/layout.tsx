import type { Metadata } from "next";
import { BBH_Bogle, Commissioner } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";

const commissioner = Commissioner({
  variable: "--font-commissioner",
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
      className={`${commissioner.variable} ${bogle.variable} ${handwriting.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        {/* Plain <a> (not <Link>) so clicking it on the home page does a full
            reload and replays the intro animation. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- full reload is intended */}
        <a
          href="/"
          aria-label="Caitlin — home"
          className="absolute top-[min(24px,1.6vw)] left-[min(24px,1.6vw)] z-20 block w-[min(120px,8vw)] min-w-12 transition-transform duration-200 hover:-rotate-3 hover:scale-105"
        >
          <Image
            src="/home/logo.png"
            alt=""
            width={480}
            height={333}
            priority
            className="h-auto w-full"
          />
        </a>
        {children}
      </body>
    </html>
  );
}
