import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MARQUEE, yearsOfExperience } from "../data";
import { useContent } from "../store";
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
function HeroButton({
  label,
  link,
  primary,
}: {
  label: string;
  link: string;
  primary?: boolean;
}) {
  const cls = `btn ${primary ? "btn-pine" : "btn-outline"}`;
  const icon = primary ? (
    <IcArrowDown className="h-4 w-4" />
  ) : (
    <IcArrowUpRight className="h-4 w-4" />
  );
  if (link.startsWith("/") && !link.startsWith("//")) {
    return (
      <Link to={link} className={cls}>
        {label}
        {icon}
      </Link>
    );
  }
  const external = /^https?:/i.test(link);
  return (
    <a
      href={link}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
      {icon}
    </a>
  );
}

export function Hero() {
  const years = yearsOfExperience();
  const { hero } = useContent();
  return (
    <section id="home" className="relative overflow-hidden bg-white">
      <div aria-hidden className="dots-bg pointer-events-none absolute left-0 top-24 h-64 w-64 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -right-28 -top-28 h-[420px] w-[420px] rounded-full border border-line" />
      <div aria-hidden className="pointer-events-none absolute -right-14 -top-14 h-[420px] w-[420px] rounded-full border border-gold/30" />

      <div className="container-x relative grid items-center gap-14 pb-20 pt-16 md:pt-20 lg:grid-cols-12 lg:gap-8">
        {/* copy */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow">{hero.eyebrow}</p>
          </Reveal>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.4rem)] font-black leading-[1.02] tracking-[-0.02em] text-ink">
            <MaskLines
              lines={[
                <>{hero.greeting}</>,
                <>{hero.line2}</>,
                <>
                  <span className="relative inline-block italic text-pine">
                    {hero.highlight}
                    <svg
                      viewBox="0 0 220 12"
                      preserveAspectRatio="none"
                      className="absolute -bottom-1 left-0 h-[0.18em] w-full"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 9c40-6 140-6 214-3"
                        fill="none"
                        stroke="var(--color-gold)"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </>,
              ]}
            />
          </h1>

          <Reveal delay={300}>
            <p className="mt-7 max-w-xl whitespace-pre-line text-[16.5px] leading-[1.75] text-slate">
              {hero.paragraph}
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <HeroButton label={hero.primary.label} link={hero.primary.link} primary />
              <HeroButton label={hero.secondary.label} link={hero.secondary.link} />
            </div>
          </Reveal>

          <Reveal delay={500}>
            <div className="mt-11 border-t border-line pt-6">
              <p className="text-[11.5px] font-extrabold uppercase tracking-[0.2em] text-slate/70">
                {hero.teamsLabel}
              </p>
              <ul className="mt-3.5 flex flex-wrap gap-2.5">
                {hero.orgs.map((o) => (
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
                  src={hero.portrait}
                  alt="Portrait of Olowomakan Esther Bukola"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={portraitFallback}
                />
              </div>

              <FloatingTag className="-left-8 top-10">{hero.tags[0]}</FloatingTag>
              <FloatingTag late className="-right-6 top-1/2">
                {hero.tags[1]}
              </FloatingTag>
              <FloatingTag className="-left-4 bottom-24">{hero.tags[2]}</FloatingTag>

              {/* experience badge */}
              <span className="absolute -top-3 right-[8%] z-10 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-pine text-center text-white shadow-lift">
                <span className="font-display text-[26px] font-black leading-none text-gold">
                  {years}+
                </span>
                <span className="mt-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em]">
                  {hero.badgeLabel}
                </span>
              </span>

              {/* availability card */}
              <div className="absolute -bottom-7 right-0 z-10 rounded-2xl border border-line bg-white px-5 py-4 shadow-lift">
                <p className="flex items-center gap-2 text-[13px] font-bold text-pine">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-pulse-soft absolute h-2.5 w-2.5 rounded-full bg-gold" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                  </span>
                  {hero.availability}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-[11.5px] font-semibold text-slate">
                  <IcPin className="h-3.5 w-3.5 text-pine" />
                  {hero.coords}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <Ticker
        words={
          hero.tickerWords.filter((w) => w.trim()).length > 0
            ? hero.tickerWords.filter((w) => w.trim())
            : MARQUEE
        }
      />
    </section>
  );
}
