import { site } from "@/lib/site-content";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-ink)] text-[var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="font-serif text-lg font-semibold text-white">Nossos contatos</p>
        <ul className="mt-3 space-y-2 text-sm text-white/75">
          <li>
            <a href={`tel:${site.phoneTel}`} className="hover:text-white">
              {site.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
          </li>
        </ul>
        <p className="mt-10 border-t border-white/10 pt-8 text-center text-xs text-white/50">
          © {year} {site.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
