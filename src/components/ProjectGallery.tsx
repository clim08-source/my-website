"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import BronzeMedal from "@/components/BronzeMedal";
import type { Project } from "@/data/projects";

/** A project plus whether its demo video file is actually there yet. */
export type GalleryProject = Project & { hasVideo: boolean };

/** Frame colours, left to right, top to bottom. */
const FRAME_COLORS = [
  "#c4582e",
  "#f1a344",
  "#ffcb3d",
  "#d97757",
  "#f1a344",
  "#c4582e",
];

/** Frame design px (619-wide frame) → units relative to the frame's width. */
const f = (px: number) => `calc(${px} * 100cqw / 619)`;

/**
 * Which popup is open lives in the URL hash (/projects#homebuddy), so other
 * pages can link straight to a project and the link can be shared.
 */
const subscribeToHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const getHash = () => decodeURIComponent(window.location.hash.slice(1));
const setHash = (id: string | null) => {
  const { pathname, search } = window.location;
  window.history.replaceState(
    null,
    "",
    pathname + search + (id ? `#${id}` : ""),
  );
  window.dispatchEvent(new Event("hashchange"));
};

export default function ProjectGallery({
  projects,
}: {
  projects: GalleryProject[];
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const hash = useSyncExternalStore(subscribeToHash, getHash, () => "");
  const found = projects.findIndex((p) => p.slug === hash);
  const open = found !== -1 && found < FRAME_COLORS.length ? found : null;
  const setOpen = (i: number | null) =>
    setHash(i === null ? null : projects[i].slug);
  const project = open !== null ? projects[open] : undefined;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
    }
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      {/* 2 columns on the 1440px canvas (frames at x=35 and x=769, rows at
          y=373, 880 and 1431); a single column on phones. */}
      <div className="grid grid-cols-1 gap-[18px] px-4 md:grid-cols-2 md:gap-x-[calc(115*100cqw/1440)] md:gap-y-[calc(67*100cqw/1440)] md:pr-[calc(52*100cqw/1440)] md:pl-[calc(35*100cqw/1440)]">
        {FRAME_COLORS.map((color, i) => {
          const p = projects[i];
          const frame = (
            <>
              <span
                className="absolute inset-0"
                style={{ backgroundColor: color, borderRadius: f(20) }}
              />
              <span
                className="absolute flex flex-col overflow-hidden bg-white"
                style={{
                  left: f(42),
                  top: f(45),
                  width: f(530),
                  height: f(350),
                  borderRadius: f(10),
                }}
              >
                {p ? (
                  <>
                    <span className="relative block min-h-0 flex-1">
                      <Image
                        src={p.image}
                        alt={p.alt}
                        fill
                        sizes="(min-width: 1440px) 530px, (min-width: 768px) 37vw, 80vw"
                        className={
                          p.fit === "contain"
                            ? "object-contain"
                            : "object-cover object-top"
                        }
                      />
                      {p.award && (
                        <BronzeMedal
                          title={p.award.title}
                          subtitle={p.award.event}
                          className="absolute top-[4%] right-[3%] w-[clamp(48px,19%,100px)]"
                        />
                      )}
                    </span>
                    <span
                      className="block"
                      style={{ padding: `${f(12)} ${f(18)} ${f(14)}` }}
                    >
                      <span
                        className="block font-display leading-tight text-forest"
                        style={{ fontSize: `max(${f(28)}, 16px)` }}
                      >
                        {p.title}
                      </span>
                      <span
                        className="mt-[0.2em] line-clamp-2 block leading-snug text-black"
                        style={{ fontSize: `max(${f(15)}, 11px)` }}
                      >
                        {p.summary}
                      </span>
                    </span>
                  </>
                ) : (
                  <span
                    className="flex h-full items-center justify-center text-center font-hand leading-none text-forest"
                    style={{ fontSize: f(64) }}
                  >
                    more in the works!
                  </span>
                )}
              </span>
            </>
          );
          const frameClass =
            "@container relative block aspect-[619/440] text-left md:nth-[n+5]:mt-[calc(44*100cqw/1440)]";
          // Frames without a project yet are just a sign, not a button.
          if (!p) {
            return (
              <div key={i} className={frameClass}>
                {frame}
              </div>
            );
          }
          return (
            <button
              key={p.slug}
              type="button"
              aria-label={`Open ${p.title}`}
              aria-haspopup="dialog"
              onClick={() => setOpen(i)}
              className={`${frameClass} cursor-pointer outline-offset-4 outline-forest transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.01] focus-visible:outline-2`}
            >
              {frame}
            </button>
          );
        })}
      </div>

      {/* The dialog itself is the full-screen scroll area; clicking it
          (anywhere outside the popup) closes it, as does Escape. */}
      <dialog
        ref={dialogRef}
        aria-label={project?.title}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-y-auto bg-transparent px-4 py-8 backdrop:bg-black/50 md:py-12"
      >
        {open !== null && project && (
          <div
            className="animate-popup-in relative mx-auto flex w-full max-w-[1191px] rounded-[20px]"
            style={{
              backgroundColor: FRAME_COLORS[open],
              // 32 / 37 / 44 / 37 design px on a 1191px-wide popup
              padding: "2.69% 3.11% 3.69%",
            }}
          >
            <div className="min-w-0 flex-1 rounded-[10px] bg-sand">
              <ProjectDetails project={project} />
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute top-[max(3.2%,14px)] right-[max(3.8%,14px)] flex size-10 cursor-pointer items-center justify-center rounded-full text-[28px] leading-none text-black/70 transition-colors hover:bg-black/10"
            >
              <span aria-hidden>×</span>
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}

function ProjectDetails({ project: p }: { project: GalleryProject }) {
  return (
    <article className="px-5 pt-14 pb-8 text-black md:px-14 md:pt-12 md:pb-14">
      <h2 className="pr-10 font-display text-[clamp(32px,5vw,64px)] leading-none text-forest">
        {p.title}
      </h2>
      {p.award && (
        <p className="mt-2 font-hand text-[clamp(26px,3vw,36px)] leading-none text-black">
          {p.award.title} — {p.award.event}
        </p>
      )}

      <div
        className={`relative mt-6 aspect-video overflow-hidden rounded-[10px] md:mt-8 ${
          p.video ? "bg-black" : "bg-white"
        }`}
      >
        {p.video && p.hasVideo ? (
          <video
            src={p.video}
            poster={p.image}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <>
            <Image
              src={p.image}
              alt={p.alt}
              fill
              sizes="(min-width: 1191px) 1005px, 90vw"
              className={`${
                p.fit === "contain"
                  ? "object-contain"
                  : "object-cover object-top"
              } ${p.video ? "opacity-40" : ""}`}
            />
            {p.video && (
              <p className="absolute inset-0 flex items-center justify-center font-hand text-[clamp(28px,5vw,56px)] text-white">
                demo video coming soon!
              </p>
            )}
          </>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 md:mt-8">
        <ul aria-label="Built with" className="flex flex-wrap gap-2.5">
          {p.tech.map((t) => (
            <li
              key={t.name}
              title={t.name}
              className="flex size-11 items-center justify-center rounded-[24%] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_3px_8px_rgba(0,0,0,0.08)] ring-1 ring-black/5"
            >
              <Image
                src={t.icon}
                alt={t.name}
                width={26}
                height={26}
                className="size-[26px] object-contain"
                unoptimized
              />
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {p.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-hand text-[30px] leading-none text-forest underline decoration-2 underline-offset-4 hover:opacity-70"
              >
                {l.label} →
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 max-w-[75ch] space-y-4 text-[17px] leading-relaxed md:mt-8">
        {p.description.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>

      {p.figures && (
        <div className="mt-8 grid items-start gap-5 md:mt-10 md:grid-cols-2">
          {p.figures.map((fig) => (
            <Image
              key={fig.src}
              src={fig.src}
              alt={fig.alt}
              width={fig.width}
              height={fig.height}
              sizes="(min-width: 1191px) 492px, (min-width: 768px) 42vw, 90vw"
              className="h-auto w-full rounded-[10px] bg-white"
            />
          ))}
        </div>
      )}
    </article>
  );
}
