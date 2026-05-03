import type { MetadataRoute } from "next";
import { listPublishedArticles } from "@/lib/queries/articles";
import { getSiteUrlString } from "@/lib/site-url";

/** Regenerar mapa periodicamente; artigos novos aparecem após revalidação. */
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrlString();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/artigos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    const articles = await listPublishedArticles();
    articleEntries = articles.map((a) => ({
      url: `${base}/artigos/${a.slug}`,
      lastModified: a.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    }));
  } catch {
    // Sem POSTGRES_URL ou BD indisponível no build: mantém apenas rotas estáticas.
  }

  return [...staticRoutes, ...articleEntries];
}
