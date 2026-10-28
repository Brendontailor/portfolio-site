---
name: planejamento-de-tarefas
description: "Analisa solicitações, consulta estado persistente, identifica dependências, divide trabalho em etapas verificáveis e define critérios de aceitação. Baseada em planning-and-task-breakdown e writing-plans."
argument-hint: "[objetivo] [contexto-opcional]"
license: MIT
metadata:
  author: meu-padrao-de-desenvolvimento
  version: "1.0.0"
  domains: ["planejamento", "gestao-tarefas", "decomposicao"]
  triggers: ["nova feature", "tarefa complexa", "planejar", "dividir trabalho", "critérios de aceitação"]
---

# Skill: Planejamento de Tarefas

## Objetivo
Transformar uma solicitação (clara ou vaga) em um plano executável com etapas identificadas, dependências mapeadas, critérios de aceitação definidos e riscos identificados.

## Quando Ativar
- Nova feature ou funcionalidade
- Tarefa complexa com múltiplas etapas
- Refatoração significativa
- Início de sprint ou ciclo de trabalho
- Necessidade de estimar esforço ou escopo
- Solicitação "planeje isto" ou "como fazer X"

## Pré-condições
- AGENTS.md lido
- `memoria/ESTADO-ATUAL.md` acessível
- `memoria/PENDENCIAS.md` acessível
- Contexto do projeto inspecionado (estrutura, stack, decisões)

## Procedimento de Execução

### Passo 1: Entender a Solicitação
1. Ler o objetivo do usuário
2. Classificar: **domínio** (web, mobile, backend, infra, dados, IA, jogos, etc.), **tipo** (feature, bug, refatoração, pesquisa, auditoria, deploy), **complexidade** (baixa/média/alta), **risco** (baixo/médio/alto), **escopo** (arquivo, módulo, sistema, cross-cutting)
3. Identificar o resultado desejado tangível

### Passo 2: Consultar Estado e Contexto
1. Ler `memoria/ESTADO-ATUAL.md` - fase, última validação, arquivos recentes
2. Ler `memoria/PENDENCIAS.md` - pendências que podem impactar
3. Ler `memoria/DECISOES.md` - decisões técnicas vigentes
4. Inspecionar estrutura real do projeto (arquivos, Git status, package.json)
5. Verificar stack e padrões do projeto (docs/ARQUITETURA.md, docs/CODIGO-LIMPO.md)

### Passo 3: Identificar Lacunas Críticas
Para cada lacuna que **realmente afeta a solução**:
- Requisitos funcionais não claros
- Usuários/personas não definidos
- Restrições técnicas/negócio desconhecidas
- Integrações externas não mapeadas
- Critérios de aceitação ausentes
- Riscos não identificados

**Regra:** Se a informação pode ser obtida por inspeção (arquivos, Git, docs, ferramentas), obtenha-a **antes** de perguntar.

### Passo 4: Entrevista Adaptativa (se necessário)
- Para tarefas simples/claras: **não pergunte**, assuma padrões sensatos (reversíveis, baixo risco) e registre premissas
- Para tarefas complexas: faça perguntas **progressivas, uma por vez**, agrupando relacionadas
- Perguntas devem ser: objetivas, contextualizadas, com opções quando possível
- Se usuário disser "pode começar": prossiga com padrões sensatos + registro de premissas

### Passo 5: Decompor em Etapas
Criar plano com:
| Etapa | Descrição | Objetivo | Dependências | Critério Aceitação | Estado Inicial |
|-------|-----------|----------|--------------|-------------------|----------------|
| 1 | ... | ... | - | ... | NÃO INICIADA |
| 2 | ... | ... | 1 | ... | NÃO INICIADA |

**Regras de decomposição:**
- Cada etapa = resultado tangível verificável
- Dependências explícitas (etapa N requer etapa M)
- Critério de aceitação = "como sei que está pronto" (testável)
- Etapas independentes = podem rodar em paralelo
- Granularidade: nem muito grosso (dias), nem muito fino (minutos)

### Passo 6: Identificar Riscos e Mitigações
| Risco | Probabilidade | Impacto | Mitigação | Contingência |
|-------|--------------|---------|-----------|--------------|

### Passo 7: Selecionar Skills e Ferramentas
Consultar `SKILLS-CATALOG.md` e `TOOLS-AND-MCP.md` para mapear:
- Domínio → Skills pertinentes
- Tipo de tarefa → MCPs/ferramentas necessárias
- Complexidade → Agentes paralelos (se disponível)

### Passo 8: Registrar e Entregar
1. Salvar plano em `memoria/PLANO-DE-EXECUCAO.md` (formato padrão)
2. Registrar premissas em `memoria/DECISOES.md`
3. Registrar pendências descobertas em `memoria/PENDENCIAS.md`
4. Atualizar `memoria/PROXIMO-PASSO.md` com primeira etapa acionável
5. Apresentar síntese ao usuário: entendimento, premissas, plano, riscos, próxima ação

## Ferramentas Necessárias
- Leitura/escrita arquivos (`read`, `write`, `edit`)
- `grep`/`glob` para inspeção código
- `shell` para comandos Git, build, test
- `tools.context7` para docs técnicas (se biblioteca externa)
- `tools.github` para operações GitHub (se necessário)

## Limites de Responsabilidade
- **NÃO** implementa o código (isso é para skills de implementação)
- **NÃO** executa testes (skill `testes-com-roteiro`)
- **NÃO** faz code review (skill `revisao-final`)
- **NÃO** toma decisões de negócio irreversíveis sem confirmação
- **SIM** identifica quando uma decisão precisa de confirmação do usuário

## Critérios de Aceitação da Skill
- [ ] Plano criado com etapas identificadas estávelmente
- [ ] Dependências mapeadas corretamente
- [ ] Critérios de aceitação testáveis por etapa
- [ ] Riscos identificados com mitigações
- [ ] Skills/ferramentas selecionadas pertinentes
- [ ] Premissas registradas explicitamente
- [ ] Próximo passo acionável claro
- [ ] Registros de memória atualizados

## Tratamento de Falhas
| Falha | Ação |
|-------|------|
| Contexto insuficiente mesmo após inspeção | Perguntar lacunas críticas restantes |
| Usuário não responde perguntas críticas | Registrar como bloqueio, assumir padrão sensato (reversível) ou escalar |
| Plano fica grande demais (>20 etapas) | Dividir em fases/marcos, entregar incremental |
| Dependências circulares detectadas | Reportar como risco, replanejar |
| Decisão irreversível necessária | Parar, solicitar confirmação explícita |

## Formato de Entrega
```
## Plano de Execução: [Título]

### Entendimento
- Objetivo: ...
- Domínio: ... | Tipo: ... | Complexidade: ... | Risco: ...

### Premissas Registradas
1. ...
2. ...

### Plano (Etapas)
| # | Etapa | Objetivo | Depende de | Critério Aceitação | Status |
|---|-------|----------|------------|-------------------|--------|

### Riscos Identificados
| Risco | Prob. | Impacto | Mitigação |

### Skills/Ferramentas Selecionadas
- Skills: [...]
- MCPs: [...]
- Agentes paralelos: [...]

### Próximo Passo
[Instrução executável para retomada]
```

## Referências
- `docs/ARQUITETURA.md`, `docs/CODIGO-LIMPO.md`, `SKILLS-CATALOG.md`, `TOOLS-AND-MCP.md`
