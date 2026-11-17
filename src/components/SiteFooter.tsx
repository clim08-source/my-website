import Image from "next/image";
import Link from "next/link";

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

export default function SiteFooter() {
  return (
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
  );
}
