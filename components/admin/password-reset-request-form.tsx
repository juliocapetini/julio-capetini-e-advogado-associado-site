"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  requestPasswordReset,
  type RequestResetState,
} from "@/app/actions/password-reset";

const initial: RequestResetState = { ok: false, message: "" };

export function PasswordResetRequestForm() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, initial);

  return (
    <form action={formAction} className="space-y-5">
      {state.message ? (
        <p
          className={`rounded-lg px-4 py-3 text-sm ${
            state.ok
              ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border border-red-200 bg-red-50 text-red-800"
          }`}
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <div>
        <label htmlFor="reset-email" className="block text-sm font-medium text-[var(--color-ink)]">
          E-mail
        </label>
        <input
          id="reset-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-sm transition hover:brightness-105 disabled:opacity-60"
      >
        {pending ? "A enviar…" : "Enviar instruções"}
      </button>

      <p className="text-center text-sm text-[var(--color-ink-muted)]">
        <Link href="/admin/login" className="text-[var(--color-accent)] hover:underline">
          Voltar ao login
        </Link>
      </p>
    </form>
  );
}
