"use client";

import { useActionState } from "react";
import Link from "next/link";
import { resetPassword, type ResetState } from "@/app/actions/password-reset";

const initial: ResetState = { ok: false, message: "" };

type Props = {
  token: string;
};

export function PasswordResetForm({ token }: Props) {
  const [state, formAction, pending] = useActionState(resetPassword, initial);

  if (state.ok) {
    return (
      <div className="space-y-5">
        <p
          className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
          role="alert"
        >
          {state.message}
        </p>
        <Link
          href="/admin/login"
          className="block w-full rounded-xl bg-[var(--color-accent)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-accent-foreground)] shadow-sm transition hover:brightness-105"
        >
          Ir para o login
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="token" value={token} />

      {state.message ? (
        <p
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <div>
        <label htmlFor="new-password" className="block text-sm font-medium text-[var(--color-ink)]">
          Nova senha
        </label>
        <input
          id="new-password"
          name="password"
          type="password"
          required
          minLength={8}
          maxLength={200}
          autoComplete="new-password"
          className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
        <p className="mt-1.5 text-xs text-[var(--color-ink-muted)]">Mínimo 8 caracteres.</p>
      </div>

      <div>
        <label htmlFor="new-password-confirm" className="block text-sm font-medium text-[var(--color-ink)]">
          Confirmar nova senha
        </label>
        <input
          id="new-password-confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          maxLength={200}
          autoComplete="new-password"
          className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-sm transition hover:brightness-105 disabled:opacity-60"
      >
        {pending ? "A guardar…" : "Definir nova senha"}
      </button>
    </form>
  );
}
