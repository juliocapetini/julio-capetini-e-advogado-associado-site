# Infraestrutura, base de dados e deploy

Este documento resume o essencial. O detalhe completo está em **[GUIA-COMPLETO.md](./GUIA-COMPLETO.md)**.

## Base de dados — comandos que precisa de memorizar

Com `POSTGRES_URL` definido em `.env.local` (local) ou na Vercel (produção):

1. **`npm run db:push`** — Cria ou atualiza as tabelas (`users`, `articles`) na Postgres. **Corra sempre num ambiente novo** antes de usar admin e artigos.
2. **`npm run db:seed`** — Cria o primeiro utilizador administrador (requer `ADMIN_SEED_EMAIL`, `ADMIN_SEED_PASSWORD`, opcionalmente `ADMIN_SEED_NAME`). Usar **uma vez** por ambiente; depois remover segredos do `.env`.
3. **`npm run db:studio`** — Interface visual opcional para ver dados na BD.

Ordem típica: **push → seed** (depois de configurar variáveis).

## Vercel e serviços

- **Vercel:** ligar ao Git; definir as mesmas chaves que em `.env.example` no painel do projeto.
- **Postgres:** Neon, Vercel Marketplace ou outro; a URL vai em `POSTGRES_URL`.
- **Resend:** `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`.
- **Domínio:** configurar em Vercel → Domains; atualizar `NEXT_PUBLIC_SITE_URL` e `AUTH_URL`.

## Leitura seguinte

- [GUIA-COMPLETO.md](./GUIA-COMPLETO.md) — variáveis, troubleshooting, checklist de entrega.
- [ESTRUTURA.md](./ESTRUTURA.md) — pastas e rotas da aplicação.
