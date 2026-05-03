import { and, desc, eq, isNotNull, lte } from "drizzle-orm";
import { getDb, articles } from "@/lib/db";

export async function listPublishedArticles() {
  const db = getDb();
  const now = new Date();
  return db
    .select()
    .from(articles)
    .where(and(isNotNull(articles.publishedAt), lte(articles.publishedAt, now)))
    .orderBy(desc(articles.publishedAt));
}

export async function getArticleBySlug(slug: string) {
  const db = getDb();
  const now = new Date();
  const rows = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1);
  const row = rows[0];
  if (!row) return null;
  if (!row.publishedAt || row.publishedAt > now) return null;
  return row;
}

export async function listAllArticlesForAdmin() {
  const db = getDb();
  return db.select().from(articles).orderBy(desc(articles.updatedAt));
}

export async function getArticleByIdForAdmin(id: string) {
  const db = getDb();
  const rows = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return rows[0] ?? null;
}
