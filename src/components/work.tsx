import { useEffect, useMemo, useState } from "react";
import {
  CASE_STUDIES,
  CATEGORIES,
  COMM_SKILLS,
  DESIGN_SKILLS,
  GALLERY,
  SOFT_SKILLS,
  TECH_SKILLS,
  TOOLS,
  type CaseStudy,
  type GalleryItem,
  type Tool,
} from "../data";
import {
  IcArrowRight,
  IcCanva,
  IcCapCut,
  IcCheck,
  IcClose,
  IcFigma,
  IcOffice,
  IcPlay,
  IcPress,
  IcPs,
  IcSpark,
  Reveal,
  useInView,
  useReducedMotion,
} from "../lib";
import { SectionHead } from "./about";

/* ------------------------------------------------------------------ */
/*  Tools & skills                                                     */
/* ------------------------------------------------------------------ */
function ToolIcon({ icon, className = "h-8 w-8" }: { icon: Tool["icon"]; className?: string }) {
  const map = {
    ps: IcPs,
    canva: IcCanva,
    figma: IcFigma,
    capcut: IcCapCut,
    office: IcOffice,
    press: IcPress,
  } as const;
  const Cmp = map[icon];
  return <Cmp className={className} />;
}

function ToolCard({ tool, delay }: { tool: Tool; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="group flex flex-col items-center text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full border border-line bg-mist text-pine transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-gold group-hover:bg-pine group-hover:text-gold group-hover:shadow-lift md:h-28 md:w-28">
          <ToolIcon icon={tool.icon} />
        </span>
        <p className="mt-3.5 max-w-[120px] text-[13px] font-bold leading-tight text-ink">
          {tool.name}
        </p>
      </div>
    </Reveal>
  );
}

function ProficiencyBar({
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
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const reduced = useReducedMotion();
  const w = inView || reduced ? level : 0;
  return (
    <div ref={ref} className="border-b border-line py-5 first:pt-0">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[19px] font-bold text-ink">{name}</h3>
        <span className="text-[13px] font-extrabold text-pine">{level}%</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-sage">
        <div
          className="h-full rounded-full bg-gold transition-[width] duration-[1100ms] ease-out"
          style={{ width: `${w}%`, transitionDelay: `${delay}ms` }}
        />
      </div>
      <p className="mt-2 text-[13px] text-slate">{note}</p>
    </div>
  );
}

export function ToolsSection() {
  const chipGroup = (label: string, items: string[], icon: React.ReactNode) => (
    <div className="mt-8">
      <p className="flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-pine">
        {icon}
        {label}
      </p>
      <ul className="mt-3.5 flex flex-wrap gap-2.5">
        {items.map((s) => (
          <li key={s} className="chip cursor-default">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section id="skills" aria-label="Tools and skills" className="relative bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          no="03"
          eyebrow="Toolkit"
          title={[
            <>Tools & skills I</>,
            <>
              <span className="italic text-pine">work with.</span>
            </>,
          ]}
          right="The stack behind every deliverable — design tools up front, and the communication and production skills that get work out the door."
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* tools circles */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-x-4 gap-y-9">
              {TOOLS.map((t, i) => (
                <ToolCard key={t.name} tool={t} delay={i * 90} />
              ))}
            </div>
            <Reveal delay={200}>
              <div className="mt-10 rounded-2xl bg-sage/70 p-6">
                <p className="flex items-center gap-2 text-[13px] font-bold text-pine">
                  <IcSpark className="h-4 w-4 text-gold" />
                  Beyond the screen
                </p>
                <p className="mt-2 text-[14px] leading-[1.65] text-slate">
                  Equally at home on the production floor — running
                  large-format printers, D.I machines, and ID card production
                  from file to finished piece.
                </p>
              </div>
            </Reveal>
          </div>

          {/* proficiency + chips */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-pine">
                Design proficiency
              </p>
            </Reveal>
            <div className="mt-4">
              {DESIGN_SKILLS.map((s, i) => (
                <ProficiencyBar key={s.name} {...s} delay={i * 130} />
              ))}
            </div>

            <Reveal delay={150}>
              {chipGroup("Communication", COMM_SKILLS, <IcSpark className="h-3.5 w-3.5 text-gold" />)}
            </Reveal>
            <Reveal delay={220}>
              {chipGroup("Technical & print", TECH_SKILLS, <IcSpark className="h-3.5 w-3.5 text-gold" />)}
            </Reveal>
            <Reveal delay={290}>
              {chipGroup("Soft skills", SOFT_SKILLS, <IcSpark className="h-3.5 w-3.5 text-gold" />)}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Projects gallery + case-study lightbox                             */
/* ------------------------------------------------------------------ */
export function Gallery({ showHead = true }: { showHead?: boolean }) {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(
    () => (cat === "All" ? GALLERY : GALLERY.filter((g) => g.cat === cat)),
    [cat]
  );
  const items = cat === "All" && !showAll ? filtered.slice(0, 6) : filtered;

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
    <section id="projects" aria-label="Selected projects" className="relative bg-mist py-20 md:py-28">
      <div className="container-x">
        {showHead && (
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              no="04"
              eyebrow="Selected Work"
              title={[
                <>Featured</>,
                <>
                  <span className="italic text-pine">projects.</span>
                </>,
              ]}
            />
            <Reveal delay={200} className="-mt-6 mb-12 md:-mt-8 lg:mb-16">
              <button
                onClick={() => setShowAll((v) => !v)}
                className="btn btn-outline !py-3 text-[14px]"
              >
                {showAll ? "Show Less" : "View All Projects"}
                <IcArrowRight className="h-4 w-4" />
              </button>
            </Reveal>
          </div>
        )}

        {/* filters */}
        <Reveal className="mb-10 flex flex-wrap gap-2.5">
          {CATEGORIES.map((c) => {
            const count =
              c === "All" ? GALLERY.length : GALLERY.filter((g) => g.cat === c).length;
            const isActive = cat === c;
            return (
              <button
                key={c}
                onClick={() => {
                  setCat(c);
                  setShowAll(false);
                  setLightbox(null);
                }}
                aria-pressed={isActive}
                className={`rounded-full px-5 py-2.5 text-[13px] font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-pine text-white shadow-soft"
                    : "border border-line bg-white text-slate hover:-translate-y-0.5 hover:border-pine hover:text-pine"
                }`}
              >
                {c}
                <sup className={`ml-1 text-[10px] ${isActive ? "text-gold" : "text-pine"}`}>
                  {count}
                </sup>
              </button>
            );
          })}
        </Reveal>

        {/* cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 110}>
              <article
                onClick={() => setLightbox(i)}
                className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
              >
                <div className={`relative overflow-hidden ${g.ratio}`}>
                  <img
                    src={g.img}
                    alt={`${g.title} — ${g.org}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-pine/0 transition-colors duration-300 group-hover:bg-pine/35" />
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-pine">
                    {g.cat}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold text-pine">
                    {g.year}
                  </span>
                  {g.cat === "Video & Motion" && (
                    <span className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-pine text-gold shadow-lift transition-transform duration-300 group-hover:scale-110">
                      <IcPlay className="ml-0.5 h-5 w-5" />
                    </span>
                  )}
                  <span className="absolute bottom-4 right-4 flex translate-y-3 items-center gap-2 rounded-full bg-white px-4 py-2 text-[12px] font-bold text-pine opacity-0 shadow-soft transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Open Case Study <IcArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-pine">
                    {g.org}
                  </p>
                  <h3 className="mt-1.5 font-display text-[21px] font-bold leading-snug text-ink">
                    {g.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[14px] leading-[1.6] text-slate">
                    {g.study.objective}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {g.study.tools.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-mist px-3 py-1 text-[11.5px] font-semibold text-slate">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* lightbox */}
      {active && (
        <div
          className="animate-fade-in fixed inset-0 z-[140] flex items-center justify-center p-3 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} case study`}
        >
          <button
            aria-label="Close case study"
            className="absolute inset-0 bg-pine/80 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
          />
          <div className="animate-pop-in relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-lift lg:grid-cols-2">
            <div className="relative overflow-hidden bg-sage lg:rounded-l-3xl">
              <img
                src={active.img}
                alt={active.title}
                className="h-full max-h-[34vh] w-full object-cover lg:max-h-none"
              />
              <span className="absolute left-5 top-5 rounded-full bg-gold px-4 py-1.5 text-[11.5px] font-extrabold uppercase tracking-wide text-pine">
                {active.cat} · {active.year}
              </span>
            </div>

            <div className="p-7 md:p-10">
              <p className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.22em] text-pine">
                <IcSpark className="h-3.5 w-3.5 text-gold" /> Case Study
              </p>
              <h3 className="mt-3 font-display text-3xl font-black leading-tight text-ink md:text-4xl">
                {active.title}
              </h3>
              <p className="mt-2 text-[13px] font-bold uppercase tracking-[0.14em] text-slate">
                {active.org} — {active.study.type}
              </p>

              <p className="mt-5 text-[15px] leading-[1.7] text-slate">{active.study.objective}</p>

              <p className="mt-6 text-[11.5px] font-extrabold uppercase tracking-[0.2em] text-pine">
                Deliverables
              </p>
              <ul className="mt-3 space-y-2.5">
                {active.study.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage">
                      <IcCheck className="h-3 w-3 text-pine" />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-[11.5px] font-extrabold uppercase tracking-[0.2em] text-pine">
                Tools
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.study.tools.map((t) => (
                  <span key={t} className="rounded-full border border-line bg-mist px-3.5 py-1.5 text-[12px] font-semibold text-slate">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 rounded-r-2xl border-l-4 border-gold bg-mist p-5">
                <p className="text-[11.5px] font-extrabold uppercase tracking-[0.2em] text-pine">
                  Impact
                </p>
                <p className="mt-2 text-[14px] font-semibold leading-[1.65] text-ink">
                  {active.study.impact}
                </p>
              </div>
            </div>

            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-pine shadow-lift transition-colors hover:bg-gold hover:text-pine"
            >
              <IcClose className="h-4.5 w-4.5" />
            </button>
            <div className="absolute bottom-5 right-5 z-10 flex gap-2.5">
              <button
                aria-label="Previous project"
                onClick={() =>
                  setLightbox((v) => (v === null ? v : (v - 1 + items.length) % items.length))
                }
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-pine shadow-lift transition-colors hover:bg-pine hover:text-white"
              >
                <IcArrowRight className="h-4.5 w-4.5 rotate-180" />
              </button>
              <button
                aria-label="Next project"
                onClick={() =>
                  setLightbox((v) => (v === null ? v : (v + 1) % items.length))
                }
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-pine shadow-lift transition-colors hover:bg-pine hover:text-white"
              >
                <IcArrowRight className="h-4.5 w-4.5" />
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
    sub: string;
    chip: string;
    num: string;
    impact: string;
    kicker: string;
  }
> = {
  pine: {
    wrap: "bg-pine text-white",
    sub: "text-white/70",
    chip: "border-white/25 text-white/85",
    num: "text-white/8",
    impact: "bg-white/8 border-gold",
    kicker: "text-gold",
  },
  paper: {
    wrap: "bg-white text-ink",
    sub: "text-slate",
    chip: "border-line text-slate",
    num: "text-ink/6",
    impact: "bg-mist border-gold",
    kicker: "text-pine",
  },
  gold: {
    wrap: "bg-gold text-pine",
    sub: "text-pine/75",
    chip: "border-pine/25 text-pine/85",
    num: "text-pine/10",
    impact: "bg-pine/8 border-pine",
    kicker: "text-pine",
  },
};

export function FeaturedProjects() {
  return (
    <section id="case-studies" aria-label="Featured case studies" className="relative bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          no="05"
          eyebrow="Case Studies"
          title={[
            <>How the work</>,
            <>
              <span className="italic text-pine">came together.</span>
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
                className={`sticky mb-10 overflow-hidden rounded-3xl border border-line shadow-lift last:mb-0 ${t.wrap}`}
                style={{ top: `${88 + i * 26}px`, zIndex: i + 1 }}
              >
                <div className="grid gap-8 p-7 md:p-11 lg:grid-cols-12 lg:gap-12">
                  <div className="relative lg:col-span-5">
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute -right-2 -top-10 select-none font-display text-[7.5rem] font-black leading-none md:-top-14 md:text-[10rem] ${t.num}`}
                    >
                      {cs.no}
                    </span>
                    <p className={`flex items-center gap-2.5 text-[11.5px] font-extrabold uppercase tracking-[0.22em] ${t.kicker}`}>
                      <IcSpark className="h-3.5 w-3.5" />
                      Case {cs.no} — {cs.kind}
                    </p>
                    <h3 className="mt-4 max-w-[16ch] font-display text-3xl font-black leading-[1.02] tracking-tight md:text-[2.6rem]">
                      {cs.client}
                    </h3>
                    <p className={`mt-5 inline-block rounded-full border px-4 py-2 text-[12px] font-bold ${t.chip}`}>
                      {cs.role}
                    </p>
                    <p className={`mt-6 text-[11.5px] font-extrabold uppercase tracking-[0.2em] ${t.kicker}`}>
                      Tools
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {cs.tools.map((tool) => (
                        <span key={tool} className={`rounded-full border px-3.5 py-1.5 text-[12px] font-semibold ${t.chip}`}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <p className={`text-[11.5px] font-extrabold uppercase tracking-[0.2em] ${t.kicker}`}>
                      Objective
                    </p>
                    <p className={`mt-2.5 text-[15.5px] leading-[1.7] md:text-[16.5px] ${t.sub}`}>
                      {cs.objective}
                    </p>

                    <p className={`mt-7 text-[11.5px] font-extrabold uppercase tracking-[0.2em] ${t.kicker}`}>
                      Responsibilities
                    </p>
                    <ul className="mt-3.5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {cs.responsibilities.map((r) => (
                        <li key={r} className="flex items-start gap-2.5 text-[13.5px] font-medium leading-snug">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold">
                            <IcCheck className="h-3 w-3 text-pine" />
                          </span>
                          <span className={t.sub}>{r}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={`mt-8 rounded-r-2xl border-l-4 p-5 md:p-6 ${t.impact}`}>
                      <p className={`text-[11.5px] font-extrabold uppercase tracking-[0.2em] ${t.kicker}`}>
                        Results / Impact
                      </p>
                      <p className="mt-2 font-display text-[17px] font-bold leading-snug md:text-[19px]">
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
