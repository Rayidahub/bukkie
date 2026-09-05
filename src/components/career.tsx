import { CERTS, EXPERIENCE } from "../data";
import { IcSpark, Reveal } from "../lib";
import { SectionHead } from "./about";

/* ------------------------------------------------------------------ */
/*  Experience timeline + certifications                               */
/* ------------------------------------------------------------------ */
export function ExperienceSection() {
  return (
    <section id="experience" aria-label="Experience and certifications" className="relative bg-white py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          no="06"
          eyebrow="Experience"
          title={[
            <>Roles &</>,
            <>
              <span className="italic text-pine">certifications.</span>
            </>,
          ]}
          right="From ministry IT support to print-press floors to digital media teams — every seat taught me a different side of how communication actually gets produced."
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* timeline */}
          <div className="lg:col-span-7">
            <ol className="relative space-y-7">
              <span aria-hidden className="absolute bottom-2 left-[9px] top-2 w-0.5 rounded bg-pine/15 md:left-[13px]" />
              {EXPERIENCE.map((r, i) => (
                <Reveal key={r.org} delay={i * 100}>
                  <li className="group relative flex gap-6 md:gap-8">
                    <span className="relative z-10 mt-7">
                      <span
                        className={`block h-5 w-5 rounded-full border-4 border-white shadow-soft md:h-7 md:w-7 ${
                          r.current ? "bg-gold" : "bg-pine"
                        }`}
                      />
                      {r.current && (
                        <span className="animate-pulse-soft absolute inset-0 rounded-full bg-gold" />
                      )}
                    </span>
                    <div className="flex-1 pb-1">
                      <div className="card p-6 shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:border-pine/40 group-hover:shadow-lift md:p-7">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-pine px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-white">
                            {r.period}
                          </span>
                          {r.current && (
                            <span className="rounded-full bg-gold px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-pine">
                              Current role
                            </span>
                          )}
                        </div>
                        <h3 className="mt-3.5 font-display text-[21px] font-bold leading-snug text-ink">{r.title}</h3>
                        <p className="mt-1 text-[14px] font-bold text-pine">{r.org}</p>
                        <p className="mt-2 text-[14px] leading-[1.65] text-slate">{r.note}</p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* certifications */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="flex items-center gap-3 text-[12px] font-extrabold uppercase tracking-[0.2em] text-pine">
                <span className="h-0.5 w-7 rounded bg-gold" /> Certifications & training
              </p>
            </Reveal>
            <ul className="mt-6 space-y-4">
              {CERTS.map((c, i) => (
                <Reveal key={c.title} delay={120 + i * 80}>
                  <li className="group card flex items-start gap-4 p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sage font-display text-[15px] font-black text-pine transition-colors duration-300 group-hover:bg-gold group-hover:text-pine">
                      {c.year.slice(2)}
                    </span>
                    <div>
                      <h4 className="font-display text-[17px] font-bold leading-snug text-ink">{c.title}</h4>
                      <p className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-pine">{c.year}</p>
                      <p className="mt-1 text-[13px] leading-[1.6] text-slate">{c.org}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={300}>
              <p className="mt-8 flex items-start gap-2.5 rounded-r-2xl border-l-4 border-gold bg-mist p-5 text-[13.5px] font-semibold leading-[1.65] text-slate">
                <IcSpark className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                References and full certificates available on request.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
