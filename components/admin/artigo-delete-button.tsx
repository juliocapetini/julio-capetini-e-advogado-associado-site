"use client";

import { useActionState } from "react";
import { deleteArtigo, type ArtigoFormState } from "@/app/actions/artigos";

const initial: ArtigoFormState = { ok: false, message: "" };

type Props = {
  id: string;
  title: string;
  /** "list" = botão compacto na tabela; "edit" = zona de perigo na página de edição */
  variant?: "list" | "edit";
};

export function ArtigoDeleteButton({ id, title, variant = "list" }: Props) {
  const [state, formAction, pending] = useActionState(deleteArtigo, initial);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const ok = window.confirm(
      `Remover o artigo "${title}"?\n\nEsta ação não pode ser desfeita. O artigo deixará de aparecer no site.`,
    );
    if (!ok) e.preventDefault();
  }

  const isEdit = variant === "edit";

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className={isEdit ? "space-y-3" : "flex items-center gap-2"}
    >
      <input type="hidden" name="id" value={id} />
      {state.message && !state.ok ? (
        <p className="text-sm text-red-700" role="alert">
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className={
          isEdit
            ? "rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
            : "shrink-0 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:opacity-60"
        }
      >
        {pending ? "A remover…" : isEdit ? "Apagar artigo" : "Apagar"}
      </button>
    </form>
  );
}
