import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import ProjectGallery from "@/components/ProjectGallery";
import SiteFooter from "@/components/SiteFooter";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = { title: "Projects — Caitlin" };

/** Design px (1440-wide canvas) → container-query units. */
const u = (px: number) => `calc(${px} * 100cqw / 1440)`;

/** Hand-drawn background art, placed in design px on the 1440×1951 canvas. */
const ART = [
  {
    src: "/projects/lines-top.svg",
    left: -156.61,
    top: -71.37,
    width: 1058.31,
    height: 832.3,
  },
  {
    src: "/projects/lines-bottom.svg",
    left: -172.32,
    top: 702.55,
    width: 1754.89,
    height: 1564.26,
  },
  {
    src: "/projects/squiggle.svg",
    left: 111.05,
    top: 1148.52,
    width: 146.29,
    height: 358.03,
  },
  {
    src: "/projects/notes.svg",
    left: 1115.06,
    top: 150.87,
    width: 316.08,
    height: 201.22,
  },
];

/**
 * Cream outline behind the title so the line art doesn't cut through it.
 * Built from a ring of shadows (rather than a text stroke) so the corners
 * come out round instead of spiky.
 */
const TITLE_OUTLINE = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * 2 * Math.PI;
  const x = (Math.cos(a) * 12).toFixed(2);
  const y = (Math.sin(a) * 12).toFixed(2);
  return `${u(+x)} ${u(+y)} 0 var(--color-cream)`;
}).join(", ");

export default function Page() {
  // A project can list its demo video before the file is added; the popup
  // only plays it once it is really in /public.
  const projects = PROJECTS.map((p) => ({
    ...p,
    hasVideo:
      !!p.video && existsSync(path.join(process.cwd(), "public", p.video)),
  }));

  return (
    <div className="flex flex-1 flex-col bg-cream text-forest">
      <main className="flex flex-col">
        {/* Like the home hero, this is an illustrated canvas that scales
            proportionally with the viewport (capped at 1440px). overflow-clip
            rather than overflow-hidden: a hidden box can still be scrolled by
            the browser (e.g. to a #hash target), which cuts off the title. */}
        <section className="@container relative mx-auto w-full max-w-[1440px] overflow-clip pb-[calc(80*100cqw/1440)]">
          {ART.map((a) => (
            // eslint-disable-next-line @next/next/no-img-element -- decorative SVG stretched to its design slot
            <img
              key={a.src}
              alt=""
              src={a.src}
              className="pointer-events-none absolute block max-w-none"
              style={{
                left: u(a.left),
                top: u(a.top),
                width: u(a.width),
                height: u(a.height),
              }}
            />
          ))}

          <h1
            className="relative text-center font-display leading-[1.03]"
            style={{
              paddingTop: u(100),
              marginBottom: u(67),
              fontSize: u(200),
              textShadow: TITLE_OUTLINE,
            }}
          >
            PROJECTS
          </h1>

          <div className="relative">
            <ProjectGallery projects={projects} />
          </div>
        </section>

        <section className="bg-sand">
          <div className="@container relative mx-auto aspect-[2/1] w-full max-w-[1440px]">
            <h2
              className="absolute font-display leading-normal"
              style={{
                left: u(47),
                top: u(65),
                fontSize: `max(${u(64)}, 20px)`,
              }}
            >
              Currently learning to use..
            </h2>
            <p
              className="absolute font-hand leading-none"
              style={{
                left: u(47),
                top: u(190),
                fontSize: `max(${u(80)}, 26px)`,
              }}
            >
              wouldn’t you like to know....
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
