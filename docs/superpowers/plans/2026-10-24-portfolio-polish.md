# Portfólio — polimento com integridade

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (execução nativa nesta sessão). Passos usam checkbox (`- [ ]`) para acompanhamento.

**Goal:** Corrigir affordances falsas, inconsciências de conteúdo, bloqueio de LCP, acessibilidade do menu e peso de mídia sem mudar identidade visual, stack ou estrutura data-driven.

**Architecture:** Alterações localizadas em componentes de UI, dados e assets estáticos. Nenhuma dependência nova de runtime. Validação por script Node de integridade de conteúdo, `lint`, `tsc`, `build` e verificação visual no Playwright.

**Tech Stack:** Next.js 16.4.2 (App Router), React 19.3, TypeScript 5, Tailwind 4, Node 24, sharp (já presente via Next) apenas em scripts pontuais.

**Spec:** `docs/superpowers/specs/2026-10-24-recruiter-full-stack-cases-design.md`

## Global Constraints

- Preservar paleta, tipografia, grid, tom de voz e conteúdo confirmado.
- Nenhuma dependência nova em `package.json`.
- Não publicar, não fazer deploy, não alterar `main`.
- Não commitar trabalho alheio: `.gitignore` já modificado e `graphify-out/` ficam fora dos commits.
- Toda etapa termina com verificação real (comando executado e saída conferida).
- Não inventar URLs, métricas, arquitetura ou resultados.

## Review Focus

- Contagem de cases nunca pode divergir do array `cases`.
- Linhas de Conhecimento não podem parecer clicáveis se não forem.
- Hero deve pintar texto no primeiro paint, sem depender de hidratação.
- Menu mobile com teclado não pode escapar para o conteúdo atrás do overlay.
- Nenhuma imagem referenciada pode faltar; nenhum asset órfão pode permanecer.

---

### Task 1: Guardrail de integridade de conteúdo

**Files:**
- Create: `scripts/check-content.mjs`
- Modify: `package.json` (scripts)

**Interfaces:**
- Consumes: `cases` de `src/data/cases.ts`, `knowledgeLayers` de `src/data/knowledge.ts`, `labItems` de `src/data/lab.ts`.
- Produces: comando `npm run check:content` que sai com código 1 em erro.

- [ ] **Step 1: Escrever `scripts/check-content.mjs`**

Regras de erro: slugs únicos; `index` de cada case igual à posição (`01`, `02`, …); campos obrigatórios não vazios (`title`, `kicker`, `summary`, `cover`, `coverAlt`, `context`, `problem`, `solution`, `statusNote`); todo `cover` e `gallery[].src` existente em `public`; todo `alt`/`caption` não vazio; `knowledgeLayers[].id` e `labItems[].id` únicos. Avisos (não falham): imagens em `public/images` sem referência.

- [ ] **Step 2: Adicionar script ao `package.json`**

```json
"check:content": "node scripts/check-content.mjs"
```

- [ ] **Step 3: Rodar**

Run: `npm run check:content`
Expected: `OK — 5 cases, 9 camadas, 4 itens de laboratório.` e nenhum erro.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-content.mjs package.json
git commit -m "chore: add content integrity check"
```

---

### Task 2: Contagem derivada e textos consistentes

**Files:**
- Modify: `src/app/cases/[slug]/page.tsx:80`
- Modify: `src/components/home/about-section.tsx:54`
- Modify: `src/components/home/hero.tsx:60`

**Interfaces:**
- Consumes: `cases` (array de `CaseStudy`).
- Produces: nada exportado.

- [ ] **Step 1: Derivar o total no cabeçalho do case**

Importar `cases` de `@/data/cases` (já importa `getCase`/`getNextCase`) e renderizar `{study.index} / {String(cases.length).padStart(2, "0")}`.

- [ ] **Step 2: Corrigir o texto do Sobre**

Trocar `Cada case abaixo prova um ângulo diferente:` por `Cada case deste portfólio prova um ângulo diferente:`.

- [ ] **Step 3: Dar semântica ao visual do hero**

Em `hero.tsx`, adicionar `role="img"` ao `<div className="hero-visual">` que já tem `aria-label="Prévia de projetos reais"`.

- [ ] **Step 4: Verificar**

Run: `npm run lint` e `npx tsc --noEmit`
Expected: ambos sem saída de erro.

- [ ] **Step 5: Commit**

```bash
git add src/app/cases/[slug]/page.tsx src/components/home/about-section.tsx src/components/home/hero.tsx
git commit -m "fix: derive case count and correct copy"
```

---

### Task 3: Remover affordance falsa do Conhecimento

**Files:**
- Modify: `src/components/home/knowledge-section.tsx:1-70`
- Modify: `src/app/globals.css:1325-1375`, `:2778-2789`

**Interfaces:**
- Consumes: `knowledgeLayers`.
- Produces: linhas `.knowledge-row` sem elementos interativos.

- [ ] **Step 1: Remover a seta e o import não usado**

Excluir o `<span className="knowledge-arrow">` e o import de `ArrowUpRight` caso não seja usado no arquivo.

- [ ] **Step 2: Ajustar o CSS para duas colunas**

`grid-template-columns: 52px minmax(0, 1fr)` em `.knowledge-row`; remover regras `.knowledge-arrow`, `.knowledge-row:hover .knowledge-arrow` e o `padding-inline`/`background` do `.knowledge-row:hover`; remover o bloco `.knowledge-arrow { display: none }` do media query mobile.

- [ ] **Step 3: Verificar visual**

Run: servidor dev + Playwright em 1440×900 e 390×844; conferir que as linhas mantêm alinhamento e não há hover de “clicável”.
Expected: sem setas, grid alinhado, nenhum erro no console.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/knowledge-section.tsx src/app/globals.css
git commit -m "fix: remove false affordance from knowledge rows"
```

---

### Task 4: Hero sem bloqueio de LCP

**Files:**
- Modify: `src/components/home/hero.tsx:11-59`

**Interfaces:**
- Consumes: `Reveal` deixa de ser usado neste arquivo (verificar outros usos).
- Produces: hero visível sem hidratação.

- [ ] **Step 1: Trocar os dois `Reveal` do hero por `div`**

Manter as classes `hero-copy` e `hero-visual-wrap` e remover `delay`/import de `Reveal` se ficar sem uso.

- [ ] **Step 2: Verificar no navegador**

Playwright: logo após o load, `getComputedStyle(document.querySelector('.hero-copy')).opacity === "1"` e screenshot do topo idêntico ao baseline (exceto animação).
Expected: opacidade 1 sem depender de JS de reveal.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/hero.tsx
git commit -m "perf: render hero content on first paint"
```

---

### Task 5: Acessibilidade do menu mobile e links externos

**Files:**
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/home/contact-section.tsx:35-43`
- Modify: `src/components/home/lab-section.tsx:71-75`
- Modify: `src/app/cases/[slug]/page.tsx:101-116`, `:160-173`
- Modify: `src/components/site-footer.tsx`
- Modify: `src/app/globals.css` (utility `.visually-hidden`)

**Interfaces:**
- Consumes: `site.nav`, `site.email`, `site.github`.
- Produces: menu com `role="dialog"`, `aria-modal="true"`, foco preso e restaurado.

- [ ] **Step 1: Foco e semântica do menu**

Adicionar `ref` no botão que abre e no container do menu. Ao abrir: focar o primeiro link. Ao fechar: devolver foco ao botão. No `keydown`, prender `Tab`/`Shift+Tab` dentro do menu quando aberto e fechar no `Escape` devolvendo o foco. Container com `role="dialog"`, `aria-modal="true"` e `aria-label="Menu de navegação"`.

- [ ] **Step 2: Aviso de nova aba**

Adicionar `.visually-hidden` ao CSS e um `<span className="visually-hidden"> (abre em nova aba)</span>` em links `target="_blank"`.

- [ ] **Step 3: Verificar com teclado**

Playwright em 390×844: abrir menu, pressionar `Tab` 10× e confirmar que o foco permanece dentro do menu; `Escape` fecha e o foco volta ao botão.
Expected: nenhum foco no conteúdo atrás do overlay.

- [ ] **Step 4: Commit**

```bash
git add src/components/site-header.tsx src/components/home/contact-section.tsx src/components/home/lab-section.tsx "src/app/cases/[slug]/page.tsx" src/components/site-footer.tsx src/app/globals.css
git commit -m "a11y: trap focus in mobile menu and announce external links"
```

---

### Task 6: Peso de mídia

**Files:**
- Modify: `src/data/cases.ts:251`, `:312`
- Create: `public/images/case-routepilot-home.webp`, `public/images/case-routepilot-map.webp`
- Delete: `public/images/case-routepilot-home.png`, `public/images/case-routepilot-map.png`, `public/images/case-monky-tech.webp`

**Interfaces:**
- Consumes: sharp disponível em `node_modules`.
- Produces: mesmos paths lógicos em WebP.

- [ ] **Step 1: Converter com sharp**

Script pontual (`node -e`), qualidade 82, mantendo dimensões originais. Conferir tamanho final antes de apagar os PNGs.

- [ ] **Step 2: Atualizar referências e remover órfão**

Trocar as extensões em `cases.ts` e apagar `case-monky-tech.webp`.

- [ ] **Step 3: Verificar**

Run: `npm run check:content` e abrir `/cases/routepilot` no Playwright.
Expected: nenhuma imagem quebrada; capa e galeria renderizadas.

- [ ] **Step 4: Commit**

```bash
git add src/data/cases.ts public/images
git commit -m "perf: convert routepilot captures to webp and drop unused asset"
```

---

### Task 7: Compartilhamento e ícone

**Files:**
- Create: `public/og/case-sah-acai.png`, `case-monky-food.png`, `case-routepilot.png`, `case-portcont.png`, `case-dropzone.png`
- Create: `src/app/apple-icon.png`
- Modify: `src/app/cases/[slug]/page.tsx:38-57`
- Modify: `src/app/sitemap.ts:6`

**Interfaces:**
- Consumes: `study.cover`, `src/app/icon.svg`.
- Produces: OG PNG 1200×630 por case e `apple-icon.png` 180×180.

- [ ] **Step 1: Gerar imagens**

Com sharp: capa redimensionada para 1200×630 (`fit: cover`) em PNG por case; `icon.svg` rasterizado em 180×180 PNG.

- [ ] **Step 2: Apontar metadados para os PNGs**

Trocar `url` para `/og/${study.slug}.png` e dimensões para 1200×630; ajustar Twitter também.

- [ ] **Step 3: Atualizar sitemap**

`lastModified` para `2026-10-24`.

- [ ] **Step 4: Verificar**

Playwright em `/cases/portcont`: `og:image` termina em `.png`; abrir a URL da imagem e confirmar 1200×630; `npm run build` sem erro.
Expected: metadados corretos e imagens acessíveis.

- [ ] **Step 5: Commit**

```bash
git add "src/app/cases/[slug]/page.tsx" src/app/sitemap.ts src/app/apple-icon.png public/og
git commit -m "feat: add per-case social images and apple icon"
```

---

### Task 8: Verificação final

**Files:** nenhum (somente verificação)

- [ ] **Step 1: Checks**

Run: `npm run check:content` → OK
Run: `npm run lint` → sem erros
Run: `npx tsc --noEmit` → sem erros
Run: `npm run build` → build concluído

- [ ] **Step 2: Auditoria no navegador**

Home e `/cases/routepilot` em 1440×900 e 390×844: sem console errors; 1 `<h1>`; imagens com `alt`; menu mobile preso; sem asset 404.

- [ ] **Step 3: Grafo**

Run: `graphify update .`
Expected: grafo atualizado sem erro.

- [ ] **Step 4: Estado do repositório**

Run: `git status --short`
Expected: apenas `.gitignore` (trabalho pré-existente) e `graphify-out/` fora dos commits.
