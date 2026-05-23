"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IconClose, IconMenu, IconWhatsApp } from "@/components/icons/ui-icons";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/85 backdrop-blur-md supports-[backdrop-filter]:bg-[var(--color-surface)]/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:py-4">
        <Link
          href="/#inicio"
          className="flex shrink-0 items-center rounded-md"
          aria-label={site.name}
          onClick={() => setOpen(false)}
        >
          <SiteLogo />
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {nav.map((item) =>
            item.href.startsWith("/#") ? (
              <a
                key={item.href}
                href={item.href}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-ink)]"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-ink)]"
              >
                {item.label}
              </Link>
            ),
          )}
          <a
            href={`https://wa.me/${site.whatsappE164}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-ink)]/90"
          >
            <IconWhatsApp className="h-4 w-4" />
            Falar agora
          </a>
        </nav>

        {/* Botão mobile */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] transition hover:bg-[var(--color-muted)] md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Painel mobile (drawer descendente) */}
      <div
        id="mobile-menu"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-[var(--color-border)] bg-[var(--color-surface)]`}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6" aria-label="Principal mobile">
          {nav.map((item) =>
            item.href.startsWith("/#") ? (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-lg px-3 py-3 text-base font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-muted)]"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-lg px-3 py-3 text-base font-medium text-[var(--color-ink)] transition-colors hover:bg-[var(--color-muted)]"
              >
                {item.label}
              </Link>
            ),
          )}
          <a
            href={`https://wa.me/${site.whatsappE164}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-ink)]/90"
          >
            <IconWhatsApp className="h-4 w-4" />
            Falar com o advogado
          </a>
        </nav>
      </div>
    </header>
  );
}
