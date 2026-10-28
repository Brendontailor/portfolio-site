# Guia de Contribuição

Obrigado por considerar contribuir para a **Bíblia Universal de IA**! Este documento descreve o processo de contribuição, padrões de código e diretrizes para manter a qualidade do projeto.

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** — veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Processo de Pull Request](#processo-de-pull-request)
- [Padrões de Código](#padrões-de-código)
- [Testes](#testes)
- [Documentação](#documentação)
- [Comunicação](#comunicação)

---

## 🤝 Código de Conduta

Este projeto adota o [Contributor Covenant](https://www.contributor-covenant.org/pt-BR/version/2/1/code_of_conduct/). Ao participar, você concorda em manter um ambiente respeitoso e inclusivo.

**Resumo**:
- Seja respeitoso e inclusivo
- Aceite críticas construtivas
- Foque no que é melhor para a comunidade
- Mostre empatia com outros contribuidores

**Reportar violações**: [email/contato do mantenedor]

---

## 🚀 Como Contribuir

### 1. Tipos de Contribuição Bem-Vindos

- **Correção de bugs** - Reporte e corrija issues
- **Novas funcionalidades** - Features, skills, templates, checklists
- **Documentação** - Melhorias, correções, traduções
- **Testes** - Unitários, integração, E2E, acessibilidade
- **Refatoração** - Limpeza, performance, padrões
- **Segurança** - Auditoria, vulnerabilidades, hardening
- **Exemplos** - Casos de uso reais, templates práticos

### 2. Configuração do Ambiente

```bash
# 1. Fork o repositório
git clone https://github.com/seu-usuario/meu-padrao-de-desenvolvimento.git
cd meu-padrao-de-desenvolvimento

# 2. Instale dependências
pnpm install  # ou npm install / yarn

# 3. Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais

# 4. Verifique se tudo funciona
pnpm run validate  # lint + typecheck + test + format:check
```

### 3. Estrutura de Branches

```bash
# Tipos de branch
feature/nome-da-feature      # Nova funcionalidade
fix/nome-do-bug              # Correção de bug
refactor/nome-da-refatoracao # Refatoração
docs/nome-da-doc             # Documentação
test/nome-do-teste           # Testes
chore/nome-da-tarefa         # Manutenção, configs
security/nome-da-seguranca   # Segurança
```

### 4. Convenção de Commits (Conventional Commits)

```
<tipo>(<escopo>): <descrição curta>

[corpo opcional]

[rodapé opcional]
```

**Tipos**:
- `feat` - Nova funcionalidade
- `fix` - Correção de bug
- `refactor` - Refatoração (sem mudança de comportamento)
- `docs` - Documentação
- `test` - Testes
- `chore` - Manutenção, build, configs
- `security` - Segurança
- `perf` - Performance
- `ci` - CI/CD
- `build` - Build system
- `revert` - Reverte commit anterior

**Exemplos**:
```
feat(skills): adicionar skill planejamento-de-tarefas
fix(security): corrigir validacao JWT no middleware auth
refactor(arch): extrair logica validacao para validator separado
docs(readme): atualizar instrucoes deploy
test(auth): adicionar testes login invalido
security(deps): atualizar dependencias vulneraveis
docs(arch): adicionar diagrama sequencia autenticacao
```

---

## 🔄 Processo de Pull Request

### 1. Antes de Abrir PR

- [ ] Issue relacionada criada/vinculada (`fixes #123`, `closes #456`)
- [ ] Branch criada a partir de `main` (ou `develop`)
- [ ] Código segue padrões do projeto (`pnpm run validate` passa)
- [ ] Testes escritos/atualizados (`pnpm run test` passa)
- [ ] Documentação atualizada (README, CHANGELOG, docs/)
- [ ] Commits seguem Conventional Commits
- [ ] Branch atualizada com `main` (`git rebase main`)

### 2. Template de PR

```markdown
## Descrição
[Resumo do que foi feito - 2-3 frases]

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Refatoração
- [ ] Documentação
- [ ] Testes
- [ ] Segurança
- [ ] Outro: _______

## Checklist
- [ ] `pnpm run validate` passa (lint + typecheck + test + format)
- [ ] Testes unitários/integração adicionados/atualizados
- [ ] Testes E2E para fluxos críticos (se aplicavel)
- [ ] Documentação atualizada (README, CHANGELOG, ADRs)
- [ ] Segurança revisada (checklists/SEGURANCA.md)
- [ ] Breaking changes documentados (se houver)

## Testes Executados
- [ ] Unitários: `pnpm run test:unit`
- [ ] Integração: `pnpm run test:integration`
- [ ] E2E: `pnpm run test:e2e`
- [ ] Acessibilidade: `pnpm run test:a11y`
- [ ] Cobertura: thresholds atendidos

## Evidências
- [Screenshots, logs, links para CI, etc.]

## Checklist de Revisão (para revisores)
- [ ] Código segue padrões (ARCHITECTURE.md, CODIGO-LIMPO.md)
- [ ] Segurança: auth/authZ, validacao, secrets, headers
- [ ] Testes cobrem casos de borda e erro
- [ ] Performance aceitável (p95 < 200ms)
- [ ] Acessibilidade (WCAG 2.1 AA)
- [ ] Documentação clara e completa
```

### 3. Processo de Review

1. **Autor**: Abre PR com template preenchido
2. **CI/CD**: Executa automaticamente (lint, typecheck, test, build)
3. **Revisor(es)**: Atribuídos automaticamente ou manualmente
4. **Review**: Usa `checklists/REVISAO-DE-CODIGO.md`
4. **Autor**: Resolve comentários, faz commits adicionais
5. **Aprovação**: Mínimo 1 aprovação de Tech Lead + CI verde
5. **Merge**: Squash and merge (ou rebase) para `main`

### 4. Critérios de Aprovação

- [ ] `pnpm run validate` passa (0 erros lint, typecheck, build, testes)
- [ ] Cobertura: linhas ≥ 80%, branches ≥ 70%, funções ≥ 80%
- [ ] Testes E2E críticos: 100% pass
- [ ] Acessibilidade: 0 violações WCAG 2.1 AA
- [ ] Segurança: 0 vulnerabilidades high/critical
- [ ] Documentação atualizada
- [ ] Commits atômicos, mensagens Conventional Commits
- [ ] Sem breaking changes não documentados

---

## 📝 Padrões de Código

> Referência completa: `docs/CODIGO-LIMPO.md`, `docs/ARQUITETURA.md`, `docs/SEGURANCA.md`

### TypeScript
- `strict: true` no tsconfig
- `noUncheckedIndexedAccess: true`
- `exactOptionalPropertyTypes: true`
- **Zero `any` desnecessário** (use `unknown` + type guard)
- Tipos de retorno explícitos em API pública
- Generics tipados corretamente

### Nomenclatura
| Item | Padrão | Exemplo |
|------|--------|---------|
| Arquivos | kebab-case | `usuarios.controller.ts` |
| Classes | PascalCase | `UsuariosController` |
| Métodos/Funções | camelCase, verbo+substantivo | `obterPorId`, `criar` |
| Interfaces/Types | PascalCase, sufixo opcional | `UsuarioResponse`, `CriarUsuarioDTO` |
| Enums | PascalCase, singular | `Role`, `StatusUsuario` |
| Constantes | UPPER_SNAKE_CASE | `HTTP_STATUS`, `MAX_UPLOAD_SIZE` |
| Variáveis env | UPPER_SNAKE_CASE | `DATABASE_URL`, `JWT_SECRET` |
| Rotas API | kebab-case, plural | `/api/v1/usuarios` |
| Componentes React | PascalCase | `UsuarioTable`, `Button` |
| Hooks | camelCase, prefixo `use` | `useUsuarios`, `useAuth` |

### Backend (Node/Express/Prisma)
- Clean Architecture: Routes → Controllers → Services → Repositories → Prisma
- Zod para **TODA** validação (body, params, query)
- Middlewares: `autenticar` → `autorizar` → `validar` → `controller`
- Error handling centralizado (`AppError` + middleware `errorHandler`)
- JWT RS256 (assimétrico) + Refresh token rotation
- Argon2id para hash senhas (memoryCost=19456, timeCost=2, parallelism=1)
- Soft delete (`deletedAt`) em tabelas sensíveis
- Transações (`$transaction`) para operações multi-tabela

### Frontend (React/Vite/Tailwind)
- shadcn/ui + Radix UI + Tailwind CSS
- React Query (TanStack Query) para server state
- React Hook Form + Zod resolver para formulários
- Componentes primitivos em `components/ui/`
- Hooks personalizados em `hooks/` (`useAuth`, `useUsuarios`, `useApi`)
- Axios com interceptors (auth, refresh token, error handling)
- Acessibilidade nativa (Radix UI primitives)

### Segurança (Obrigatório)
- **Backend = barreira principal**, Frontend = UX apenas
- Argon2id (preferencial) ou bcrypt ≥ 12 rounds
- JWT RS256 (assimétrico), access ≤ 15min, refresh ≤ 7d + rotação
- Cookies: HttpOnly, Secure, SameSite=lax/strict
- Rate limiting: auth 5/15min, API 100req/min
- CORS: allowlist explícita (não `*`)
- Helmet.js: CSP, HSTS, X-Frame-Options, Referrer-Policy
- Logs estruturados (Pino/Winston) + sanitização (senhas, tokens, PII)
- `.env` no `.gitignore`, `.env.example` no Git
- Validação env no startup (Zod + fail fast)
- **NUNCA** segredos em `VITE_*` (frontend)

---

## 🧪 Testes

> Referência: `docs/TESTES.md`, `checklists/TESTES.md`, `checklists/ROTEIRO-DE-TESTES.md`

### Pirâmide de Testes
```
        E2E (Poucos) ← Playwright
       /            \
  Integração (Alguns) ← Vitest + Supertest + Test DB
     /                \
Unitários (Muitos) ← Vitest + Testing Library + MSW
```

### Thresholds Obrigatórios
| Métrica | Threshold |
|---------|-----------|
| Linhas | ≥ 80% |
| Branches | ≥ 70% |
| Funções | ≥ 80% |
| Statements | ≥ 80% |

### Ferramentas
| Tipo | Ferramenta |
|------|------------|
| Unit/Integration | Vitest + Supertest + Test DB |
| E2E | Playwright (Chromium, Firefox, WebKit, Mobile) |
| Componentes | Vitest + Testing Library + MSW |
| Hooks | Vitest + React Query + MSW |
| Acessibilidade | axe-core + Playwright/Vitest |
| Performance | k6 / Lighthouse CI |
| Segurança | npm audit / Snyk / OWASP ZAP |

### Quality Gates (Bloqueiam Merge)
- `pnpm run lint` → 0 errors
- `pnpm run typecheck` → 0 errors
- `pnpm run build` → Sucesso
- `pnpm run test` → 100% pass
- `pnpm run test:e2e` → 100% pass (criticos)
- `pnpm run test:a11y` → 0 violations
- `pnpm run test:coverage` → Thresholds atendidos
- `npm audit --audit-level=high` → 0 high/critical

---

## 📚 Documentação

### Obrigatória em Novas Features
- [ ] `README.md` atualizado (se feature visível)
- [ ] `CHANGELOG.md` (Conventional Commits)
- [ ] `docs/ARQUITETURA.md` (se mudança arquitetural)
- [ ] `docs/DECISOES-TECNICAS.md` (ADR se decisão arquitetural)
- [ ] `CHANGELOG.md` (Conventional Commits)
- [ ] API docs (OpenAPI/Swagger se aplicavel)

### Templates Disponíveis
Use os templates em `templates/`:
- `AGENTS.md` - Instruções projeto
- `README.md` - Documentação projeto
- `ARQUITETURA.md` - Decisões arquiteturais
- `DECISAO-TECNICA.md` - ADR
- `PLANO-IMPLEMENTACAO.md` - Plano execução
- `ESPECIFICACAO-FUNCIONAL.md` - Requisitos
- `PLANO-TESTES.md` - Estratégia testes
- `AUDITORIA-SEGURANCA.md` - Relatório auditoria
- `REVISAO-CODIGO.md` - Code review
- `RELATORIO-ENTREGA.md` - Relatório entrega
- `REGISTRO-INCIDENTE.md` - Registro incidente
- `DIVIDA-TECNICA.md` - Registro dívida técnica

---

## 💬 Comunicação

### Canais
- **Issues GitHub**: Bugs, features, discussões técnicas
- **Discussions GitHub**: Perguntas, ideias, RFCs
- **Slack/Discord** (se configurado): Chat rápido, dúvidas rápidas
- **Email**: Segurança, privacidade, assuntos sensíveis

### Etiquetas (Labels)
| Label | Uso |
|-------|-----|
| `bug` | Bug report |
| `feature` | Feature request |
| `documentation` | Documentação |
| `security` | Segurança |
| `good first issue` | Bom para iniciantes |
| `help wanted` | Precisa ajuda |
| `breaking change` | Breaking change |
| `needs review` | Precisa review |
| `blocked` | Bloqueado |
| `wont fix` | Não será corrigido |

---

## 🏷️ Versionamento e Release

### Semantic Versioning
- **MAJOR**: Breaking changes (API, arquitetura, breaking changes)
- **MINOR**: Novas features compatíveis
- **PATCH**: Bug fixes compatíveis

### Release Process
1. `main` branch sempre deployável
2. Release branch: `release/v1.2.0`
3. Tag: `git tag -a v1.2.0 -m "Release v1.2.0"`
4. `CHANGELOG.md` atualizado
5. GitHub Release publicado
6. Deploy produção (manual, aprovado)

---

## 🎯 Prioridades de Contribuição

### Alta Prioridade
- Correções de segurança
- Bugs críticos (SEV-1/SEV-2)
- Testes flaky / cobertura baixa
- Documentação faltante/incorreta
- Acessibilidade (WCAG AA)

### Média Prioridade
- Novas features solicitadas
- Refatoração tech debt (P1/P2)
- Performance optimization
- Novos testes (E2E, integração)

### Baixa Prioridade
- Refatoração cosmética
- Features experimentais
- Melhorias de DX não críticas

---

## ❓ Dúvidas Frequentes

**P: Posso contribuir com apenas documentação?**
R: Sim! Documentação é uma das contribuições mais valiosas.

**P: Preciso saber TypeScript/React/Node para contribuir?**
R: Para código sim. Para docs/tests/design, não necessariamente.

**P: Como reporto vulnerabilidade de segurança?**
R: Use `.github/ISSUE_TEMPLATE/security_report.md` (privado) ou email direto ao security champion.

**P: Meu PR foi rejeitado. E agora?**
R: Leia os comentários, faça as alterações solicitadas, reforce os testes, reenvie.

**P: Posso sugerir nova skill/ferramenta?**
R: Sim! Abra issue com label `feature` descrevendo a necessidade e caso de uso.

---

## 📞 Contato

- **Mantenedor Principal**: [Nome/Contato]
- **Security Champion**: [Nome/Contato]
- **Tech Lead**: [Nome/Contato]
- **Issues**: GitHub Issues
- **Discussões**: GitHub Discussions

---

## 📄 Licença

Este projeto está sob licença **[LICENÇA PENDENTE - Ver `memoria/DECISOES.md`]**.

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto.

---

**Obrigado por contribuir! 🎉**

*Sua contribuição ajuda a tornar a Bíblia Universal de IA melhor para todos.*