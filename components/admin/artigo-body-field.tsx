"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sanitizeArticleHtml } from "@/lib/sanitize-article-html";
import {
  detectArticleContentMode,
  isRichArticleHtml,
  RICH_HTML_TO_EDITOR_WARNING,
  type ArticleContentMode,
} from "@/lib/article-html-mode";
import {
  ArtigoRichEditor,
  type ArtigoRichEditorHandle,
} from "@/components/admin/artigo-rich-editor";
import { newsletterFontClassName } from "@/lib/newsletter-fonts";

type Props = {
  /** Valor inicial (criação vazio; edição com HTML guardado). */
  initialHtml: string;
};

/**
 * Corpo do artigo: modo HTML (colar) ou editor visual — mutuamente exclusivos,
 * para não sobrescrever acidentalmente HTML com classes/estilos de newsletter.
 */
export function ArtigoBodyField({ initialHtml }: Props) {
  const [body, setBody] = useState(initialHtml);
  const [mode, setMode] = useState<ArticleContentMode>(() => detectArticleContentMode(initialHtml));
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const editorRef = useRef<ArtigoRichEditorHandle>(null);

  useEffect(() => {
    setBody(initialHtml);
    setMode(detectArticleContentMode(initialHtml));
    setPreviewOpen(false);
  }, [initialHtml]);

  const previewHtml = useMemo(() => sanitizeArticleHtml(body), [body]);

  function flushEditorToBody() {
    const html = editorRef.current?.getHtml();
    if (html !== undefined) setBody(html);
  }

  function requestHtmlMode() {
    if (mode === "editor") flushEditorToBody();
    setPreviewOpen(false);
    setMode("html");
  }

  function requestEditorMode() {
    if (mode === "editor") return;
    if (isRichArticleHtml(body)) {
      const ok = window.confirm(RICH_HTML_TO_EDITOR_WARNING);
      if (!ok) return;
    }
    setPreviewOpen(false);
    setEditorKey((k) => k + 1);
    setMode("editor");
  }

  const modeSwitch = (
    <div
      className="inline-flex rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)]/40 p-0.5"
      role="group"
      aria-label="Modo de edição do corpo"
    >
      <button
        type="button"
        onClick={requestHtmlMode}
        aria-pressed={mode === "html"}
        className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
          mode === "html"
            ? "bg-[var(--color-surface)] text-[var(--color-ink)] shadow-sm"
            : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
        }`}
      >
        Colar HTML
      </button>
      <button
        type="button"
        onClick={requestEditorMode}
        aria-pressed={mode === "editor"}
        className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
          mode === "editor"
            ? "bg-[var(--color-surface)] text-[var(--color-ink)] shadow-sm"
            : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
        }`}
      >
        Editor visual
      </button>
    </div>
  );

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-[var(--color-ink)]" id="body-label">
        Corpo do artigo
      </span>
      <p className="text-xs text-[var(--color-ink-muted)]">
        Escolha um modo: <strong className="font-medium">Colar HTML</strong> para artigos gerados por
        assistente (pode colar o ficheiro inteiro com <code className="rounded bg-[var(--color-muted)] px-1">&lt;!DOCTYPE&gt;</code>
        — o site extrai o corpo e aplica os estilos). <strong className="font-medium">Editor visual</strong>{" "}
        para texto simples. Os modos não se misturam.
      </p>
      <input type="hidden" name="body" value={body} />
      <div
        className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
        aria-labelledby="body-label"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] px-3 py-2.5">
          {modeSwitch}
          <button
            type="button"
            onClick={() => setPreviewOpen((open) => !open)}
            className={`text-sm font-medium transition ${
              previewOpen
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            }`}
            aria-pressed={previewOpen}
          >
            {previewOpen ? "Fechar pré-visualização" : "Pré-visualizar"}
          </button>
        </div>

        {mode === "html" && !previewOpen ? (
          <div className="border-b border-[var(--color-border)] bg-[var(--color-muted)]/20 px-3 py-2">
            <p className="text-xs text-[var(--color-ink-muted)]">
              Modo HTML ativo — o editor visual está desligado. Pode remover o bloco{" "}
              <code className="rounded bg-[var(--color-muted)] px-1">&lt;style&gt;</code>; as classes
              já têm estilo no site.
            </p>
          </div>
        ) : null}

        {mode === "editor" && !previewOpen ? (
          <div className="border-b border-[var(--color-border)] bg-[var(--color-muted)]/20 px-3 py-2">
            <p className="text-xs text-[var(--color-ink-muted)]">
              Modo editor ativo — ideal para artigos simples. Para newsletter ou HTML com classes,
              use <strong className="font-medium">Colar HTML</strong>.
            </p>
          </div>
        ) : null}

        {previewOpen ? (
          <div className="min-h-[440px] px-4 py-6">
            {previewHtml ? (
              <div
                className={`article-md text-[var(--color-ink)] ${newsletterFontClassName}`}
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
            ) : (
              <p className="text-sm text-[var(--color-ink-muted)]">Nada para pré-visualizar.</p>
            )}
          </div>
        ) : mode === "html" ? (
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={22}
            spellCheck={false}
            placeholder="<div class=&quot;nw&quot;>…</div>"
            aria-label="Corpo do artigo em HTML"
            className="block w-full resize-y border-0 bg-transparent px-4 py-3 font-mono text-sm leading-relaxed text-[var(--color-ink)] outline-none focus:ring-0"
          />
        ) : (
          <ArtigoRichEditor
            key={editorKey}
            ref={editorRef}
            content={body}
            onChange={setBody}
          />
        )}
      </div>
    </div>
  );
}
