# AGENTS.md - Instrucoes Operacionais para Agentes de IA

> **ESTE EH O PONTO DE ENTRADA OBRIGATORIO.** Todo agente DEVE ler este arquivo no inicio de CADA sessao.

---

## 0. SKILL CENTRAL: ENTREVISTA ORQUESTRADORA

**ANTES DE QUALQUER COISA:** Ative a skill central da Biblia.

```bash
skill entrevista-orquestradora
```

Esta skill eh o **ponto de entrada unico** da Biblia. Ela:
1. Entende seu pedido e classifica (dominio/tipo/complexidade/risco/escopo)
2. Consulta o indice da Biblia (`INDEX.md`, `ORCHESTRATOR.md`, `SKILLS-CATALOG.md`)
3. Descobre contexto real (inspeciona arquivos, Git, `memoria/`)
4. Faz entrevista adaptativa so se necessario (lacunas criticas que afetam a solucao)
5. Seleciona skills/MCPs/ferramentas minimas necessarias
6. Prepara plano proporcional com criterios de aceitacao
7. Executa/coordena com verificacao por etapa
8. Verifica resultado final vs criterios originais
9. Registra continuidade completa em `memoria/`

**Regra:** SEMPRE inicie com `skill entrevista-orquestradora`. Ela roteia para as skills/MCPs/workflows certos via `ORCHESTRATOR.md` e `SKILLS-SELECTION-MATRIX.md`.

---

## 1. PROTOCOLO DE INICIO DE SESSAO

**Antes de qualquer tarefa substancial, o agente DEVE:**

1. Ler o `AGENTS.md` aplicavel (este arquivo na raiz do projeto ou no repositorio de padroes)
2. **Ativar `skill entrevista-orquestradora`** (ponto de entrada unico)
3. Ler `memoria/ESTADO-ATUAL.md`
4. Ler `memoria/PROXIMO-PASSO.md`
5. Consultar o plano vigente em `memoria/PLANO-DE-EXECUCAO.md`
6. Consultar decisoes e pendencias pertinentes em `memoria/DECISOES.md` e `memoria/PENDENCIAS.md`
7. Inspecionar o estado real dos arquivos e do Git
8. Comparar o estado documentado com o estado real
9. Identificar divergencias
10. Informar brevemente o ponto de retomada
11. Continuar sem repetir tarefas ja concluidas

**Nao confiar cegamente nos registros.** Os arquivos reais, o Git e os resultados dos testes sao as fontes de evidencia.

---

## 2. REGRAS FUNDAMENTAIS DE EXECUCAO

| Regra | Descricao |
|-------|-----------|
| **Inspecao previa** | Examine os arquivos relevantes antes de editar |
| **Alteracoes pequenas** | Faca alteracoes coerentes com o objetivo, evite reescritas completas |
| **Validacao continua** | Execute testes, lint, type-check e build quando disponiveis |
| **Correcao imediata** | Corrija problemas introduzidos pelas alteracoes |
| **Evidencia real** | Nao invente resultados de testes nem declare validacoes nao executadas |
| **Sem segredos** | Nunca exponha credenciais, tokens, chaves privadas ou dados sensiveis |
| **Sem operacoes destrutivas** | Nao apague dados, nao publique em producao, nao faca push sem autorizacao explicita |
| **Preservacao** | Nao sobrescreva alteracoes preexistentes sem entender seu proposito |
| **Sem atalhos perigosos** | Nao desative testes, validacoes ou controles de seguranca para "fazer passar" |

---

## 3. ARQUITETURA E PADROES OBRIGATORIOS

**Referencia completa:** `ARCHITECTURE.md` + `docs/ARQUITETURA.md`

### Backend (Node.js + Express + TypeScript + Prisma)
- **Rotas**: definem endpoints, conectam middlewares e controladores
- **Controladores**: recebem req/res, chamam services, retornam respostas
- **Servicos**: implementam regras de negocio (use cases)
- **Validadores**: verificam entradas, parametros, payloads (Zod)
- **Repositorios**: isolam acesso a dados quando agregam valor
- **Middlewares**: auth, authZ, error handling, logging, CORS, rate limit
- **Configuracao**: centraliza variaveis de ambiente validadas (Zod + fail fast)
- **Tipos**: contratos e tipos do backend (DTOs entrada/saida, domain entities)
- **Tratamento de erros**: padroniza respostas, evita vazamento (AppError + middleware centralizado)

### Frontend (React + Vite + TypeScript)
- **Componentes**: reutilizaveis, acessiveis, responsivos (shadcn/ui + Tailwind)
- **Paginas/Layouts**: composicao de componentes, roteamento React Router
- **Hooks**: logica reutilizavel de estado/efeitos (React Query para server state)
- **Servicos HTTP**: axios tipado com interceptors (auth, refresh token, error handling)
- **Tipos**: contratos compartilhados com backend (DTOs, Response types)
- **Utilitarios**: funcoes puras auxiliares (formatters, validators, constants)
- **Estado**: proporcional a complexidade (Context para auth/theme, React Query para server state)

### Banco de Dados (PostgreSQL + Prisma)
- Migrations versionadas no Git
- Integridade referencial (FKs, cascades, indexes)
- Transacoes para operacoes multi-tabela atomicas (`$transaction`)
- Soft delete (`deletedAt`) em tabelas sensiveis
- Backup automatizado + PITR >= 7 dias + teste restore mensal
- Neon como opcao preferencial de hospedagem (serverless, branching, PITR)

---

## 4. SEGURANCA INTRANSPONIVEL

**Referencia completa:** `docs/SEGURANCA.md` + `checklists/SEGURANCA.md`

- **Autenticacao**: Argon2id (preferencial, memoryCost=19456, timeCost=2, parallelism=1) ou bcrypt >=12 rounds. **NUNCA** texto puro.
- **Autorizacao**: Middleware `autorizar` em **TODAS** rotas protegidas. RBAC granular (roles/permissions). Verificacao propriedade recurso (IDOR prevention): `userId === resource.ownerId`.
- **Validacao**: Backend = barreira principal (Zod em TODOS endpoints). Frontend = apenas UX.
- **Segredos**: **NUNCA** no frontend. **NUNCA** em `VITE_*`. `.env` real no `.gitignore`. Validação startup (Zod + fail fast).
- **Tokens**: JWT RS256 (assimetrico) preferencial. Access token <= 15min. Refresh token rotacao a cada uso, hash no DB, expiracao <= 7d. Cookies HttpOnly, Secure, SameSite=lax/strict.
- **Headers**: CSP, HSTS (maxAge=1ano, includeSubDomains, preload), X-Frame-Options=DENY, X-Content-Type-Options=nosniff, Referrer-Policy=strict-origin-when-cross-origin, Permissions-Policy restritivo.
- **Rate limiting**: 5 tent/15min por IP (auth), 100req/min global (API). Headers `Retry-After`.
- **CORS**: Allowlist explicita (nao `*`). Credentials true apenas se necessario.
- **Excecoes**: Tratamento centralizado (`errorHandler`). Sem stack traces em producao. Logs estruturados (Pino/Winston) com sanitizacao (senhas, tokens, PII).
- **Upload**: Validacao MIME real (magic bytes) + allowlist + sanitizacao (sharp). Storage privado + URLs assinadas temporarias.
- **Banco**: Role dedicada `app_user` (NAO superuser). Grants minimos. TLS obrigatorio. Soft delete + constraints + transacoes.

**Consulte:** `docs/SEGURANCA.md` (matriz 15 riscos) + `checklists/SEGURANCA.md` (checklist executavel).

---

## 5. FERRAMENTAS E SKILLS - USO SELETIVO

**Consulte:** `SKILLS-CATALOG.md` (catalogo completo), `SKILLS-SELECTION-MATRIX.md` (matriz intencao->skills), `TOOLS-AND-MCP.md` (ferramentas/MCPs), `ORCHESTRATOR.md` (roteamento).

**A `entrevista-orquestradora` ja faz essa selecao automaticamente.** Use-a como ponto de entrada.

### Skills Locais da Biblia (`.opencode/skills/` - 7 Skills)

| Skill | Funcao | Quando Usar |
|-------|--------|-------------|
| `entrevista-orquestradora` | **CENTRAL** - Entende, planeja, seleciona, executa, verifica | **SEMPRE** (ponto de entrada unico) |
| `planejamento-de-tarefas` | Analisa, divide, define criterios, identifica dependencias | Nova feature, tarefa complexa, planejar |
| `analise-de-legado` | Inspeciona arquitetura, modulos, dependencias, riscos | Antes de refatorar, onboarding legado |
| `revisao-de-interface` | Auditoria visual, responsividade, a11y, estados, reuso | Nova UI, PR frontend, redesign, auditoria |
| `auditoria-de-seguranca` | Auth, AuthZ, validacao, secrets, config, deps, matriz riscos | Pre-deploy, auth, dados sensiveis |
| `testes-com-roteiro` | Orquestra testes: unit, int, e2e, a11y, sec, perf | Validacao, regressao, pre-deploy |
| `revisao-final` | Quality gate: criterios, git, testes, build, docs, pendencias | Pre-merge, pre-release, entrega |

### Skills Globais Instaladas (7 Skills UI/UX/Design)

| Skill | Funcao | Quando Usar |
|-------|--------|-------------|
| `ui-ux-pro-max` | Design intelligence: 79 estilos, 192 paletas, 74 fonts, 119 guidelines | UI/UX design, auditoria, decisao visual |
| `design` | Brand, logo, CIP, mockups, slides, banners, icons, social photos | Design abrangente, brand, marketing |
| `design-system` | Tokens 3-layer, CSS vars, scales, component specs, slides | Design system tokens, componentes |
| `banner-design` | Banners multi-formato (22 styles, social/ads/web/print) | Marketing, ads, social media |
| `brand` | Brand voice, visual identity, messaging, asset management | Brand guidelines, compliance |
| `slides` | HTML presentations Chart.js, tokens, responsive | Apresentacoes tecnicas/executivas |
| `ui-styling` | shadcn/ui + Tailwind, componentes acessiveis, theming | Implementacao frontend, componentes |

### Plugins
- `graphify` - Knowledge graph (auto-reminder quando `graphify-out/` existe). `graphify query "pergunta"` para queries focadas.

### MCPs (Model Context Protocol)

| MCP | Funcao | Configuracao |
|-----|--------|--------------|
| `context7` | Docs tecnicas oficiais por versao exata | `~/.config/opencode/mcp/context7.json` + `CONTEXT7_API_KEY` |
| `github` | Releases, tags, teams, issues, PRs, repos | `~/.config/opencode/mcp/github.json` + `GITHUB_TOKEN` |
| `browser`/`playwright` | Automacao navegador, screenshots, E2E | `~/.config/opencode/mcp/browser.json` |

**Quando Usar Context7 (OBRIGATORIO):**
- Implementar React, Vite, TypeScript, Node.js, Express, Prisma, PostgreSQL
- Autenticacao (JWT, sessões, argon2, bcrypt, jose)
- Testes (Vitest, Testing Library, Playwright, Supertest)
- Resolver incompatibilidades versao, investigar erros deps
- Configurar MCPs/plugins com docs que mudaram

**Fluxo Context7:** Identificar lib -> Verificar versao no projeto -> `resolve-library-id` + `query-docs` -> Confirmar versao real -> Implementar -> Testes -> Registrar decisoes.

---

## 6. MATRIZ DE SELECAO RAPIDA (A `entrevista-orquestradora` ja faz isso)

| Pedido | Skills | MCPs | Referencia |
|--------|--------|------|------------|
| Nova feature web | `planejamento-de-tarefas`, `ui-ux-pro-max`/`frontend-ui-engineering`, `testes-com-roteiro`, `auditoria-de-seguranca`, `revisao-final` | Context7, Playwright | `templates/PLANO-IMPLEMENTACAO.md` + `checklists/DESENVOLVIMENTO.md` |
| Bug fix | `systematic-debugging`, `testes-com-roteiro`, `revisao-final` | Playwright, DevTools | `docs/TESTES.md` (regressao) + `checklists/DESENVOLVIMENTO.md` |
| Refatoracao/Legado | `analise-de-legado`, `code-simplification`, `testes-com-roteiro`, `revisao-final` | Graphify, Context7 | `docs/CODIGO-LIMPO.md` |
| Auditoria Seguranca | `auditoria-de-seguranca`, `testes-com-roteiro`(sec), `revisao-final` | npm audit, Playwright | `docs/SEGURANCA.md` + `checklists/SEGURANCA.md` |
| Auditoria UI/UX | `revisao-de-interface`, `testes-com-roteiro`(a11y), `revisao-final` | Playwright, axe-core | `checklists/REVISAO-DE-CODIGO.md` |
| Analise Legado | `analise-de-legado`, `graphify`, `code-simplification` | Graphify, Context7 | `docs/ARQUITETURA.md` |
| Pesquisa/Comparacao | `brainstorming`, `spec-driven-development`, `idea-refine`, `documentation-and-adrs` | Context7, WebSearch | `docs/FERRAMENTAS-IA.md` + `templates/DECISAO-TECNICA.md` |
| Deploy/Release | `revisao-final`, `ci-cd-and-automation`, `testes-com-roteiro`(smoke) | GitHub, Playwright | `checklists/PUBLICACAO.md` |
| Validar repositorio | `revisao-final` | - | `docs/VALIDACAO-DO-REPOSITORIO.md` |

**A `entrevista-orquestradora` consulta `SKILLS-SELECTION-MATRIX.md` e `ORCHESTRATOR.md` automaticamente.**

---

## 7. PROTOCOLO DURANTE EXECUCAO

**Apos CADA etapa significativa:**
- Atualizar `memoria/ESTADO-ATUAL.md` (fase, ultima validacao, proxima etapa, arquivos, testes, problemas, bloqueios, decisoes, pendencias)
- Atualizar `memoria/PLANO-DE-EXECUCAO.md` (status etapas: NAO INICIADA/EM ANDAMENTO/CONCLUIDA/BLOQUEADA/REQUER REVISAO)
- Registrar decisoes novas/modificadas em `memoria/DECISOES.md` (ID, data, decisao, contexto, alternativas, justificativa, consequencias, estado)
- Registrar pendencias em `memoria/PENDENCIAS.md` (ID, prioridade, impacto, dependencias, criterio resolucao, proxima acao, estado)
- Registrar resultados/evidencias em `memoria/HISTORICO-DE-EXECUCAO.md` (acao, comandos, resultados, falhas, correcoes)
- Atualizar `memoria/PROXIMO-PASSO.md` (instrucao executavel: onde retomar, arquivos, acao, dependencias, validacao, fallback)

**Nao espere o final** de uma tarefa extensa para registrar tudo.

---

## 8. PROTOCOLO DE INTERRUPCAO/ENCERRAMENTO

**Antes de interromper/encerrar:**
- Salvar estado atual completo
- Registrar ultimo ponto validado
- Identificar alteracoes nao testadas
- Registrar bloqueios
- Atualizar proximo passo (`PROXIMO-PASSO.md`)
- Registrar acoes nao executadas
- Preservar alteracoes existentes
- **Nao declarar conclusao** com criterios pendentes

---

## 9. RECUPERACAO APOS PERDA DE CONTEXTO

**Se o agente nao souber onde parou:**
1. **Nao inventar historico**
2. **Nao solicitar informacoes recuperaveis dos arquivos**
3. Consultar registros persistentes (`memoria/`)
4. Inspecionar Git e arquivos afetados
5. Reconstruir estado a partir de evidencias
6. Identificar conflitos
7. Corrigir registros quando necessario
8. Retomar a partir de ponto seguro

**Se incerteza risco perda/dano:** Interromper acao e pedir esclarecimento.

---

## 10. REGRA DE CONTINUIDADE

> **Antes de iniciar uma tarefa, recuperar o estado persistente.**
> **Antes de encerrar uma tarefa, salvar o estado atualizado.**
> **Nunca depender exclusivamente do historico da conversa para continuar um trabalho.**

---

## 11. CHECKLISTS OBRIGATORIOS (`checklists/` - 9)

| Checklist | Quando Usar |
|-----------|-------------|
| `INICIO.md` | Preparacao, bootstrap, validacao inicial |
| `DESENVOLVIMENTO.md` | Durante implementacao (qualidade, seguranca, padroes) |
| `SEGURANCA.md` | Auditoria seguranca (auth, authZ, validacao, secrets, deps) |
| `TESTES.md` | Validacao testes (unit, int, e2e, a11y, sec, perf) |
| `ROTEIRO-DE-TESTES.md` | 50+ cenarios detalhados (Auth, AuthZ, Validacao, CRUD, Falhas, Upload, Frontend, Perf, Sec) |
| `REVISAO-DE-CODIGO.md` | Code review multi-axis (funciona, legivel, seguro, performatico, testavel, consistente) |
| `ENTREGA.md` | Definition of done (criterios, git, testes, build, docs, regressoes, pendencias) |
| `PUBLICACAO.md` | Deploy, rollback, monitoramento, smoke tests, rollback plan |
| `USO-DE-IA.md` | Responsavel, etica, limitacoes, validacao, supervisao humana |

---

## 12. TEMPLATES REUTILIZAVEIS (`templates/` - 12)

| Template | Uso |
|----------|-----|
| `AGENTS.md` | Instrucoes operacionais projeto |
| `README.md` | Documentacao projeto |
| `ARQUITETURA.md` | Decisoes arquiteturais |
| `DECISAO-TECNICA.md` | ADR (Architecture Decision Record) |
| `PLANO-IMPLEMENTACAO.md` | Plano execucao detalhado |
| `ESPECIFICACAO-FUNCIONAL.md` | Requisitos funcionais |
| `PLANO-TESTES.md` | Estrategia testes |
| `AUDITORIA-SEGURANCA.md` | Relatório auditoria seg |
| `REVISAO-CODIGO.md` | Relatório code review |
| `RELATORIO-ENTREGA.md` | Relatório entrega |
| `REGISTRO-INCIDENTE.md` | Registro incidente |
| `DIVIDA-TECNICA.md` | Registro divida tecnica |

---

## 13. VALIDACAO E QUALIDADE

- **Nunca marque como concluido sem verificar**
- **Testes devem ser executados**, nao apenas escritos
- **Build deve passar** (type-check, lint, testes)
- **Documentacao deve refletir realidade** do codigo
- **Commits atomicos** com mensagens claras (Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`, `security:`)

---

## 15. DOCUMENTOS DE REFERENCIA DA BIBLIA (Obrigatorios)

| Arquivo | Descricao |
|---------|-----------|
| `INDEX.md` | Indice principal e mapa de navegacao |
| `ORCHESTRATOR.md` | Selecao modulos/skills/ferramentas/fluxo |
| `INTERVIEW.md` | Entrevista adaptativa detalhada |
| `SKILLS-CATALOG.md` | Catalogo completo skills (11 campos cada) |
| `TOOLS-AND-MCP.md` | Ferramentas, MCPs, integracao, validacao |
| `SKILLS-SELECTION-MATRIX.md` | Matriz intencao -> competencias |
| `ARCHITECTURE.md` | Padroes arquiteturais (este repo + `docs/ARQUITETURA.md`) |
| `docs/` | Documentacao tecnica detalhada (9 arquivos) |
| `checklists/` | Checklists obrigatorios (9) |
| `templates/` | Modelos de planos, auditorias, relatorios (12) |
| `memoria/` | Continuidade, decisoes, modelos de retomada (6) |
| `exemplos/` | Implementacoes de referencia |
| `scripts/` | Validacao e automacao |
| `.opencode/skills/` | Skills locais do repositorio (7) |
| `docs/ARQUITETURA.md` | Arquitetura modular detalhada (backend 9 camadas, frontend 6) |
| `docs/CODIGO-LIMPO.md` | Padroes: SRP, baixo acoplamento, TS strict, Zod, anti-padroes |
| `docs/SEGURANCA.md` | Auth (Argon2id, JWT RS256, refresh rotation), AuthZ, validacao, secrets, headers, banco, matriz 15 riscos |
| `docs/TESTES.md` | Piramide testes, Vitest/Playwright/axe/k6, coverage thresholds, CI, factories |
| `docs/FERRAMENTAS-IA.md` | Inventario: 3 categorias (Contexto, Implementacao, Testes) com 11 campos cada |
| `docs/IA-E-CONTEXTO.md` | Ecossistema: AGENTS, Skills, Docs, Memoria, Graphify, Context7, RAG, metricas |
| `docs/BOOTSTRAP-AMBIENTE.md` | Ordem obrigatoria: OpenCode, 7 skills globais, 3 MCPs, 6 skills locais, plugin, Git, env |
| `docs/VALIDACAO-DO-REPOSITORIO.md` | Comandos validacao: estrutura, links, syntax, skills, templates, secrets, exemplo |
| `memoria/` | Estado persistente (6 arquivos: ESTADO, PLANO, HISTORICO, DECISOES, PENDENCIAS, PROXIMO) |

---

## 16. COMUNICACAO E RELATORIOS

Ao concluir, informe:
1. Arquivos alterados/criados
2. Decisoes importantes
3. Verificacoes executadas (comandos, resultados)
4. Pendencias e limitacoes
5. Proximos passos recomendados

---

## RESUMO: FLUXO OBRIGATORIO DE CADA SESSAO

```
1. skill entrevista-orquestradora          <- SEMPRE PRIMEIRO
2. Le memoria/ESTADO-ATUAL.md
3. Le memoria/PROXIMO-PASSO.md
4. Consulta memoria/PLANO-DE-EXECUCAO.md
5. Consulta memoria/DECISOES.md + PENDENCIAS.md
6. Inspeciona estado real (arquivos + Git)
7. Compara documentado vs real
8. Identifica divergencias
9. Informa ponto de retomada
10. Continua sem repetir tarefas concluidas
```

---

**Este AGENTS.md deve ser consultado no inicio de CADA sessao.**
Consulte tambem `docs/` para documentacao detalhada, `memoria/` para estado persistente, e `INDEX.md` para navegacao completa da Biblia.