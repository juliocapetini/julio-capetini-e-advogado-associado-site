import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "br",
  "hr",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "s",
  "del",
  "ins",
  "sub",
  "sup",
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",
  "blockquote",
  "q",
  "cite",
  "a",
  "code",
  "pre",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "figure",
  "figcaption",
  "div",
  "span",
  "button",
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  a: ["href", "title", "target", "rel", "class"],
  button: ["type", "class", "aria-label"],
  th: ["colspan", "rowspan", "scope", "class"],
  td: ["colspan", "rowspan", "class"],
  "*": ["class", "style", "aria-hidden", "aria-label", "role"],
};

/** Blocos <style> são ignorados — estilos de newsletter ficam em app/article-newsletter.css */
function stripStyleBlocks(html: string): string {
  return html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
}

/** Botão de CTA da newsletter → link para contacto (remove onclick inseguro). */
function normalizeNewsletterCta(html: string): string {
  return html.replace(
    /<button([^>]*class="[^"]*footer-btn[^"]*"[^>]*)>([\s\S]*?)<\/button>/gi,
    (_match, attrs: string, inner: string) => {
      const safeAttrs = attrs.replace(/\s*onclick="[^"]*"/gi, "");
      return `<a${safeAttrs} href="/contato">${inner}</a>`;
    },
  );
}

/** Remove scripts/event handlers; mantém classes e estilos inline seguros. Sem jsdom (compatível Vercel). */
export function sanitizeArticleHtml(dirty: string): string {
  const trimmed = stripStyleBlocks(dirty).trim();
  if (!trimmed) return "";

  const clean = sanitizeHtml(trimmed, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowProtocolRelative: false,
    allowedStyles: {
      "*": {
        height: [/^\d+(?:px|rem|em|%)$/],
        width: [/^\d+(?:px|rem|em|%)$/],
        "margin-top": [/^\d+(?:px|rem|em|%)$/],
        "margin-bottom": [/^\d+(?:px|rem|em|%)$/],
      },
    },
  });

  return normalizeNewsletterCta(clean);
}
