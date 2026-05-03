"use client";

import { useActionState } from "react";
import {
  createArtigo,
  updateArtigo,
  type ArtigoFormState,
} from "@/app/actions/artigos";
import { ArtigoBodyField } from "@/components/admin/artigo-body-field";

const initial: ArtigoFormState = { ok: false, message: "" };

export type ArtigoEditorInitial = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  published: boolean;
};

type Props =
  | { mode: "create" }
  | { mode: "edit"; initial: ArtigoEditorInitial };

export function ArtigoEditorForm(props: Props) {
  const action = props.mode === "create" ? createArtigo : updateArtigo;
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="space-y-6">
      {props.mode === "edit" ? <input type="hidden" name="id" value={props.initial.id} /> : null}
      {state.message ? (
        <p
          className={`rounded-lg px-4 py-3 text-sm ${state.ok ? "border border-emerald-200 bg-emerald-50 text-emerald-900" : "border border-red-200 bg-red-50 text-red-800"}`}
          role="alert"
        >
          {state.message}
        </p>
      ) : null}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-[var(--color-ink)]">
          Título
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={200}
          defaultValue={props.mode === "edit" ? props.initial.title : undefined}
          className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </div>
      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-[var(--color-ink)]">
          Slug (URL) — opcional; gera-se a partir do título se vazio
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          maxLength={120}
          placeholder="ex.: novo-codigo-civil"
          defaultValue={props.mode === "edit" ? props.initial.slug : undefined}
          className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 font-mono text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </div>
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-[var(--color-ink)]">
          Resumo (opcional)
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          maxLength={500}
          defaultValue={props.mode === "edit" ? props.initial.excerpt : undefined}
          className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
        />
      </div>
      <ArtigoBodyField
        initialMarkdown={props.mode === "edit" ? props.initial.body : ""}
      />
      <div className="flex items-center gap-2">
        <input
          id="publish"
          name="publish"
          type="checkbox"
          defaultChecked={props.mode === "edit" ? props.initial.published : false}
          className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
        />
        <label htmlFor="publish" className="text-sm text-[var(--color-ink)]">
          Publicar (visível em /artigos)
        </label>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-foreground)] shadow-sm transition hover:brightness-105 disabled:opacity-60"
        >
          {pending ? "A guardar…" : "Guardar"}
        </button>
      </div>
    </form>
  );
}
