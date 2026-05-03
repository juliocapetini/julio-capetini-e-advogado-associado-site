/**
 * Auth.js usa `AUTH_URL` / `NEXTAUTH_URL` em `new URL(...)` sem tolerância a erros.
 * Valores inválidos na Vercel (placeholder, `http://`, só espaços) causam CallbackRouteError + Invalid URL no login.
 *
 * Se não houver URL válida, remove-se a variável para o Auth.js inferir o host a partir dos headers
 * (`trustHost` + `x-forwarded-host` na Vercel).
 */
function tryCanonicalAuthOrigin(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(t) ? t : `https://${t}`;
  try {
    const u = new URL(candidate);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (!u.hostname) return null;
    return u.origin;
  } catch {
    return null;
  }
}

export function ensureValidAuthUrlEnv(): void {
  const authUrl = process.env.AUTH_URL;
  const nextAuthUrl = process.env.NEXTAUTH_URL;
  const normalized =
    (authUrl && tryCanonicalAuthOrigin(authUrl)) ||
    (nextAuthUrl && tryCanonicalAuthOrigin(nextAuthUrl)) ||
    null;

  if (normalized) {
    process.env.AUTH_URL = normalized;
    delete process.env.NEXTAUTH_URL;
  } else {
    delete process.env.AUTH_URL;
    delete process.env.NEXTAUTH_URL;
  }
}
