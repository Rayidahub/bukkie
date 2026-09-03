import { useState, type FormEvent, type ReactNode } from "react";
import { CONTACT, PRINCIPLES, TESTIMONIALS } from "../data";
import {
  IcArrowUpRight,
  IcCopy,
  IcMail,
  IcPhone,
  IcPin,
  IcQuote,
  IcSpark,
  MaskText,
  Reveal,
} from "../lib";
import { SectionHead } from "./about";

/* ------------------------------------------------------------------ */
/*  Philosophy                                                         */
/* ------------------------------------------------------------------ */
export function Philosophy() {
  return (
    <section id="philosophy" className="border-t border-ink/10 bg-sand/60 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead
          no="07"
          kicker="Design philosophy"
          lines={[
            "The principles",
            <>
              behind <span className="text-flame">every pixel.</span>
            </>,
          ]}
        />

        <div>
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.word} delay={i * 90}>
              <div
                className={`group grid cursor-default items-baseline gap-3 border-t border-ink/20 px-2 py-8 transition-colors duration-500 hover:bg-ink hover:text-paper md:grid-cols-12 md:gap-8 md:py-10 ${
                  i === PRINCIPLES.length - 1 ? "border-b" : ""
                }`}
              >
                <span className="font-mono text-xs text-flame md:col-span-1">
                  P.{i + 1}
                </span>
                <h3 className="font-display text-4xl font-extrabold uppercase tracking-tight transition-transform duration-500 group-hover:translate-x-3 md:col-span-5 md:text-6xl">
                  {p.word}
                </h3>
                <p className="max-w-md text-[15px] leading-relaxed text-ink/65 transition-colors duration-500 group-hover:text-paper/70 md:col-span-6">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* manifesto quote */}
        <Reveal delay={150}>
          <div className="mt-16 border border-ink bg-flame p-8 text-ink hard-shadow md:mt-20 md:p-14">
            <IcQuote className="h-10 w-10" />
            <MaskText
              className="mt-6 font-display text-[clamp(1.5rem,3.6vw,2.8rem)] font-bold uppercase leading-[1.08] tracking-tight"
              lines={[
                "Good design is not only about",
                "making things look beautiful —",
                "it's about making communication",
                "more effective.",
              ]}
            />
            <p className="mt-8 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.25em] text-ink/70">
              <span className="h-px w-10 bg-ink" /> Esther's working principle
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
export function Testimonials() {
  const [first, ...rest] = TESTIMONIALS;
  return (
    <section
      id="testimonials"
      className="blueprint-dark relative border-t border-ink bg-cobalt py-24 text-paper md:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead
          dark
          no="08"
          kicker="Kind words"
          lines={[
            "What partners say",
            <>
              about <span className="text-flame">the work.</span>
            </>,
          ]}
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <figure className="flex h-full flex-col justify-between border border-paper/25 bg-ink/25 p-8 transition-colors duration-300 hover:border-flame md:p-11">
              <div>
                <IcQuote className="h-9 w-9 text-flame" />
                <blockquote className="mt-6 font-display text-2xl font-bold leading-snug tracking-tight md:text-[1.85rem]">
                  “{first.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-8 border-t border-paper/20 pt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-flame">
                  {first.name}
                </p>
                <p className="mt-1 text-sm text-paper/60">
                  {first.role} — {first.org}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-5">
            {rest.map((t, i) => (
              <Reveal key={t.org} delay={140 + i * 120} className={i === 1 ? "lg:translate-y-6" : ""}>
                <figure className="flex h-full flex-col justify-between border border-paper/25 bg-ink/25 p-7 transition-colors duration-300 hover:border-flame md:p-9">
                  <div>
                    <IcQuote className="h-7 w-7 text-flame" />
                    <blockquote className="mt-4 text-[15.5px] font-medium leading-relaxed text-paper/90">
                      “{t.quote}”
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 border-t border-paper/20 pt-4">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-flame">
                      {t.name}
                    </p>
                    <p className="mt-1 text-[13px] text-paper/60">
                      {t.role} — {t.org}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
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
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    }
  };
  return (
    <div className="group flex items-center justify-between gap-4 border-b border-paper/15 py-4">
      <div className="flex min-w-0 items-center gap-3.5">
        <span className="text-flame">{icon}</span>
        <div className="min-w-0">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-paper/45">
            {label}
          </p>
          {href ? (
            <a
              href={href}
              className="block truncate text-sm font-medium text-paper transition-colors hover:text-flame"
            >
              {value}
            </a>
          ) : (
            <p className="truncate text-sm font-medium text-paper">{value}</p>
          )}
        </div>
      </div>
      <button
        onClick={copy}
        aria-label={`Copy ${label}`}
        className={`flex shrink-0 items-center gap-1.5 border px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] transition-all duration-300 ${
          copied
            ? "border-flame bg-flame text-ink"
            : "border-paper/25 text-paper/60 hover:border-flame hover:text-flame"
        }`}
      >
        {copied ? "Copied" : <IcCopy className="h-3.5 w-3.5" />}
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
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const input =
    "w-full border border-ink/25 bg-paper px-4 py-3 text-sm text-ink placeholder:text-mute/70 transition-colors duration-300 focus:border-flame focus:outline-none";
  const label = "mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-mute";

  return (
    <section id="contact" className="relative border-t border-ink/10 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <SectionHead
          no="09"
          kicker="Contact"
          lines={[
            "Let's work",
            <>
              together<span className="text-flame">.</span>
            </>,
          ]}
          right="Looking for a creative professional who can transform ideas into engaging visual content? I'm available for design, media, branding and communications work."
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* direct line */}
          <Reveal className="lg:col-span-5">
            <div className="hard-shadow-flame border border-ink bg-ink p-7 text-paper md:p-9">
              <p className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.25em] text-paper/60">
                <span className="relative flex h-2 w-2">
                  <span className="animate-pulse-dot absolute h-2 w-2 rounded-full bg-flame" />
                  <span className="h-2 w-2 rounded-full bg-flame" />
                </span>
                Currently accepting projects
              </p>
              <h3 className="mt-5 font-display text-3xl font-extrabold uppercase leading-[1.02] tracking-tight md:text-4xl">
                Have a brief?
                <br />
                <span className="text-flame">Let's make it visual.</span>
              </h3>

              <div className="mt-7">
                <CopyRow
                  icon={<IcMail className="h-4.5 w-4.5" />}
                  label="Email"
                  value={CONTACT.email}
                  href={`mailto:${CONTACT.email}`}
                />
                <CopyRow
                  icon={<IcPhone className="h-4.5 w-4.5" />}
                  label="Phone — primary"
                  value={CONTACT.phone1}
                  href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
                />
                <CopyRow
                  icon={<IcPhone className="h-4.5 w-4.5" />}
                  label="Phone — secondary"
                  value={CONTACT.phone2}
                  href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`}
                />
                <CopyRow
                  icon={<IcPin className="h-4.5 w-4.5" />}
                  label="Studio"
                  value={CONTACT.location}
                />
              </div>
            </div>

            <Reveal delay={150}>
              <p className="mt-8 font-mono text-[10.5px] uppercase tracking-[0.25em] text-mute">
                Available for
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {SERVICES_OFFERED.map((s) => (
                  <li
                    key={s}
                    className="cursor-default border border-ink/25 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:border-flame hover:bg-flame hover:text-ink"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Reveal>

          {/* form */}
          <Reveal delay={120} className="lg:col-span-7">
            <form onSubmit={submit} className="border border-ink/20 p-7 md:p-10" noValidate>
              <p className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.28em] text-mute">
                <span className="h-px w-8 bg-flame" /> Project brief — quick form
              </p>

              <div className="mt-7 grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className={label}>
                    Your name *
                  </label>
                  <input
                    id="cf-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Adaeze Okoye"
                    className={input}
                  />
                </div>
                <div>
                  <label htmlFor="cf-email" className={label}>
                    Email
                  </label>
                  <input
                    id="cf-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@organization.org"
                    className={input}
                  />
                </div>
                <div>
                  <label htmlFor="cf-org" className={label}>
                    Organization
                  </label>
                  <input
                    id="cf-org"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    placeholder="Company, church, NGO…"
                    className={input}
                  />
                </div>
                <div>
                  <label htmlFor="cf-service" className={label}>
                    What do you need?
                  </label>
                  <select
                    id="cf-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`${input} cursor-pointer`}
                  >
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
                    className={`${input} resize-none`}
                  />
                </div>
              </div>

              {error && (
                <p className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-flame">
                  <IcSpark className="h-3 w-3" /> {error}
                </p>
              )}
              {sent && !error && (
                <p className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cobalt">
                  <IcSpark className="h-3 w-3" /> Draft opened in your mail app — talk soon!
                </p>
              )}

              <button
                type="submit"
                className="group mt-7 flex w-full items-center justify-center gap-3 border border-ink bg-ink py-4 font-mono text-[11.5px] uppercase tracking-[0.25em] text-paper transition-all duration-300 hover:bg-flame hover:text-ink"
              >
                Send via email
                <IcArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                Opens a draft in your email app — nothing is stored or sent from this site.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
