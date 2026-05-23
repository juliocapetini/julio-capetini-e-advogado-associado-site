import {
  IconBuilding,
  IconDoc,
  IconHeart,
  IconScale,
  IconShield,
  IconUsers,
} from "@/components/icons/specialty-icons";
import { IconArrowRight } from "@/components/icons/ui-icons";
import { specialties } from "@/lib/site-content";

const icons = {
  scale: IconScale,
  building: IconBuilding,
  users: IconUsers,
  heart: IconHeart,
  shield: IconShield,
  doc: IconDoc,
} as const;

type IconKey = keyof typeof icons;

/** Ícone por área (mesma ordem de `specialties`). */
const specialtyIcons: IconKey[] = [
  "scale",
  "heart",
  "doc",
  "users",
  "shield",
  "scale",
  "shield",
  "building",
];

export function SpecialtiesSection() {
  return (
    <section id="areas" className="scroll-mt-20 bg-[var(--color-muted)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            <span className="gold-rule" aria-hidden />
            Áreas de atuação
            <span className="gold-rule" aria-hidden />
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] text-balance sm:text-4xl">
            Especialidades
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-ink-muted)] text-pretty">
            Atuação full-service em diversas áreas do direito — escolhendo a estratégia mais
            adequada para cada caso.
          </p>
        </header>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((title, index) => {
            const Icon = icons[specialtyIcons[index] ?? "scale"];
            return (
              <li
                key={title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:shadow-[var(--shadow-card)]"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-soft)] transition-transform duration-300 group-hover:scale-x-100"
                  aria-hidden
                />
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/12 text-[var(--color-accent)] transition group-hover:bg-[var(--color-accent)]/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-[var(--color-ink)] text-pretty">
                  {title}
                </h3>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-[var(--color-ink-muted)]">
            Não encontrou a sua área? Podemos analisar o seu caso.
          </p>
          <a
            href="#contato"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--color-ink)]/15 bg-[var(--color-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--color-ink)] shadow-sm transition hover:border-[var(--color-ink)]/30 hover:bg-white"
          >
            Falar com o advogado
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
