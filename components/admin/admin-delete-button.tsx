"use client";

import { useActionState } from "react";
import { deleteAdmin, type AdminFormState } from "@/app/actions/admins";

const initial: AdminFormState = { ok: false, message: "" };

type Props = {
  id: string;
  email: string;
  disabled?: boolean;
};

export function AdminDeleteButton({ id, email, disabled }: Props) {
  const [state, formAction, pending] = useActionState(deleteAdmin, initial);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const ok = window.confirm(`Remover o administrador "${email}"?\n\nEsta ação não pode ser desfeita.`);
    if (!ok) e.preventDefault();
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="flex items-center gap-3">
      <input type="hidden" name="id" value={id} />
      {state.message && !state.ok ? (
        <span className="text-xs text-red-700" role="alert">
          {state.message}
        </span>
      ) : null}
      <button
        type="submit"
        disabled={pending || disabled}
        title={disabled ? "Indisponível" : "Remover administrador"}
        className="shrink-0 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
      >
        {pending ? "A remover…" : "Remover"}
      </button>
    </form>
  );
}
