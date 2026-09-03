import type { CSSProperties } from "react";
import { CONTACT, IMG, MARQUEE } from "../data";
import { IcArrowDown, IcArrowUpRight, IcSpark, Scramble } from "../lib";

/* ------------------------------------------------------------------ */
/*  Marquee band (reused in footer-adjacent sections)                  */
/* ------------------------------------------------------------------ */
export function Marquee({
  words = MARQUEE,
  className = "",
  fast = false,
}: {
  words?: string[];
  className?: string;
  fast?: boolean;
}) {
  const half = (ariaHidden: boolean) => (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-8 pr-8"
    >
      {words.map((w, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="whitespace-nowrap font-display text-2xl font-bold uppercase tracking-wide md:text-3xl">
            {w}
          </span>
          <IcSpark className="h-5 w-5 shrink-0 text-flame" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex w-max ${fast ? "animate-marquee-fast" : "animate-marquee"}`}>
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Rotating availability badge                                        */
/* ------------------------------------------------------------------ */
function OrbitBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href="#/contact"
      data-hot
      aria-label="Open for projects — go to contact"
      className={`group relative block h-36 w-36 md:h-40 md:w-40 ${className}`}
    >
      <div className="animate-spin-slower absolute inset-0">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <path
              id="badge-circle"
              d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0"
            />
          </defs>
          <text className="fill-ink font-mono text-[8.2px] uppercase tracking-[0.24em]">
            <textPath href="#badge-circle">
              Open for projects • Graphic design • Digital media •
            </textPath>
          </text>
        </svg>
      </div>
      <span className="absolute inset-0 flex items-center justify-center">
        <IcSpark className="h-9 w-9 text-flame transition-transform duration-500 group-hover:scale-125 group-hover:rotate-45" />
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Polaroid                                                           */
/* ------------------------------------------------------------------ */
function Polaroid({
  src,
  alt,
  caption,
  className = "",
  tilt = 0,
  floaty = false,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  tilt?: number;
  floaty?: boolean;
}) {
  return (
    <figure
      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
      className={`border border-ink/15 bg-white p-2 pb-3 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.7)] ${
        floaty ? "animate-floaty" : ""
      } ${className}`}
    >
      <div className="overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="eager"
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <figcaption className="mt-2 flex items-center justify-between px-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/60">
        {caption}
        <IcSpark className="h-2.5 w-2.5 text-flame" />
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export function Hero() {
  return (
    <header id="home" className="blueprint relative overflow-hidden">
      {/* vertical side note */}
      <p
        aria-hidden
        className="absolute left-5 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.42em] text-mute [writing-mode:vertical-rl] xl:block"
      >
        Building brands through visual storytelling — Folio 2026
      </p>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* top meta strip */}
        <div className="flex items-center justify-between border-b border-ink/10 pb-4 pt-24 font-mono text-[10.5px] uppercase tracking-[0.22em] text-mute md:pt-28">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-dot absolute h-2 w-2 rounded-full bg-flame" />
              <span className="h-2 w-2 rounded-full bg-flame" />
            </span>
            Available for projects
          </span>
          <span className="hidden sm:block">Creative Graphics Designer</span>
          <span className="hidden md:block">{CONTACT.coords}</span>
        </div>

        <div className="grid gap-10 pt-10 md:pt-14 lg:grid-cols-12 lg:gap-6">
          {/* name block */}
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-flame">
              ( Olowomakan Esther Bukola )
            </p>
            <h1 className="mt-4 font-display font-extrabold uppercase leading-[0.86] tracking-[-0.02em]">
              <span className="block text-[clamp(3.6rem,12.5vw,10rem)]">
                <Scramble text="ESTHER" duration={850} />
              </span>
              <span className="flex items-center gap-[0.18em] text-[clamp(3.6rem,12.5vw,10rem)]">
                <Scramble text="BUKOLA" delay={350} duration={950} />
                <IcSpark className="animate-spin-slower h-[0.42em] w-[0.42em] shrink-0 self-start text-flame" />
              </span>
            </h1>

            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ink/75 md:text-base">
              I design campaigns, publications and digital content for
              organizations that want to be{" "}
              <em className="font-display font-bold not-italic text-ink">
                seen, understood and remembered
              </em>{" "}
              — blending visual storytelling with strategic communication.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#/work"
                className="group flex items-center gap-3 border border-ink px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-ink hover:text-paper"
              >
                Selected work
                <IcArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <a
                href="#/contact"
                className="group flex items-center gap-3 border border-ink bg-flame px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-all duration-300 hover:bg-ink hover:text-paper"
              >
                Start a project
                <IcArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* polaroid cluster */}
          <div className="relative hidden min-h-[460px] lg:col-span-5 lg:block">
            <Polaroid
              src={IMG.flyer}
              alt="Shapers of Nation summit flyer design"
              caption="Fig.01 — Event flyer"
              tilt={-7}
              className="absolute left-0 top-4 w-[46%] rotate-[-7deg]"
            />
            <Polaroid
              src={IMG.nugget}
              alt="Purity Is Power social media quote card"
              caption="Fig.02 — Social nugget"
              tilt={5}
              floaty
              className="absolute right-0 top-24 w-[46%] rotate-[5deg]"
            />
            <OrbitBadge className="absolute bottom-0 left-6" />
            <p className="absolute bottom-3 right-2 max-w-[180px] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-mute">
              Selected pieces from live campaigns, 2024 — 25
            </p>
          </div>
        </div>

        {/* scroll cue */}
        <div className="mt-12 hidden items-center gap-3 md:flex lg:mt-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute">
            Scroll
          </span>
          <span className="relative h-10 w-px overflow-hidden bg-ink/15">
            <span className="animate-scroll-line absolute inset-0 bg-flame" />
          </span>
        </div>

        {/* discipline meta row */}
        <div className="mt-8 grid grid-cols-2 gap-y-2 border-t border-ink/10 py-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55 md:grid-cols-4">
          <span className="flex items-center gap-2">
            <IcSpark className="h-3 w-3 text-flame" /> Graphic design
          </span>
          <span className="flex items-center gap-2">
            <IcSpark className="h-3 w-3 text-flame" /> Digital media
          </span>
          <span className="flex items-center gap-2">
            <IcSpark className="h-3 w-3 text-flame" /> Brand storytelling
          </span>
          <span className="flex items-center gap-2">
            <IcSpark className="h-3 w-3 text-flame" /> Print production
          </span>
        </div>
      </div>

      {/* marquee */}
      <div className="border-y border-ink bg-ink py-4 text-paper">
        <Marquee />
      </div>
    </header>
  );
}
