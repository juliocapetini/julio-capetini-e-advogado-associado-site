/**
 * URL base absoluta para construir links em emails, redirects e metadata.
 * Ordem de prioridade: NEXT_PUBLIC_SITE_URL → AUTH_URL → VERCEL_URL → localhost.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.AUTH_URL;
  if (explicit) return stripTrailingSlash(ensureProtocol(explicit));
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${stripTrailingSlash(vercel)}`;
  return "http://localhost:3000";
}

function ensureProtocol(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
}

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}
