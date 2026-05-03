import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site-content";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-[80svh] overflow-hidden bg-[var(--color-hero-bg)] text-[var(--color-hero-fg)]"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/fundohome.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-[var(--color-hero-bg)]/75 via-[var(--color-hero-bg)]/55 to-[var(--color-hero-bg)]/85"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {site.tagline}
        </h1>
        <div className="mt-6 max-w-4xl space-y-2 text-lg leading-relaxed text-[var(--color-hero-muted)]">
          {site.description.map((paragraph, i) => (
            <p key={i} className="text-left">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contato"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-md transition hover:brightness-110"
          >
            Entre em contato
          </a>
          <Link
            href={`https://wa.me/${site.whatsappE164}`}
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            target="_blank"
            rel="noopener noreferrer"
          >
            Falar com o advogado
          </Link>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" aria-hidden />
    </section>
  );
}
