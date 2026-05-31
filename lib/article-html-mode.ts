/** HTML com layout/classes de newsletter ou markup rico — não deve ir para o editor visual sem aviso. */
export function isRichArticleHtml(html: string): boolean {
  const trimmed = html.trim();
  if (!trimmed) return false;

  return (
    /\bclass="[^"]*\bnw[\s"-]/.test(trimmed) ||
    /\bclass="[^"]*page-wrap/.test(trimmed) ||
    /\bclass="[^"]*masthead/.test(trimmed) ||
    /\bclass="[^"]*pill/.test(trimmed) ||
    /\bclass="[^"]*focus-/.test(trimmed) ||
    (/<(?:header|section|article|footer)[\s>]/i.test(trimmed) && /\bclass="/i.test(trimmed)) ||
    (/<div[\s>]/i.test(trimmed) && /\bclass="/i.test(trimmed))
  );
}

export type ArticleContentMode = "html" | "editor";

export function detectArticleContentMode(html: string): ArticleContentMode {
  if (!html.trim()) return "editor";
  if (isRichArticleHtml(html)) return "html";
  return "editor";
}

export const RICH_HTML_TO_EDITOR_WARNING =
  "O editor visual não preserva layouts especiais (newsletter, classes personalizadas, ícones).\n\nSe continuar, o conteúdo será simplificado e pode perder a formatação atual.\n\nDeseja mudar para o editor visual mesmo assim?";
