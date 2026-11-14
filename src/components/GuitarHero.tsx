"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * The hero is an illustrated 1440×900 canvas. Every measurement is expressed
 * in design pixels and converted to container-query units so the whole
 * composition scales proportionally with the viewport (capped at 1440px).
 */
const u = (px: number) => `calc(${px} * 100cqw / 1440)`;

type StringLine = {
  /** bounding box of the rotated line, in design px */
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  /** unrotated line length / thickness box */
  length: number;
  thickness: number;
  /** stroke image box relative to the thickness box */
  imgTop: number;
  imgHeight: number;
  src: string;
};

const line = (
  n: number,
  left: number,
  top: number,
  width: number,
  height: number,
  rotate: number,
  length: number,
  thickness = 0,
  imgTop = -4,
  imgHeight = 4,
): StringLine => ({
  left,
  top,
  width,
  height,
  rotate,
  length,
  thickness,
  imgTop,
  imgHeight,
  src: `/home/string-${n}.svg`,
});

/** The six strings running across the body and neck (playable). */
const STRINGS: StringLine[] = [
  line(1, 262, 464.98, 753.999, 17.023, -1.29, 754.192),
  line(2, 261, 481, 755, 18.023, -1.37, 755.215),
  line(3, 261, 502, 758, 17.023, -1.29, 758.191),
  line(4, 261, 524.02, 761, 15.003, -1.13, 761.148),
  line(5, 261, 550.02, 758, 5.999, -0.45, 758.024),
  line(6, 265, 574, 754, 5.023, -0.38, 754.017),
];

/** Strings fanning out over the headstock to the tuning pegs (decorative). */
const HEADSTOCK_STRINGS: StringLine[] = [
  line(7, 1016, 573, 57, 42, 36.38, 70.803),
  line(8, 1017.5, 545.9, 106.449, 87.532, 39.26, 135.795, 2.062, -2, 6.062),
  line(9, 1020.5, 519.82, 162.468, 137.722, 40.19, 210.813, 2.205, -2, 6.205),
  line(10, 1015, 427, 54, 38, -35.13, 66.03),
  line(11, 1016, 405, 123, 76, -31.71, 144.586),
  line(12, 1019, 388, 171, 114, -33.69, 205.516),
];

/** CGDGBD tuning (C2 G2 D3 G3 B3 D4), top string to bottom string (Hz). */
const NOTES = [65.41, 98.0, 146.83, 196.0, 246.94, 293.66];
const NOTE_NAMES = ["C", "G", "D", "G", "B", "high D"];

/**
 * Pages revealed on each string, top to bottom. `at` is how far along the
 * string (design px from its left end) the label sits — staggered so the
 * labels step diagonally down the neck. The bottom string has no page.
 */
const STRING_LINKS: ({ label: string; href: string; at: number } | null)[] = [
  { label: "projects", href: "/projects", at: 470 },
  { label: "experience", href: "/experience", at: 530 },
  { label: "about me", href: "/about", at: 590 },
  { label: "blog posts", href: "/blog", at: 650 },
  { label: "resume", href: "/resume", at: 710 },
  null,
];

const NAME = "CAITLIN";

/** Karplus–Strong plucked-string synthesis. */
function pluck(ctx: AudioContext, frequency: number) {
  const sampleRate = ctx.sampleRate;
  const period = Math.round(sampleRate / frequency);
  const length = Math.round(sampleRate * 2.5);
  const buffer = ctx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  const ring = new Float32Array(period);
  for (let i = 0; i < period; i++) ring[i] = Math.random() * 2 - 1;

  let idx = 0;
  for (let i = 0; i < length; i++) {
    const next = (idx + 1) % period;
    const sample = ring[idx];
    ring[idx] = 0.996 * 0.5 * (ring[idx] + ring[next]);
    data[i] = sample;
    idx = next;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const gain = ctx.createGain();
  gain.gain.value = 0.35;
  source.connect(gain).connect(ctx.destination);
  source.start();
}

function LineArt({
  s,
  children,
}: {
  s: StringLine;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute flex items-center justify-center [&:has(:hover,:focus-visible)]:z-10"
      style={{
        left: u(s.left),
        top: u(s.top),
        width: u(s.width),
        height: u(s.height),
      }}
    >
      <div className="flex-none" style={{ rotate: `${s.rotate}deg` }}>
        {children}
      </div>
    </div>
  );
}

function StrokeImage({ s }: { s: StringLine }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny decorative SVG stroke, stretched to its slot
    <img
      alt=""
      src={s.src}
      className="absolute left-0 block max-w-none pointer-events-none"
      style={{ top: u(s.imgTop), height: u(s.imgHeight), width: "100%" }}
    />
  );
}

export default function GuitarHero() {
  const audioRef = useRef<AudioContext | null>(null);
  const [plucks, setPlucks] = useState<number[]>(() => STRINGS.map(() => 0));

  // Browsers only allow audio after a user gesture (click, tap, key press),
  // and hovering doesn't count. Unlock the audio context on the first one.
  useEffect(() => {
    const unlock = () => {
      try {
        audioRef.current ??= new AudioContext();
        if (audioRef.current.state === "suspended") {
          void audioRef.current.resume();
        }
      } catch {
        // Audio unavailable.
      }
    };
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, unlock, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, unlock));
  }, []);

  const play = (i: number) => {
    setPlucks((p) => p.map((v, j) => (j === i ? v + 1 : v)));
    const ctx = audioRef.current;
    if (ctx?.state === "running") {
      try {
        pluck(ctx, NOTES[i]);
      } catch {
        // Audio failed — the visual pluck still plays.
      }
    }
  };

  return (
    <section
      aria-label="Introduction"
      className="@container relative mx-auto aspect-[1440/900] w-full max-w-[1440px] text-forest"
    >
      <div
        className="absolute"
        style={{ left: u(76), top: u(59), width: u(1287), height: u(894) }}
      >
        <Image
          src="/home/guitar.png"
          alt="Hand-drawn acoustic guitar"
          fill
          priority
          sizes="(min-width: 1440px) 1287px, 90vw"
          className="pointer-events-none object-cover"
        />
      </div>

      <h1>
        <span
          className="animate-hi-in absolute font-hand leading-[1.03]"
          style={{ left: u(337), top: u(59), width: u(239), fontSize: u(80) }}
        >
          Hi, I’m
        </span>{" "}
        <span
          className="absolute whitespace-nowrap font-display leading-[1.03]"
          style={{ left: u(562), top: u(4), width: u(725), fontSize: u(200) }}
        >
          <span className="sr-only">{NAME}</span>
          {NAME.split("").map((letter, i) => (
            <span
              key={i}
              aria-hidden
              className="animate-letter-drop inline-block"
              style={{ animationDelay: `${300 + i * 90}ms` }}
            >
              {letter}
            </span>
          ))}
        </span>
      </h1>

      <div
        className="absolute flex flex-wrap justify-between gap-x-4"
        style={{
          left: u(129),
          right: u(199),
          top: u(218),
          fontSize: `max(${u(19)}, 10px)`,
        }}
      >
        <p>Systems Design Engineering @ UWaterloo</p>
        <p>Seeking Summer 2027 Co-ops!</p>
      </div>

      {STRINGS.map((s, i) => {
        const link = STRING_LINKS[i];
        const content = (
          <>
            {/* generous invisible hit area around the thin string */}
            <span
              aria-hidden
              className="absolute inset-x-0"
              style={{ top: u(-12), height: u(16) }}
            />
            <span
              key={plucks[i]}
              aria-hidden
              className={`absolute inset-0 block ${
                plucks[i] > 0 ? "animate-string-vibrate" : ""
              }`}
            >
              <StrokeImage s={s} />
            </span>
            {link && (
              <span
                aria-hidden
                className="pointer-events-none absolute translate-y-1 whitespace-nowrap rounded-full border-forest bg-cream font-hand leading-none text-forest opacity-0 shadow-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                style={{
                  left: u(link.at),
                  bottom: u(6),
                  fontSize: u(28),
                  padding: `${u(4)} ${u(12)} ${u(6)}`,
                  borderWidth: u(2),
                }}
              >
                {link.label}
              </span>
            )}
          </>
        );
        const shared = {
          onPointerEnter: () => play(i),
          onFocus: () => play(i),
          className: "group relative block outline-none",
          style: { width: u(s.length), height: u(s.thickness) },
        };
        return (
          <LineArt key={s.src} s={s}>
            {link ? (
              <Link href={link.href} aria-label={link.label} {...shared}>
                {content}
              </Link>
            ) : (
              <span
                aria-label={`${NOTE_NAMES[i]} string`}
                role="img"
                {...shared}
              >
                {content}
              </span>
            )}
          </LineArt>
        );
      })}

      {HEADSTOCK_STRINGS.map((s) => (
        <LineArt key={s.src} s={s}>
          <div
            className="relative"
            style={{ width: u(s.length), height: u(s.thickness) }}
          >
            <StrokeImage s={s} />
          </div>
        </LineArt>
      ))}

      <p
        className="absolute whitespace-nowrap font-hand"
        style={{ left: u(638), top: u(759), fontSize: u(50) }}
      >
        Pluck one - turn your sound up!
      </p>

      <div
        className="absolute bottom-0 h-px bg-rule"
        style={{ left: u(64), right: u(64) }}
      />
    </section>
  );
}
