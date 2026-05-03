"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)]/40 text-sm text-[var(--color-ink-muted)]">
      A carregar editor…
    </div>
  ),
});

type Props = {
  /** Valor inicial (criação vazio; edição com texto guardado). */
  initialMarkdown: string;
};

/**
 * Corpo do artigo em Markdown com barra de ferramentas e pré-visualização.
 * O valor enviado no formulário vem do campo oculto `body`.
 */
export function ArtigoBodyField({ initialMarkdown }: Props) {
  const [body, setBody] = useState(initialMarkdown);

  useEffect(() => {
    setBody(initialMarkdown);
  }, [initialMarkdown]);

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-[var(--color-ink)]" id="body-label">
        Corpo do artigo
      </span>
      <p className="text-xs text-[var(--color-ink-muted)]">
        Use a barra para negrito, itálico, títulos, listas, citações e links. O texto continua em
        Markdown no site público.
      </p>
      <input type="hidden" name="body" value={body} />
      <div
        data-color-mode="light"
        className="artigo-md-editor overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
        aria-labelledby="body-label"
      >
        <MDEditor
          value={body}
          onChange={(v) => setBody(typeof v === "string" ? v : "")}
          height={440}
          preview="live"
          visibleDragbar={false}
          textareaProps={{
            placeholder: "Escreva o artigo aqui…",
            "aria-label": "Corpo do artigo em Markdown",
          }}
        />
      </div>
    </div>
  );
}
