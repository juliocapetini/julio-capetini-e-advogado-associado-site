import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Entrar — Administração",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin/artigos");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-8 shadow-sm">
        <h1 className="font-serif text-2xl font-semibold text-[var(--color-ink)]">Área reservada</h1>
        <p className="mt-2 text-justify text-sm leading-relaxed text-[var(--color-ink-muted)]">
          Inicie sessão para gerir artigos. Acesso exclusivo da equipa.
        </p>
        <div className="mt-8">
          <LoginForm />
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
