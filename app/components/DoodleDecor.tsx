"use client";

interface DoodleDecorProps {
  variant?: "light" | "dark";
}

// ── SVG Motifs ──────────────────────────────────────────────

function LeafRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" fill="none" className={className}>
      <path d="M60 0C40 40 10 80 15 130C20 180 50 200 60 200C70 200 100 180 105 130C110 80 80 40 60 0Z" fill="currentColor" />
      <path d="M60 30C48 55 35 85 38 125C41 160 55 180 60 180" stroke="currentColor" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

function LeafLeft({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 200" fill="none" className={className}>
      <path d="M60 0C80 40 110 80 105 130C100 180 70 200 60 200C50 200 20 180 15 130C10 80 40 40 60 0Z" fill="currentColor" />
      <path d="M60 30C72 55 85 85 82 125C79 160 65 180 60 180" stroke="currentColor" strokeWidth="0.5" fill="none" />
    </svg>
  );
}

function SmallLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 90" fill="none" className={className}>
      <path d="M30 0C15 20 5 40 8 55C11 70 22 85 30 90C38 85 49 70 52 55C55 40 45 20 30 0Z" fill="currentColor" />
      <path d="M30 15C22 28 16 42 18 52C20 62 26 70 30 72" stroke="currentColor" strokeWidth="0.4" fill="none" />
    </svg>
  );
}

function Flower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" className={className}>
      <circle cx="50" cy="50" r="6" fill="currentColor" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={i}
          cx={50 + 18 * Math.cos((angle * Math.PI) / 180)}
          cy={50 + 18 * Math.sin((angle * Math.PI) / 180)}
          rx="12" ry="8"
          transform={`rotate(${angle} ${50 + 18 * Math.cos((angle * Math.PI) / 180)} ${50 + 18 * Math.sin((angle * Math.PI) / 180)})`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

function SmallFlower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <ellipse
          key={i}
          cx={20 + 7 * Math.cos((angle * Math.PI) / 180)}
          cy={20 + 7 * Math.sin((angle * Math.PI) / 180)}
          rx="5" ry="3.5"
          transform={`rotate(${angle} ${20 + 7 * Math.cos((angle * Math.PI) / 180)} ${20 + 7 * Math.sin((angle * Math.PI) / 180)})`}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

function Vine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 60" fill="none" className={className}>
      <path d="M0 40C20 10 40 50 60 25C80 0 100 45 120 20C140 -5 160 35 180 15C190 5 200 25 200 25" stroke="currentColor" strokeWidth="0.7" fill="none" />
      <circle cx="30" cy="32" r="2.5" fill="currentColor" />
      <circle cx="80" cy="22" r="2" fill="currentColor" />
      <circle cx="130" cy="28" r="3" fill="currentColor" />
      <circle cx="170" cy="18" r="2" fill="currentColor" />
    </svg>
  );
}

function DotCluster({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className}>
      <circle cx="20" cy="15" r="2.5" fill="currentColor" />
      <circle cx="40" cy="10" r="1.8" fill="currentColor" />
      <circle cx="30" cy="35" r="3" fill="currentColor" />
      <circle cx="15" cy="45" r="2" fill="currentColor" />
      <circle cx="45" cy="40" r="2.2" fill="currentColor" />
      <circle cx="30" cy="55" r="1.5" fill="currentColor" />
    </svg>
  );
}

function Bud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 60" fill="none" className={className}>
      <path d="M20 60C20 40 10 25 10 15C10 5 20 0 20 0C20 0 30 5 30 15C30 25 20 40 20 60Z" fill="currentColor" />
      <path d="M20 20C20 30 15 40 15 50" stroke="currentColor" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

function StemLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 100" fill="none" className={className}>
      <path d="M15 0C15 20 14 40 16 60C18 80 15 95 15 100" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <path d="M15 35C8 30 2 32 5 38C8 44 12 42 15 35Z" fill="currentColor" />
      <path d="M16 55C23 50 28 52 25 58C22 64 17 62 16 55Z" fill="currentColor" />
    </svg>
  );
}

// ── Main Decor Component ────────────────────────────────────

export default function DoodleDecor({ variant = "light" }: DoodleDecorProps) {
  const isDark = variant === "dark";

  // Color palette for LIGHT backgrounds (white / #FAFAF9)
  // Using emerald greens + warm accents (blue, amber, orange)
  const lightColors = [
    "text-emerald-500",
    "text-emerald-600",
    "text-emerald-400",
    "text-sky-400",
    "text-sky-500",
    "text-amber-400",
    "text-orange-400",
    "text-teal-500",
  ];

  // Color palette for DARK backgrounds (emerald-900)
  // White + pale tints that pop against dark green
  const darkColors = [
    "text-white",
    "text-emerald-200",
    "text-sky-200",
    "text-amber-200",
    "text-orange-200",
    "text-teal-200",
    "text-emerald-300",
    "text-sky-300",
  ];

  const colors = isDark ? darkColors : lightColors;

  // Opacity: subdued and light — 8-18% range
  const opacities = [
    "opacity-[0.12]",
    "opacity-[0.10]",
    "opacity-[0.14]",
    "opacity-[0.18]",
    "opacity-[0.10]",
    "opacity-[0.15]",
    "opacity-[0.08]",
    "opacity-[0.13]",
    "opacity-[0.16]",
  ];

  // Shorthand to pick from arrays
  const c = (i: number) => colors[i % colors.length];
  const o = (i: number) => opacities[i % opacities.length];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ── TOP EDGE ── */}
      <div className={`absolute -top-4 left-8 md:left-16 w-16 md:w-20 ${o(0)} ${c(0)}`}>
        <SmallLeaf />
      </div>
      <div className={`absolute -top-2 left-[30%] w-12 md:w-14 ${o(3)} ${c(3)}`}>
        <Flower />
      </div>
      <div className={`absolute top-4 right-10 md:right-20 w-14 md:w-16 ${o(1)} ${c(1)}`}>
        <Flower />
      </div>
      <div className={`absolute top-0 right-0 md:right-4 w-16 md:w-20 ${o(2)} -rotate-12 ${c(2)}`}>
        <SmallLeaf />
      </div>
      <div className={`absolute top-20 right-[20%] w-10 md:w-12 ${o(5)} ${c(5)}`}>
        <Bud />
      </div>

      {/* ── UPPER MIDDLE ── */}
      <div className={`absolute top-[20%] left-4 md:left-8 w-12 md:w-16 ${o(4)} rotate-12 ${c(4)}`}>
        <SmallLeaf />
      </div>
      <div className={`absolute top-[15%] left-[45%] w-8 md:w-10 ${o(7)} ${c(7)}`}>
        <SmallFlower />
      </div>
      <div className={`absolute top-[22%] right-6 md:right-12 w-14 md:w-18 ${o(6)} -rotate-20 ${c(6)}`}>
        <SmallLeaf />
      </div>
      <div className={`absolute top-[28%] right-[35%] w-10 md:w-12 ${o(2)} ${c(0)}`}>
        <DotCluster />
      </div>

      {/* ── SIDE VINES ── */}
      <div className={`absolute top-[30%] -left-2 md:left-0 w-44 md:w-56 ${o(3)} ${c(3)}`}>
        <Vine />
      </div>
      <div className={`absolute top-[65%] -right-2 md:right-0 w-40 md:w-52 ${o(5)} scale-x-[-1] ${c(5)}`}>
        <Vine />
      </div>

      {/* ── MIDDLE SCATTER ── */}
      <div className={`absolute top-[35%] left-[25%] w-12 md:w-14 ${o(1)} ${c(1)}`}>
        <StemLeaf />
      </div>
      <div className={`absolute top-[40%] left-[55%] w-10 md:w-12 ${o(6)} rotate-45 ${c(6)}`}>
        <SmallLeaf />
      </div>
      <div className={`absolute top-[38%] right-[15%] w-12 md:w-16 ${o(4)} ${c(4)}`}>
        <Flower />
      </div>
      <div className={`absolute top-[45%] left-[10%] w-10 md:w-12 ${o(7)} ${c(7)}`}>
        <DotCluster />
      </div>
      <div className={`absolute top-[50%] left-[40%] w-8 md:w-10 ${o(2)} ${c(2)}`}>
        <Bud />
      </div>

      {/* ── LOWER MIDDLE ── */}
      <div className={`absolute top-[55%] right-8 md:right-16 w-16 md:w-20 ${o(0)} -rotate-15 ${c(0)}`}>
        <SmallLeaf />
      </div>
      <div className={`absolute top-[60%] left-[60%] w-10 md:w-12 ${o(5)} ${c(5)}`}>
        <SmallFlower />
      </div>
      <div className={`absolute top-[65%] left-[20%] w-14 md:w-18 ${o(3)} ${c(3)}`}>
        <Flower />
      </div>
      <div className={`absolute top-[70%] right-[25%] w-12 md:w-14 ${o(1)} ${c(1)}`}>
        <StemLeaf />
      </div>

      {/* ── BOTTOM EDGE ── */}
      <div className={`absolute bottom-16 left-6 md:left-16 w-14 md:w-18 ${o(4)} ${c(4)}`}>
        <SmallFlower />
      </div>
      <div className={`absolute bottom-8 left-[30%] w-10 md:w-12 ${o(7)} ${c(7)}`}>
        <Bud />
      </div>
      <div className={`absolute -bottom-6 left-[50%] w-12 md:w-14 ${o(6)} ${c(6)}`}>
        <DotCluster />
      </div>
      <div className={`absolute bottom-12 right-12 md:right-20 w-16 md:w-20 ${o(2)} ${c(0)}`}>
        <Flower />
      </div>
      <div className={`absolute -bottom-4 right-4 md:right-10 w-18 md:w-24 ${o(0)} rotate-6 ${c(2)}`}>
        <SmallLeaf />
      </div>
      <div className={`absolute bottom-4 left-[65%] w-8 md:w-10 ${o(5)} -rotate-25 ${c(1)}`}>
        <SmallLeaf />
      </div>

      {/* ── EXTRA CORNER ACCENTS ── */}
      <div className={`absolute bottom-[30%] left-2 md:left-6 w-10 md:w-12 ${o(8)} rotate-30 ${c(7)}`}>
        <SmallLeaf />
      </div>
      <div className={`absolute bottom-[20%] right-4 md:right-8 w-10 md:w-12 ${o(3)} ${c(3)}`}>
        <Bud />
      </div>
    </div>
  );
}
