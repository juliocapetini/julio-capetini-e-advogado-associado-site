import type { Metadata } from "next";
import { ArticleCard } from "@/components/artigos/article-card";
import type { Article } from "@/lib/db/schema";
import { listPublishedArticles } from "@/lib/queries/articles";
import { defaultSocialImage, site } from "@/lib/site-content";
import { absoluteUrl, getSiteUrlString } from "@/lib/site-url";

export const dynamic = "force-dynamic";

const artigosDescription =
  "Artigos e conteúdos jurídicos da equipe Julio Capetini e Advogado associado — temas relevantes para clientes e parceiros.";

const base = getSiteUrlString();
const artigosOgImage = absoluteUrl(defaultSocialImage.src);

export const metadata: Metadata = {
  title: "Artigos",
  description: artigosDescription,
  alternates: { canonical: "/artigos" },
  openGraph: {
    title: `Artigos | ${site.name}`,
    description: artigosDescription,
    url: `${base}/artigos`,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: artigosOgImage,
        secureUrl: artigosOgImage,
        alt: defaultSocialImage.alt,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Artigos | ${site.shortName}`,
    description: artigosDescription,
    images: [artigosOgImage],
  },
};

export default async function ArtigosPage() {
  let items: Article[];
  try {
    items = await listPublishedArticles();
  } catch {
    items = [];
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:py-20">
      <header className="border-b border-[var(--color-border)] pb-10">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
          Artigos
        </h1>
        <p className="mt-3 text-justify leading-relaxed text-[var(--color-ink-muted)]">
          Textos sobre direito e temas relevantes para clientes e parceiros.
        </p>
      </header>
      {items.length === 0 ? (
        <p className="mx-auto mt-12 max-w-md text-justify text-[var(--color-ink-muted)]">
          Ainda não há artigos publicados. Volte em breve.
        </p>
      ) : (
        <ul className="mt-10 space-y-6">
          {items.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
