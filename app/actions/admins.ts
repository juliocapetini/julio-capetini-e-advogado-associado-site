"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { articles, getDb, users } from "@/lib/db";
import { hashPassword } from "@/lib/password";

const LIMITS = {
  emailMax: 254,
  nameMin: 2,
  nameMax: 120,
  passwordMin: 8,
  passwordMax: 200,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function requireAdmin() {
  const s = await auth();
  if (!s?.user?.id || s.user.role !== "admin") {
    throw new Error("Não autorizado");
  }
  return s.user as { id: string; email: string; role: string };
}

export type AdminFormState = { ok: boolean; message: string };

export async function createAdmin(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  try {
    await requireAdmin();
  } catch {
    return { ok: false, message: "Sessão inválida. Inicie sessão novamente." };
  }

  const emailRaw = String(formData.get("email") ?? "").toLowerCase().trim();
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!emailRaw || emailRaw.length > LIMITS.emailMax || !EMAIL_RE.test(emailRaw)) {
    return { ok: false, message: "E-mail inválido." };
  }
  if (name.length < LIMITS.nameMin || name.length > LIMITS.nameMax) {
    return { ok: false, message: "Nome deve ter entre 2 e 120 caracteres." };
  }
  if (password.length < LIMITS.passwordMin || password.length > LIMITS.passwordMax) {
    return {
      ok: false,
      message: `Senha deve ter entre ${LIMITS.passwordMin} e ${LIMITS.passwordMax} caracteres.`,
    };
  }
  if (password !== confirm) {
    return { ok: false, message: "Senha e confirmação não coincidem." };
  }

  const db = getDb();
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, emailRaw))
    .limit(1);
  if (existing.length > 0) {
    return { ok: false, message: "Já existe um utilizador com este e-mail." };
  }

  const passwordHash = await hashPassword(password);

  try {
    await db.insert(users).values({
      email: emailRaw,
      name,
      passwordHash,
      role: "admin",
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("unique") || msg.includes("duplicate")) {
      return { ok: false, message: "Já existe um utilizador com este e-mail." };
    }
    return { ok: false, message: "Não foi possível criar o administrador." };
  }

  revalidatePath("/admin/admins");
  return { ok: true, message: `Administrador criado: ${emailRaw}` };
}

export async function deleteAdmin(
  _prev: AdminFormState,
  formData: FormData,
): Promise<AdminFormState> {
  let currentUser;
  try {
    currentUser = await requireAdmin();
  } catch {
    return { ok: false, message: "Sessão inválida. Inicie sessão novamente." };
  }

  const id = String(formData.get("id") ?? "").trim();
  if (!id) {
    return { ok: false, message: "Identificador em falta." };
  }
  if (id === currentUser.id) {
    return { ok: false, message: "Não pode remover a própria conta enquanto está autenticado." };
  }

  const db = getDb();

  const target = await db
    .select({ id: users.id, email: users.email, role: users.role })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  const row = target[0];
  if (!row) {
    return { ok: false, message: "Administrador não encontrado." };
  }
  if (row.role !== "admin") {
    return { ok: false, message: "Este utilizador não é administrador." };
  }

  const admins = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.role, "admin"));
  if (admins.length <= 1) {
    return { ok: false, message: "Não pode remover o último administrador." };
  }

  try {
    await db.update(articles).set({ authorId: null }).where(eq(articles.authorId, id));
    await db.delete(users).where(eq(users.id, id));
  } catch {
    return { ok: false, message: "Não foi possível remover. Tente novamente." };
  }

  revalidatePath("/admin/admins");
  return { ok: true, message: `Administrador removido: ${row.email}` };
}
