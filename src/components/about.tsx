import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  CERTS,
  DESIGN_SKILLS,
  EXPERIENCE,
  SOFT_SKILLS,
} from "../data";
import {
  CountUp,
  IcChat,
  IcChip,
  IcDownload,
  IcPen,
  IcSpark,
  MaskLines,
  portraitFallback,
  Reveal,
} from "../lib";
import { useContent } from "../store";
import { generateCV } from "../utils/generateCV";
import { LazyImage } from "./LazyImage";

/* ------------------------------------------------------------------ */
/*  Shared section heading                                             */
/* ------------------------------------------------------------------ */
export function SectionHead({
  eyebrow,
  no,
  title,
  right,
  dark = false,
}: {
  eyebrow: string;
  no?: string;
  title: ReactNode[];
  right?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-12 grid items-end gap-6 md:mb-16 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Reveal>
          <p className={`eyebrow ${dark ? "eyebrow-light" : ""}`}>
            {no && <span className="text-gold">{no} —</span>} {eyebrow}
          </p>
        </Reveal>
        <h2
          className={`mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-black leading-[1.06] tracking-[-0.015em] ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          <MaskLines lines={title} />
        </h2>
      </div>
      {right && (
        <Reveal delay={150} className="lg:col-span-5">
          <p className={`max-w-md text-[15.5px] leading-[1.7] lg:ml-auto ${dark ? "text-white/65" : "text-slate"}`}>
            {right}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Services                                                           */
/* ------------------------------------------------------------------ */
function ServiceIcon({ icon, className = "h-7 w-7" }: { icon: string; className?: string }) {
  if (icon === "pen") return <IcPen className={className} />;
  if (icon === "chat") return <IcChat className={className} />;
  return <IcChip className={className} />;
}

export function ServicesSection({ showHead = true }: { showHead?: boolean }) {
  const { services } = useContent();
  return (
    <section id="services" aria-label="Services" className="relative bg-mist py-20 md:py-28">
      <div className="container-x">
        {showHead && (
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              no="01"
              eyebrow="Services"
              title={[
                <>Services I</>,
                <>
                  <span className="italic text-pine">provide.</span>
                </>,
              ]}
            />
            <Reveal delay={200} className="-mt-6 mb-12 md:-mt-8 lg:mb-16">
              <Link to="/contact" className="btn btn-outline !py-3 text-[14px]">
                Hire Me
                <IcSpark className="h-3.5 w-3.5 text-gold" />
              </Link>
            </Reveal>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={`${s.no}-${s.title}`} delay={i * 120}>
              <article
                className={`group flex h-full flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 ${
                  s.featured
                    ? "bg-pine text-white shadow-lift hover:shadow-[0_44px_80px_-32px_rgb(0_67_154/0.75)]"
                    : "card shadow-soft hover:shadow-lift"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105 ${
                      s.featured ? "bg-gold text-pine" : "bg-sage text-pine"
                    }`}
                  >
                    <ServiceIcon icon={s.icon} />
                  </span>
                  <span className={`font-display text-4xl font-black ${s.featured ? "text-white/15" : "text-ink/10"}`}>
                    {s.no}
                  </span>
                </div>

                <p className={`mt-6 text-[11px] font-bold uppercase tracking-[0.18em] ${s.featured ? "text-gold" : "text-pine"}`}>
                  {s.kicker}
                </p>
                <h3 className={`mt-2 font-display text-[22px] font-bold leading-snug ${s.featured ? "text-white" : "text-ink"}`}>
                  {s.title}
                </h3>
                <p className={`mt-3 text-[14.5px] leading-[1.65] ${s.featured ? "text-white/70" : "text-slate"}`}>
                  {s.desc}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.tags.slice(0, 5).map((t) => (
                    <li
                      key={t}
                      className={`rounded-full px-3 py-1 text-[11.5px] font-semibold ${
                        s.featured ? "border border-white/20 text-white/80" : "bg-mist text-slate"
                      }`}
                    >
                      {t}
                    </li>
                  ))}
                  {s.tags.length > 5 && (
                    <li
                      className={`rounded-full px-3 py-1 text-[11.5px] font-bold ${
                        s.featured ? "bg-gold text-pine" : "bg-pine text-white"
                      }`}
                    >
                      +{s.tags.length - 5} more
                    </li>
                  )}
                </ul>

                <Link
                  to="/projects"
                  className={`mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-bold transition-colors ${
                    s.featured ? "text-gold hover:text-honey" : "text-pine hover:text-pine-dark"
                  }`}
                >
                  See related work
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  About (dark pine) + stats + CV                                     */
/* ------------------------------------------------------------------ */
function Statistic({
  value,
  suffix = "",
  label,
  delay,
}: {
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group rounded-2xl border border-white/15 bg-white/5 p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/50">
        <p className="font-display text-4xl font-black text-gold md:text-[44px]">
          <CountUp to={value} suffix={suffix} />
        </p>
        <p className="mt-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-white/70">{label}</p>
      </div>
    </Reveal>
  );
}

export function AboutSection() {
  const { about } = useContent();

  return (
    <section id="about" aria-label="About Esther Bukola" className="relative overflow-hidden bg-pine py-20 text-white md:py-28">
      <div aria-hidden className="dots-light pointer-events-none absolute right-8 top-16 h-44 w-44 opacity-70" />
      <div aria-hidden className="pointer-events-none absolute -left-28 bottom-0 h-80 w-80 rounded-full border border-white/10" />
      <div aria-hidden className="pointer-events-none absolute -left-16 bottom-12 h-80 w-80 rounded-full border border-gold/15" />

      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        {/* image composition */}
        <div className="lg:col-span-5">
          <Reveal y={36}>
            <div className="relative mx-auto max-w-[440px]">
              <div aria-hidden className="absolute -left-4 -top-4 h-full w-full rounded-[28px] bg-gold" />
              <div className="relative overflow-hidden rounded-[28px] shadow-lift">
                <LazyImage
                  src={about.image}
                  alt="Olowomakan Esther Bukola — Creative Graphics Designer"
                  className="w-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  onError={portraitFallback}
                />
              </div>
              <span className="animate-float absolute -right-4 top-8 z-10 rounded-full bg-pine-dark px-4 py-2 text-[12.5px] font-bold text-white shadow-lift">
                {about.tag1}
              </span>
              <span className="animate-float-late absolute -left-5 bottom-10 z-10 rounded-full bg-white px-4 py-2 text-[12.5px] font-bold text-pine shadow-lift">
                {about.tag2}
              </span>
            </div>
          </Reveal>
        </div>

        {/* copy + stats */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow eyebrow-light">02 — {about.eyebrow}</p>
          </Reveal>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.2vw,3.25rem)] font-black leading-[1.06] tracking-[-0.015em]">
            <MaskLines
              lines={[
                <>{about.heading1}</>,
                <>
                  <span className="italic text-gold">{about.heading2}</span>
                </>,
              ]}
            />
          </h2>

          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl whitespace-pre-line text-[16px] leading-[1.75] text-white/75">
              {about.intro}
            </p>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-4 max-w-2xl whitespace-pre-line text-[16px] leading-[1.75] text-white/75">
              {about.approach}{" "}
              <span className="font-semibold text-gold">{about.mission}</span>
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {about.stats.map((s, i) => (
              <Statistic key={`${s.label}-${i}`} value={s.value} suffix={s.suffix} label={s.label} delay={i * 100} />
            ))}
          </div>

          <Reveal delay={250}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button onClick={() => generateCV()} className="btn btn-gold">
                <IcDownload className="h-4 w-4" />
                {about.cvLabel}
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("experience")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="btn btn-outline-light"
              >
                {about.expLabel}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
