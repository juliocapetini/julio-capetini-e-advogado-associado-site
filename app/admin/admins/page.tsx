import type { Metadata } from "next";
import { auth } from "@/auth";
import { AdminCreateForm } from "@/components/admin/admin-create-form";
import { AdminDeleteButton } from "@/components/admin/admin-delete-button";
import { listAdmins } from "@/lib/queries/users";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administradores",
  robots: { index: false, follow: false },
};

const dateFmt = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default async function AdminAdminsPage() {
  const [admins, session] = await Promise.all([listAdmins(), auth()]);
  const currentUserId = session?.user?.id ?? null;
  const isLastAdmin = admins.length <= 1;

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-serif text-2xl font-semibold text-[var(--color-ink)]">Administradores</h1>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
          Quem pode entrar em <span className="font-mono">/admin</span> e publicar artigos.
        </p>
      </header>

      <section aria-labelledby="lista-titulo">
        <h2 id="lista-titulo" className="text-sm font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
          {admins.length === 1 ? "1 administrador" : `${admins.length} administradores`}
        </h2>
        <ul className="mt-4 divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]">
          {admins.map((a) => {
            const isSelf = a.id === currentUserId;
            const disableRemove = isSelf || isLastAdmin;
            return (
              <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-5">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-[var(--color-ink)]">
                    {a.name}
                    {isSelf ? (
                      <span className="ml-2 rounded-full bg-[var(--color-muted)] px-2 py-0.5 text-xs font-normal text-[var(--color-ink-muted)]">
                        você
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-[var(--color-ink-muted)]">{a.email}</p>
                  <p className="mt-1 text-xs text-[var(--color-ink-muted)]">
                    Criado em {dateFmt.format(a.createdAt)}
                  </p>
                </div>
                <AdminDeleteButton id={a.id} email={a.email} disabled={disableRemove} />
              </li>
            );
          })}
        </ul>
        {isLastAdmin ? (
          <p className="mt-3 text-xs text-[var(--color-ink-muted)]">
            Só existe um administrador. Crie outro antes de remover este, para não ficar bloqueado fora do painel.
          </p>
        ) : null}
      </section>

      <section aria-labelledby="novo-titulo" className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-8">
        <h2 id="novo-titulo" className="font-serif text-xl font-semibold text-[var(--color-ink)]">
          Novo administrador
        </h2>
        <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
          A senha é guardada em hash Argon2id. Envie as credenciais por canal seguro à pessoa.
        </p>
        <div className="mt-6">
          <AdminCreateForm />
        </div>
      </section>
    </div>
  );
}
