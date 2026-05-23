import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PasswordResetRequestForm } from "@/components/admin/password-reset-request-form";

export const metadata: Metadata = {
  title: "Esqueci a senha — Administração",
  robots: { index: false, follow: false },
};

export default async function EsqueciSenhaPage() {
  const session = await auth();
  if (session?.user) redirect("/admin/artigos");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-semibold text-[var(--color-ink)]">Esqueci minha senha</h1>
        <p className="mt-2 text-justify text-sm leading-relaxed text-[var(--color-ink-muted)]">
          Indique o e-mail associado à sua conta de administrador. Enviaremos um link
          para definir uma nova senha; o link é válido por uma hora.
        </p>
        <div className="mt-8">
          <PasswordResetRequestForm />
        </div>
        <p className="mt-8 text-center text-sm text-[var(--color-ink-muted)]">
          <Link href="/" className="text-[var(--color-accent)] hover:underline">
            Voltar ao site
          </Link>
        </p>
      </div>
    </div>
  );
}
