import Link from "next/link";
import { SiteLogo } from "@/components/layout/site-logo";
import { site } from "@/lib/site-content";

const nav = [
  { href: "/#inicio", label: "Início" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#areas", label: "Áreas" },
  { href: "/#atendimento", label: "Atendimento" },
  { href: "/artigos", label: "Artigos" },
  { href: "/#contato", label: "Contato" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Mobile: logo numa linha; menu de âncoras na linha seguinte. Desktop: tudo numa linha. */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-6 md:py-3 lg:py-3.5">
          <div className="flex items-center py-2.5 md:py-0">
            <Link
              href="/#inicio"
              className="flex shrink-0 items-center"
              aria-label={site.name}
            >
              <SiteLogo />
            </Link>
          </div>
          <nav
            className="-mx-4 flex gap-0.5 overflow-x-auto border-t border-[var(--color-border)]/70 px-4 pb-2 pt-2 md:mx-0 md:flex md:flex-wrap md:justify-end md:gap-1 md:overflow-visible md:border-0 md:p-0"
            aria-label="Principal"
          >
            {nav.map((item) =>
              item.href.startsWith("/#") ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="shrink-0 rounded-lg px-2.5 py-2 text-sm font-medium text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-ink)] sm:px-3"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="shrink-0 rounded-lg px-2.5 py-2 text-sm font-medium text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-ink)] sm:px-3"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
