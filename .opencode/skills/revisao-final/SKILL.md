---
name: revisao-final
description: "Confere critérios de aceitação, alterações no Git, testes, build, documentação, regressões e pendências. Baseada em code-review-and-quality, receiving-code-review, requesting-code-review."
argument-hint: "[caminho-projeto] [pr-ou-branch] [escopo: completa|merge|release]"
license: MIT
metadata:
  author: meu-padrao-de-desenvolvimento
  version: "1.0.0"
  domains: ["code-review", "quality-gate", "entrega", "release", "validacao-final"]
  triggers: ["revisão final", "pré-merge", "pré-release", "validação entrega", "quality gate", "definition of done"]
---

# Skill: Revisão Final

## Objetivo
Realizar verificação final completa antes de merge/release, conferindo critérios de aceitação, alterações no Git, testes, build, documentação, regressões e pendências - **decisão final: APROVAR, CONDICIONAL, REJEITAR**.

## Quando Ativar
- Pull Request pronto para merge (pré-merge)
- Release candidate (pré-release)
- Entrega de funcionalidade/milestone
- Validação de definition of done
- Quality gate obrigatório

## Pré-condições
- PR/branch com implementação completa
- Testes executados (skill `testes-com-roteiro` ou CI passou)
- Build passando localmente
- `checklists/REVISAO-DE-CODIGO.md`, `checklists/ENTREGA.md` lidos
- Acesso ao diff Git completo

## Procedimento de Execução

### Passo 1: Coletar Contexto da Entrega
1. Identificar: PR/branch, autor, descrição, issue relacionada
2. Ler descrição da mudança + critérios de aceitação originais
3. Obter diff completo: `git diff main...branch --stat` + `git diff main...branch`
4. Identificar arquivos alterados: novos, modificados, removidos

### Passo 2: Verificar Critérios de Aceitação
**Para cada critério original:**
| Critério | Status | Evidência | Observação |
|----------|--------|-----------|------------|
| Funcionalidade X implementada | ✅/❌/⚠️ | Teste CT-XXX APROVADO | |
| Regra de negócio Y validada | ✅/❌/⚠️ | Teste CT-YYY APROVADO | |
| Performance Z atendida | ✅/❌/⚠️ | k6 p95 < 200ms | |
| Acessibilidade WCAG AA | ✅/❌/⚠️ | axe 0 violações | |

**Se qualquer critério ❌ → REJEITAR (exceto se condicional acordado)**

### Passo 3: Analisar Diff Git (Qualidade de Código)
**Verificar cada arquivo modificado:**

#### Arquitetura e Padrões
- [ ] Segue `docs/ARQUITETURA.md` (camadas, responsabilidades)
- [ ] Segue `docs/CODIGO-LIMPO.md` (nomes, funções pequenas, tipagem, comentários)
- [ ] Separação de responsabilidades mantida (routes/controllers/services/validators)
- [ ] Não há quebra de contratos (tipos, APIs, eventos)
- [ ] Novos módulos seguem estrutura padrão

#### Segurança (checklists/SEGURANCA.md)
- [ ] Auth/AuthZ: middleware em rotas protegidas, RBAC, IDOR prevention
- [ ] Validação: Zod schemas em endpoints, sanitização output
- [ ] Segredos: nenhum no frontend, `.env` no gitignore, validação startup
- [ ] Headers: CSP, HSTS, X-Frame-Options, Referrer-Policy
- [ ] Rate limit: endpoints sensíveis protegidos
- [ ] Logs: estruturados, sem segredos/PII

#### Qualidade e Manutenibilidade
- [ ] TypeScript strict: sem `any` desnecessário, tipos inferidos corretos
- [ ] Funções pequenas (<50 linhas), responsabilidade única
- [ ] Nomes claros (PT-BR domínio, inglês tech), convenções seguidas
- [ ] Imports organizados (externos → internos → relativos → types)
- [ ] Exports named (não default para classes/funções principais)
- [ ] Comentários: por quê (decisões), não o quê (código óbvio)
- [ ] Sem código morto, imports não utilizados, `console.log` debug

#### Testes e Qualidade
- [ ] Testes unitários para nova lógica (cobertura ≥ 80%)
- [ ] Testes integração para endpoints novos/modificados
- [ ] Testes E2E para fluxos críticos novos
- [ ] Cobertura mantida/acima threshold (linhas 80%, branches 70%)
- [ ] Testes passam localmente e no CI

### Passo 4: Build e Type Checking
```bash
# Executar e verificar saída limpa
npm run typecheck  # tsc --noEmit → 0 erros
npm run lint       # ESLint → 0 errors (warnings aceitos se justificados)
npm run build      # Build produção → sucesso
npm run test       # Todos testes → pass
```

**Se qualquer falha → CONDICIONAL (corrigir antes de aprovar)**

### Passo 5: Documentação e Rastreabilidade
- [ ] `README.md` atualizado se nova funcionalidade/config
- [ ] `CHANGELOG.md` atualizado (Conventional Commits)
- [ ] `docs/ARQUITETURA.md` atualizado se mudança arquitetural
- [ ] `docs/DECISOES-TECNICAS.md` (ADR) se decisão arquitetural
- [ ] `memoria/DECISOES.md` e `memoria/PENDENCIAS.md` atualizados
- [ ] Commits atômicos, mensagens Conventional Commits (`feat:`, `fix:`, `refactor:`, etc.)
- [ ] Branch nomeada corretamente (`feature/`, `fix/`, `refactor/`, `chore/`)

### Passo 6: Verificar Regressões
- [ ] Executar suite completa de testes (não apenas novos)
- [ ] Verificar se funcionalidades existentes não quebraram
- [ ] Testes E2E críticos passam (login, fluxos principais)
- [ ] Performance: p95 latência não degradou > 10%
- [ ] Bundle size (frontend): não aumentou > 10% sem justificativa

### Passo 7: Pendências e Riscos Residuais
**Listar explicitamente:**
| Item | Tipo | Severidade | Mitigação | Responsável | Prazo |
|------|------|------------|-----------|-------------|-------|
| TODO em código | Tech debt | Baixo | Criar issue | Autor | Próxima sprint |
| Config hardcoded | Config | Médio | Mover para env | Autor | Antes merge |
| Teste flaky conhecido | Qualidade | Médio | Investigar | QA | Esta sprint |

**Se pendências Críticas/Alto sem mitigação → CONDICIONAL ou REJEITAR**

### Passo 8: Decisão Final
| Decisão | Critério |
|---------|----------|
| **APROVAR** | Todos critérios ✅, build ✅, testes ✅, docs ✅, pendências apenas Baixo/Informativo |
| **CONDICIONAL** | Itens ⚠️ (Médio) com mitigação acordada + prazo, OU build/testes com correção trivial conhecida |
| **REJEITAR** | Qualquer critério ❌ (Crítico/Alto), build falha, testes falham, segurança comprometida, pendências Críticas sem mitigação |

### Passo 8: Relatório de Revisão Final
```
# Revisão Final: [PR/Branch] - [Data]

## Contexto
- PR: #[numero] | Branch: [nome] | Autor: [nome]
- Issue: #[numero] | Descrição: [resumo]
- Critérios de aceitação originais: [lista]

## Verificações
### Critérios de Aceitação
| Critério | Status | Evidência |

### Qualidade Código (Diff)
| Arquivo | Status | Observações |

### Segurança
| Item | Status | Evidência |

### Build e Testes
| Etapa | Status | Evidência |

### Documentação
| Item | Status |

### Pendências Residuais
| Item | Severidade | Mitigação | Prazo |

## Decisão Final
**DECISÃO: [APROVAR | CONDICIONAL | REJEITAR]**

**Justificativa:** [resumo dos pontos decisivos]

**Condições (se CONDICIONAL):**
1. [Item] - Responsável: [quem] - Prazo: [quando]
2. ...

**Próximos Passos:**
- [ ] Merge/Release
- [ ] Deploy
- [ ] Monitoramento pós-deploy
- [ ] Atualizar memoria/ (PENDENCIAS, DECISOES, HISTORICO)
```

### Passo 9: Registrar e Comunicar
1. Salvar relatório em `docs/REVISAO-FINAL-[PR]-[data].md`
2. Atualizar `memoria/PENDENCIAS.md` com pendências residuais
3. Atualizar `memoria/DECISOES.md` com decisão
4. Atualizar `memoria/HISTORICO-DE-EXECUCAO.md`
5. Comunicar decisão ao autor/stakeholders

## Ferramentas Necessárias
- `git diff`, `git log`, `git show`
- `npm run typecheck`, `npm run lint`, `npm run build`, `npm run test`
- `checklists/REVISAO-DE-CODIGO.md`, `checklists/ENTREGA.md`, `checklists/SEGURANCA.md`
- `docs/ARQUITETURA.md`, `docs/CODIGO-LIMPO.md`, `docs/SEGURANCA.md`
- CI/CD logs (GitHub Actions, GitLab CI, etc.)

## Limites de Responsabilidade
- **NÃO** reescreve código (autor corrige)
- **NÃO** implementa testes faltantes (autor implementa)
- **NÃO** toma decisão de negócio (apresenta riscos, usuário decide)
- **SIM** verifica exhaustivamente, bloqueia se critérios não atendidos
- **SIM** documenta decisão com evidências

## Critérios de Aceitação
- [ ] Todos critérios de aceitação originais verificados com evidência
- [ ] Diff analisado arquivo a arquivo (arquitetura, segurança, qualidade)
- [ ] Build, typecheck, lint, testes passando
- [ ] Documentação atualizada
- [ ] Pendências residuais documentadas com mitigação/prazo
- [ ] Decisão final clara (APROVAR/CONDICIONAL/REJEITAR) com justificativa
- [ ] Relatório salvo em `docs/REVISAO-FINAL-[PR]-[data].md`
- [ ] `memoria/` atualizado

## Tratamento de Falhas
| Falha | Ação |
|-------|------|
| Build falha mas testes passam | CONDICIONAL - corrigir build antes de merge |
| Testes falham intermitentemente | Verificar flakiness, CONDICIONAL se isolado |
| Segurança: achado Crítico | REJEITAR até mitigação |
| Documentação desatualizada | CONDICIONAL - atualizar antes de merge |
| Autor não disponível para correções | Escalar, documentar bloqueio |

## Formato de Entrega
Relatório em `docs/REVISAO-FINAL-[PR]-[data].md`

## Referências
- `checklists/REVISAO-DE-CODIGO.md` - Checklist multi-axis
- `checklists/ENTREGA.md` - Definition of done
- `checklists/SEGURANCA.md` - Segurança
- `docs/ARQUITETURA.md`, `docs/CODIGO-LIMPO.md`, `docs/SEGURANCA.md`
- `code-review-and-quality` skill (revisão multi-axis)
- `receiving-code-review` skill (processar feedback)
- `requesting-code-review` skill (solicitar review adequado)