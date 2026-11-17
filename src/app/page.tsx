import Image from "next/image";
import Link from "next/link";
import BronzeMedal from "@/components/BronzeMedal";
import GuitarHero from "@/components/GuitarHero";
import SiteFooter from "@/components/SiteFooter";

const TECH = {
  R: "/home/r.svg",
  React: "/home/react.svg",
  TypeScript: "/home/typescript.svg",
  "Gemini Live API": "/home/gemini.svg",
  Supabase: "/home/supabase.svg",
  Figma: "/home/figma.svg",
};

type Project = {
  /** Matches the project's slug in src/data/projects.ts */
  slug: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  fit: string;
  tech: (keyof typeof TECH)[];
  award?: { title: string; event: string };
};

const PROJECTS: Project[] = [
  {
    slug: "pwhl-vs-nhl",
    title: "PWHL VS NHL",
    description:
      "Statistical analysis of play in the Professional Women’s Hockey league (PWHL) versus the National Hockey League (NHL)",
    image: "/home/project-pwhl.png",
    alt: "Hex-bin shot location maps comparing the PWHL and NHL",
    fit: "object-contain",
    tech: ["R"],
  },
  {
    slug: "homebuddy",
    title: "HOMEBUDDY",
    description:
      "AI assistant helping seniors age at home instead of a care facility",
    image: "/home/project-homebuddy.png",
    alt: "HomeBuddy voice assistant interface greeting a patient",
    fit: "object-cover",
    tech: ["React", "TypeScript", "Gemini Live API", "Supabase", "Figma"],
    award: { title: "Winner", event: "WiE Hackathon" },
  },
];

const TOOLKIT = [
  { name: "R", icon: "/home/r.svg" },
  { name: "Next.js", icon: "/home/nextjs.svg" },
  { name: "React", icon: "/home/react.svg", inset: "12.5% 2.19% 0.16% 0" },
  { name: "Python", icon: "/home/python.svg" },
  { name: "Tailwind CSS", icon: "/home/tailwindcss.svg" },
  { name: "Figma", icon: "/home/figma.svg" },
  { name: "TypeScript", icon: "/home/typescript.svg" },
  { name: "Claude Code", icon: "/home/claude.svg" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-cream text-forest">
      <main className="flex flex-col">
        <GuitarHero />

        {/* Recent projects */}
        <section className="mx-auto w-full max-w-[1440px] px-4 pt-[82px] pb-16 md:px-16">
          <h2 className="font-display text-[48px] leading-normal">
            RECENT PROJECTS
          </h2>
          <div className="mt-9 grid gap-[30px] md:grid-cols-2">
            {PROJECTS.map((p) => (
              <Link
                key={p.title}
                href={`/projects#${p.slug}`}
                className="group block"
              >
                <div className="relative aspect-[641/294] overflow-hidden bg-white">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1440px) 641px, (min-width: 768px) 45vw, 100vw"
                    className={`${p.fit} transition-transform duration-300 group-hover:scale-[1.02]`}
                  />
                  {p.award && (
                    <BronzeMedal
                      title={p.award.title}
                      subtitle={p.award.event}
                      className="absolute top-[4%] right-[3%] w-[clamp(64px,19%,124px)]"
                    />
                  )}
                </div>
                <div className="mt-[21px] flex items-start justify-between gap-4">
                  <h3 className="font-display text-[31px] leading-normal">
                    {p.title}
                  </h3>
                  {/* play_arrow_filled (Material 3) */}
                  <Image
                    src="/home/play-arrow.svg"
                    alt=""
                    width={36}
                    height={37}
                    className="mr-[15px] h-[37px] w-[36px] shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </div>
                <p className="mt-[9px] text-[17px] leading-normal text-black">
                  {p.description}
                </p>
                <ul aria-label="Built with" className="mt-4 flex flex-wrap gap-2.5">
                  {p.tech.map((name) => (
                    <li
                      key={name}
                      title={name}
                      className="flex size-11 items-center justify-center rounded-[24%] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_3px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
                    >
                      <Image
                        src={TECH[name]}
                        alt={name}
                        width={26}
                        height={26}
                        className="size-[26px] object-contain"
                        unoptimized
                      />
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </section>

        {/* Toolkit */}
        <section className="min-h-[340px] bg-sand">
          <div className="mx-auto w-full max-w-[1440px] px-4 pt-[29px] pb-10 md:px-16">
            <h2 className="font-display text-[42px] leading-normal">
              TOOLKIT
            </h2>
            <ul className="mt-8 flex flex-wrap gap-x-[66px] gap-y-8 md:pl-[25px]">
              {TOOLKIT.map((t) => (
                <li key={t.name} className="flex w-[100px] flex-col items-center">
                  <div className="relative size-[100px]">
                    <div
                      className="absolute"
                      style={{ inset: "inset" in t ? t.inset : 0 }}
                    >
                      <Image src={t.icon} alt="" fill unoptimized />
                    </div>
                  </div>
                  <span className="mt-[35px] w-[111px] text-center font-hand text-[30px] leading-[0.8] text-black">
                    {t.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
