# Graph Report - portfolio-site  (2026-10-24)

## Corpus Check
- 49 files · ~113,103 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 6 file(s) not represented in the graph (top: (none) 4, .pid 1, .css 1)

## Summary
- 268 nodes · 440 edges · 23 communities (22 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `40d18a4d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- icons.tsx
- app/page.tsx
- ArrowUpRight
- compilerOptions
- highlight.ts
- Review Focus
- check-content.mjs
- Capturas dos sistemas do portfólio — Design
- devDependencies
- Brendon Tailor — Portfólio
- Cases full-stack voltados a recrutadores
- Plano mestre — capturas dos sistemas do portfólio
- Logo e favicon — símbolo de construção
- Captura — Dropzone
- Captura — Monky Food
- Captura — Monky Tech
- Captura — PortCont
- Captura — RoutePilot
- Captura — Sah Açaí
- Recruiter-Focused Full-Stack Cases Implementation Plan
- Build Symbol Logo Implementation Plan
- AGENTS.md

## God Nodes (most connected - your core abstractions)
1. `ArrowUpRight()` - 23 edges
2. `Reveal()` - 16 edges
3. `compilerOptions` - 16 edges
4. `next` - 11 edges
5. `baseProps()` - 11 edges
6. `SectionHeading()` - 10 edges
7. `Home()` - 9 edges
8. `site` - 9 edges
9. `Review Focus` - 9 edges
10. `GithubIcon()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Task 1: Shared logo mark and favicon` --references--> `BrandMark()`  [INFERRED]
  docs/superpowers/plans/2026-10-24-build-symbol-logo.md → src/components/brand-mark.tsx
- `Task 3: Remover affordance falsa do Conhecimento` --references--> `ArrowUpRight()`  [INFERRED]
  docs/superpowers/plans/2026-10-24-portfolio-polish.md → src/components/icons.tsx
- `Task 4: Hero sem bloqueio de LCP` --references--> `Reveal()`  [INFERRED]
  docs/superpowers/plans/2026-10-24-portfolio-polish.md → src/components/reveal.tsx
- `Task 1: Curated module maps on case pages` --references--> `CaseStudy`  [INFERRED]
  docs/superpowers/plans/2026-10-24-recruiter-full-stack-cases.md → src/data/cases.ts
- `Task 2: Contagem derivada e textos consistentes` --references--> `CaseStudy`  [INFERRED]
  docs/superpowers/plans/2026-10-24-portfolio-polish.md → src/data/cases.ts

## Import Cycles
- None detected.

## Communities (23 total, 1 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.08
Nodes (23): eslintConfig, dependencies, next, react, react-dom, name, private, scripts (+15 more)

### Community 1 - "icons.tsx"
Cohesion: 0.15
Nodes (21): react, jetbrains, metadata, plex, RootLayout(), viewport, BrandMark(), CopyEmail() (+13 more)

### Community 2 - "app/page.tsx"
Cohesion: 0.22
Nodes (14): Home(), AboutSection(), ContactSection(), KnowledgeSection(), LabSection(), Manifesto(), Marquee(), Reveal() (+6 more)

### Community 3 - "ArrowUpRight"
Cohesion: 0.13
Nodes (21): Task 2: Contagem derivada e textos consistentes, next, CasePage(), CasePageProps, generateMetadata(), instant, NotFound(), BrowserFrame() (+13 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 5 - "highlight.ts"
Cohesion: 0.39
Nodes (7): CodeBlock(), CodeBlockProps, escapeHtml(), findComment(), highlightCode(), highlightLine(), KEYWORDS

### Community 6 - "Review Focus"
Cohesion: 0.18
Nodes (10): Global Constraints, Portfólio — polimento com integridade, Review Focus, Task 1: Guardrail de integridade de conteúdo, Task 3: Remover affordance falsa do Conhecimento, Task 4: Hero sem bloqueio de LCP, Task 5: Acessibilidade do menu mobile e links externos, Task 6: Peso de mídia (+2 more)

### Community 7 - "check-content.mjs"
Cohesion: 0.12
Nodes (13): nextConfig, errors, imagesDir, publicDir, referenced, requireText(), requireUniqueIds(), slugs (+5 more)

### Community 8 - "Capturas dos sistemas do portfólio — Design"
Cohesion: 0.22
Nodes (8): Abordagens consideradas, Capturas dos sistemas do portfólio — Design, Decisões de captura e integração, Decisões que ficam para a execução, Fora de escopo e práticas a evitar, Intenção, Objetivos, Restrições e descobertas atuais

### Community 9 - "devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+1 more)

### Community 10 - "Brendon Tailor — Portfólio"
Cohesion: 0.22
Nodes (8): Brendon Tailor — Portfólio, Contato, Conteúdo e privacidade, Deploy, Estrutura, O que está aqui, Rodando localmente, Stack

### Community 11 - "Cases full-stack voltados a recrutadores"
Cohesion: 0.25
Nodes (7): Abordagens, Cases full-stack voltados a recrutadores, Escopo proposto, Intenção, Limites de divulgação, Objetivos, Restrições e fora de escopo

### Community 12 - "Plano mestre — capturas dos sistemas do portfólio"
Cohesion: 0.29
Nodes (6): Critérios de conclusão, Integração das galerias, Objetivo e limites, Plano mestre — capturas dos sistemas do portfólio, Resultado parcial da execução — 2026-10-24, Sequência

### Community 13 - "Logo e favicon — símbolo de construção"
Cohesion: 0.29
Nodes (6): Abordagens consideradas, Escopo, Fora de escopo, Intenção, Logo e favicon — símbolo de construção, Restrições e critérios

### Community 14 - "Captura — Dropzone"
Cohesion: 0.33
Nodes (5): Captura — Dropzone, Objetivo, Passos, Resultado da execução — 2026-10-24, Verificação

### Community 15 - "Captura — Monky Food"
Cohesion: 0.33
Nodes (5): Captura — Monky Food, Objetivo, Passos, Resultado da execução — 2026-10-24, Verificação

### Community 16 - "Captura — Monky Tech"
Cohesion: 0.33
Nodes (5): Captura — Monky Tech, Objetivo, Passos, Resultado da execução — 2026-10-24, Verificação

### Community 17 - "Captura — PortCont"
Cohesion: 0.33
Nodes (5): Captura — PortCont, Objetivo, Passos, Resultado da execução — 2026-10-24, Verificação

### Community 18 - "Captura — RoutePilot"
Cohesion: 0.33
Nodes (5): Captura — RoutePilot, Objetivo, Passos, Resultado da execução — 2026-10-24, Verificação

### Community 19 - "Captura — Sah Açaí"
Cohesion: 0.33
Nodes (5): Captura — Sah Açaí, Objetivo, Passos, Resultado da execução — 2026-10-24, Verificação

### Community 20 - "Recruiter-Focused Full-Stack Cases Implementation Plan"
Cohesion: 0.33
Nodes (5): Global Constraints, Recruiter-Focused Full-Stack Cases Implementation Plan, Review Focus, Task 1: Curated module maps on case pages, Task 2: Public live links on homepage case cards

### Community 22 - "Build Symbol Logo Implementation Plan"
Cohesion: 0.40
Nodes (4): Build Symbol Logo Implementation Plan, Global Constraints, Review Focus, Task 1: Shared logo mark and favicon

## Knowledge Gaps
- **7 isolated node(s):** `react-dom`, `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 155 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `ArrowUpRight` to `package.json`, `icons.tsx`, `app/page.tsx`, `check-content.mjs`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **What connects `react-dom`, `@tailwindcss/turbopack`, `@types/node` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Why does `ArrowUpRight()` connect `ArrowUpRight` to `icons.tsx`, `app/page.tsx`, `Review Focus`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **Should `icons.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1477832512315271 - nodes in this community are weakly interconnected._
- **Why does `react` connect `icons.tsx` to `package.json`, `app/page.tsx`, `ArrowUpRight`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Should `ArrowUpRight` be split into smaller, more focused modules?**
  _Cohesion score 0.12903225806451613 - nodes in this community are weakly interconnected._