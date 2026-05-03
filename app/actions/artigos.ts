"use server";

import { auth } from "@/auth";
import { getDb, articles } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const LIMITS = { title: 200, excerpt: 500, body: 100_000, slug: 120 };

function requireAdmin() {
  return auth().then((s) => {
    if (!s?.user?.id || s.user.role !== "admin") {
      throw new Error("Não autorizado");
    }
    return s.user;
  });
}

export type ArtigoFormState = { ok: boolean; message: string };

export async function createArtigo(_prev: ArtigoFormState, formData: FormData): Promise<ArtigoFormState> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return { ok: false, message: "Sessão inválida. Inicie sessão novamente." };
  }

  const title = String(formData.get("title") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const body = String(formData.get("body") ?? "").trim();
  const publish = formData.get("publish") === "on";

  if (!title || title.length > LIMITS.title) {
    return { ok: false, message: "Título inválido ou demasiado longo." };
  }
  if (!slug) slug = slugify(title);
  if (!slug || slug.length > LIMITS.slug) {
    return { ok: false, message: "Slug inválido. Ajuste o título ou o slug." };
  }
  if (excerpt && excerpt.length > LIMITS.excerpt) {
    return { ok: false, message: "Resumo demasiado longo." };
  }
  if (!body || body.length > LIMITS.body) {
    return { ok: false, message: "Corpo do artigo em falta ou demasiado longo." };
  }

  const db = getDb();
  const publishedAt = publish ? new Date() : null;

  try {
    await db.insert(articles).values({
      slug,
      title,
      excerpt,
      body,
      publishedAt,
      authorId: user.id,
      updatedAt: new Date(),
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("unique") || msg.includes("duplicate")) {
      return { ok: false, message: "Já existe um artigo com este slug. Altere o slug." };
    }
    return { ok: false, message: "Não foi possível guardar. Tente novamente." };
  }

  revalidatePath("/artigos");
  revalidatePath(`/artigos/${slug}`);
  redirect("/admin/artigos");
}

export async function updateArtigo(_prev: ArtigoFormState, formData: FormData): Promise<ArtigoFormState> {
  let user;
  try {
    user = await requireAdmin();
  } catch {
    return { ok: false, message: "Sessão inválida. Inicie sessão novamente." };
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return { ok: false, message: "Identificador em falta." };
  }

  const title = String(formData.get("title") ?? "").trim();
  let slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const body = String(formData.get("body") ?? "").trim();
  const publish = formData.get("publish") === "on";

  if (!title || title.length > LIMITS.title) {
    return { ok: false, message: "Título inválido ou demasiado longo." };
  }
  if (!slug) slug = slugify(title);
  if (!slug || slug.length > LIMITS.slug) {
    return { ok: false, message: "Slug inválido." };
  }
  if (excerpt && excerpt.length > LIMITS.excerpt) {
    return { ok: false, message: "Resumo demasiado longo." };
  }
  if (!body || body.length > LIMITS.body) {
    return { ok: false, message: "Corpo inválido ou demasiado longo." };
  }

  const db = getDb();
  const existing = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  const row = existing[0];
  if (!row) {
    return { ok: false, message: "Artigo não encontrado." };
  }

  const publishedAt = publish ? (row.publishedAt ?? new Date()) : null;

  try {
    await db
      .update(articles)
      .set({
        slug,
        title,
        excerpt,
        body,
        publishedAt,
        authorId: user.id,
        updatedAt: new Date(),
      })
      .where(eq(articles.id, id));
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("unique") || msg.includes("duplicate")) {
      return { ok: false, message: "Já existe um artigo com este slug." };
    }
    return { ok: false, message: "Não foi possível atualizar." };
  }

  revalidatePath("/artigos");
  revalidatePath(`/artigos/${slug}`);
  revalidatePath(`/artigos/${row.slug}`);
  redirect("/admin/artigos");
}
