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
