import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtigoDeleteButton } from "@/components/admin/artigo-delete-button";
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
      <section
        aria-labelledby="apagar-titulo"
        className="mt-12 max-w-3xl rounded-2xl border border-red-200 bg-red-50/40 p-6"
      >
        <h2 id="apagar-titulo" className="text-sm font-semibold text-red-900">
          Zona de perigo
        </h2>
        <p className="mt-1 text-sm text-red-800/90">
          Apagar remove o artigo de forma permanente, incluindo rascunhos e versões publicadas.
        </p>
        <div className="mt-4">
          <ArtigoDeleteButton id={article.id} title={article.title} variant="edit" />
        </div>
      </section>
    </div>
  );
}
