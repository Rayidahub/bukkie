import type { ReactNode } from "react";
import { CONTACT, IMG, MARQUEE, ORGS, yearsOfExperience } from "../data";
import {
  GoldUnderline,
  IcArrowDown,
  IcArrowUpRight,
  IcPin,
  IcSpark,
  MaskLines,
  Reveal,
} from "../lib";

/* ------------------------------------------------------------------ */
/*  Category ticker (gold band)                                        */
/* ------------------------------------------------------------------ */
export function Ticker({ words = MARQUEE }: { words?: string[] }) {
  const half = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-xl font-bold uppercase tracking-wide text-pine md:text-2xl">
            {w}
          </span>
          <IcSpark className="h-4 w-4 shrink-0 text-pine/60" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="ticker overflow-hidden border-y border-pine/15 bg-gold py-3.5">
      <div className="ticker-track flex w-max">
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating tag                                                       */
/* ------------------------------------------------------------------ */
function FloatingTag({
  children,
  className = "",
  late = false,
}: {
  children: ReactNode;
  className?: string;
  late?: boolean;
}) {
  return (
    <span
      className={`${late ? "animate-float-late" : "animate-float"} absolute z-10 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-[13px] font-bold text-forest shadow-soft ${className}`}
    >
      <IcSpark className="h-3.5 w-3.5 text-gold" />
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */
export function Hero() {
  const years = yearsOfExperience();

  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden bg-white">
      {/* ambient background shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-sage/60 blur-2xl"
      />
      <div aria-hidden className="dots-bg pointer-events-none absolute left-0 top-24 h-48 w-48 opacity-70" />

      <div className="container-x grid items-center gap-14 py-14 md:py-20 lg:grid-cols-12 lg:gap-8">
        {/* -------- left : copy -------- */}
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">Graphics Designer & Digital Media Specialist</p>
          </Reveal>

          <h1 className="mt-6 font-display text-[clamp(2.5rem,5.6vw,4.1rem)] font-black leading-[1.04] tracking-[-0.015em] text-ink">
            <MaskLines
              lines={[
                <>Hello, I'm Esther —</>,
                <>
                  I build brands through{" "}
                </>,
                <>
                  <span className="relative inline-block italic text-forest">
                    visual storytelling.
                    <GoldUnderline />
                  </span>
                </>,
              ]}
            />
          </h1>

          <Reveal delay={250}>
            <p className="mt-6 max-w-lg text-[16.5px] leading-[1.7] text-slate">
              I help organizations in Lagos and beyond communicate their ideas,
              promote their activities, and connect with their audiences —
              through campaigns, publications, branding, and print that
              actually ships.
            </p>
          </Reveal>

          <Reveal delay={350}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#projects" className="btn btn-forest">
                View My Work
                <IcArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
              <a href="#contact" className="btn btn-outline">
                Let's Talk
                <IcArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={450}>
            <div className="mt-10 border-t border-line pt-6">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-slate/80">
                Designing for teams at
              </p>
              <ul className="mt-3.5 flex flex-wrap gap-2.5">
                {ORGS.map((o) => (
                  <li key={o} className="chip cursor-default">
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* -------- right : portrait composition -------- */}
        <div className="lg:col-span-6">
          <Reveal delay={200} y={40}>
            <div className="relative mx-auto w-[min(88%,430px)]">
              {/* gold circle backdrop */}
              <div
                aria-hidden
                className="absolute -right-5 -top-5 h-full w-full rounded-full bg-gold md:-right-8 md:-top-8"
              />
              {/* rotating dashed ring */}
              <div
                aria-hidden
                className="animate-spin-slower absolute -inset-5 rounded-full border-2 border-dashed border-forest/30"
              />
              {/* dot grid */}
              <div aria-hidden className="dots-bg absolute -bottom-10 -left-12 h-36 w-36" />

              {/* portrait */}
              <div className="relative aspect-square overflow-hidden rounded-full shadow-lift ring-8 ring-white">
            <img
              src={IMG.portrait}
              alt="Portrait of Olowomakan Esther Bukola"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                const el = e.currentTarget;
                if (!el.dataset.fb) {
                  el.dataset.fb = "1";
                  el.src = IMG.portraitRemote;
                }
              }}
            />              </div>

              {/* floating skill tags */}
              <FloatingTag className="-left-6 top-[12%] md:-left-14">
                Social Media Design
              </FloatingTag>
              <FloatingTag late className="-right-2 top-[46%] md:-right-10">
                Brand & Print
              </FloatingTag>

              {/* experience badge */}
              <span className="absolute -top-2 right-[6%] z-10 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-forest text-center shadow-lift">
                <span className="font-display text-2xl font-black leading-none text-gold">
                  {years}+
                </span>
                <span className="mt-0.5 px-1 text-[8.5px] font-bold uppercase tracking-[0.12em] text-white/80">
                  Years Exp.
                </span>
              </span>

              {/* availability card */}
              <div className="absolute -bottom-6 left-1/2 z-10 w-[240px] -translate-x-1/2 rounded-2xl border border-line bg-white p-4 shadow-lift">
                <p className="flex items-center gap-2 text-[13px] font-bold text-forest">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-pulse-soft absolute h-2.5 w-2.5 rounded-full bg-gold" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                  </span>
                  Available for projects
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[12px] font-medium text-slate">
                  <IcPin className="h-3.5 w-3.5 text-forest" />
                  {CONTACT.location}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Ticker />
    </section>
  );
}
