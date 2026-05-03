import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtigoEditorForm } from "@/components/admin/artigo-editor-form";
import { getArticleByIdForAdmin } from "@/lib/queries/articles";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleByIdForAdmin(id);
  if (!article) return { title: "Editar" };
  return { title: `Editar — ${article.title}`, robots: { index: false, follow: false } };
}

export default async function EditarArtigoPage({ params }: Props) {
  const { id } = await params;
  const article = await getArticleByIdForAdmin(id);
  if (!article) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[var(--color-ink)]">Editar artigo</h1>
      <div className="mt-8 max-w-3xl">
        <ArtigoEditorForm
          mode="edit"
          initial={{
            id: article.id,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt ?? "",
            body: article.body,
            published: article.publishedAt != null,
          }}
        />
      </div>
    </div>
  );
}
