"use client";

import { useActionState } from "react";
import { submitContact, type ContactFormState } from "@/app/actions/contact";
import { IconArrowRight } from "@/components/icons/ui-icons";
import { specialties } from "@/lib/site-content";

const initial: ContactFormState = { ok: false, message: "" };

const topicOptions = [...specialties, "Outro"];

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-ink)] shadow-sm outline-none transition placeholder:text-[var(--color-ink-subtle)] hover:border-[var(--color-border-strong)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20";

const labelClass = "block text-sm font-medium text-[var(--color-ink)]";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Nome completo <span className="text-[var(--color-accent)]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Como deseja ser tratado"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            E-mail <span className="text-[var(--color-accent)]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="seu@email.com"
            className={fieldClass}
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Telefone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="topic" className={labelClass}>
            Assunto
          </label>
          <select id="topic" name="topic" className={fieldClass} defaultValue="">
            <option value="" disabled>
              Selecione uma área
            </option>
            {topicOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className={labelClass}>
          Mensagem <span className="text-[var(--color-accent)]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldClass} resize-y`}
          placeholder="Descreva brevemente como podemos ajudar."
        />
        <p className="mt-1.5 text-xs text-[var(--color-ink-subtle)]">
          As informações enviadas são tratadas com confidencialidade.
        </p>
      </div>

      {state.message ? (
        <p
          role="status"
          className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
            state.ok
              ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border border-amber-200 bg-amber-50 text-amber-950"
          }`}
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[var(--color-ink-subtle)]">
          <span className="text-[var(--color-accent)]">*</span> Campos obrigatórios
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-ink)]/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
        >
          {pending ? "A enviar…" : "Enviar mensagem"}
          {!pending && (
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>
      </div>
    </form>
  );
}
