import Link from "next/link";
import type { Article } from "@/lib/db/schema";

type Props = { article: Article };

export function ArticleCard({ article }: Props) {
  const date = article.publishedAt
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(article.publishedAt)
    : null;

  return (
    <article className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-sm transition hover:border-[var(--color-accent)]/40">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-ink-muted)]">
        {date ?? "—"}
      </p>
      <h2 className="mt-2 font-serif text-xl font-semibold text-[var(--color-ink)]">
        <Link href={`/artigos/${article.slug}`} className="hover:text-[var(--color-accent)]">
          {article.title}
        </Link>
      </h2>
      {article.excerpt ? (
        <p className="mt-2 line-clamp-3 text-justify text-sm leading-relaxed text-[var(--color-ink-muted)]">{article.excerpt}</p>
      ) : null}
      <Link
        href={`/artigos/${article.slug}`}
        className="mt-4 inline-block text-sm font-semibold text-[var(--color-accent)] hover:underline"
      >
        Ler artigo
      </Link>
    </article>
  );
}
