import Image from "next/image";
import Link from "next/link";
import {
  IconArrowDown,
  IconArrowRight,
  IconShieldCheck,
  IconWhatsApp,
} from "@/components/icons/ui-icons";
import { site, teamMembers } from "@/lib/site-content";

const trustItems = [
  { label: teamMembers[0]?.oab ?? "OAB" },
  { label: teamMembers[1]?.oab ?? "OAB" },
  { label: "Atendimento on-line" },
  { label: "Todo o Brasil" },
];

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative isolate overflow-hidden bg-[var(--color-hero-bg)] text-[var(--color-hero-fg)]"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 md:hidden">
          <Image
            src="/images/fundohomemobile.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <Image
            src="/images/fundohome.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 100vw, 0px"
            className="object-cover object-center"
          />
        </div>
      </div>
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[var(--color-hero-bg)]/85 via-[var(--color-hero-bg)]/65 to-[var(--color-hero-bg)]/90"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-b from-transparent to-[var(--color-hero-bg)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 sm:py-24 lg:py-32">
        <div className="reveal max-w-3xl">

          <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>

          <div className="mt-6 max-w-2xl space-y-3 text-base leading-relaxed text-[var(--color-hero-muted)] text-pretty sm:text-lg">
            {site.description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#contato"
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-[var(--color-accent-soft)] hover:shadow-xl"
            >
              Entre em contato
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <Link
              href={`https://wa.me/${site.whatsappE164}`}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp className="h-4 w-4" />
              Falar com o advogado
            </Link>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-[var(--color-hero-muted)]">
            {trustItems.map((item) => (
              <li key={item.label} className="inline-flex items-center gap-2">
                <IconShieldCheck className="h-4 w-4 text-[var(--color-accent-soft)]" />
                <span className="font-medium tracking-wide">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href="#sobre"
        aria-label="Saber mais sobre o escritório"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[var(--color-hero-muted)] backdrop-blur-sm transition hover:bg-white/10 sm:inline-flex"
      >
        Continuar
        <IconArrowDown className="h-3.5 w-3.5" />
      </a>
    </section>
  );
}
