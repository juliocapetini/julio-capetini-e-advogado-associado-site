/**
 * URL pública do site (sem barra final).
 *
 * Ordem: `NEXT_PUBLIC_SITE_URL` (produção/domínio final) → `VERCEL_URL` (deploy na Vercel, ex.: paulo-adv.vercel.app)
 * → localhost. Sem isto, Open Graph / WhatsApp recebem `localhost` nos metadados e a pré-visualização falha.
 */
export function getSiteUrlString(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//i, "").replace(/\/+$/, "");
    return `https://${host}`;
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
