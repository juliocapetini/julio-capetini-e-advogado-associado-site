"use client";

import { useActionState, useEffect, useRef } from "react";
import { createAdmin, type AdminFormState } from "@/app/actions/admins";

const initial: AdminFormState = { ok: false, message: "" };

export function AdminCreateForm() {
  const [state, formAction, pending] = useActionState(createAdmin, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
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
        <label htmlFor="admin-name" className="block text-sm font-medium text-[var(--color-ink)]">
          Nome
        </label>
        <input
          id="admin-name"
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={120}
          autoComplete="name"
          className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </div>
      <div>
        <label htmlFor="admin-email" className="block text-sm font-medium text-[var(--color-ink)]">
          E-mail
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="admin-password" className="block text-sm font-medium text-[var(--color-ink)]">
            Senha
          </label>
          <input
            id="admin-password"
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
          <label htmlFor="admin-confirm" className="block text-sm font-medium text-[var(--color-ink)]">
            Confirmar senha
          </label>
          <input
            id="admin-confirm"
            name="confirm"
            type="password"
            required
            minLength={8}
            maxLength={200}
            autoComplete="new-password"
            className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-sm transition hover:brightness-105 disabled:opacity-60"
      >
        {pending ? "A criar…" : "Criar administrador"}
      </button>
    </form>
  );
}
