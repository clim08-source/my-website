import Link from "next/link";

export default function ComingSoon({ section }: { section: string }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-cream px-4 py-24 text-center text-forest">
      <p className="font-display text-[clamp(20px,3vw,32px)] uppercase leading-none">
        {section}
      </p>
      <h1 className="animate-hi-in font-hand text-[clamp(72px,14vw,180px)] leading-[0.9]">
        coming soon!
      </h1>
      <Link
        href="/"
        className="mt-6 font-hand text-[32px] underline decoration-2 underline-offset-4 hover:opacity-70"
      >
        ← back home
      </Link>
    </main>
  );
}
