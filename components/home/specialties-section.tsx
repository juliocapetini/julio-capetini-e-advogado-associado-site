import {
  IconBuilding,
  IconDoc,
  IconHeart,
  IconScale,
  IconShield,
  IconUsers,
} from "@/components/icons/specialty-icons";
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
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Áreas de atuação
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Especialidades
          </h2>
          <p className="mt-4 text-justify text-lg leading-relaxed text-[var(--color-ink-muted)]">
            Somos full-service, atuando em diversas áreas do direito.
          </p>
        </div>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {specialties.map((title, index) => {
            const Icon = icons[specialtyIcons[index] ?? "scale"];
            return (
              <li
                key={title}
                className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm transition hover:border-[var(--color-accent)]/30 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-[var(--color-ink)]">{title}</h3>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
