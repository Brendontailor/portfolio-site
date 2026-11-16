# Estado Atual - portfolio-site

**Última atualização**: 2026-11-16
**Versão**: 1.1

---

## Objetivo Atual

Portfólio com 6 cases. O case 06 (AgendaFlow) foi adicionado com player de vídeo do YouTube, galeria extraída do próprio vídeo e conteúdo detalhado de arquitetura, decisões e resultados.

---

## Fase em Andamento

**FASE 3: PUBLICAÇÃO DE CONTEÚDO**

### Concluído nesta etapa

- Suporte a vídeo nos cases (`CaseVideo` em `src/data/cases.ts` + seção `#case-video` na página do case)
- Case `agenda-flow` completo (contexto, problema, solução, módulos, decisões, resultados, stack, galeria)
- Imagens geradas a partir do vídeo final (`public/images/agenda-flow-*.webp`, `case-agenda-flow.webp`, `public/og/agenda-flow.jpg`)
- Home atualizada (`cases-section.tsx`: "automação" e "vídeos")
- Vídeo publicado no YouTube público: https://youtu.be/hlUS2N0JeX4
- `youtubeId: "hlUS2N0JeX4"` ativo no case

### Validações executadas

- `npm run check:content` — OK (6 cases, 9 camadas, 4 itens de laboratório)
- `npx eslint src` e `npm run lint` — sem erros
- `npm run build` — sucesso, 15 páginas geradas
- Página conferida em desktop e mobile no dev server (player, hero e galeria renderizando)

### Auditoria de mercado (16/11/2026)

- Relatório em `docs/AUDITORIA-PORTFOLIO-2026.md`
- Bloqueios P0: domínio de referência responde com login da Vercel; ausência de LinkedIn e currículo; CI vermelho no GitHub; hero desatualizado (corrigido: 5 → 6 cases)
- Pendente decisão: corrigir CI (workflow aponta para `.js`, arquivo é `.cjs` e a validação exige arquivos da Bíblia ausentes)


### Ajustes de configuração necessários

- `tsconfig.json` e `eslint.config.mjs` passaram a excluir `exemplos/**` (código de referência com erros pré-existentes de tipos/deps)
- `eslint.config.mjs` também ignora `scripts/**`
- Corrigido erro de sintaxe real em `exemplos/arquitetura-modular/frontend/src/pages/Usuarios/Lista.tsx` (`});` → `};`)

### P0 executado (16/11/2026)

- Domínio público confirmado: https://portfolio-site-brendont.vercel.app (site.url, canonical, sitemap, README)
- LinkedIn adicionado em `src/data/site.ts` e exibido no contato, rodapé, menu mobile e JSON-LD (sameAs)
- Página `/cv` criada com currículo focado em desenvolvimento + item "Currículo" na navegação
- PDF gerado via Playwright (A4, 2 páginas, ~190 KB) em `public/cv/brendon-tailor-cv.pdf`
- Link do Dropzone corrigido para o repositório da colaboração (leonardorosler/dropzone-backend)
- `.gitattributes` criado (exemplos = vendored, docs = documentation) para o GitHub detectar TypeScript
- CI reescrito: npm ci -> check:content -> lint -> build -> varredura de segredos
- README atualizado com o domínio real

Validações: `npm run check:content` OK, `npx eslint src` sem erros, `npm run build` OK, `/cv` conferido em 1024 e 390 px sem overflow horizontal.

Pendências: commit/push do P0; atualizar descrição do vídeo no YouTube (link antigo); preencher site/local no perfil do GitHub (token sem escopo `user`).

---

## Continuação 16/11/2026 (tarde) — revisão dos cases

**Fase em andamento:** FASE 3 (PUBLICAÇÃO DE CONTEÚDO) → revisão de layout e integridade de conteúdo.

### O que mudou

- **Grade dos cases refeita**: a grade de 12 colunas tinha duas linhas com metade vazia (buracos) porque um card `wide` (12 colunas) caía depois de um card comum. Agora a sequência fecha sem buraco:
  - 01 Sah Açaí & Cia (featured, 12 colunas) · 02 RoutePilot + 03 PortCont (6+6) · 04 Dropzone + 05 AgendaFlow (6+6)
  - `wide` saiu do Dropzone e do AgendaFlow; o `featured` do Sah Açaí foi mantido.
- **Case Monky Food removido** a pedido do autor (6 → 5 cases). Indexes renumerados (RoutePilot 02, PortCont 03, Dropzone 04, AgendaFlow 05).
- **RoutePilot agora é prova clicável**: `https://routpilotes.vercel.app` abre publicamente (verificado), então o status passou de "No ar · acesso restrito" para "No ar · demonstração pública".
- **Conteúdo alinhado ao novo conjunto**: hero com contagem dinâmica (`{cases.length}`), stats "02 produtos próprios", `/cv` sem o Monky ("Cinco projetos publicados"), currículo com **inglês técnico (leitura)** e **disponibilidade para CLT ou PJ em trabalho remoto** (hero, contato e currículo).
- **Texto do CI/CD corrigido** na seção "Sobre": o workflow real roda conteúdo, lint, type-check, build e varredura de segredos — não havia testes, deploy preview nem semantic-release.
- **Links públicos do laboratório corrigidos**: os dois itens "Público" apontavam para `src/lib/rate-limit` e `src/app/api`, que não existem no repositório (404). Agora há código real em `src/reference/rate-limit.ts` e `src/reference/api/clientes/route.ts`, e o snippet do card é o conteúdo exato do arquivo.
- **`npm run check:content` endurecido**: valida que a grade de cases fecha as 12 colunas sem buraco e que links do laboratório para este repositório existam de fato.
- **PDF do currículo regenerado** (`public/cv/brendon-tailor-cv.pdf`, A4, 2 páginas, ~190 KB). Nota técnica: gerar com `printBackground: true` rasteriza o fundo e leva o PDF a ~10 MB; com `printBackground: false` + `preferCSSPageSize: true` o resultado é ~190 KB.
- **JSON-LD**: `knowsLanguage` (pt-BR, en) e `alumniOf` (Senac).
- `zod` adicionado como dependência (usado pela rota de referência).

### Validações executadas

- `npm run check:content` — OK (5 cases, 9 camadas, 4 itens de laboratório; só avisos de imagens sem referência)
- `npm run lint` — sem erros
- `npm run build` — sucesso (15 páginas, 5 rotas de case)
- Playwright (sem screenshots, só geometria e texto): 1440 px → 3 linhas, 0 coluna vazia; 390 px → coluna única, sem overflow horizontal; `/cases/monky-food` → 404 ("Esse caminho não existe"); `/cases/routepilot` → links públicos presentes; `/cv` → 5 projetos, seção Idiomas e Disponibilidade corretas.

### Estado do Git

- Branch `main`, **sincronizada com `origin/main`** após o push autorizado (`555905e..cac775f`).
- Workflow "Validar" corrigido: `node-version: '24'` (com Node 20 o `check:content` não conseguia importar os dados em TypeScript).

### Currículo alinhado ao documento oficial (16/11/2026, noite)

- O autor enviou `Curriculo - Brendon Tailor.pdf` (1 página, 79 KB, gerado com pypdf, links para o LinkedIn e para `portfolio-site-brendont.vercel.app`) como o currículo correto.
- A página `/cv` foi reescrita para refletir o mesmo conteúdo: nome completo, cargo "Suporte Técnico N1/N2 · Desenvolvimento Full Stack", experiência na **RGSUL Internet** (06/2026 – Atual), Informações/Redes (IXCsoft, The Dude, UNM, fibra, MikroTik, PPPoE/IP, ONUs/ONTs, RX/TX), informática/hardware, formação no **4º semestre** e **Fiberschool**.
- `public/cv/brendon-tailor-cv.pdf` agora é o PDF oficial do autor (1 página) — o PDF gerado a partir de `/cv` foi substituído para não divergir do documento oficial.
- A seção "Projetos" (5 cases) fica só na versão web: o PDF oficial é o currículo de 1 página.
