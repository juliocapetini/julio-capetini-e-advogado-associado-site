import { compare } from "bcryptjs";

/** Parâmetros conservadores para serverless (OWASP: m≥19 MiB, t≥2). */
const ARGON2_COST = {
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
} as const;

async function loadArgon2() {
  const { default: argon2 } = await import("argon2");
  return argon2;
}

function isArgon2idHash(stored: string): boolean {
  return stored.startsWith("$argon2id$");
}

function isBcryptHash(stored: string): boolean {
  return stored.startsWith("$2a$") || stored.startsWith("$2b$") || stored.startsWith("$2y$");
}

export async function hashPassword(plain: string): Promise<string> {
  const argon2 = await loadArgon2();
  return argon2.hash(plain, {
    type: argon2.argon2id,
    ...ARGON2_COST,
  });
}

export type VerifyPasswordResult =
  | { ok: true; upgradedHash?: string }
  | { ok: false };

/**
 * Verifica a senha. Hashes bcrypt antigos continuam válidos; em caso de sucesso devolve
 * `upgradedHash` para gravar Argon2id na próxima fase (login).
 */
export async function verifyPassword(plain: string, stored: string): Promise<VerifyPasswordResult> {
  if (isArgon2idHash(stored)) {
    try {
      const argon2 = await loadArgon2();
      if (await argon2.verify(stored, plain)) return { ok: true };
    } catch {
      return { ok: false };
    }
    return { ok: false };
  }
  if (isBcryptHash(stored)) {
    const match = await compare(plain, stored);
    if (!match) return { ok: false };
    const upgradedHash = await hashPassword(plain);
    return { ok: true, upgradedHash };
  }
  return { ok: false };
}
