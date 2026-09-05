import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { CONTACT, IMG, MARQUEE, ORGS, yearsOfExperience } from "../data";
import {
  IcArrowDown,
  IcArrowUpRight,
  IcPin,
  IcSpark,
  MaskLines,
  portraitFallback,
  Reveal,
} from "../lib";

/* ------------------------------------------------------------------ */
/*  Category ticker (gold band by default)                             */
/* ------------------------------------------------------------------ */
export function Ticker({
  words = MARQUEE,
  className = "border-y border-pine/15 bg-gold text-pine",
}: {
  words?: string[];
  className?: string;
}) {
  const half = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-xl font-bold uppercase tracking-wide md:text-2xl">
            {w}
          </span>
          <IcSpark className="h-4 w-4 shrink-0 opacity-60" />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`ticker overflow-hidden py-3.5 ${className}`}>
      <div className="ticker-track flex w-max">
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating skill tag                                                 */
/* ------------------------------------------------------------------ */
export function FloatingTag({
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
      className={`${late ? "animate-float-late" : "animate-float"} absolute z-10 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 text-[13px] font-bold text-pine shadow-soft ${className}`}
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
    <section id="home" className="relative overflow-hidden bg-white">
      <div aria-hidden className="dots-bg pointer-events-none absolute left-0 top-24 h-64 w-64 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full border border-line" />
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-14 h-[420px] w-[420px] rounded-full border border-gold/30" />

      <div className="container-x relative grid items-center gap-14 pb-20 pt-16 md:pt-20 lg:grid-cols-12 lg:gap-8">
        {/* copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">Creative Graphics Designer — Lagos, NG</p>
          </Reveal>

          <MaskLines
            className="mt-6 font-display text-[26px] font-bold text-slate md:text-[30px]"
            lines={[<>Hello, I'm Bukola</>]}
          />

          <h1 className="mt-3 font-display text-[clamp(2.6rem,6vw,4.4rem)] font-black leading-[1.02] tracking-[-0.02em] text-ink">
            <MaskLines
              lines={[
                <>I build brands</>,
                <>
                  through{" "}
                  <span className="relative inline-block italic text-pine">
                    visual
                    <span aria-hidden className="absolute -bottom-1 left-0 h-[0.14em] w-full rounded-full bg-gold" />
                  </span>
                </>,
                <>
                  <span className="italic text-pine">storytelling.</span>
                </>,
              ]}
              delay={150}
            />
          </h1>

          <Reveal delay={300}>
            <p className="mt-7 max-w-xl text-[16.5px] leading-[1.75] text-slate">
              I help organizations communicate clearly, campaign boldly, and
              print beautifully — from social media graphics and newsletters
              to large-format banners and brand identities.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/projects" className="btn btn-pine">
                View My Work
                <IcArrowDown className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Let's Talk
                <IcArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-11 border-t border-line pt-6">
              <p className="text-[11.5px] font-extrabold uppercase tracking-[0.2em] text-slate/70">
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

        {/* portrait composition */}
        <div className="lg:col-span-5">
          <Reveal y={40} delay={200}>
            <div className="relative mx-auto w-[min(80vw,400px)]">
              {/* gold backdrop + dashed orbit */}
              <div aria-hidden className="absolute -right-5 -top-5 h-full w-full rounded-full bg-gold" />
              <div
                aria-hidden
                className="animate-spin-slower absolute -inset-5 rounded-full border-2 border-dashed border-pine/30"
              />

              {/* portrait */}
              <div className="relative aspect-square overflow-hidden rounded-full border-8 border-white shadow-lift">
                <img
                  src={IMG.portrait}
                  alt="Portrait of Olowomakan Esther Bukola"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={portraitFallback}
                />
              </div>

              <FloatingTag className="-left-8 top-10">Graphic Design</FloatingTag>
              <FloatingTag late className="-right-6 top-1/2">
                Digital Media
              </FloatingTag>
              <FloatingTag className="-left-4 bottom-24">Print Production</FloatingTag>

              {/* experience badge */}
              <span className="absolute -top-3 right-[8%] z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-pine text-center text-white shadow-lift">
                <span className="font-display text-[26px] font-black leading-none text-gold">
                  {years}+
                </span>
                <span className="mt-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em]">
                  Years Exp.
                </span>
              </span>

              {/* availability card */}
              <div className="absolute -bottom-7 right-0 z-10 rounded-2xl border border-line bg-white px-5 py-4 shadow-lift">
                <p className="flex items-center gap-2 text-[13px] font-bold text-pine">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-pulse-soft absolute h-2.5 w-2.5 rounded-full bg-gold" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                  </span>
                  Available for projects
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[11.5px] font-semibold text-slate">
                  <IcPin className="h-3.5 w-3.5 text-pine" />
                  {CONTACT.coords}
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
