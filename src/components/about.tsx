import { useState, type ReactNode } from "react";
import { CONTACT, IMG, SERVICES, type Service } from "../data";
import {
  CountUp,
  IcChat,
  IcChip,
  IcPen,
  IcSpark,
  MaskText,
  Reveal,
} from "../lib";

/* ------------------------------------------------------------------ */
/*  Shared section heading                                             */
/* ------------------------------------------------------------------ */
export function SectionHead({
  no,
  kicker,
  lines,
  right,
  dark = false,
}: {
  no: string;
  kicker: string;
  lines: ReactNode[];
  right?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-8 md:mb-16">
      <div>
        <p
          className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] ${
            dark ? "text-ink/50" : "text-mute"
          }`}
        >
          <IcSpark className="h-3.5 w-3.5 text-flame" />
          ( {no} ) — {kicker}
        </p>
        <MaskText
          className="mt-4 font-display text-[clamp(2.3rem,5.5vw,4.3rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.01em]"
          lines={lines}
        />
      </div>
      {right && (
        <Reveal
          delay={200}
          className={`max-w-sm text-[15px] leading-relaxed ${
            dark ? "text-ink/60" : "text-ink/65"
          }`}
        >
          {right}
        </Reveal>
      )}
    </div>
  );
}

const SERVICE_ICONS = {
  pen: IcPen,
  chat: IcChat,
  chip: IcChip,
};

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */
export function About() {
  return (
    <section id="about" className="relative border-t border-ink/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead
          no="01"
          kicker="About me"
          lines={[
            "Detail-oriented,",
            <>
              result-driven <span className="text-flame">creative.</span>
            </>,
          ]}
          right="Graphics designer and digital media specialist based in Ikorodu, Lagos — creating visuals that help organizations communicate ideas, promote activities, and connect with their audiences."
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* sticky portrait column */}
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <figure className="hard-shadow border border-ink bg-white p-3 pb-4">
                <div className="overflow-hidden">
                  <img
                    src={IMG.portrait}
                    alt="Portrait of Olowomakan Esther Bukola"
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </div>
                <figcaption className="mt-3 flex items-center justify-between px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60">
                  <span>Olowomakan E. Bukola</span>
                  <span className="flex items-center gap-1.5">
                    Ikorodu, Lagos <IcSpark className="h-2.5 w-2.5 text-flame" />
                  </span>
                </figcaption>
              </figure>

              <dl className="mt-8 divide-y divide-ink/10 border border-ink/15">
                {[
                  ["Base", "Ikorodu, Lagos State, NG"],
                  ["Email", CONTACT.email],
                  ["Phone", CONTACT.phone1],
                  ["Status", "Open to roles & projects"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between gap-4 px-5 py-3.5 transition-colors hover:bg-sand"
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
                      {k}
                    </dt>
                    <dd className="truncate text-right text-sm font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* narrative column */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink/80 md:text-xl">
                I am a creative professional with hands-on experience across{" "}
                <strong className="font-semibold text-ink">graphics design, digital media, social media management, communications, customer service and IT support</strong>. My approach combines visual
                storytelling, attention to detail, strategic communication — and
                a genuine understanding of what audiences need to see.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-lg leading-relaxed text-ink/80 md:text-xl">
                From daily social nuggets to large-format banners, I take work
                from first sketch to finished production — often coordinating
                directly with print vendors so what ships matches what was
                designed.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <blockquote className="mt-10 border-l-4 border-flame pl-6 md:pl-8">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-mute">
                  My mission
                </p>
                <p className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight md:text-[1.7rem]">
                  Creating positive customer & audience experiences through
                  innovative design and{" "}
                  <span className="text-flame">strategic communication.</span>
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-12 grid grid-cols-2 border border-ink md:grid-cols-4">
                {[
                  { n: 4, s: "+", label: "Years of practice" },
                  { n: 4, s: "", label: "Organizations served" },
                  { n: 25, s: "+", label: "Campaigns & projects" },
                  { n: 12, s: "+", label: "Tools mastered" },
                ].map((st, i) => (
                  <div
                    key={st.label}
                    className={`group p-6 transition-colors duration-300 hover:bg-ink hover:text-paper md:p-7 ${
                      i % 2 === 1 ? "border-l border-ink" : ""
                    } ${i > 1 ? "border-t border-ink md:border-l md:border-t-0" : ""} ${
                      i === 3 ? "md:border-l" : ""
                    }`}
                  >
                    <CountUp
                      to={st.n}
                      suffix={st.s}
                      className="font-display text-4xl font-extrabold tracking-tight text-ink transition-colors duration-300 group-hover:text-flame md:text-5xl"
                    />
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mute transition-colors duration-300 group-hover:text-paper/60">
                      {st.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Professional focus — accordion                                     */
/* ------------------------------------------------------------------ */
export function Services() {
  const [open, setOpen] = useState<number | null>(0);

  const row = (s: Service, i: number) => {
    const Icon = SERVICE_ICONS[s.icon];
    const isOpen = open === i;
    return (
      <Reveal key={s.no} delay={i * 90}>
        <div className={`border-t border-ink/20 ${i === SERVICES.length - 1 ? "border-b" : ""}`}>
          <button
            onClick={() => setOpen(isOpen ? null : i)}
            aria-expanded={isOpen}
            className="group flex w-full items-center gap-5 px-2 py-6 text-left md:gap-8 md:py-8"
          >
            <span className="font-mono text-xs text-flame md:text-sm">
              {s.no}
            </span>
            <span
              className={`flex-1 font-display text-[clamp(1.35rem,3.4vw,2.6rem)] font-bold uppercase leading-none tracking-tight transition-all duration-300 ${
                isOpen ? "text-flame" : "group-hover:translate-x-2 group-hover:text-flame"
              }`}
            >
              {s.title}
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-mute md:block">
              {s.kicker}
            </span>
            <span
              className={`relative h-9 w-9 shrink-0 border transition-all duration-300 ${
                isOpen
                  ? "rotate-45 border-flame bg-flame text-ink"
                  : "border-ink/30 group-hover:border-ink"
              }`}
            >
              <span className="absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
              <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
            </span>
          </button>

          <div
            className="grid transition-[grid-template-rows] duration-500 ease-out"
            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="grid gap-8 px-2 pb-10 md:grid-cols-12 md:px-12">
                <div className="md:col-span-5">
                  <Icon className="h-8 w-8 text-flame" />
                  <p className="mt-4 text-[15px] leading-relaxed text-ink/70">
                    {s.desc}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">
                    Capabilities
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {s.tags.map((t) => (
                      <li
                        key={t}
                        className="cursor-default border border-ink/25 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  };

  return (
    <section id="services" className="border-t border-ink/10 bg-sand/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead
          no="02"
          kicker="Professional focus"
          lines={[
            "Three ways I move",
            <>
              brands <span className="text-flame">forward.</span>
            </>,
          ]}
          right="My practice spans design, communication and technical production — one connected workflow, from idea to finished output."
        />
        <div>{SERVICES.map(row)}</div>
      </div>
    </section>
  );
}
