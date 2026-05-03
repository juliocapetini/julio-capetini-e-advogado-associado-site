import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/artigos/article-body";
import { getArticleBySlug } from "@/lib/queries/articles";
import { defaultSocialImage } from "@/lib/site-content";
import { absoluteUrl, getSiteUrlString } from "@/lib/site-url";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Artigo", robots: { index: false, follow: false } };

  const description = article.excerpt ?? article.title;
  const base = getSiteUrlString();
  const articleOgImage = absoluteUrl(defaultSocialImage.src);

  return {
    title: article.title,
    description,
    alternates: { canonical: `/artigos/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt ?? undefined,
      type: "article",
      url: `${base}/artigos/${slug}`,
      locale: "pt_BR",
      publishedTime: article.publishedAt?.toISOString(),
      modifiedTime: article.updatedAt.toISOString(),
      images: [
        {
          url: articleOgImage,
          secureUrl: articleOgImage,
          alt: defaultSocialImage.alt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [articleOgImage],
    },
  };
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const date = article.publishedAt
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(article.publishedAt)
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <Link
        href="/artigos"
        className="text-sm font-medium text-[var(--color-accent)] hover:underline"
      >
        ← Todos os artigos
      </Link>
      <article className="mt-8">
        <header className="border-b border-[var(--color-border)] pb-8">
          <p className="text-sm text-[var(--color-ink-muted)]">{date}</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mt-4 text-justify text-lg leading-relaxed text-[var(--color-ink-muted)]">{article.excerpt}</p>
          ) : null}
        </header>
        <div className="pt-10">
          <ArticleBody markdown={article.body} />
        </div>
      </article>
    </div>
  );
}
