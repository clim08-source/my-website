/**
 * Bronze award medal with laurel wreath and red ribbon tails.
 * Scales with its width (set via className); text sizes use container units.
 */

/** Leaves for one laurel branch, laid along an arc around the medal centre. */
function laurelLeaves(side: "left" | "right") {
  const leaves: { x: number; y: number; rotate: number }[] = [];
  const cx = 50;
  const cy = 50;
  const r = 35;
  // SVG angles: 90° = bottom, 180° = left. Branch runs bottom → upper side.
  const start = side === "left" ? 108 : 72;
  const end = side === "left" ? 222 : -42;
  const steps = 7;
  for (let i = 0; i <= steps; i++) {
    const deg = start + ((end - start) * i) / steps;
    const rad = (deg * Math.PI) / 180;
    // Tangent direction along the branch (pointing towards its tip).
    const tangent = side === "left" ? deg + 90 : deg - 90;
    for (const offset of [-3.6, 3.6]) {
      const rr = r + offset;
      leaves.push({
        x: cx + rr * Math.cos(rad),
        y: cy + rr * Math.sin(rad),
        // leaves splay outward/inward from the stem
        rotate:
          tangent + 90 + (offset > 0 ? -35 : 35) * (side === "left" ? 1 : -1),
      });
    }
  }
  return leaves;
}

function Ribbon({ points, id }: { points: string; id: string }) {
  return (
    <g>
      <clipPath id={`clip-${id}`}>
        <polygon points={points} />
      </clipPath>
      <polygon points={points} fill="url(#ribbon-red)" />
      <g clipPath={`url(#clip-${id})`}>
        {/* gold pinstripe just inside the edge */}
        <polygon points={points} fill="none" stroke="#e8be6a" strokeWidth={5} />
        <polygon
          points={points}
          fill="none"
          stroke="url(#ribbon-red)"
          strokeWidth={2.6}
        />
      </g>
    </g>
  );
}

export default function BronzeMedal({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle: string;
  className?: string;
}) {
  const left = laurelLeaves("left");
  const right = laurelLeaves("right");

  return (
    // Outer element takes the caller's placement/size; inner is the positioned canvas.
    <div className={className}>
      <div
        role="img"
        aria-label={`${title} – ${subtitle}`}
        className="@container relative aspect-[100/150] w-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
      >
        {/* Ribbon tails, tucked behind the medal */}
        <svg
          viewBox="0 0 100 80"
          className="absolute inset-x-0 bottom-0 w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="ribbon-red" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#d3202b" />
              <stop offset="0.55" stopColor="#a50f18" />
              <stop offset="1" stopColor="#6e070c" />
            </linearGradient>
          </defs>
          <Ribbon id="l" points="30,0 54,0 34,78 23,66 10,78" />
          <Ribbon id="r" points="46,0 70,0 90,78 77,66 66,78" />
        </svg>

        {/* Medal */}
        <div
          className="absolute inset-x-0 top-0 aspect-square rounded-full p-[7%]"
          style={{
            background:
              "linear-gradient(145deg, #f1c39f 0%, #c47e52 35%, #9a5631 60%, #e3a982 100%)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,230,205,0.6), inset 0 -2px 4px rgba(90,40,15,0.4)",
          }}
        >
          <div
            className="relative size-full rounded-full"
            style={{
              background:
                "conic-gradient(from 20deg, #f4d2b5, #b9754e, #f6d8bf, #a9633d, #f0c8a6, #b06b44, #f6d6bb, #a65f39, #f4d2b5)",
              boxShadow:
                "inset 0 2px 3px rgba(90,40,15,0.45), 0 1px 0 rgba(255,235,215,0.7)",
            }}
          >
            {/* Embossed laurel wreath */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 size-full"
              aria-hidden
            >
              {[left, right].map((branch, b) => (
                <g key={b}>
                  {branch.map((leaf, i) => (
                    <ellipse
                      key={i}
                      cx={leaf.x}
                      cy={leaf.y}
                      rx={2.2}
                      ry={5}
                      transform={`rotate(${leaf.rotate} ${leaf.x} ${leaf.y})`}
                      fill="rgba(255,236,218,0.55)"
                      stroke="rgba(130,65,30,0.35)"
                      strokeWidth={0.5}
                    />
                  ))}
                </g>
              ))}
            </svg>

            {/* Engraved text */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-[3cqw] text-center font-display leading-none text-[#6b3517]"
              style={{ textShadow: "0 1px 0 rgba(255,235,215,0.75)" }}
            >
              <span className="text-[14cqw]">{title}</span>
              <span className="w-[38cqw] text-[8cqw] leading-[1.05]">
                {subtitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
