import { atendimentoHighlights } from "@/lib/site-content";

export function AtendimentoSection() {
  return (
    <section id="atendimento" className="scroll-mt-20 bg-[var(--color-surface)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Atendimento
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            On-line com possibilidade presencial
          </h2>
          <p className="mt-4 text-justify text-lg leading-relaxed text-[var(--color-ink-muted)]">
            Não mantemos sede aberta ao público. O nosso modelo privilegia o atendimento remoto, ágil e
            seguro. Quando o caso justificar, combinamos reunião presencial.
          </p>
        </div>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {atendimentoHighlights.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm"
            >
              <h3 className="font-serif text-lg font-semibold text-[var(--color-ink)]">{item.title}</h3>
              <p className="mt-3 text-justify text-sm leading-relaxed text-[var(--color-ink-muted)]">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
