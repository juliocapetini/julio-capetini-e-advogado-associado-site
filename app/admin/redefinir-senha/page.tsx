import type { Metadata } from "next";
import Link from "next/link";
import { PasswordResetForm } from "@/components/admin/password-reset-form";
import { isResetTokenUsable } from "@/lib/auth/reset-tokens";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Redefinir senha — Administração",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function RedefinirSenhaPage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  const safeToken = (token ?? "").trim();
  const valid = safeToken ? await isResetTokenUsable(safeToken) : false;

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-semibold text-[var(--color-ink)]">Definir nova senha</h1>

        {valid ? (
          <>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
              Escolha uma senha forte. Não a partilhe com ninguém.
            </p>
            <div className="mt-8">
              <PasswordResetForm token={safeToken} />
            </div>
          </>
        ) : (
          <>
            <p className="mt-2 text-sm text-[var(--color-ink-muted)]">
              Este link de redefinição já não é válido — pode ter expirado, já ter sido usado,
              ou ter sido substituído por um pedido mais recente.
            </p>
            <div className="mt-8 space-y-3">
              <Link
                href="/admin/esqueci-senha"
                className="block w-full rounded-xl bg-[var(--color-accent)] px-4 py-3 text-center text-sm font-semibold text-[var(--color-accent-foreground)] shadow-sm transition hover:brightness-105"
              >
                Pedir novo link
              </Link>
              <Link
                href="/admin/login"
                className="block w-full rounded-xl border border-[var(--color-border)] px-4 py-3 text-center text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-muted)]"
              >
                Voltar ao login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
