"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-ink-muted)] transition hover:bg-[var(--color-muted)] hover:text-[var(--color-ink)]"
    >
      Sair
    </button>
  );
}
