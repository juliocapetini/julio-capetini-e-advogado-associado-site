import DOMPurify from "isomorphic-dompurify";

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

const ALLOWED_ATTR = [
  "href",
  "title",
  "target",
  "rel",
  "colspan",
  "rowspan",
  "scope",
  "class",
  "style",
  "aria-hidden",
  "aria-label",
  "role",
  "type",
];

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

/** Remove scripts/event handlers; mantém classes e estilos inline seguros. */
export function sanitizeArticleHtml(dirty: string): string {
  const trimmed = stripStyleBlocks(dirty).trim();
  if (!trimmed) return "";

  const clean = DOMPurify.sanitize(trimmed, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });

  return normalizeNewsletterCta(clean);
}
