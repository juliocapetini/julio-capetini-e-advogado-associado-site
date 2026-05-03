import argon2 from "argon2";

/** Parâmetros conservadores para serverless (OWASP: m≥19 MiB, t≥2). */
const ARGON2_OPTIONS = {
  type: argon2.argon2id,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
} as const;

export function hashPassword(plain: string): Promise<string> {
  return argon2.hash(plain, ARGON2_OPTIONS);
}

export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
  if (!stored.startsWith("$argon2id$")) return false;
  try {
    return await argon2.verify(stored, plain);
  } catch {
    return false;
  }
}
