import type { ComponentType, SVGProps } from "react";
import { ContactForm } from "@/components/home/contact-form";
import {
  IconClock,
  IconMail,
  IconMonitor,
  IconPhone,
  IconWhatsApp,
} from "@/components/icons/ui-icons";
import { site } from "@/lib/site-content";

type Channel = {
  href: string;
  label: string;
  value: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  external?: boolean;
  accent?: boolean;
};

const channels: Channel[] = [
  {
    href: `https://wa.me/${site.whatsappE164}`,
    label: "WhatsApp",
    value: site.phoneDisplay,
    Icon: IconWhatsApp,
    external: true,
    accent: true,
  },
  {
    href: `tel:${site.phoneTel}`,
    label: "Telefone",
    value: site.phoneDisplay,
    Icon: IconPhone,
  },
  {
    href: `mailto:${site.email}`,
    label: "E-mail",
    value: site.email,
    Icon: IconMail,
  },
];

export function ContactSection() {
  return (
    <section id="contato" className="scroll-mt-20 bg-[var(--color-muted)] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            <span className="gold-rule" aria-hidden />
            Contato
            <span className="gold-rule" aria-hidden />
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-[var(--color-ink)] text-balance sm:text-4xl">
            Fale conosco
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--color-ink-muted)] text-pretty">
            Escolha o canal que preferir. Respondemos o mais breve possível.
          </p>
        </header>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-5">
          <aside className="lg:col-span-2">
            <ul className="grid gap-3">
              {channels.map(({ href, label, value, Icon, external, accent }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`group flex cursor-pointer items-center gap-4 rounded-2xl border bg-[var(--color-card)] p-4 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] ${
                      accent
                        ? "border-[var(--color-accent)]/40 hover:border-[var(--color-accent)]"
                        : "border-[var(--color-border)] hover:border-[var(--color-ink)]/20"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                        accent
                          ? "bg-[#25D366]/15 text-[#128C7E]"
                          : "bg-[var(--color-accent)]/12 text-[var(--color-accent)]"
                      }`}
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-subtle)]">
                        {label}
                      </span>
                      <span className="block truncate text-sm font-semibold text-[var(--color-ink)]">
                        {value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

          </aside>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-card)] sm:p-8">
              <h3 className="font-serif text-xl font-semibold text-[var(--color-ink)]">
                Envie uma mensagem
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-muted)]">
                Os campos marcados como obrigatórios são necessários para podermos responder.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
