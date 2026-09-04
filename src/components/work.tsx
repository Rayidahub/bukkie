import { useEffect, useMemo, useState } from "react";
import {
  CASE_STUDIES,
  CATEGORIES,
  GALLERY,
  type CaseStudy,
  type GalleryItem,
} from "../data";
import {
  IcArrowUpRight,
  IcArrowRight,
  IcCheck,
  IcClose,
  IcPlay,
  IcSpark,
  Reveal,
  useReducedMotion,
} from "../lib";
import { SectionHead } from "./about";

/* ------------------------------------------------------------------ */
/*  Scattered gallery                                                  */
/* ------------------------------------------------------------------ */
const LAYOUT = [
  "lg:col-span-5 lg:mt-0 -rotate-2",
  "lg:col-span-4 lg:mt-14 rotate-1",
  "lg:col-span-3 lg:mt-6 rotate-2",
  "lg:col-span-4 lg:mt-0 rotate-1",
  "lg:col-span-4 lg:mt-16 -rotate-1",
  "lg:col-span-4 lg:mt-8 rotate-2",
  "lg:col-span-8 lg:col-start-3 lg:mt-4 -rotate-1",
];

export function Gallery() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const items = useMemo(
    () => (cat === "All" ? GALLERY : GALLERY.filter((g) => g.cat === cat)),
    [cat]
  );

  /* lightbox keys + scroll lock */
  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((v) => (v === null ? v : (v + 1) % items.length));
      if (e.key === "ArrowLeft")
        setLightbox((v) => (v === null ? v : (v - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, items.length]);

  const active: GalleryItem | null =
    lightbox !== null && items[lightbox] ? items[lightbox] : null;

  return (
    <section id="work" className="blueprint-dark relative border-t border-ink/10 bg-coal py-24 text-ink md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead
          dark
          no="03"
          kicker="Selected works"
          lines={[
            "Campaigns, prints &",
            <>
              moving <span className="text-flame">pictures.</span>
            </>,
          ]}
          right="A rotating selection across social media design, print production, branding and video content — created for organizations in Lagos and beyond."
        />

        {/* filters */}
        <Reveal className="mb-12 flex flex-wrap items-center gap-3 md:mb-16">
          {CATEGORIES.map((c) => {
            const count =
              c === "All" ? GALLERY.length : GALLERY.filter((g) => g.cat === c).length;
            const isActive = cat === c;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`group flex items-center gap-2 border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ${
                  isActive
                    ? "border-flame bg-flame text-ink"
                    : "border-ink/20 text-ink/60 hover:-translate-y-0.5 hover:border-ink hover:text-ink"
                }`}
              >
                {c}
                <sup className={`text-[9px] ${isActive ? "text-ink/60" : "text-flame"}`}>
                  {count}
                </sup>
              </button>
            );
          })}
        </Reveal>

        {/* scattered cards */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {items.map((g, i) => (
            <Reveal
              key={g.id}
              delay={(i % 3) * 110}
              className={`sm:col-span-1 ${LAYOUT[i % LAYOUT.length]} transition-transform duration-500 hover:rotate-0 hover:scale-[1.015]`}
            >
              <article
                data-hot
                onClick={() => setLightbox(i)}
                className="group cursor-pointer border border-ink/15 bg-sand p-3 pb-4 transition-colors duration-300 hover:border-flame/60"
              >
                <div className={`relative overflow-hidden ${g.ratio}`}>
                  <img
                    src={g.img}
                    alt={`${g.title} — ${g.org}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-ink/65 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 border border-paper bg-paper px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink">
                      Open case study <IcArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  {g.cat === "Video & Motion" && (
                    <span className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-flame text-ink shadow-lg">
                      <IcPlay className="ml-0.5 h-4 w-4" />
                    </span>
                  )}
                  <span className="absolute right-3 top-3 border border-paper/40 bg-ink/60 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-paper">
                    {g.year}
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3 px-1">
                  <div>
                    <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-tight">
                      {g.title}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                      {g.org}
                    </p>
                  </div>
                  <span className="mt-0.5 shrink-0 border border-flame/50 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-flame">
                    {g.cat}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-14 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/40">
            <IcSpark className="h-3.5 w-3.5 text-flame" />
            Portfolio continuously updated — full archive available on request.
          </p>
        </Reveal>
      </div>

      {/* lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center p-3 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} case study`}
        >
          <button
            aria-label="Close case study"
            className="absolute inset-0 bg-ink/90"
            onClick={() => setLightbox(null)}
          />
          <div className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto border border-ink bg-paper text-ink shadow-[14px_14px_0_0_var(--color-flame)] lg:grid-cols-2">
            <div className="relative overflow-hidden bg-coal">
              <img
                src={active.img}
                alt={active.title}
                className={`h-full max-h-[38vh] w-full object-cover lg:max-h-none ${
                  reduced ? "" : "animate-kenburns"
                }`}
              />
              <span className="absolute left-4 top-4 border border-paper/50 bg-ink/70 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-paper">
                {active.cat} — {active.year}
              </span>
            </div>

            <div className="p-6 md:p-10">
              <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.25em] text-flame">
                <IcSpark className="h-3 w-3" /> Case study
              </p>
              <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none tracking-tight md:text-4xl">
                {active.title}
              </h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                {active.org} · {active.study.type}
              </p>

              <p className="mt-6 text-[15px] leading-relaxed text-ink/75">
                {active.study.objective}
              </p>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
                Deliverables
              </p>
              <ul className="mt-3 space-y-2">
                {active.study.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm text-ink/80">
                    <IcCheck className="mt-0.5 h-4 w-4 shrink-0 text-flame" />
                    {d}
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
                Tools
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.study.tools.map((t) => (
                  <span
                    key={t}
                    className="border border-ink/25 px-3 py-1 font-mono text-[10.5px] uppercase tracking-wide"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 border-l-4 border-flame bg-sand p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
                  Impact
                </p>
                <p className="mt-2 text-sm font-medium leading-relaxed">
                  {active.study.impact}
                </p>
              </div>
            </div>

            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center border border-ink bg-paper transition-colors hover:bg-flame"
            >
              <IcClose className="h-4.5 w-4.5" />
            </button>
            <div className="absolute bottom-4 right-4 z-10 flex gap-2">
              <button
                aria-label="Previous project"
                onClick={() =>
                  setLightbox((v) => (v === null ? v : (v - 1 + items.length) % items.length))
                }
                className="flex h-10 w-10 items-center justify-center border border-ink bg-paper transition-colors hover:bg-ink hover:text-paper"
              >
                <IcArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button
                aria-label="Next project"
                onClick={() =>
                  setLightbox((v) => (v === null ? v : (v + 1) % items.length))
                }
                className="flex h-10 w-10 items-center justify-center border border-ink bg-paper transition-colors hover:bg-ink hover:text-paper"
              >
                <IcArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Featured case studies — sticky stacked cards                       */
/* ------------------------------------------------------------------ */
const THEME: Record<
  CaseStudy["theme"],
  {
    wrap: string;
    border: string;
    sub: string;
    chip: string;
    check: string;
    num: string;
    impact: string;
  }
> = {
  cobalt: {
    wrap: "bg-cobalt text-ink",
    border: "border-ink/15",
    sub: "text-ink/70",
    chip: "border-ink/25",
    check: "text-flame",
    num: "text-ink/10",
    impact: "bg-ink/5 border-flame",
  },
  paper: {
    wrap: "bg-paper text-ink",
    border: "border-ink/25",
    sub: "text-ink/65",
    chip: "border-ink/30",
    check: "text-flame",
    num: "text-ink/10",
    impact: "bg-sand border-flame",
  },
  flame: {
    wrap: "bg-flame text-ink",
    border: "border-ink/30",
    sub: "text-ink/70",
    chip: "border-ink/35",
    check: "text-ink",
    num: "text-ink/15",
    impact: "bg-ink/10 border-ink",
  },
};

export function FeaturedProjects() {
  return (
    <section id="projects" className="relative border-t border-ink/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead
          no="04"
          kicker="Featured projects"
          lines={[
            "Case studies in",
            <>
              visual <span className="text-flame">problem-solving.</span>
            </>,
          ]}
          right="Each project follows a case-study structure — so you can see not only what was designed, but why it was designed and the value it created."
        />

        <div className="relative">
          {CASE_STUDIES.map((cs, i) => {
            const t = THEME[cs.theme];
            return (
              <article
                key={cs.no}
                className={`sticky mb-10 border border-ink shadow-[12px_12px_0_0_rgb(27_23_18)] last:mb-0 ${t.wrap}`}
                style={{ top: `${88 + i * 26}px`, zIndex: i + 1 }}
              >
                <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-12 lg:gap-12">
                  {/* left meta */}
                  <div className="relative lg:col-span-5">
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -right-2 -top-8 select-none font-display text-[7.5rem] font-extrabold leading-none md:-top-12 md:text-[10rem] ${t.num}`}
                    >
                      {cs.no}
                    </span>
                    <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.28em]">
                      <IcSpark className="h-3 w-3 text-flame" />
                      Case {cs.no} — {cs.kind}
                    </p>
                    <h3 className="mt-4 max-w-[16ch] font-display text-3xl font-extrabold uppercase leading-[0.98] tracking-tight md:text-5xl">
                      {cs.client}
                    </h3>
                    <p className={`mt-4 inline-block border px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.15em] ${t.chip}`}>
                      {cs.role}
                    </p>
                    <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
                      Tools
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {cs.tools.map((tool) => (
                        <span
                          key={tool}
                          className={`border px-3 py-1 font-mono text-[10.5px] uppercase tracking-wide ${t.chip}`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* right narrative */}
                  <div className="lg:col-span-7">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
                      Objective
                    </p>
                    <p className={`mt-2.5 text-[15.5px] leading-relaxed md:text-lg ${t.sub}`}>
                      {cs.objective}
                    </p>

                    <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
                      Responsibilities
                    </p>
                    <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {cs.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2.5 text-sm leading-snug">
                          <IcCheck className={`mt-0.5 h-4 w-4 shrink-0 ${t.check}`} />
                          <span className={t.sub}>{r}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`mt-8 border-l-4 p-4 md:p-5 ${t.impact}`}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
                        Results / Impact
                      </p>
                      <p className="mt-2 font-display text-base font-bold leading-snug md:text-lg">
                        {cs.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
