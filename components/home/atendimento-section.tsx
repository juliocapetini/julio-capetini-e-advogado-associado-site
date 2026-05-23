import { IconCalendar, IconMap, IconMonitor } from "@/components/icons/ui-icons";
import { atendimentoHighlights } from "@/lib/site-content";

const highlightIcons = [IconMonitor, IconMap, IconCalendar] as const;

export function AtendimentoSection() {
  return (
    <section id="atendimento" className="scroll-mt-20 bg-[var(--color-surface)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="max-w-2xl">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            <span className="gold-rule" aria-hidden />
            Atendimento
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] text-balance sm:text-4xl">
            On-line com possibilidade presencial
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-ink-muted)] text-pretty">
            Não mantemos sede aberta ao público. O nosso modelo privilegia o atendimento remoto,
            ágil e seguro. Quando o caso justificar, combinamos reunião presencial.
          </p>
        </header>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {atendimentoHighlights.map((item, i) => {
            const Icon = highlightIcons[i] ?? IconMonitor;
            return (
              <li
                key={item.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]/30 hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/12 text-[var(--color-accent)] transition group-hover:bg-[var(--color-accent)]/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink-muted)] text-pretty">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
