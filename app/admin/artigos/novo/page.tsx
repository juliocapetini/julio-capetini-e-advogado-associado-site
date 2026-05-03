import type { Metadata } from "next";
import { ArtigoEditorForm } from "@/components/admin/artigo-editor-form";

export const metadata: Metadata = {
  title: "Novo artigo",
  robots: { index: false, follow: false },
};

export default function NovoArtigoPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-[var(--color-ink)]">Novo artigo</h1>
      <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
        No corpo use a barra de ferramentas ou escreva Markdown; a pré-visualização mostra o resultado.
      </p>
      <div className="mt-8 max-w-3xl">
        <ArtigoEditorForm mode="create" />
      </div>
    </div>
  );
}
