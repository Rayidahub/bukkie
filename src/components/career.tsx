import { useEffect, useRef, useState } from "react";
import {
  CERTS,
  COMM_SKILLS,
  DESIGN_SKILLS,
  EXPERIENCE,
  SOFT_SKILLS,
  TECH_SKILLS,
} from "../data";
import {
  IcChat,
  IcChip,
  IcSpark,
  Reveal,
  useReducedMotion,
} from "../lib";
import { SectionHead } from "./about";
import { Marquee } from "./hero";

/* ------------------------------------------------------------------ */
/*  Experience + certifications (dark)                                 */
/* ------------------------------------------------------------------ */
export function Experience() {
  return (
    <section
      id="experience"
      className="blueprint-dark relative border-t border-ink bg-ink py-24 text-paper md:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-paper/50">
                <IcSpark className="h-3.5 w-3.5 text-flame" />
                ( 05 ) — Experience
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.3rem,4.5vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
                Roles that
                <br />
                shaped <span className="text-flame">the craft.</span>
              </h2>
              <Reveal delay={150}>
                <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-paper/60">
                  From ministry IT support to print-press floors to digital
                  media teams — every seat taught me a different side of how
                  communication actually gets produced.
                </p>
                <p className="mt-8 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-paper/40">
                  <IcSpark className="h-3 w-3 text-flame" />
                  References available on request
                </p>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul>
              {EXPERIENCE.map((r, i) => (
                <Reveal as="li" key={r.org} delay={i * 80}>
                  <div className="group grid gap-2 border-b border-paper/15 px-2 py-7 transition-all duration-300 hover:bg-paper/[0.04] hover:pl-5 md:grid-cols-12 md:items-baseline md:gap-6 md:py-8">
                    <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-flame md:col-span-3">
                      {r.current && (
                        <span className="relative flex h-2 w-2 shrink-0">
                          <span className="animate-pulse-dot absolute h-2 w-2 rounded-full bg-flame" />
                          <span className="h-2 w-2 rounded-full bg-flame" />
                        </span>
                      )}
                      {r.period}
                    </p>
                    <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-flame md:col-span-5 md:text-2xl">
                      {r.title}
                    </h3>
                    <div className="md:col-span-4">
                      <p className="text-sm font-semibold text-paper/85">{r.org}</p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-paper/50">
                        {r.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            {/* certifications */}
            <Reveal delay={100}>
              <p className="mt-14 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-paper/50">
                <span className="h-px w-10 bg-flame" />
                Certifications & training
              </p>
            </Reveal>
            <ul className="mt-6">
              {CERTS.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 70}>
                  <div className="group grid gap-1 border-b border-paper/10 px-2 py-4.5 transition-all duration-300 hover:pl-5 md:grid-cols-12 md:items-baseline md:gap-6 md:py-5">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-flame md:col-span-2">
                      {c.year}
                    </p>
                    <h4 className="font-display text-base font-bold uppercase tracking-tight transition-colors group-hover:text-flame md:col-span-6 md:text-lg">
                      {c.title}
                    </h4>
                    <p className="text-[13.5px] text-paper/50 md:col-span-4">{c.org}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated skill bar                                                 */
/* ------------------------------------------------------------------ */
function SkillBar({
  name,
  level,
  note,
  delay,
}: {
  name: string;
  level: number;
  note: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setW(level);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setW(level);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [level, reduced]);

  return (
    <div ref={ref} className="group border-b border-ink/15 py-5 first:pt-0">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-lg font-bold uppercase tracking-tight transition-colors group-hover:text-flame md:text-xl">
          {name}
        </h3>
        <span className="font-mono text-xs tracking-[0.15em] text-mute">
          {level}%
        </span>
      </div>
      <div className="mt-3 h-[7px] w-full overflow-hidden bg-ink/10">
        <div
          className="h-full bg-flame transition-[width] duration-[1100ms] ease-out"
          style={{ width: `${w}%`, transitionDelay: `${delay}ms` }}
        />
      </div>
      <p className="mt-2.5 text-[13px] text-mute">{note}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills & tools                                                     */
/* ------------------------------------------------------------------ */
export function Skills() {
  const chip =
    "cursor-default border border-ink/25 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-paper";

  return (
    <section id="skills" className="relative border-t border-ink/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead
          no="06"
          kicker="Skills & tools"
          lines={[
            "A toolkit built for",
            <>
              real <span className="text-flame">production.</span>
            </>,
          ]}
          right="Design proficiency measured honestly, plus the communication and technical skills that keep projects moving from screen to press."
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-6">
            <p className="mb-2 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-mute">
              <span className="h-px w-8 bg-flame" /> Design — proficiency
            </p>
            {DESIGN_SKILLS.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 130} />
            ))}
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal delay={120}>
              <p className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-mute">
                <IcChat className="h-4 w-4 text-flame" /> Communication
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {COMM_SKILLS.map((s) => (
                  <li key={s} className={chip}>
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-10 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-mute">
                <IcChip className="h-4 w-4 text-flame" /> Technical & print
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {TECH_SKILLS.map((s) => (
                  <li key={s} className={chip}>
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260}>
              <p className="mt-10 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-mute">
                <IcSpark className="h-4 w-4 text-flame" /> Soft skills
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {SOFT_SKILLS.map((s) => (
                  <li key={s} className={chip}>
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      {/* soft-skills ticker */}
      <div className="mt-20 border-y border-ink bg-flame py-3.5 text-ink md:mt-24">
        <Marquee words={SOFT_SKILLS} fast />
      </div>
    </section>
  );
}
