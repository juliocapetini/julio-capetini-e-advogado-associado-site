"use client";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useImperativeHandle, forwardRef } from "react";

export type ArtigoRichEditorHandle = {
  getHtml: () => string;
  setHtml: (html: string) => void;
};

type Props = {
  content: string;
  onChange: (html: string) => void;
};

function Toolbar({ editor }: { editor: Editor }) {
  const btn =
    "rounded-lg px-2.5 py-1.5 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-muted)] disabled:opacity-40";
  const active =
    "bg-[var(--color-muted)] ring-1 ring-inset ring-[var(--color-border)]";

  const setLink = () => {
    const previous = String(editor.getAttributes("link").href ?? "");
    const url = window.prompt("URL do link (deixe vazio para remover)", previous);
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  return (
    <div
      className="flex flex-wrap items-center gap-0.5 border-b border-[var(--color-border)] bg-[var(--color-muted)]/30 px-2 py-2"
      role="toolbar"
      aria-label="Formatação do artigo"
    >
      <button
        type="button"
        className={`${btn} ${editor.isActive("bold") ? active : ""}`}
        aria-pressed={editor.isActive("bold")}
        aria-label="Negrito"
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <span className="font-bold">B</span>
      </button>
      <button
        type="button"
        className={`${btn} ${editor.isActive("italic") ? active : ""}`}
        aria-pressed={editor.isActive("italic")}
        aria-label="Itálico"
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <span className="italic">I</span>
      </button>
      <span className="mx-1 h-5 w-px bg-[var(--color-border)]" aria-hidden />
      <button
        type="button"
        className={`${btn} ${editor.isActive("heading", { level: 2 }) ? active : ""}`}
        aria-pressed={editor.isActive("heading", { level: 2 })}
        aria-label="Título secção"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </button>
      <button
        type="button"
        className={`${btn} ${editor.isActive("heading", { level: 3 }) ? active : ""}`}
        aria-pressed={editor.isActive("heading", { level: 3 })}
        aria-label="Subtítulo"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </button>
      <span className="mx-1 h-5 w-px bg-[var(--color-border)]" aria-hidden />
      <button
        type="button"
        className={`${btn} ${editor.isActive("bulletList") ? active : ""}`}
        aria-pressed={editor.isActive("bulletList")}
        aria-label="Lista com marcadores"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        Lista
      </button>
      <button
        type="button"
        className={`${btn} ${editor.isActive("orderedList") ? active : ""}`}
        aria-pressed={editor.isActive("orderedList")}
        aria-label="Lista numerada"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1.
      </button>
      <button
        type="button"
        className={`${btn} ${editor.isActive("blockquote") ? active : ""}`}
        aria-pressed={editor.isActive("blockquote")}
        aria-label="Citação"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        “
      </button>
      <button
        type="button"
        className={`${btn} ${editor.isActive("link") ? active : ""}`}
        aria-pressed={editor.isActive("link")}
        aria-label="Link"
        onClick={setLink}
      >
        Link
      </button>
      <span className="mx-1 h-5 w-px bg-[var(--color-border)]" aria-hidden />
      <button
        type="button"
        className={btn}
        aria-label="Desfazer"
        disabled={!editor.can().chain().focus().undo().run()}
        onClick={() => editor.chain().focus().undo().run()}
      >
        Desfazer
      </button>
      <button
        type="button"
        className={btn}
        aria-label="Refazer"
        disabled={!editor.can().chain().focus().redo().run()}
        onClick={() => editor.chain().focus().redo().run()}
      >
        Refazer
      </button>
    </div>
  );
}

export const ArtigoRichEditor = forwardRef<ArtigoRichEditorHandle, Props>(function ArtigoRichEditor(
  { content, onChange },
  ref,
) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: "Escreva o artigo ou cole texto formatado…",
      }),
    ],
    content,
    onUpdate: ({ editor: e }) => {
      onChange(e.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "article-md artigo-tiptap min-h-[400px] max-w-none px-4 py-3 focus:outline-none",
        "aria-label": "Editor visual do artigo",
      },
    },
  });

  useImperativeHandle(
    ref,
    () => ({
      getHtml: () => editor?.getHTML() ?? content,
      setHtml: (html: string) => {
        if (!editor) return;
        editor.commands.setContent(html, { emitUpdate: false });
      },
    }),
    [editor, content],
  );

  if (!editor) {
    return (
      <div className="flex min-h-[440px] items-center justify-center text-sm text-[var(--color-ink-muted)]">
        A carregar editor…
      </div>
    );
  }

  return (
    <div className="artigo-rich-editor">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
});
