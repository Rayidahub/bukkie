import { CERTS, EXPERIENCE } from "../data";
import { IcSpark, Reveal } from "../lib";
import { SectionHead } from "./about";

/* ------------------------------------------------------------------ */
/*  Experience + certifications                                        */
/* ------------------------------------------------------------------ */
export function ExperienceSection() {
  return (
    <section id="experience" aria-label="Experience and certifications" className="relative bg-mist py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          no="06"
          eyebrow="Career Path"
          title={[
            <>Experience &</>,
            <>
              <span className="italic text-pine">certifications.</span>
            </>,
          ]}
          right="From ministry IT support to print-press floors to digital media teams — every seat taught me a different side of how communication actually gets produced."
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* timeline */}
          <div className="lg:col-span-7">
            <div className="relative pl-8 md:pl-10">
              <span
                aria-hidden
                className="absolute bottom-2 left-[9px] top-2 w-0.5 rounded bg-pine/15 md:left-[13px]"
              />
              <ul className="space-y-6">
                {EXPERIENCE.map((r, i) => (
                  <Reveal as="li" key={r.org} delay={i * 90}>
                    <div className="group relative">
                      <span
                        aria-hidden
                        className={`absolute -left-8 top-7 h-5 w-5 rounded-full border-4 border-mist md:-left-10 md:h-6 md:w-6 ${
                          r.current ? "bg-gold" : "bg-pine"
                        }`}
                      >
                        {r.current && (
                          <span className="animate-pulse-soft absolute inset-0 rounded-full bg-gold" />
                        )}
                      </span>
                      <div className="card p-6 shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:border-pine/40 group-hover:shadow-lift md:p-7">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="rounded-full bg-pine px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white">
                            {r.period}
                          </span>
                          {r.current && (
                            <span className="rounded-full bg-gold px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-pine">
                              Current role
                            </span>
                          )}
                        </div>
                        <h3 className="mt-3.5 font-display text-[21px] font-bold leading-snug text-ink">
                          {r.title}
                        </h3>
                        <p className="mt-1 text-[14px] font-bold text-pine">{r.org}</p>
                        <p className="mt-2.5 text-[14px] leading-[1.65] text-slate">{r.note}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>

          {/* certifications */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-3 text-[12px] font-extrabold uppercase tracking-[0.2em] text-pine">
                <span className="h-0.5 w-7 rounded bg-gold" />
                Certifications & Training
              </p>
            </Reveal>
            <ul className="mt-5 space-y-4">
              {CERTS.map((c, i) => (
                <Reveal as="li" key={c.title} delay={i * 80}>
                  <div className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lift">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage font-display text-[15px] font-black text-pine transition-colors duration-300 group-hover:bg-gold group-hover:text-pine">
                      {c.year.slice(2)}
                    </span>
                    <div>
                      <h4 className="font-display text-[16.5px] font-bold leading-snug text-ink">
                        {c.title}
                      </h4>
                      <p className="mt-1 text-[13px] leading-[1.6] text-slate">{c.org}</p>
                      <p className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-pine">
                        {c.year}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200}>
              <div className="mt-8 flex items-start gap-3 rounded-2xl bg-pine p-6 text-white">
                <IcSpark className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <p className="text-[14px] leading-[1.65] text-white/80">
                  <span className="font-bold text-gold">Always learning.</span>{" "}
                  Currently deepening UI/UX practice and exploring motion
                  design for social campaigns.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
