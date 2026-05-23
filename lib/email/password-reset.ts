import { Resend } from "resend";
import { site } from "@/lib/site-content";

export type SendResetEmailParams = {
  to: string;
  name: string;
  resetUrl: string;
  expiresAt: Date;
};

export type SendResetEmailResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed" };

const dateTimeFmt = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "America/Sao_Paulo",
});

export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
  expiresAt,
}: SendResetEmailParams): Promise<SendResetEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return { ok: false, reason: "not_configured" };

  const resend = new Resend(apiKey);
  const expiresLabel = dateTimeFmt.format(expiresAt);
  const subject = `[${site.shortName}] Redefinição de senha`;

  const safeName = escapeHtml(name || "Administrador(a)");
  const safeUrl = escapeHtml(resetUrl);
  const safeShortName = escapeHtml(site.shortName);
  const safeExpires = escapeHtml(expiresLabel);

  const html = `<!doctype html>
<html lang="pt-BR">
  <body style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.55;color:#111;max-width:560px;margin:0 auto;padding:24px;">
    <h1 style="font-size:18px;margin:0 0 16px;">Redefinição de senha — ${safeShortName}</h1>
    <p>Olá, ${safeName}.</p>
    <p>Recebemos um pedido para redefinir a sua senha de acesso à área administrativa.</p>
    <p style="margin:24px 0;">
      <a href="${safeUrl}" style="display:inline-block;background:#0f172a;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600;">
        Definir nova senha
      </a>
    </p>
    <p style="font-size:13px;color:#475569;">Se o botão não funcionar, copie este endereço no navegador:<br />
      <span style="word-break:break-all;color:#0f172a;">${safeUrl}</span>
    </p>
    <p style="font-size:13px;color:#475569;">
      O link é válido até <strong>${safeExpires}</strong> (horário de Brasília) e só pode ser usado uma vez.
    </p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
    <p style="font-size:12px;color:#64748b;">
      Se não foi você que pediu, pode ignorar este email — a sua senha atual continua válida.
    </p>
  </body>
</html>`;

  const text = [
    `Redefinição de senha — ${site.shortName}`,
    "",
    `Olá, ${name || "Administrador(a)"}.`,
    "Recebemos um pedido para redefinir a sua senha de acesso à área administrativa.",
    "",
    "Abra este endereço no navegador para definir uma nova senha:",
    resetUrl,
    "",
    `O link é válido até ${expiresLabel} (horário de Brasília) e só pode ser usado uma vez.`,
    "",
    "Se não foi você que pediu, ignore este email — a sua senha atual continua válida.",
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    html,
    text,
  });

  if (error) return { ok: false, reason: "send_failed" };
  return { ok: true };
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
