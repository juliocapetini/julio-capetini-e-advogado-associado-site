import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/admin/logout-button";

export default async function AdminArtigosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="min-h-[60vh] bg-[var(--color-canvas)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <Link href="/admin/artigos" className="text-[var(--color-ink)] hover:text-[var(--color-accent)]">
              Artigos
            </Link>
            <Link
              href="/admin/artigos/novo"
              className="text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]"
            >
              Novo artigo
            </Link>
            <Link href="/artigos" className="text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]">
              Ver site público
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-[var(--color-ink-muted)] sm:inline">{session.user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}
