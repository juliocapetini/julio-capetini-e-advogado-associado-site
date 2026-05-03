"use server";

import { Resend } from "resend";
import { site } from "@/lib/site-content";

export type ContactFormState = {
  ok: boolean;
  message: string;
};

const MAX = { name: 120, email: 254, phone: 40, message: 4000 };

function sanitize(s: string) {
  return s.trim().replace(/\r\n/g, "\n");
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = sanitize(String(formData.get("name") ?? ""));
  const email = sanitize(String(formData.get("email") ?? ""));
  const phone = sanitize(String(formData.get("phone") ?? ""));
  const topic = sanitize(String(formData.get("topic") ?? ""));
  const message = sanitize(String(formData.get("message") ?? ""));

  if (!name || name.length > MAX.name) {
    return { ok: false, message: "Indique um nome válido." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > MAX.email) {
    return { ok: false, message: "Indique um email válido." };
  }
  if (phone.length > MAX.phone) {
    return { ok: false, message: "Telefone demasiado longo." };
  }
  if (message.length > MAX.message) {
    return { ok: false, message: "Mensagem demasiado longa." };
  }
  if (!message) {
    return { ok: false, message: "Escreva a sua mensagem." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return {
      ok: false,
      message:
        "O envio por e-mail ainda não está configurado no servidor. Use o telefone, e-mail ou WhatsApp indicados na página.",
    };
  }

  const resend = new Resend(apiKey);
  const subject = `[${site.shortName}] Contato: ${topic || "Geral"} — ${name}`;

  const html = `
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefone:</strong> ${escapeHtml(phone || "—")}</p>
    <p><strong>Assunto:</strong> ${escapeHtml(topic || "—")}</p>
    <hr />
    <pre style="font-family:system-ui,sans-serif;white-space:pre-wrap;">${escapeHtml(message)}</pre>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject,
    html,
  });

  if (error) {
    return {
      ok: false,
      message: "Não foi possível enviar a mensagem. Tente mais tarde ou contacte-nos por telefone.",
    };
  }

  return {
    ok: true,
    message: "Mensagem enviada com sucesso. Responderemos em breve.",
  };
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
