import Image from "next/image";
import { IconCheck } from "@/components/icons/ui-icons";
import { teamMembers } from "@/lib/site-content";

export function AboutTeamSection() {
  return (
    <section id="sobre" className="scroll-mt-20 bg-[var(--color-surface)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            <span className="gold-rule" aria-hidden />
            Quem somos
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] text-balance sm:text-4xl">
            Compromisso com a sua segurança jurídica
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-ink-muted)] text-pretty">
            Advogados associados para atuar com as melhores práticas jurídicas, em prol da defesa
            dos interesses de nossos clientes. Foco em agilidade, estratégia e resultados.
          </p>
        </header>

        <ul className="mt-14 flex flex-col gap-12 lg:gap-16">
          {teamMembers.map((member, index) => {
            const reverse = index % 2 === 1;
            return (
              <li
                key={member.name}
                className={`group flex flex-col items-center gap-8 sm:flex-row sm:items-stretch sm:gap-10 lg:gap-14 ${
                  reverse ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="relative aspect-[9/16] w-full max-w-[260px] shrink-0 overflow-hidden rounded-2xl bg-[var(--color-muted)] shadow-[var(--shadow-card)] ring-1 ring-[var(--color-border)] sm:max-w-none sm:w-56 md:w-60 lg:w-64">
                  <Image
                    src={member.image}
                    alt={`Retrato de ${member.name}`}
                    fill
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 224px, 256px"
                    priority={index === 0}
                    unoptimized
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent"
                    aria-hidden
                  />
                </div>

                <div className="w-full min-w-0 flex-1">
                  <div className="text-center sm:text-left">
                    <h3 className="font-serif text-2xl font-semibold text-[var(--color-ink)]">
                      {member.name}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
                      <span className="text-sm font-semibold tracking-wide text-[var(--color-ink)]">
                        Advogado
                      </span>
                      <span
                        className="h-1 w-1 rounded-full bg-[var(--color-ink-subtle)]"
                        aria-hidden
                      />
                      <span className="text-sm font-medium text-[var(--color-ink-muted)]">
                        {member.oab}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-accent)]">
                      {member.role}
                    </p>
                  </div>

                  <ul className="mt-6 space-y-2.5">
                    {member.bio.map((paragraph, pIndex) => (
                      <li
                        key={`${member.name}-${pIndex}`}
                        className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)] text-pretty"
                      >
                        <span
                          className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/12 text-[var(--color-accent)]"
                          aria-hidden
                        >
                          <IconCheck className="h-3.5 w-3.5" />
                        </span>
                        <span>{paragraph}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
