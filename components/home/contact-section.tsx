import { ContactForm } from "@/components/home/contact-form";

export function ContactSection() {
  return (
    <section id="contato" className="scroll-mt-20 bg-[var(--color-muted)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
            Contato
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Fale conosco
          </h2>
          <p className="mt-4 text-justify text-lg leading-relaxed text-[var(--color-ink-muted)]">
            Envie uma mensagem pelo formulário abaixo. Retornamos o mais breve possível.
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-2xl">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm sm:p-8">
            <p className="text-justify text-sm leading-relaxed text-[var(--color-ink-muted)]">
              Os campos marcados como obrigatórios são necessários para podermos responder.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
