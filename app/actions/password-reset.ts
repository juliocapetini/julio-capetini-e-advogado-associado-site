"use server";

import { eq } from "drizzle-orm";
import { getDb, users } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { issueResetToken, consumeResetToken } from "@/lib/auth/reset-tokens";
import { sendPasswordResetEmail } from "@/lib/email/password-reset";
import { getSiteUrl } from "@/lib/url";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 200;

const GENERIC_REQUEST_OK =
  "Se o e-mail estiver associado a uma conta de administrador, enviámos as instruções para redefinir a senha.";

export type RequestResetState = { ok: boolean; message: string };
export type ResetState = { ok: boolean; message: string };

export async function requestPasswordReset(
  _prev: RequestResetState,
  formData: FormData,
): Promise<RequestResetState> {
  const email = String(formData.get("email") ?? "").toLowerCase().trim();
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, message: "Indique um e-mail válido." };
  }

  const db = getDb();
  const rows = await db
    .select({ id: users.id, name: users.name, email: users.email, role: users.role })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  const user = rows[0];

  if (!user || user.role !== "admin") {
    return { ok: true, message: GENERIC_REQUEST_OK };
  }

  try {
    const issued = await issueResetToken(user.id);
    const resetUrl = `${getSiteUrl()}/admin/redefinir-senha?token=${encodeURIComponent(issued.token)}`;
    const result = await sendPasswordResetEmail({
      to: user.email,
      name: user.name,
      resetUrl,
      expiresAt: issued.expiresAt,
    });
    if (!result.ok) {
      if (result.reason === "not_configured") {
        return {
          ok: false,
          message:
            "Envio de email não está configurado neste servidor. Avise o responsável técnico (RESEND_API_KEY / RESEND_FROM_EMAIL).",
        };
      }
      return {
        ok: false,
        message: "Não foi possível enviar o email agora. Tente novamente em alguns minutos.",
      };
    }
  } catch {
    return {
      ok: false,
      message: "Não foi possível processar o pedido. Tente novamente em alguns minutos.",
    };
  }

  return { ok: true, message: GENERIC_REQUEST_OK };
}

export async function resetPassword(
  _prev: ResetState,
  formData: FormData,
): Promise<ResetState> {
  const token = String(formData.get("token") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!token) {
    return { ok: false, message: "Link inválido ou em falta." };
  }
  if (password.length < PASSWORD_MIN || password.length > PASSWORD_MAX) {
    return {
      ok: false,
      message: `A nova senha deve ter entre ${PASSWORD_MIN} e ${PASSWORD_MAX} caracteres.`,
    };
  }
  if (password !== confirm) {
    return { ok: false, message: "A senha e a confirmação não coincidem." };
  }

  const consumed = await consumeResetToken(token);
  if (!consumed) {
    return {
      ok: false,
      message: "Este link já não é válido. Peça um novo email de redefinição.",
    };
  }

  const passwordHash = await hashPassword(password);
  const db = getDb();
  try {
    await db.update(users).set({ passwordHash }).where(eq(users.id, consumed.userId));
  } catch {
    return {
      ok: false,
      message: "Não foi possível atualizar a senha. Tente novamente.",
    };
  }

  return {
    ok: true,
    message: "Senha redefinida com sucesso. Já pode iniciar sessão.",
  };
}
