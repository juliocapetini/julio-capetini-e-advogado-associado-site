<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Julio Capetini e Advogado associado — regras para agentes de IA

## Produto e prioridades

- Site institucional para **escritório de advocacia**: credibilidade, clareza e conformidade visual profissional.
- **Landing** (`/`) com informações do escritório e **contato** (`/contato`).
- **Artigos** (`/artigos` e rotas filhas): leitura pública; **publicação apenas por utilizadores autenticados** (`/admin/artigos`, papel admin). Não tratar os artigos como área anónima de submissão.
- **Segurança** é prioridade (validação no servidor, segredos só em env, princípio do menor privilégio nas rotas administrativas).
- **UI/UX moderna**: Tailwind, acessibilidade, performance (Core Web Vitals), layout responsivo.

## Stack e hospedagem

- **Next.js** (App Router), **React**, **TypeScript**, **Tailwind CSS v4** (já no projeto).
- Deploy alvo: **Vercel**. Variáveis de ambiente na Vercel devem espelhar `.env.example` (nomes das chaves).
- **Resend** para email (ex.: formulário de contato). Não expor API keys ao cliente.
- Banco de dados e **Redis** (opcional: rate limiting, cache, sessões) — usar quando a feature existir; documentar novas variáveis em `.env.example`.

## Estrutura de pastas (contrato)

| Pasta / ficheiro | Uso |
|------------------|-----|
| `app/` | Rotas, layouts, loading/error, API routes ou equivalente desta versão do Next |
| `app/page.tsx` | Landing `/` |
| `app/contato/page.tsx` | Rota `/contato` |
| `app/artigos/page.tsx` | Listagem `/artigos` |
| `public/` | Assets estáticos servidos em `/...` |
| `components/` | Componentes reutilizáveis (importados pelas páginas em `app/`) |
| `package.json` | Dependências e scripts |
| `.env.local` | Secrets local (nunca commit) |
| `.env.example` | Lista de chaves esperadas, sem valores secretos |

Ao adicionar features, **preferir colocation** coerente com o App Router (ex.: `app/artigos/[slug]/page.tsx`) em vez de duplicar convenções.

## Estilo de código

- Seguir padrões já presentes nos ficheiros do projeto (imports, tipos, formatação).
- **Tailwind** para estilos; evitar CSS global exceto tokens/design system em `app/globals.css` quando necessário.
- Conteúdo visível ao utilizador em **português (pt)** salvo pedido em contrário.
- `lang` do documento: preferir `pt` ou `pt-BR` quando ajustarem o `layout` raiz.

## Segurança (checklist mental)

- Rotas de criação/edição de artigos: autenticação + verificação de papel/permissão no **servidor**.
- Validar input (esquemas, limites de tamanho) em Server Actions / API.
- Não logar segredos; não confiar apenas em UI oculta para “proteger” rotas.

## Documentação humana

- Estrutura detalhada e contexto de produto: `docs/ESTRUTURA.md`.
