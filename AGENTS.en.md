# AGENTS.md - Operational Instructions for AI Agents

> **THIS IS THE MANDATORY ENTRY POINT.** Every agent MUST read this file at the start of EVERY session.

---

## 0. CENTRAL SKILL: ORCHESTRATOR INTERVIEW

**BEFORE ANYTHING ELSE:** Activate the Bible's central skill.

```bash
skill entrevista-orquestradora
```

This skill is the **single entry point** of the Bible. It:
1. Understands your request and classifies (domain/type/complexity/risk/scope)
2. Consults the Bible index (`INDEX.md`, `ORCHESTRATOR.md`, `SKILLS-CATALOG.md`)
3. Discovers real context (inspects files, Git, `memoria/`)
4. Conducts adaptive interview only if necessary (critical gaps affecting the solution)
5. Selects minimal required skills/MCPs/tools
6. Prepares proportional plan with acceptance criteria
7. Executes/coordinates with step-by-step verification
8. Verifies final result vs original criteria
9. Records complete continuity in `memoria/`

**Rule:** ALWAYS start with `skill entrevista-orquestradora`. It routes to the right skills/MCPs/workflows via `ORCHESTRATOR.md` and `SKILLS-SELECTION-MATRIX.md`.

---

## 1. SESSION START PROTOCOL

**Before any substantial task, the agent MUST:**

1. Read the applicable `AGENTS.md` (this file at project root or in the patterns repo)
2. **Activate `skill entrevista-orquestradora`** (single entry point)
3. Read `memoria/ESTADO-ATUAL.md`
4. Read `memoria/PROXIMO-PASSO.md`
5. Consult current plan in `memoria/PLANO-DE-EXECUCAO.md`
6. Consult relevant decisions and pending items in `memoria/DECISOES.md` and `memoria/PENDENCIAS.md`
7. Inspect real state of files and Git
8. Compare documented state with real state
9. Identify divergences
10. Briefly inform the resumption point
11. Continue without repeating already completed tasks

**Do not blindly trust records.** Real files, Git, and test results are the evidence sources.

---

## 2. FUNDAMENTAL EXECUTION RULES

| Rule | Description |
|------|-------------|
| **Prior inspection** | Examine relevant files before editing |
| **Small changes** | Make coherent changes aligned with the goal, avoid complete rewrites |
| **Continuous validation** | Run tests, lint, type-check and build when available |
| **Immediate correction** | Fix problems introduced by changes |
| **Real evidence** | Don't invent test results or declare unexecuted validations |
| **No secrets** | Never expose credentials, tokens, private keys or sensitive data |
| **No destructive operations** | Don't delete data, don't publish to production, don't push without explicit authorization |
| **Preservation** | Don't overwrite pre-existing changes without understanding their purpose |
| **No dangerous shortcuts** | Don't disable tests, validations or security controls to "make it pass" |

---

## 3. MANDATORY ARCHITECTURE AND PATTERNS

**Complete reference:** `ARCHITECTURE.md` + `docs/ARQUITETURA.md`

### Backend (Node.js + Express + TypeScript + Prisma)
- **Routes**: define endpoints, connect middlewares and controllers
- **Controllers**: receive req/res, call services, return responses
- **Services**: implement business rules (use cases)
- **Validators**: verify inputs, parameters, payloads (Zod)
- **Repositories**: isolate data access when they add value
- **Middlewares**: auth, authZ, error handling, logging, CORS, rate limit
- **Configuration**: centralizes validated environment variables (Zod + fail fast)
- **Types**: backend contracts and types (input/output DTOs, domain entities)
- **Error handling**: standardizes responses, prevents leakage (AppError + centralized middleware)

### Frontend (React + Vite + TypeScript)
- **Components**: reusable, accessible, responsive (shadcn/ui + Tailwind)
- **Pages/Layouts**: component composition, React Router routing
- **Hooks**: reusable state/effects logic (React Query for server state)
- **HTTP Services**: typed axios with interceptors (auth, refresh token, error handling)
- **Types**: shared contracts with backend (DTOs, Response types)
- **Utilities**: pure helper functions (formatters, validators, constants)
- **State**: proportional to complexity (Context for auth/theme, React Query for server state)

### Database (PostgreSQL + Prisma)
- Versioned migrations in Git
- Referential integrity (FKs, cascades, indexes)
- Transactions for atomic multi-table operations (`$transaction`)
- Soft delete (`deletedAt`) in sensitive tables
- Automated backup + PITR >= 7 days + monthly restore test
- Neon as preferred hosting option (serverless, branching, PITR)

---

## 4. INTRANSIGENT SECURITY

**Complete reference:** `docs/SEGURANCA.md` + `checklists/SEGURANCA.md`

- **Authentication**: Argon2id (preferred, memoryCost=19456, timeCost=2, parallelism=1) or bcrypt >=12 rounds. **NEVER** plain text.
- **Authorization**: Middleware `autorizar` in **ALL** protected routes. Granular RBAC (roles/permissions). Resource ownership verification (IDOR prevention): `userId === resource.ownerId`.
- **Validation**: Backend = primary barrier (Zod in ALL endpoints). Frontend = UX only.
- **Secrets**: **NEVER** in frontend. **NEVER** in `VITE_*`. Real `.env` in `.gitignore`. Startup validation (Zod + fail fast).
- **Tokens**: JWT RS256 (asymmetric) preferred. Access token <= 15min. Refresh token rotation per use, hash in DB, expiration <= 7d. Cookies HttpOnly, Secure, SameSite=lax/strict.
- **Headers**: CSP, HSTS (maxAge=1year, includeSubDomains, preload), X-Frame-Options=DENY, X-Content-Type-Options=nosniff, Referrer-Policy=strict-origin-when-cross-origin, restrictive Permissions-Policy.
- **Rate limiting**: 5 attempts/15min per IP (auth), 100req/min global (API). `Retry-After` headers.
- **CORS**: Explicit allowlist (not `*`). Credentials true only if necessary.
- **Exceptions**: Centralized handling (`errorHandler`). No stack traces in production. Structured logs (Pino/Winston) with sanitization (passwords, tokens, PII).
- **Upload**: Real MIME validation (magic bytes) + allowlist + sanitization (sharp). Private storage + temporary signed URLs.
- **Database**: Dedicated `app_user` role (NOT superuser). Minimal grants. TLS mandatory. Soft delete + constraints + transactions.

**Consult:** `docs/SEGURANCA.md` (15 risk matrix) + `checklists/SEGURANCA.md` (executable checklist).

---

## 5. TOOLS AND SKILLS - SELECTIVE USE

**Consult:** `SKILLS-CATALOG.md` (complete catalog), `SKILLS-SELECTION-MATRIX.md` (intent->skills matrix), `TOOLS-AND-MCP.md` (tools/MCPs), `ORCHESTRATOR.md` (routing).

**The `entrevista-orquestradora` already does this selection automatically.** Use it as entry point.

### Local Bible Skills (`.opencode/skills/` - 7 Skills)

| Skill | Function | When to Use |
|-------|----------|-------------|
| `entrevista-orquestradora` | **CENTRAL** - Understands, plans, selects, executes, verifies | **ALWAYS** (single entry point) |
| `planejamento-de-tarefas` | Analyzes, divides, defines criteria, identifies dependencies | New feature, complex task, planning |
| `analise-de-legado` | Inspects architecture, modules, dependencies, risks | Before refactoring, legacy onboarding |
| `revisao-de-interface` | Visual audit, responsiveness, a11y, states, reuse | New UI, frontend PR, redesign, audit |
| `auditoria-de-seguranca` | Auth, AuthZ, validation, secrets, config, deps, risk matrix | Pre-deploy, auth, sensitive data |
| `testes-com-roteiro` | Orchestrates tests: unit, int, e2e, a11y, sec, perf | Validation, regression, pre-deploy |
| `revisao-final` | Quality gate: criteria, git, tests, build, docs, pending | Pre-merge, pre-release, delivery |

### Global Installed Skills (7 UI/UX/Design Skills)

| Skill | Function | When to Use |
|-------|----------|-------------|
| `ui-ux-pro-max` | Design intelligence: 79 styles, 192 palettes, 74 fonts, 119 guidelines | UI/UX design, audit, visual decision |
| `design` | Brand, logo, CIP, mockups, slides, banners, icons, social photos | Comprehensive design, brand, marketing |
| `design-system` | 3-layer tokens, CSS vars, scales, component specs, slides | Design system tokens, components |
| `banner-design` | Multi-format banners (22 styles, social/ads/web/print) | Marketing, ads, social media |
| `brand` | Brand voice, visual identity, messaging, asset management | Brand guidelines, compliance |
| `slides` | HTML presentations Chart.js, tokens, responsive | Technical/executive presentations |
| `ui-styling` | shadcn/ui + Tailwind, accessible components, theming | Frontend implementation, components |

### Plugins
- `graphify` - Knowledge graph (auto-reminder when `graphify-out/` exists). `graphify query "question"` for focused queries.

### MCPs (Model Context Protocol)

| MCP | Function | Configuration |
|-----|----------|---------------|
| `context7` | Official technical docs by exact version | `~/.config/opencode/mcp/context7.json` + `CONTEXT7_API_KEY` |
| `github` | Releases, tags, teams, issues, PRs, repos | `~/.config/opencode/mcp/github.json` + `GITHUB_TOKEN` |
| `browser`/`playwright` | Browser automation, screenshots, E2E | `~/.config/opencode/mcp/browser.json` |

**When to Use Context7 (MANDATORY):**
- Implement React, Vite, TypeScript, Node.js, Express, Prisma, PostgreSQL
- Authentication (JWT, sessions, argon2, bcrypt, jose)
- Tests (Vitest, Testing Library, Playwright, Supertest)
- Resolve version incompatibilities, investigate dep errors
- Configure MCPs/plugins with changed docs

**Context7 Flow:** Identify lib -> Verify version in project -> `resolve-library-id` + `query-docs` -> Confirm real version -> Implement -> Tests -> Record decisions.

---

## 6. QUICK SELECTION MATRIX (The `entrevista-orquestradora` already does this)

| Request | Skills | MCPs | Reference |
|---------|--------|------|-----------|
| New web feature | `planejamento-de-tarefas`, `ui-ux-pro-max`/`frontend-ui-engineering`, `testes-com-roteiro`, `auditoria-de-seguranca`, `revisao-final` | Context7, Playwright | `templates/PLANO-IMPLEMENTACAO.md` + `checklists/DESENVOLVIMENTO.md` |
| Bug fix | `systematic-debugging`, `testes-com-roteiro`, `revisao-final` | Playwright, DevTools | `docs/TESTES.md` (regression) + `checklists/DESENVOLVIMENTO.md` |
| Refactoring/Legacy | `analise-de-legado`, `code-simplification`, `testes-com-roteiro`, `revisao-final` | Graphify, Context7 | `docs/CODIGO-LIMPO.md` |
| Security Audit | `auditoria-de-seguranca`, `testes-com-roteiro`(sec), `revisao-final` | npm audit, Playwright | `docs/SEGURANCA.md` + `checklists/SEGURANCA.md` |
| UI/UX Audit | `revisao-de-interface`, `testes-com-roteiro`(a11y), `revisao-final` | Playwright, axe-core | `checklists/REVISAO-DE-CODIGO.md` |
| Legacy Analysis | `analise-de-legado`, `graphify`, `code-simplification` | Graphify, Context7 | `docs/ARQUITETURA.md` |
| Research/Comparison | `brainstorming`, `spec-driven-development`, `idea-refine`, `documentation-and-adrs` | Context7, WebSearch | `docs/FERRAMENTAS-IA.md` + `templates/DECISAO-TECNICA.md` |
| Deploy/Release | `revisao-final`, `ci-cd-and-automation`, `testes-com-roteiro`(smoke) | GitHub, Playwright | `checklists/PUBLICACAO.md` |
| Validate repository | `revisao-final` | - | `docs/VALIDACAO-DO-REPOSITORIO.md` |

**The `entrevista-orquestradora` consults `SKILLS-SELECTION-MATRIX.md` and `ORCHESTRATOR.md` automatically.**

---

## 7. DURING EXECUTION PROTOCOL

**After EACH significant step:**
- Update `memoria/ESTADO-ATUAL.md` (phase, last validation, next step, files, tests, problems, blockers, decisions, pending)
- Update `memoria/PLANO-DE-EXECUCAO.md` (step status: NOT STARTED/IN PROGRESS/COMPLETED/BLOCKED/NEEDS REVIEW)
- Record new/modified decisions in `memoria/DECISOES.md` (ID, date, decision, context, alternatives, justification, consequences, state)
- Record pending items in `memoria/PENDENCIAS.md` (ID, priority, impact, dependencies, resolution criterion, next action, state)
- Record results/evidence in `memoria/HISTORICO-DE-EXECUCAO.md` (action, commands, results, failures, corrections)
- Update `memoria/PROXIMO-PASSO.md` (executable instruction: where to resume, files, action, dependencies, validation, fallback)

**Don't wait until the end** of an extensive task to record everything.

---

## 8. INTERRUPTION/CLOSURE PROTOCOL

**Before interrupting/closing:**
- Save complete current state
- Record last validated point
- Identify untested changes
- Record blockers
- Update next step (`PROXIMO-PASSO.md`)
- Record unexecuted actions
- Preserve existing changes
- **Do not declare completion** with pending criteria

---

## 9. RECOVERY AFTER CONTEXT LOSS

**If the agent doesn't know where it stopped:**
1. **Don't invent history**
2. **Don't request information recoverable from files**
3. Consult persistent records (`memoria/`)
4. Inspect Git and affected files
5. Reconstruct state from evidence
6. Identify conflicts
7. Correct records when necessary
8. Resume from safe point

**If uncertainty risks loss/damage:** Interrupt action and ask for clarification.

---

## 10. CONTINUITY RULE

> **Before starting a task, recover persistent state.**
> **Before closing a task, save updated state.**
> **Never rely exclusively on conversation history to continue work.**

---

## 11. MANDATORY CHECKLISTS (`checklists/` - 9)

| Checklist | When to Use |
|-----------|-------------|
| `INICIO.md` | Preparation, bootstrap, initial validation |
| `DESENVOLVIMENTO.md` | During implementation (quality, security, patterns) |
| `SEGURANCA.md` | Security audit (auth, authZ, validation, secrets, deps) |
| `TESTES.md` | Test validation (unit, int, e2e, a11y, sec, perf) |
| `ROTEIRO-DE-TESTES.md` | 50+ detailed scenarios (Auth, AuthZ, Validation, CRUD, Failures, Upload, Frontend, Perf, Sec) |
| `REVISAO-DE-CODIGO.md` | Multi-axis code review (works, readable, secure, performant, testable, consistent) |
| `ENTREGA.md` | Definition of done (criteria, git, tests, build, docs, regressions, pending) |
| `PUBLICACAO.md` | Deploy, rollback, monitoring, smoke tests, rollback plan |
| `USO-DE-IA.md` | Responsible, ethical, limitations, validation, human supervision |

---

## 12. REUSABLE TEMPLATES (`templates/` - 12)

| Template | Use |
|----------|-----|
| `AGENTS.md` | Project operational instructions |
| `README.md` | Project documentation |
| `ARQUITETURA.md` | Architectural decisions |
| `DECISAO-TECNICA.md` | ADR (Architecture Decision Record) |
| `PLANO-IMPLEMENTACAO.md` | Detailed execution plan |
| `ESPECIFICACAO-FUNCIONAL.md` | Functional requirements |
| `PLANO-TESTES.md` | Test strategy |
| `AUDITORIA-SEGURANCA.md` | Security audit report |
| `REVISAO-CODIGO.md` | Code review report |
| `RELATORIO-ENTREGA.md` | Delivery report |
| `REGISTRO-INCIDENTE.md` | Incident log |
| `DIVIDA-TECNICA.md` | Technical debt log |

---

## 13. VALIDATION AND QUALITY

- **Never mark as completed without verifying**
- **Tests must be executed**, not just written
- **Build must pass** (type-check, lint, tests)
- **Documentation must reflect code reality**
- **Atomic commits** with clear messages (Conventional Commits: `feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`, `security:`)

---

## 15. BIBLE REFERENCE DOCUMENTS (Mandatory)

| File | Description |
|------|-------------|
| `INDEX.md` | Main index and navigation map |
| `ORCHESTRATOR.md` | Module/skill/tool/flow selection |
| `INTERVIEW.md` | Detailed adaptive interview |
| `SKILLS-CATALOG.md` | Complete skills catalog (11 fields each) |
| `TOOLS-AND-MCP.md` | Tools, MCPs, integration, validation |
| `SKILLS-SELECTION-MATRIX.md` | Intent -> competencies matrix |
| `ARCHITECTURE.md` | Architectural patterns (this repo + `docs/ARQUITETURA.md`) |
| `docs/` | Detailed technical documentation (9 files) |
| `checklists/` | Mandatory checklists (9) |
| `templates/` | Plan, audit, report templates (12) |
| `memoria/` | Continuity, decisions, resumption models (6) |
| `exemplos/` | Reference implementations |
| `scripts/` | Validation and automation |
| `.opencode/skills/` | Local repo skills (7) |
| `docs/ARQUITETURA.md` | Detailed modular architecture (backend 9 layers, frontend 6) |
| `docs/CODIGO-LIMPO.md` | Patterns: SRP, low coupling, TS strict, Zod, anti-patterns |
| `docs/SEGURANCA.md` | Auth (Argon2id, JWT RS256, refresh rotation), AuthZ, validation, secrets, headers, DB, 15 risk matrix |
| `docs/TESTES.md` | Test pyramid, Vitest/Playwright/axe/k6, coverage thresholds, CI, factories |
| `docs/FERRAMENTAS-IA.md` | Inventory: 3 categories (Context, Implementation, Tests) with 11 fields each |
| `docs/IA-E-CONTEXTO.md` | Ecosystem: AGENTS, Skills, Docs, Memory, Graphify, Context7, RAG, metrics |
| `docs/BOOTSTRAP-AMBIENTE.md` | Mandatory order: OpenCode, 7 global skills, 3 MCPs, 6 local skills, plugin, Git, env |
| `docs/VALIDACAO-DO-REPOSITORIO.md` | Validation commands: structure, links, syntax, skills, templates, secrets, example |
| `memoria/` | Persistent state (6 files: ESTADO, PLANO, HISTORICO, DECISOES, PENDENCIAS, PROXIMO) |

---

## 16. COMMUNICATION AND REPORTS

Upon completion, inform:
1. Files changed/created
2. Important decisions
3. Executed verifications (commands, results)
4. Pending items and limitations
5. Recommended next steps

---

## SUMMARY: MANDATORY FLOW FOR EVERY SESSION

```
1. skill entrevista-orquestradora          <- ALWAYS FIRST
2. Read memoria/ESTADO-ATUAL.md
3. Read memoria/PROXIMO-PASSO.md
4. Consult memoria/PLANO-DE-EXECUCAO.md
5. Consult memoria/DECISOES.md + PENDENCIAS.md
6. Inspect real state (files + Git)
7. Compare documented vs real
8. Identify divergences
9. Inform resumption point
10. Continue without repeating completed tasks
```

---

**This AGENTS.md must be consulted at the start of EVERY session.**
Also consult `docs/` for detailed documentation, `memoria/` for persistent state, and `INDEX.md` for complete Bible navigation.