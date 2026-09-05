import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { CONTACT, PRINCIPLES, SERVICES, type Insight } from "../data";
import {
  IcArrowUpRight,
  IcCheck,
  IcClose,
  IcCopy,
  IcMail,
  IcPhone,
  IcPin,
  IcQuote,
  IcSpark,
  MaskLines,
  Reveal,
} from "../lib";
import { useContent } from "../store";
import { SectionHead } from "./about";

/* ------------------------------------------------------------------ */
/*  Philosophy                                                         */
/* ------------------------------------------------------------------ */
export function Philosophy() {
  return (
    <section id="philosophy" aria-label="Design philosophy" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div aria-hidden className="dots-bg pointer-events-none absolute right-0 top-16 h-40 w-40 opacity-70" />
      <div className="container-x">
        <SectionHead
          no="07"
          eyebrow="Design Philosophy"
          title={[
            <>The principles behind</>,
            <>
              <span className="italic text-pine">every pixel.</span>
            </>,
          ]}
        />

        <div>
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.word} delay={i * 90}>
              <div
                className={`group grid cursor-default items-baseline gap-3 border-t border-line px-2 py-8 transition-all duration-500 hover:bg-pine md:grid-cols-12 md:gap-8 md:py-10 ${
                  i === PRINCIPLES.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="font-display text-sm font-black text-gold md:col-span-1">P.0{i + 1}</span>
                <h3 className="font-display text-4xl font-black tracking-tight text-ink transition-all duration-500 group-hover:translate-x-3 group-hover:text-white md:col-span-5 md:text-6xl">
                  {p.word}
                  <span className="text-gold">.</span>
                </h3>
                <p className="max-w-md text-[15.5px] leading-[1.7] text-slate transition-colors duration-500 group-hover:text-white/70 md:col-span-6">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="relative mt-16 overflow-hidden rounded-3xl bg-pine p-8 text-white shadow-lift md:mt-20 md:p-14">
            <div aria-hidden className="dots-light absolute right-6 top-6 h-32 w-32 opacity-60" />
            <div aria-hidden className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full border border-gold/25" />
            <IcQuote className="h-10 w-10 text-gold" />
            <blockquote className="mt-6 font-display text-[clamp(1.4rem,3.2vw,2.5rem)] font-bold leading-[1.2] tracking-tight">
              <MaskLines
                lines={[
                  <>“Good design is not only about</>,
                  <>making things look beautiful —</>,
                  <>
                    it's about making <span className="italic text-gold">communication</span>
                  </>,
                  <>
                    <span className="italic text-gold">more effective.</span>”
                  </>,
                ]}
              />
            </blockquote>
            <p className="mt-8 flex items-center gap-3 text-[11.5px] font-extrabold uppercase tracking-[0.22em] text-white/60">
              <span className="h-0.5 w-8 rounded bg-gold" /> Esther's working principle
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials                                                       */
/* ------------------------------------------------------------------ */
function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Testimonials({ showHead = true }: { showHead?: boolean }) {
  const { testimonials } = useContent();
  return (
    <section id="testimonials" aria-label="Testimonials" className="relative overflow-hidden bg-pine py-20 text-white md:py-28">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full border border-white/10" />
      <div aria-hidden className="dots-light pointer-events-none absolute bottom-10 right-10 h-40 w-40 opacity-60" />

      <div className="container-x">
        {showHead && (
          <SectionHead
            dark
            no="08"
            eyebrow="Testimonials"
            title={[
              <>Kind words from</>,
              <>
                <span className="italic text-gold">the teams.</span>
              </>,
            ]}
            right="Feedback from the organizations behind the campaigns, newsletters, and outreach materials in this portfolio."
          />
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={`${t.org}-${i}`} delay={i * 130} className={i === 1 ? "md:translate-y-8" : ""}>
              <figure className="flex h-full flex-col rounded-2xl border border-white/15 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:bg-white/10 md:p-8">
                <IcQuote className="h-8 w-8 text-gold" />
                <blockquote className="mt-5 flex-1 text-[15px] font-medium leading-[1.75] text-white/85">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5 border-t border-white/15 pt-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-display text-[15px] font-black text-pine">
                    {initials(t.role)}
                  </span>
                  <div>
                    <p className="text-[14px] font-bold text-white">{t.name}</p>
                    <p className="text-[12.5px] text-white/60">
                      {t.role} — <span className="text-gold">{t.org}</span>
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Insights / blog                                                    */
/* ------------------------------------------------------------------ */
function ArticleModal({ article, onClose }: { article: Insight; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[130] flex items-start justify-center overflow-y-auto bg-pine/70 p-4 backdrop-blur-sm md:py-10"
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      onClick={onClose}
    >
      <div className="animate-pop-in relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-lift" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-56 md:h-64">
          <img src={article.cover} alt="" className="h-full w-full object-cover" />
          <span className="absolute left-5 top-5 rounded-full bg-gold px-4 py-1.5 text-[11.5px] font-extrabold uppercase tracking-wide text-pine">
            {article.tag}
          </span>
          <button
            onClick={onClose}
            aria-label="Close article"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-pine shadow-lift transition-colors hover:bg-gold hover:text-pine"
          >
            <IcClose className="h-4 w-4" />
          </button>
        </div>
        <div className="p-7 md:p-10">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-slate">
            {article.date} · {article.read} · by Esther Bukola
          </p>
          <h3 className="mt-3 font-display text-3xl font-black leading-tight text-ink md:text-4xl">{article.title}</h3>
          <div className="mt-6 space-y-5">
            {article.body.map((p, i) => (
              <p key={i} className="text-[15.5px] leading-[1.8] text-slate">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8 rounded-r-2xl border-l-4 border-gold bg-mist p-5">
            <p className="text-[13.5px] font-semibold leading-[1.65] text-ink">
              Need something like this for your organization?{" "}
              <Link
                to="/contact"
                onClick={onClose}
                className="font-bold text-pine underline decoration-gold decoration-2 underline-offset-4 hover:text-pine-dark"
              >
                Let's talk →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Insights({ showHead = true }: { showHead?: boolean }) {
  const { articles } = useContent();
  const [openId, setOpenId] = useState<string | null>(null);
  const article = articles.find((a) => a.id === openId) ?? null;

  return (
    <section id="insights" aria-label="Blog and insights" className="relative bg-mist py-20 md:py-28">
      <div className="container-x">
        {showHead && (
          <SectionHead
            no="09"
            eyebrow="Blog & Insights"
            title={[
              <>Notes from the</>,
              <>
                <span className="italic text-pine">studio desk.</span>
              </>,
            ]}
            right="Short, practical lessons from real campaigns, print floors, and content systems — the thinking behind the portfolio."
          />
        )}

        <div className="grid gap-7 md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.id} delay={i * 120}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={a.cover}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-gold px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-pine">
                    {a.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-slate">
                    {a.date} · {a.read}
                  </p>
                  <h3 className="mt-2 font-display text-[20px] font-bold leading-snug text-ink">{a.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-[1.65] text-slate">{a.excerpt}</p>
                  <button
                    onClick={() => setOpenId(a.id)}
                    className="mt-auto inline-flex items-center gap-2 pt-5 text-left text-[14px] font-bold text-pine transition-colors hover:text-pine-dark"
                  >
                    Read Article
                    <IcArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {article && <ArticleModal article={article} onClose={() => setOpenId(null)} />}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA banner (reused across pages)                                   */
/* ------------------------------------------------------------------ */
export function CtaBanner() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl bg-pine p-9 text-center text-white shadow-lift md:p-16">
        <div aria-hidden className="dots-light absolute left-8 top-8 h-32 w-32 opacity-60" />
        <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/15" />
        <div aria-hidden className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full border border-gold/25" />
        <p className="eyebrow eyebrow-light justify-center">Let's Work Together</p>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.6rem)] font-black leading-[1.06] tracking-[-0.015em]">
          Have a project in mind? Let's build something{" "}
          <span className="italic text-gold">meaningful together.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15.5px] leading-[1.7] text-white/70">
          From a single flyer to a full campaign system — tell me what you're
          building and I'll tell you how design can carry it.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact" className="btn btn-gold">
            Start a Project
            <IcArrowUpRight className="h-4 w-4" />
          </Link>
          <a href={`mailto:${CONTACT.email}`} className="btn btn-outline-light">
            <IcMail className="h-4 w-4" />
            {CONTACT.email}
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */
const SERVICES_OFFERED = [
  "Graphic Design",
  "Social Media Design",
  "Digital Media",
  "Branding",
  "Marketing Design",
  "Content Creation",
  "Communications",
  "Creative Support",
];

function CopyRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      /* clipboard unavailable — still confirm intent */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line py-4 last:border-0">
      <div className="flex min-w-0 items-center gap-3.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage text-pine">{icon}</span>
        <div className="min-w-0">
          <p className="text-[10.5px] font-extrabold uppercase tracking-[0.2em] text-slate/70">{label}</p>
          {href ? (
            <a href={href} className="block truncate text-[14.5px] font-bold text-ink transition-colors hover:text-pine">
              {value}
            </a>
          ) : (
            <p className="truncate text-[14.5px] font-bold text-ink">{value}</p>
          )}
        </div>
      </div>
      <button
        onClick={copy}
        aria-label={`Copy ${label}`}
        className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-wide transition-all duration-300 ${
          copied
            ? "border-pine bg-pine text-white"
            : "border-line text-slate hover:border-pine hover:text-pine"
        }`}
      >
        {copied ? <IcCheck className="h-3.5 w-3.5" /> : <IcCopy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [service, setService] = useState(SERVICES_OFFERED[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please add your name and a short message.");
      setSent(false);
      return;
    }
    setError("");
    const subject = `Project inquiry — ${service} (${name.trim()})`;
    const body = [
      `Hello Esther,`,
      ``,
      message.trim(),
      ``,
      `—`,
      `Name: ${name.trim()}`,
      email.trim() ? `Email: ${email.trim()}` : "",
      org.trim() ? `Organization: ${org.trim()}` : "",
      `Service: ${service}`,
    ]
      .filter((l) => l !== "")
      .join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const label = "mb-2 block text-[11px] font-extrabold uppercase tracking-[0.18em] text-slate";

  return (
    <section id="contact" aria-label="Contact" className="relative overflow-hidden bg-mist py-20 md:py-28">
      <div className="container-x">
        <div id="brief" className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="card h-full p-7 shadow-soft md:p-8">
              <p className="flex items-center gap-2.5 text-[13px] font-bold text-pine">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-pulse-soft absolute h-2.5 w-2.5 rounded-full bg-gold" />
                  <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                </span>
                Currently accepting projects
              </p>
              <h3 className="mt-3 font-display text-2xl font-black text-ink">Direct line to the studio</h3>

              <div className="mt-5">
                <CopyRow icon={<IcMail className="h-5 w-5" />} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
                <CopyRow
                  icon={<IcPhone className="h-5 w-5" />}
                  label="Phone — primary"
                  value={CONTACT.phone1}
                  href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
                />
                <CopyRow
                  icon={<IcPhone className="h-5 w-5" />}
                  label="Phone — secondary"
                  value={CONTACT.phone2}
                  href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`}
                />
                <CopyRow icon={<IcPin className="h-5 w-5" />} label="Studio" value={CONTACT.location} />
              </div>

              <p className="mt-7 text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate">Available for</p>
              <ul className="mt-3.5 flex flex-wrap gap-2">
                {SERVICES_OFFERED.map((s) => (
                  <li key={s} className="chip cursor-default">
                    {s}
                  </li>
                ))}
              </ul>

              <p className="mt-7 flex items-start gap-2.5 rounded-r-2xl border-l-4 border-gold bg-mist p-4 text-[13px] font-semibold leading-[1.6] text-slate">
                <IcSpark className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Response within 24 hours on weekdays — faster if it involves a printing deadline.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-7">
            <form onSubmit={submit} className="card h-full p-7 shadow-soft md:p-9" noValidate>
              <p className="flex items-center gap-3 text-[12px] font-extrabold uppercase tracking-[0.22em] text-pine">
                <span className="h-0.5 w-7 rounded bg-gold" /> Project brief — quick form
              </p>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className={label}>
                    Your name *
                  </label>
                  <input id="cf-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Adaeze Okoye" className="input-base" />
                </div>
                <div>
                  <label htmlFor="cf-email" className={label}>
                    Email
                  </label>
                  <input id="cf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@organization.org" className="input-base" />
                </div>
                <div>
                  <label htmlFor="cf-org" className={label}>
                    Organization
                  </label>
                  <input id="cf-org" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Company, church, NGO…" className="input-base" />
                </div>
                <div>
                  <label htmlFor="cf-service" className={label}>
                    What do you need?
                  </label>
                  <select id="cf-service" value={service} onChange={(e) => setService(e.target.value)} className="input-base cursor-pointer">
                    {SERVICES_OFFERED.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="cf-msg" className={label}>
                    Tell me about the project *
                  </label>
                  <textarea
                    id="cf-msg"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Goals, audience, timeline, references — anything that helps."
                    className="input-base resize-none"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-5 flex items-center gap-2 rounded-full bg-gold/15 px-4 py-2.5 text-[13px] font-bold text-pine">
                  <IcSpark className="h-3.5 w-3.5 text-gold" /> {error}
                </p>
              )}
              {sent && !error && (
                <p className="mt-5 flex items-center gap-2 rounded-full bg-sage px-4 py-2.5 text-[13px] font-bold text-pine">
                  <IcCheck className="h-3.5 w-3.5" /> Draft opened in your mail app — talk soon!
                </p>
              )}

              <button type="submit" className="btn btn-pine mt-7 w-full">
                Send via Email
                <IcArrowUpRight className="h-4 w-4" />
              </button>
              <p className="mt-4 text-center text-[12px] font-medium text-slate">
                Opens a draft in your email app — nothing is stored or sent from this site.
              </p>
            </form>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <p className="mt-12 text-center text-[12px] font-bold uppercase tracking-[0.2em] text-slate/70">
            {SERVICES.map((s) => s.kicker).join("  ·  ")} — all under one roof
          </p>
        </Reveal>
      </div>
    </section>
  );
}
