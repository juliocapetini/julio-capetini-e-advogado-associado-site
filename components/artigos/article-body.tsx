import { sanitizeArticleHtml } from "@/lib/sanitize-article-html";

type Props = { html: string };

export function ArticleBody({ html }: Props) {
  const safe = sanitizeArticleHtml(html);
  if (!safe) return null;

  return (
    <div
      className="article-md text-[var(--color-ink)]"
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
