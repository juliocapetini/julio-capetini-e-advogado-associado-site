import Link from "next/link";
import { IconMail, IconPhone, IconWhatsApp } from "@/components/icons/ui-icons";
import { site, teamMembers } from "@/lib/site-content";

const quickLinks = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#areas", label: "Áreas de atuação" },
  { href: "/#atendimento", label: "Atendimento" },
  { href: "/artigos", label: "Artigos" },
  { href: "/#contato", label: "Contato" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-ink)] text-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Escritório */}
          <div>
            <p className="font-serif text-xl font-semibold text-white">{site.name}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
              {site.tagline}
            </p>
            <ul className="mt-5 space-y-1 text-xs uppercase tracking-wider text-white/55">
              {teamMembers.map((m) => (
                <li key={m.oab}>
                  <span className="text-white/80">{m.name}</span>
                  <span className="mx-2 text-white/30">·</span>
                  <span>{m.oab}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatos */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Contato
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li>
                <a
                  href={`https://wa.me/${site.whatsappE164}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition hover:text-white"
                >
                  <IconWhatsApp className="h-4 w-4 text-[var(--color-accent-soft)]" />
                  WhatsApp · {site.phoneDisplay2}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneTel}`}
                  className="inline-flex items-center gap-2.5 transition hover:text-white"
                >
                  <IconPhone className="h-4 w-4 text-[var(--color-accent-soft)]" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneTel2}`}
                  className="inline-flex items-center gap-2.5 transition hover:text-white"
                >
                  <IconPhone className="h-4 w-4 text-[var(--color-accent-soft)]" />
                  {site.phoneDisplay2}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 transition hover:text-white"
                >
                  <IconMail className="h-4 w-4 text-[var(--color-accent-soft)]" />
                  {site.email}
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-white/55">
              {site.serviceAreaLine}
            </p>
          </div>

          {/* Navegação */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              Navegação
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-white/80">
              {quickLinks.map((item) =>
                item.href.startsWith("/#") ? (
                  <li key={item.href}>
                    <a href={item.href} className="transition hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="transition hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Linha decorativa */}
        <div
          className="mt-12 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
          aria-hidden
        />

        <div className="mt-6 flex flex-col items-start justify-between gap-3 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
          </p>
          <p>Atendimento on-line em todo o Brasil.</p>
        </div>
      </div>
    </footer>
  );
}
