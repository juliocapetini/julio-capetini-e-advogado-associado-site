import { randomBytes, createHash } from "node:crypto";
import { and, eq, isNull, gt } from "drizzle-orm";
import { getDb, passwordResetTokens, users } from "@/lib/db";

/** Duração do token de reposição de senha. */
export const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

/**
 * Token entregue ao utilizador (apenas no email).
 * O servidor guarda apenas SHA-256 deste valor.
 */
export type IssuedResetToken = {
  token: string;
  expiresAt: Date;
};

export function hashResetToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function generateOpaqueToken(): string {
  return randomBytes(32).toString("base64url");
}

/** Cria um novo token, invalidando os anteriores do mesmo utilizador. */
export async function issueResetToken(userId: string): Promise<IssuedResetToken> {
  const db = getDb();
  const token = generateOpaqueToken();
  const tokenHash = hashResetToken(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + RESET_TOKEN_TTL_MS);

  await db
    .update(passwordResetTokens)
    .set({ usedAt: now })
    .where(
      and(
        eq(passwordResetTokens.userId, userId),
        isNull(passwordResetTokens.usedAt),
        gt(passwordResetTokens.expiresAt, now),
      ),
    );

  await db.insert(passwordResetTokens).values({ userId, tokenHash, expiresAt });

  return { token, expiresAt };
}

export type ConsumedResetToken = {
  userId: string;
  email: string;
};

/**
 * Valida o token e marca como consumido (single-use).
 * Retorna `null` se inválido, expirado ou já usado.
 */
export async function consumeResetToken(token: string): Promise<ConsumedResetToken | null> {
  if (!token || token.length < 16 || token.length > 200) return null;
  const tokenHash = hashResetToken(token);
  const db = getDb();
  const now = new Date();

  const rows = await db
    .select({
      id: passwordResetTokens.id,
      userId: passwordResetTokens.userId,
      usedAt: passwordResetTokens.usedAt,
      expiresAt: passwordResetTokens.expiresAt,
      email: users.email,
      role: users.role,
    })
    .from(passwordResetTokens)
    .innerJoin(users, eq(users.id, passwordResetTokens.userId))
    .where(eq(passwordResetTokens.tokenHash, tokenHash))
    .limit(1);

  const row = rows[0];
  if (!row) return null;
  if (row.usedAt) return null;
  if (row.expiresAt <= now) return null;
  if (row.role !== "admin") return null;

  const result = await db
    .update(passwordResetTokens)
    .set({ usedAt: now })
    .where(and(eq(passwordResetTokens.id, row.id), isNull(passwordResetTokens.usedAt)))
    .returning({ id: passwordResetTokens.id });

  if (result.length === 0) return null;

  return { userId: row.userId, email: row.email };
}

/** Inspeção leve para a página de redefinir mostrar se o link já não vale. */
export async function isResetTokenUsable(token: string): Promise<boolean> {
  if (!token || token.length < 16 || token.length > 200) return false;
  const tokenHash = hashResetToken(token);
  const db = getDb();
  const now = new Date();

  const rows = await db
    .select({
      usedAt: passwordResetTokens.usedAt,
      expiresAt: passwordResetTokens.expiresAt,
    })
    .from(passwordResetTokens)
    .where(eq(passwordResetTokens.tokenHash, tokenHash))
    .limit(1);

  const row = rows[0];
  if (!row) return false;
  if (row.usedAt) return false;
  if (row.expiresAt <= now) return false;
  return true;
}
