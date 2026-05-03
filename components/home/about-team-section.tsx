import Image from "next/image";
import { site, teamMembers } from "@/lib/site-content";

export function AboutTeamSection() {
  return (
    <section id="sobre" className="scroll-mt-20 bg-[var(--color-surface)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Quem somos
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Compromisso com a sua segurança jurídica
          </h2>
          <p className="mt-4 text-justify text-lg leading-relaxed text-[var(--color-ink-muted)]">
            Advogados associados para atuar com as melhores práticas jurídicas, em prol da defesa dos interesses de nossos clientes. Foco em agilidade, estratégia e resultados.
          </p>
        </div>
        <ul className="mt-14 flex flex-col gap-16 lg:gap-20">
          {teamMembers.map((member, index) => {
            const reverse = index % 2 === 1;
            return (
              <li
                key={member.name}
                className={`group flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10 lg:gap-14 ${
                  reverse ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="relative aspect-[9/16] w-full max-w-[260px] shrink-0 overflow-hidden rounded-2xl bg-[var(--color-muted)] shadow-sm ring-1 ring-[var(--color-border)] sm:max-w-none sm:w-56 md:w-60 lg:w-64">
                  <Image
                    src={member.image}
                    alt={`Retrato de ${member.name}`}
                    fill
                    className="object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 224px, 256px"
                    priority={index === 0}
                    unoptimized
                  />
                </div>
                <div className="w-full min-w-0 flex-1 text-center sm:text-left">
                  <h3 className="font-serif text-2xl font-semibold text-[var(--color-ink)]">{member.name}</h3>
                  <p className="mt-2 text-sm font-semibold tracking-wide text-[var(--color-ink)]">Advogado | {member.oab}</p>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
                    {member.role}
                  </p>
                  <div className="mx-auto mt-5 max-w-prose space-y-3 sm:mx-0 sm:max-w-none">
                    {member.bio.map((paragraph, pIndex) => (
                      <p
                        key={`${member.name}-${pIndex}`}
                        className="text-justify text-base leading-relaxed text-[var(--color-ink-muted)]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
