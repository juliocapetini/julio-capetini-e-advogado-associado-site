# Guia completo — Julio Capetini e Advogado associado

Documentação operacional do projeto: desenvolvimento local, base de dados, variáveis de ambiente, email, autenticação, deploy na Vercel e entrega ao cliente.

Para a **árvore de pastas e rotas**, ver [`ESTRUTURA.md`](./ESTRUTURA.md). Para regras de código e produto para agentes de IA, ver `AGENTS.md` na raiz do repositório.

---

## 1. Visão geral

| Item | Descrição |
|------|-----------|
| **Produto** | Site institucional: landing (`/`), contacto (`/contato`), artigos públicos (`/artigos`), área de gestão de artigos (`/admin/artigos`) apenas para administradores autenticados. |
| **Stack** | Next.js (App Router), React, TypeScript, Tailwind CSS v4, Drizzle ORM + Postgres, Auth.js (NextAuth v5) com sessão JWT, Resend para email do formulário. |
| **Deploy alvo** | Vercel. |

---

## 2. Pré-requisitos

- **Node.js** compatível com Next.js 16 (recomendado: LTS atual).
- **npm** (ou outro gestor; os exemplos usam `npm`).
- Conta **Postgres** acessível por URL (ex.: [Neon](https://neon.tech), Vercel Postgres / Marketplace).
- Para email em produção: conta **Resend** e domínio de envio verificado.

---

## 3. Instalação local

```bash
git clone <url-do-repositorio>
cd paulo-adv
npm install
```

Copie as variáveis de ambiente:

```bash
# Windows (PowerShell): copy .env.example .env.local
# Linux/macOS:
cp .env.example .env.local
```

Edite `.env.local` com valores reais (ver secção 4). **Nunca commite** `.env.local`.

Servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Build de produção local (opcional):

```bash
npm run build
npm run start
```

---

## 4. Variáveis de ambiente

Os **nomes** das chaves devem espelhar `.env.example`. Na Vercel: **Project → Settings → Environment Variables** (Production / Preview / Development conforme necessário).

### 4.1 Site público (URLs e metadados)

| Variável | Obrigatório | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SITE_URL` | Recomendado em produção | URL canónica **sem** barra final, ex. `https://www.escritorio.com.br`. Usada em Open Graph, links absolutos e sitemap. Se omitir na Vercel, o código usa `VERCEL_URL` automaticamente. |

### 4.2 Base de dados

| Variável | Obrigatório | Descrição |
|----------|-------------|-----------|
| `POSTGRES_URL` | **Sim** (para BD e scripts Drizzle) | Connection string PostgreSQL. Obrigatória em `.env.local` para `npm run db:push`, `db:studio` e `db:seed`. Na Vercel, igual à base de produção (ou à de preview, se tiverem BD separada). |

### 4.3 Auth.js (área `/admin`)

| Variável | Obrigatório | Descrição |
|----------|-------------|-----------|
| `AUTH_SECRET` | **Sim** em produção | Segredo para assinar JWT. Gerar uma vez: `openssl rand -base64 32` (ou equivalente). **Não reutilizar** entre projetos se segurança for crítica. |
| `AUTH_URL` | Recomendado | URL base da aplicação. Em local: `http://localhost:3000`. Em produção: `https://seu-dominio.com` (ou URL `*.vercel.app` durante testes). |

### 4.4 Resend (formulário de contacto)

| Variável | Obrigatório | Descrição |
|----------|-------------|-----------|
| `RESEND_API_KEY` | Sim, para enviar email | API key da conta Resend. |
| `RESEND_FROM_EMAIL` | Sim | Remetente verificado, ex. `"Escritório <noreply@seudominio.com>"`. |
| `CONTACT_TO_EMAIL` | Sim | Email interno que recebe as mensagens do formulário. |

Se faltar qualquer uma destas três, o utilizador vê a mensagem configurada em código a indicar que o envio não está configurado.

### 4.5 Primeiro administrador (apenas local / operação única)

| Variável | Uso |
|----------|-----|
| `ADMIN_SEED_EMAIL` | Email do primeiro utilizador `admin`. |
| `ADMIN_SEED_PASSWORD` | Palavra-passe (mínimo 8 caracteres). |
| `ADMIN_SEED_NAME` | Nome apresentado (opcional; tem default). |

Usadas **apenas** ao correr `npm run db:seed` (ver secção 5). Não deixar estas chaves com valores sensíveis permanentemente na Vercel após o seed.

### 4.6 Opcional (reservado)

| Variável | Descrição |
|----------|-----------|
| `REDIS_URL` | Reservada para uso futuro (cache, rate limit). **Não está ligada ao código atual** — pode ficar vazia. |

---

## 5. Base de dados (Drizzle + Postgres)

### 5.1 O que existe na BD

Definição em `lib/db/schema.ts`:

- **`users`** — utilizadores com `email`, `password_hash`, `name`, `role` (predefinição `admin`).
- **`articles`** — artigos com `slug`, `title`, `excerpt`, `body`, `published_at`, `author_id`, timestamps.

O cliente SQL usa `POSTGRES_URL` via `lib/db/index.ts`.

### 5.2 Configuração do Drizzle

- Ficheiro `drizzle.config.ts` aponta para `lib/db/schema.ts` e lê `POSTGRES_URL` de `.env` / `.env.local`.
- Pasta de output de migrações: `./drizzle` (o projeto usa **`db:push`** para alinhar o schema à BD sem fluxo de migrações manuais obrigatório).

### 5.3 Comandos — ordem num ambiente novo

Execute na **raiz do projeto**, com `POSTGRES_URL` correto em `.env.local` (ou exportado no shell).

| Comando | O que faz |
|---------|-----------|
| `npm run db:push` | Aplica o schema Drizzle à base de dados (cria/atualiza tabelas `users` e `articles`). **É o comando principal** antes de usar o site com login e artigos persistidos. |
| `npm run db:studio` | Abre o Drizzle Studio (UI web) para inspecionar/editar dados — útil para debugging. Requer `POSTGRES_URL`. |
| `npm run db:seed` | Corre `scripts/seed-admin.ts`: cria o **primeiro** utilizador admin se o email ainda não existir. Lê `ADMIN_SEED_EMAIL`, `ADMIN_SEED_PASSWORD`, `ADMIN_SEED_NAME` do ambiente (ex. via `--env-file=.env.local`). |

**Fluxo típico (primeira vez):**

1. Criar instância Postgres e copiar a URL de ligação.
2. Colocar `POSTGRES_URL=...` em `.env.local`.
3. Correr **`npm run db:push`** — cria as tabelas.
4. Definir no `.env.local` as variáveis `ADMIN_SEED_*` e correr **`npm run db:seed`** uma vez.
5. Remover ou esvaziar `ADMIN_SEED_PASSWORD` do ficheiro local (e não guardar na Vercel) após sucesso.
6. Opcional: `npm run db:studio` para confirmar o utilizador na tabela `users`.

**Nota:** Se o utilizador com esse email já existir, o seed termina com mensagem informativa e não duplica.

### 5.4 Erros comuns

| Erro / sintoma | Causa provável |
|----------------|----------------|
| `POSTGRES_URL não está definido` | Falta variável em `.env.local` ou na Vercel. |
| Falha de ligação SSL / timeout | Firewall da BD, URL incorreta ou instância suspensa. |
| Tabelas em falta no deploy | Não correram `db:push` contra a **mesma** BD que a Vercel usa (`POSTGRES_URL` de produção). |

---

## 6. Autenticação e área administrativa

- Configuração em `auth.ts`: provedor **Credentials**, sessão **JWT** (7 dias), página de login `/admin/login`.
- Apenas utilizadores com `role === "admin"` na tabela `users` podem autenticar-se.
- Rotas sob `app/admin/artigos/` verificam sessão no servidor e redireccionam para `/admin/login` se não houver sessão.

**Produção:** defina `AUTH_SECRET` e `AUTH_URL` coerentes com o URL público (especialmente após ligar domínio próprio).

---

## 7. Email (Resend)

1. Criar conta em [resend.com](https://resend.com) e obter API key.
2. Verificar domínio de envio e usar um endereço `from` autorizado em `RESEND_FROM_EMAIL`.
3. Definir `CONTACT_TO_EMAIL` para a caixa que deve receber leads.

O envio é feito na Server Action `app/actions/contact.ts` (sem expor a API key ao browser).

---

## 8. Scripts npm (resumo)

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento Next.js. |
| `npm run build` | Build de produção. |
| `npm run start` | Servidor Node após `build` (testar produção local). |
| `npm run lint` | ESLint. |
| `npm run db:push` | Sincroniza schema Drizzle → Postgres. |
| `npm run db:studio` | Drizzle Studio. |
| `npm run db:seed` | Cria primeiro admin (variáveis `ADMIN_SEED_*`). |

---

## 9. Deploy na Vercel (do zero)

1. Enviar código para GitHub/GitLab/Bitbucket.
2. **New Project** na Vercel → importar o repositório → framework Next.js detetado automaticamente.
3. Configurar **Environment Variables** (secção 4), pelo menos: `POSTGRES_URL`, `AUTH_SECRET`, `AUTH_URL`, `RESEND_*`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL` (quando o domínio estiver definido).
4. **Deploy.** Garantir que a base de dados de produção já recebeu **`npm run db:push`** e, uma vez, o seed do admin (localmente apontando `POSTGRES_URL` para a mesma BD de produção, ou CI seguro — evitar expor seeds em logs).
5. Adicionar **domínio personalizado** na Vercel e configurar DNS no registador (registos indicados pelo painel).
6. Atualizar `NEXT_PUBLIC_SITE_URL` e `AUTH_URL` para o URL final com HTTPS.

**Importante:** O comando `db:push` não corre automaticamente no deploy por defeito. Quem opera o projeto deve aplicar o schema à BD de produção quando o código ou o schema mudarem.

---

## 10. Checklist de entrega ao cliente

- [ ] Repositório Git e permissões definidas.
- [ ] Projeto Vercel na conta correta; variáveis de ambiente preenchidas.
- [ ] Postgres provisionado; `POSTGRES_URL` de produção documentada (sem password em texto plano em email — usar gestor de segredos).
- [ ] `db:push` executado na BD de produção; primeiro admin criado com método acordado.
- [ ] Resend configurado; domínio de envio verificado.
- [ ] Domínio e DNS a apontar para a Vercel; `NEXT_PUBLIC_SITE_URL` / `AUTH_URL` atualizados.
- [ ] Testes manuais: homepage, contacto (email recebido), `/artigos`, login `/admin/login`, criar/editar artigo.
- [ ] Indicação de quem renova: domínio, Vercel, Neon/Postgres, Resend.

---

## 11. Referências rápidas de ficheiros

| Ficheiro / pasta | Função |
|------------------|--------|
| `auth.ts` | NextAuth / credenciais admin. |
| `lib/db/schema.ts` | Esquema Drizzle. |
| `lib/db/index.ts` | Cliente Postgres + `getDb()`. |
| `drizzle.config.ts` | Configuração `drizzle-kit`. |
| `scripts/seed-admin.ts` | Seed do primeiro administrador. |
| `.env.example` | Lista de chaves esperadas (sem segredos). |
| `app/actions/contact.ts` | Envio de email via Resend. |

---

*Última atualização alinhada ao código do repositório `paulo-adv` (Next.js App Router, Drizzle, Auth.js, Resend).*
