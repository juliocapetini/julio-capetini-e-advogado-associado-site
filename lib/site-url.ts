/**
 * Interpreta `NEXT_PUBLIC_SITE_URL`: tem de ser URL válida. Sem protocolo, assume-se `https://`.
 * Valores inválidos ou placeholders (ex.: "unknow") são ignorados — evita `new URL` a rebentar no layout/metadata.
 */
function siteUrlFromExplicitEnv(raw: string | undefined): string | null {
  const trimmed = raw?.trim();
  if (!trimmed) return null;
  const noTrailingSlash = trimmed.replace(/\/+$/, "");
  const candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(noTrailingSlash)
    ? noTrailingSlash
    : `https://${noTrailingSlash}`;
  try {
    const u = new URL(candidate);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    const host = u.hostname.toLowerCase();
    if (!host) return null;
    // Evita placeholders tipo "unknow" virarem https://unknow (URL válida mas inútil).
    if (host !== "localhost" && !host.includes(".")) return null;
    return u.origin;
  } catch {
    return null;
  }
}

/**
 * URL pública do site (origem: scheme + host + port, sem path).
 *
 * Ordem: `NEXT_PUBLIC_SITE_URL` → `VERCEL_URL` → localhost.
 */
export function getSiteUrlString(): string {
  const fromEnv = siteUrlFromExplicitEnv(process.env.NEXT_PUBLIC_SITE_URL);
  if (fromEnv) return fromEnv;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
    if (host) return `https://${host}`;
  }

  return "http://localhost:3000";
}

export function getSiteUrl(): URL {
  return new URL(getSiteUrlString());
}

/** Caminho absoluto HTTPS (ou http em local) — necessário para og:image em WhatsApp / Facebook. */
export function absoluteUrl(path: string): string {
  const base = getSiteUrlString();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
