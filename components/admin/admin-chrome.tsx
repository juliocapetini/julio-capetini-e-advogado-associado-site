import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/admin/logout-button";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/admin/artigos", label: "Artigos" },
  { href: "/admin/artigos/novo", label: "Novo artigo" },
  { href: "/admin/admins", label: "Administradores" },
  { href: "/artigos", label: "Ver site público" },
];

type Props = {
  children: ReactNode;
  userEmail?: string | null;
  currentSection: "artigos" | "admins";
};

export function AdminChrome({ children, userEmail, currentSection }: Props) {
  return (
    <div className="min-h-[60vh] bg-[var(--color-canvas)]">
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
            {NAV.map((item) => {
              const isActive =
                (currentSection === "artigos" && item.href === "/admin/artigos") ||
                (currentSection === "admins" && item.href === "/admin/admins");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive
                      ? "text-[var(--color-ink)] hover:text-[var(--color-accent)]"
                      : "text-[var(--color-ink-muted)] hover:text-[var(--color-accent)]"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            {userEmail ? (
              <span className="hidden text-xs text-[var(--color-ink-muted)] sm:inline">{userEmail}</span>
            ) : null}
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">{children}</div>
    </div>
  );
}
