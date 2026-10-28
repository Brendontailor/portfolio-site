---
name: analise-de-legado
description: "Inspeciona arquitetura, módulos, dependências e riscos antes de refatorações. Preserva funcionalidades e NÃO modifica código quando a solicitação for somente de análise. Baseada em reverse-engineer-anything, code-simplification e graphify."
argument-hint: "[caminho-projeto] [foco-opcional]"
license: MIT
metadata:
  author: meu-padrao-de-desenvolvimento
  version: "1.0.0"
  domains: ["analise-legado", "engenharia-reversa", "refatoracao", "arquitetura"]
  triggers: ["analisar legado", "entender código existente", "riscos refatoração", "mapear dependências", "documentar arquitetura"]
---

# Skill: Análise de Legado

## Objetivo
Compreender profundamente um código existente (legado ou não) antes de propor mudanças, identificando arquitetura, módulos, dependências, dívida técnica, riscos e oportunidades - **sem modificar o código** a menos que explicitamente solicitado para correção pontual.

## Quando Ativar
- Antes de refatorar/migrar sistema existente
- Onboarding em código desconhecido
- Auditoria técnica ou due diligence
- Documentação de arquitetura atual
- Investigação de bugs recorrentes
- Planejamento de migração/strangler fig

## Pré-condições
- Acesso ao código fonte (repositório local)
- `graphify` disponível (se instalado) para grafo de dependências
- Permissão de leitura em todo o projeto
- AGENTS.md e docs/ARQUITETURA.md lidos

## Procedimento de Execução

### Passo 1: Reconhecimento Inicial
1. **Estrutura geral**: `ls -la`, `tree` ou `glob` para mapear diretórios
2. **Arquivos de configuração**: package.json, tsconfig, prisma/schema, docker, CI/CD
3. **Entry points**: main, server, app, routes, index
3. **Documentação existente**: README, ARCHITECTURE, ADRs, comentários de arquitetura

### Passo 2: Mapear Arquitetura (Graphify + Inspeção)
**Se graphify disponível:**
- `graphify build` (se não existe `graphify-out/`)
- `graphify query "arquitetura geral do projeto"`
- `graphify query "módulos principais e dependências"`
- `graphify query "fluxo de dados: request → response"`

**Inspeção manual complementar:**
- Identificar camadas: routes → controllers → services → repositories → DB
- Padrões: modular, layered, feature-based, clean architecture
- Convenções: naming, estrutura pastas, imports, exports

### Passo 3: Analisar Módulos e Dependências
Para cada módulo principal:
| Módulo | Responsabilidade | Arquivos-chave | Dependências Internas | Dependências Externas | Acoplamento |
|--------|-----------------|----------------|----------------------|----------------------|-------------|

**Métricas de acoplamento:**
- Import fan-in/out
- Dependências circulares (`madge --circular` ou similar)
- Uso de `any`, `unknown`, type assertions excessivas
- God classes/modules (arquivos > 500 linhas, muitas responsabilidades)

### Passo 4: Identificar Dívida Técnica e Riscos
**Checklist sistemático:**
- [ ] **Arquivos grandes** (>300 linhas) sem separação clara
- [ ] **Dependências circulares** entre módulos
- [ ] **Duplicação de código** (funções, validações, tipos)
- [ ] **`any` excessivo** / tipagem fraca
- [ ] **Testes ausentes** ou insuficientes (cobertura < 70%)
- [ ] **Segredos no código** / `.env` commitado
- [ ] **Logs de debug** em produção
- [ ] **Tratamento de erro inconsistente** / `try/catch` vazio
- [ ] **Validação apenas no frontend** (sem backend)
- [ ] **Queries N+1** / performance suspeita
- [ ] **Migrações perigosas** (drop column, rename sem expand/contract)
- [ ] **Dependências desatualizadas/vulneráveis** (`npm audit`)
- [ ] **Código morto** / imports não utilizados / feature flags órfãs
- [ ] **Segurança**: authZ ausente, SQL injection, XSS, CSRF

### Passo 5: Analisar Fluxos Críticos
Para cada fluxo principal (ex: login, criar pedido, pagamento):
1. Rastrear: Route → Controller → Service → Repository → DB → Response
2. Identificar: validações, transações, eventos, side effects
3. Verificar: idempotência, rollback, observabilidade, timeouts

### Passo 6: Avaliar Testabilidade
- Cobertura atual (unit, integration, e2e)
- Mocks necessários vs dependências reais
- Fixtures/factories existentes
- CI/CD pipeline funcionando

### Passo 7: Documentar Achados
**Relatório de Análise:**
```
## Análise de Legado: [Projeto/Sistema]

### Visão Geral
- Stack: ...
- Tamanho: X arquivos, Y linhas, Z módulos
- Arquitetura: [modular/layered/monolito/outro]

### Módulos Principais
| Módulo | Arquivos | Responsabilidade | Riscos |

### Dependências Críticas
- Circulares: ...
- Externas desatualizadas: ...
- Acoplamento forte: ...

### Dívida Técnica (Priorizada)
1. [Crítico] ...
2. [Alto] ...
3. [Médio] ...
4. [Baixo] ...

### Riscos de Refatoração
| Risco | Probabilidade | Impacto | Mitigação |

### Oportunidades de Melhoria
- Quick wins: ...
- Médio prazo: ...
- Arquitetural: ...

### Recomendações
1. Não tocar em: [módulos estáveis]
2. Refatorar primeiro: [módulos de alto risco/valor]
3. Testes necessários antes: ...
4. Estrangulamento sugerido: ...
```

### Passo 8: Entregar (Somente Análise)
**Se solicitação for "apenas analisar":** Entregar relatório acima, **não modificar código**.
**Se solicitação incluir correção:** Aplicar apenas correções pontuais acordadas (ex: remover `console.log`, corrigir typo em comentário, ajustar import), documentando cada mudança.

## Ferramentas Necessárias
- `graphify` (grafo conhecimento)
- `madge` / `depcruise` (dependências circulares)
- `grep`/`rg` (busca padrões)
- `cloc` / `tokei` (estatísticas código)
- `npm audit` / `pnpm audit` (vulnerabilidades)
- `tools.context7` (docs libs externas encontradas)

## Limites de Responsabilidade
- **NÃO** refatora código (skill `code-simplification` ou implementação)
- **NÃO** escreve testes (skill `testes-com-roteiro` + `test-driven-development`)
- **NÃO** decide migração de stack (requer decisão arquitetural)
- **SIM** identifica o que precisa ser feito, em que ordem, com que riscos
- **SIM** preserva funcionalidades existentes como regra absoluta

## Critérios de Aceitação
- [ ] Arquitetura mapeada com módulos e responsabilidades
- [ ] Dependências (internas/externas) documentadas
- [ ] Dívida técnica priorizada com evidências
- [ ] Riscos de refatoração identificados com mitigações
- [ ] Recomendações acionáveis e priorizadas
- [ ] Código **não modificado** (salvo correções pontuais acordadas)
- [ ] Relatório salvo em `memoria/` ou `docs/` conforme acordado

## Tratamento de Falhas
| Falha | Ação |
|-------|------|
| Código muito grande para análise completa | Amostragem representativa + foco em áreas de mudança |
| Graphify não disponível | Inspeção manual + `madge` + documentação existente |
| Dependências circulares massivas | Documentar como risco crítico, sugerir estrangulamento gradual |
| Código sem testes e alta complexidade | Recomendar testes de caracterização antes de qualquer mudança |
| Segredos encontrados | Reportar imediatamente, não expor no relatório, sugerir rotação |

## Formato de Entrega
Relatório em Markdown salvo em `docs/ANALISE-LEGADO-[projeto]-[data].md` ou `memoria/ANALISE-LEGADO-[timestamp].md`

## Referências
- `docs/ARQUITETURA.md`, `docs/CODIGO-LIMPO.md`, `docs/SEGURANCA.md`
- `graphify` plugin, `madge`, `depcruise`, `code-simplification` skill
