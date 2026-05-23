import Link from "next/link";
import { ArtigoDeleteButton } from "@/components/admin/artigo-delete-button";
import { listAllArticlesForAdmin } from "@/lib/queries/articles";

export const dynamic = "force-dynamic";

export default async function AdminArtigosListPage() {
  const items = await listAllArticlesForAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[var(--color-ink)]">Artigos</h1>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">Rascunhos e publicados</p>
        </div>
        <Link
          href="/admin/artigos/novo"
          className="rounded-xl bg-[var(--color-accent)] px-4 py-2.5 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-sm hover:brightness-105"
        >
          Novo artigo
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="mt-12 text-center text-[var(--color-ink-muted)]">Ainda não há artigos. Crie o primeiro.</p>
      ) : (
        <ul className="mt-8 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]">
          {items.map((a) => (
            <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[var(--color-ink)]">{a.title}</p>
                <p className="mt-0.5 truncate font-mono text-xs text-[var(--color-ink-muted)]">/{a.slug}</p>
                <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                  {a.publishedAt ? (
                    <span className="text-emerald-700">Publicado</span>
                  ) : (
                    <span>Rascunho</span>
                  )}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Link
                  href={`/admin/artigos/${a.id}/editar`}
                  className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-muted)]"
                >
                  Editar
                </Link>
                <ArtigoDeleteButton id={a.id} title={a.title} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
