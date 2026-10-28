---
name: testes-com-roteiro
description: "Cria cenários reproduzíveis, define pré-condições, executa testes, registra evidências, diferencia resultados: aprovado, reprovado, bloqueado, não executado. Baseada em test-driven-development, playwright-mcp-workflows e checklists/ROTEIRO-DE-TESTES.md."
argument-hint: "[caminho-projeto] [escopo: unit|integration|e2e|a11y|security|performance]"
license: MIT
metadata:
  author: meu-padrao-de-desenvolvimento
  version: "1.0.0"
  domains: ["testes", "qualidade", "validacao", "regressao", "e2e", "unitarios", "integracao"]
  triggers: ["testes", "validar", "regressão", "cenários", "cobertura", "e2e", "unitários", "integração"]
---

# Skill: Testes com Roteiro

## Objetivo
Orquestrar a execução de testes sistemáticos com roteiros reproduzíveis, definindo pré-condições, executando, registrando evidências e classificando resultados (APROVADO, REPROVADO, BLOQUEADO, NÃO EXECUTADO) - **não escrever testes, apenas orquestrar execução e validação**.

## Quando Ativar
- Nova funcionalidade implementada (validação)
- Bug fix (teste de regressão)
- Pré-deploy / release candidate
- Auditoria de qualidade
- Validação de correções de segurança
- Teste de performance/carga

## Pré-condições
- Projeto com testes implementados (Vitest, Playwright, etc.)
- `docs/TESTES.md`, `checklists/TESTES.md`, `checklists/ROTEIRO-DE-TESTES.md` lidos
- Ambiente de teste configurado (DB teste, mocks, MSW)
- Permissão para executar testes (não modificar código de teste)

## Procedimento de Execução

### Passo 1: Definir Escopo e Selecionar Roteiro
| Escopo | Roteiro/Checklist | Ferramentas |
|--------|-------------------|-------------|
| **unit** | `checklists/TESTES.md` (seção Unitários) | Vitest |
| **integration** | `checklists/TESTES.md` (seção Integração) | Vitest + Supertest + Test DB |
| **e2e** | `checklists/ROTEIRO-DE-TESTES.md` (módulo Frontend E2E) | Playwright |
| **a11y** | `checklists/TESTES.md` (seção Acessibilidade) | axe-core + Playwright |
| **security** | `checklists/ROTEIRO-DE-TESTES.md` (módulo Segurança) | npm audit, Playwright, scripts custom |
| **performance** | `checklists/TESTES.md` (seção Performance) | k6, Lighthouse CI |

### Passo 2: Preparar Ambiente de Teste
1. Verificar se `npm test` / `npm run test:e2e` funcionam
2. Subir banco de teste (Docker/local) se integração/E2E
3. Aplicar migrations + seed de teste
4. Configurar variáveis de ambiente teste (`.env.test`)
5. Verificar MSW handlers para mocks de API (frontend)
6. Limpar relatórios anteriores (`coverage/`, `test-results/`, `playwright-report/`)

### Passo 3: Executar Roteiro de Testes
**Para cada cenário no roteiro selecionado:**

#### Execução Unitária/Integração (Vitest)
```bash
# Unitários
npm run test:unit -- --reporter=json --outputFile=test-results/unit.json

# Integração
npm run test:integration -- --reporter=json --outputFile=test-results/integration.json

# Cobertura
npm run test:coverage -- --reporter=lcov --outputFile=coverage/lcov.info
```

#### Execução E2E (Playwright)
```bash
# Todos
npx playwright test --reporter=json --output=test-results/e2e.json

# Específico
npx playwright test e2e/auth.login.spec.ts --reporter=json
```

#### Execução Acessibilidade
```bash
# Unitário (componentes)
npm run test:a11y:unit

# E2E (páginas completas)
npm run test:a11y:e2e
```

#### Execução Segurança
```bash
npm audit --audit-level=high --json > test-results/security-audit.json
npx playwright test e2e/security.spec.ts
```

#### Execução Performance
```bash
k6 run k6-script.js --out json=test-results/perf.json
npm run lighthouse:ci
```

### Passo 4: Registrar Resultados por Cenário
Para **cada cenário** no roteiro, preencher:
| Cenário ID | Descrição | Tipo | Status | Evidência | Observação |
|------------|-----------|------|--------|-----------|------------|
| CT-AUTH-001 | Login válido | Integration | APROVADO | `test-results/integration.json` | - |
| CT-AUTH-002 | Senha errada | Integration | APROVADO | `test-results/integration.json` | - |
| CT-FE-001 | Login flow E2E | E2E | REPROVADO | screenshot + trace | Redirect falhou |

**Status permitidos:**
- **APROVADO**: Todos passos executados, resultado conforme esperado
- **REPROVADO**: Falha em algum passo, comportamento divergente
- **BLOQUEADO**: Não executado (dependência, ambiente, bug conhecido)
- **NÃO EXECUTADO**: Ainda não testado nesta execução

### Passo 5: Coletar Evidências Obrigatórias
| Tipo Teste | Evidências Mínimas |
|------------|-------------------|
| Unit/Integration | JSON results (Vitest), coverage report (lcov/HTML) |
| E2E | JSON results, screenshots falhas, traces (retry 1), videos (se configurado) |
| Acessibilidade | Relatório axe-core (HTML/JSON), screenshots violações |
| Segurança | `npm audit` JSON, relatório Playwright security |
| Performance | k6 JSON/HTML, Lighthouse CI HTML/JSON |

**Armazenamento:** `test-results/[tipo]-[timestamp]/`

### Passo 6: Cobertura e Quality Gates
**Verificar thresholds (configuráveis no projeto):**
| Métrica | Threshold Mínimo | Ação se Falhar |
|---------|------------------|----------------|
| Cobertura linhas | 80% | Bloquear merge |
| Cobertura branches | 70% | Bloquear merge |
| Testes unitários | 100% pass | Bloquear merge |
| Testes integração | 100% pass | Bloquear merge |
| E2E críticos | 100% pass | Bloquear merge |
| TypeScript errors | 0 | Bloquear merge |
| ESLint errors | 0 | Bloquear merge |
| npm audit high/critical | 0 | Bloquear merge |

### Passo 7: Relatório de Execução
```
# Execução de Testes: [Projeto] - [Data] - [Escopo]

## Configuração
- Ambiente: [local|CI|staging]
- Escopo: [unit|integration|e2e|a11y|security|performance|all]
- Versão testada: [commit/branch/tag]
- Duração total: X min

## Sumário Executivo
- Total cenários: X
- APROVADO: Y
- REPROVADO: Z (lista)
- BLOQUEADO: W (lista + motivo)
- NÃO EXECUTADO: V (lista)

## Quality Gates
| Métrica | Threshold | Atual | Status |
|---------|-----------|-------|--------|
| Cobertura linhas | 80% | 85% | ✅ |
| Cobertura branches | 70% | 72% | ✅ |
| Testes unit | 100% pass | 245/245 | ✅ |
| Testes int | 100% pass | 48/48 | ✅ |
| E2E críticos | 100% pass | 12/12 | ✅ |
| TypeScript | 0 errors | 0 | ✅ |
| ESLint | 0 errors | 0 | ✅ |
| npm audit | 0 high/crit | 0 | ✅ |

## Cenários REPROVADO (Detalhado)
| Cenário | Falha | Evidência | Causa Raiz (se conhecida) | Próximo Passo |

## Cenários BLOQUEADO
| Cenário | Motivo | Ação para Desbloquear |

## Cobertura por Módulo
| Módulo | Linhas | Branches | Funções | Statements |
|--------|--------|----------|---------|------------|

## Evidências
- Resultados completos: `test-results/[tipo]-[timestamp]/`
- Coverage HTML: `coverage/html/index.html`
- Screenshots/Traces: `test-results/e2e-[timestamp]/`
```

### Passo 8: Registrar e Entregar
1. Salvar relatório em `docs/TESTES-EXECUCAO-[projeto]-[data]-[escopo].md`
2. Atualizar `memoria/PENDENCIAS.md` com REPROVADOS/BLOQUEADOS
3. Atualizar `memoria/HISTORICO-DE-EXECUCAO.md` com execução
4. Se REPROVADOS críticos → bloquear merge/deploy, criar tasks de correção
5. Entregar relatório + evidências

## Ferramentas Necessárias
- **Vitest**: unitários, integração, cobertura
- **Playwright**: E2E, acessibilidade, visual regression
- **axe-core**: acessibilidade automatizada
- **k6**: performance/carga
- **Lighthouse CI**: Core Web Vitals
- **npm audit** / **Snyk**: segurança dependências
- **MSW**: mocks API para testes frontend
- **Supertest**: integração API backend

## Limites de Responsabilidade
- **NÃO** escreve testes (skill `test-driven-development` para implementar)
- **NÃO** corrige bugs encontrados (skill `debugging-and-error-recovery` + implementação)
- **NÃO** modifica código de teste (exceto correção de flakiness óbvia)
- **SIM** orquestra execução, valida qualidade, registra evidências, classifica resultados
- **SIM** bloqueia merge/deploy se quality gates falharem

## Critérios de Aceitação
- [ ] Escopo definido e roteiro selecionado
- [ ] Ambiente de teste preparado e validado
- [ ] Todos cenários no roteiro executados (ou status registrado)
- [ ] Evidências coletadas para cada cenário
- [ ] Quality gates verificados com thresholds
- [ ] Relatório completo com evidências, sumário, recomendações
- [ ] REPROVADOS/BLOQUEADOS registrados em `memoria/PENDENCIAS.md`
- [ ] Código de teste **não modificado** (exceto flakiness óbvia documentada)

## Tratamento de Falhas
| Falha | Ação |
|-------|------|
| Teste flaky (intermitente) | Registrar como BLOQUEADO, marcar para investigação, não bloquear merge se isolado |
| Ambiente teste indisponível | Marcar cenários dependentes como BLOQUEADO, documentar dependência |
| Cobertura abaixo do threshold | Bloquear merge, criar task para adicionar testes |
| Falha em teste E2E crítico | Bloquear deploy, investigar causa raiz (app vs teste) |
| `npm audit` falha | Verificar falsos positivos, documentar, decidir aceitação de risco |

## Formato de Entrega
Relatório em `docs/TESTES-EXECUCAO-[projeto]-[data]-[escopo].md` + evidências em `test-results/`

## Referências
- `checklists/TESTES.md` - Checklist executável por tipo
- `checklists/ROTEIRO-DE-TESTES.md` - 50+ cenários detalhados com ID, pré-condições, passos, resultado esperado
- `docs/TESTES.md` - Estratégia completa, ferramentas, thresholds, CI pipeline
- `test-driven-development` skill (implementação testes)
- `playwright-mcp-workflows` skill (E2E avançado)
- `browser-testing-with-devtools` skill (debugging testes)