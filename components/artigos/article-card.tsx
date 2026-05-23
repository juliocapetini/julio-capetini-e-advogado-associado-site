import Link from "next/link";
import { IconArrowRight } from "@/components/icons/ui-icons";
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
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:shadow-[var(--shadow-card)]">
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-soft)] transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden
      />
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-subtle)]">
        {date ?? "—"}
      </p>
      <h2 className="mt-2 font-serif text-xl font-semibold text-[var(--color-ink)] text-pretty">
        <Link
          href={`/artigos/${article.slug}`}
          className="cursor-pointer transition-colors hover:text-[var(--color-accent)]"
        >
          {article.title}
        </Link>
      </h2>
      {article.excerpt ? (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--color-ink-muted)] text-pretty">
          {article.excerpt}
        </p>
      ) : null}
      <Link
        href={`/artigos/${article.slug}`}
        className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-[var(--color-accent)] transition hover:gap-2.5"
      >
        Ler artigo
        <IconArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
