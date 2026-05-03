# Estrutura do projeto — Julio Capetini e Advogado associado

Site institucional moderno para escritório de advocacia: landing, contato, **artigos** (conteúdo público) com publicação restrita a administradores autenticados.

**Operação, base de dados, variáveis e deploy:** ver o **[GUIA-COMPLETO.md](./GUIA-COMPLETO.md)** (e o resumo em **[INFRAESTRUTURA.md](./INFRAESTRUTURA.md)**).

## Stack prevista

| Área | Escolha |
|------|---------|
| Framework | Next.js (App Router) |
| UI | React, **Tailwind CSS** |
| Hospedagem | **Vercel** |
| Email transacional | **Resend** (formulários, notificações) |
| Dados | **Postgres** (Vercel Marketplace / Neon), **Drizzle ORM**; tabelas `users`, `articles` |
| Auth (admin) | **Auth.js** (sessão JWT), credenciais para equipa |
| Cache / filas (opcional) | **Redis** (Vercel KV ou Upstash), se fizer sentido para rate limit ou sessões |

ORM e auth estão definidos no código (`lib/db`, `auth.ts`); este documento fixa **onde** cada tipo de ficheiro deve morar.

## Pastas e arquivos principais

### `app/`

Rotas e layouts no **App Router** do Next.js. Cada pasta com `page.tsx` vira um segmento de URL.

| Caminho | Rota |
|---------|------|
| `app/page.tsx` | `/` — landing |
| `app/artigos/page.tsx` | `/artigos` — listagem de artigos publicados |
| `app/artigos/[slug]/page.tsx` | `/artigos/...` — artigo individual |
| `app/admin/login/page.tsx` | `/admin/login` — início de sessão (equipa) |
| `app/admin/artigos/...` | `/admin/artigos` — gestão de artigos (protegido) |
| `app/api/auth/[...nextauth]/route.ts` | Auth.js — handlers HTTP |

Convencões:

- `layout.tsx` — shell comum (cabeçalho, rodapé, fontes).
- `loading.tsx` e `error.tsx` — UX de carregamento e erros, quando fizer sentido.
- Rotas de API ou Server Actions — preferir colocation em `app/` (ex.: `app/api/...`) ou actions no mesmo domínio de feature, conforme o guia oficial do Next.js em `node_modules/next/dist/docs/`.

### `public/`

Arquivos servidos na raiz do site: imagens estáticas, `favicon.ico`, `robots.txt`, etc. Referência em código: `/nome-do-arquivo.ext` (ex.: `/logo.svg`).

### `components/`

Componentes React **reutilizáveis** (botões, cards, formulários, seções da landing). Preferir componentes pequenos e composáveis; páginas em `app/` podem importar daqui.

Sugestão de organização futura (opcional):

- `components/ui/` — primitivos de interface
- `components/layout/` — header, footer, navegação
- `components/artigos/` — listagem, corpo Markdown
- `components/admin/` — formulários da área reservada

### `lib/db/`

Esquema Drizzle (`schema.ts`), cliente Postgres (`index.ts`). Migrações geridas com `drizzle-kit` (`npm run db:push`). Scripts: `npm run db:seed` (primeiro admin; ver `.env.example`).

### `auth.ts` (raiz)

Configuração Auth.js (credenciais, JWT). Variáveis: `AUTH_SECRET`, `AUTH_URL`.

### `package.json`

Dependências e scripts (`dev`, `build`, `start`, `lint`, `db:push`, `db:studio`, `db:seed`). Alterações de stack documentam-se aqui e, quando relevante, em `AGENTS.md`.

### `.env.local`

Variáveis de ambiente **secretas** e específicas da máquina — **não** versionar. Use `.env.example` como modelo dos nomes das variáveis (sem valores reais).

Na Vercel, configure os mesmos nomes no painel do projeto (Environment Variables).

## Objetivos de produto (resumo)

1. **Landing** — apresentação do escritório, diferenciais, eventualmente equipe/áreas de atuação.
2. **Contato** — formulário e/ou dados; envio de email via **Resend** no servidor.
3. **Artigos** — conteúdo público em `/artigos`; **criação e edição** em `/admin/artigos` apenas para utilizadores `admin` autenticados.

## Segurança e boas práticas (alvo)

- Nunca commitar segredos; usar `.env.local` / Vercel env.
- Validar e sanitizar entradas em formulários e APIs.
- Proteger rotas e Server Actions de artigos com `auth()` e papel `admin` no servidor.
- Headers e políticas de segurança alinhadas às recomendações do Next.js e da Vercel.

## Onde ler mais para agentes de IA

- **`docs/GUIA-COMPLETO.md`** — desenvolvimento local, Postgres/Drizzle (`db:push`, `db:seed`, `db:studio`), variáveis de ambiente, Resend, Auth, Vercel, checklist de entrega.
- **`docs/INFRAESTRUTURA.md`** — resumo de comandos de BD e deploy; aponta para o guia completo.
- **`AGENTS.md`** (raiz) — regras para assistentes (Next.js desta versão, Tailwind, estrutura e prioridades do projeto).
