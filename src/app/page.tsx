import Image from "next/image";
import Link from "next/link";
import GuitarHero from "@/components/GuitarHero";

const PROJECTS = [
  {
    title: "PWHL VS NHL",
    description:
      "Statistical analysis of play in the Professional Women’s Hockey league (PWHL) versus the National Hockey League (NHL)",
    image: "/home/project-pwhl.png",
    alt: "Hex-bin shot location maps comparing the PWHL and NHL",
    fit: "object-contain",
  },
  {
    title: "HOMEBUDDY",
    description:
      "AI assistant helping seniors age at home instead of a care facility",
    image: "/home/project-homebuddy.png",
    alt: "HomeBuddy voice assistant interface greeting a patient",
    fit: "object-cover",
  },
] as const;

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

const GITHUB_URL = "https://github.com/clim08-source"; 
const EMAIL = "c55lim@uwaterloo.ca";
const LINKEDIN_URL = "https://www.linkedin.com/in/limcaitlin/"; 
const SOCIALS = [
  { label: "GitHub", icon: "/home/github.svg", href: GITHUB_URL },
  { label: "Email", icon: "/home/email.svg", href: EMAIL && `mailto:${EMAIL}` },
  { label: "LinkedIn", icon: "/home/linkedin.svg", href: LINKEDIN_URL },
].filter((s) => s.href);

const FOOTER_LINKS = [
  { label: "Home", href: "/", width: "md:w-[70px]" },
  { label: "Projects", href: "/projects", width: "md:w-[90px]" },
  { label: "Experience", href: "/experience", width: "md:w-[100px]" },
  { label: "About me", href: "/about", width: "md:w-[106px]" },
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
              <Link key={p.title} href="/projects" className="group block">
                <div className="relative aspect-[641/294] overflow-hidden bg-white">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1440px) 641px, (min-width: 768px) 45vw, 100vw"
                    className={`${p.fit} transition-transform duration-300 group-hover:scale-[1.02]`}
                  />
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
                <p className="mt-[9px] text-[17px] leading-normal">
                  {p.description}
                </p>
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

      <footer className="bg-cream">
        <div className="relative mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 md:pr-16 md:pl-[54px]">
          <div className="absolute inset-x-4 top-0 h-px bg-rule md:inset-x-16" />
          <ul className="flex gap-[10px]">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("http") && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="flex size-[44px] items-center justify-center rounded-full transition-colors hover:bg-black/5"
                >
                  <Image src={s.icon} alt="" width={24} height={24} />
                </a>
              </li>
            ))}
          </ul>
          <nav aria-label="Footer">
            <ul className="flex gap-3 md:gap-[22px]">
              {FOOTER_LINKS.map((l) => (
                <li key={l.label} className={l.width}>
                  <Link
                    href={l.href}
                    className="block py-[13px] pl-1 text-[14px] leading-normal underline hover:opacity-70"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
}
