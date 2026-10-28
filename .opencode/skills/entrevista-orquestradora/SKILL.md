---
name: entrevista-orquestradora
description: "Skill central da Bíblia: entende o pedido, classifica a tarefa, consulta o índice, faz entrevista adaptativa, seleciona Skills/MCPs/ferramentas, prepara plano proporcional, executa e verifica. Combina interview-me, brainstorming, context-engineering, using-agent-skills, find-skills, writing-plans."
argument-hint: "[pedido-do-usuario] [contexto-opcional]"
license: MIT
metadata:
  author: meu-padrao-de-desenvolvimento
  version: "1.0.0"
  domains: ["orquestracao", "entrevista-adaptativa", "planejamento", "selecao-skills", "execucao", "biblia-central"]
  triggers: ["qualquer pedido", "inicio de sessao", "nova tarefa", "biblia", "orquestrar", "como fazer"]
---

# Skill: Entrevista Orquestradora (Central da Biblia)

## Objetivo
**Ponto de entrada unico da Biblia.** Entender a intencao do usuario, descobrir o que falta saber, consultar os modulos certos, selecionar as competencias necessarias, preparar um plano proporcional, executar/coordenar a execucao e verificar o resultado - tudo de forma autonoma e responsavel.

## Principios Fundamentais
1. **Entender antes de agir** - Nunca assumir, sempre clarificar o essencial
2. **Descobrir antes de executar** - Inspecionar, consultar, mapear antes de propor
3. **Proporcionalidade** - Processo leve para tarefas simples, riguroso para complexas
4. **Autonomia responsavel** - Decidir o reversivel/baixo risco, perguntar o irreversivel/alto risco
5. **Evidencia sobre afirmacao** - Verificar, testar, documentar resultados reais
6. **Continuidade** - Preservar estado entre sessoes via `memoria/`

## Quando Ativar
**SEMPRE** - E a skill central. Ativa em:
- Inicio de qualquer sessao substancial
- Novo pedido do usuario (qualquer dominio)
- Inicio de novo projeto
- Continuacao de trabalho interrompido
- Quando o usuario diz "consulte a Biblia"

## Pre-condicoes
- `AGENTS.md` lido (regras operacionais)
- `INDEX.md` disponivel (indice da Biblia)
- `memoria/` acessivel (estado persistente)
- `SKILLS-CATALOG.md` e `TOOLS-AND-MCP.md` disponiveis
- Permissoes do ambiente conhecidas

---

## FLUXO PRINCIPAL DE EXECUCAO

### ETAPA 1: ENTENDER O PEDIDO (Entrada)
**Entrada:** Pedido bruto do usuario (pode ser vago, tecnico, de negocio, vago)

**Acoes:**
1. Ler o pedido completo
2. Identificar: **intencao aparente** (o que o usuario quer), **dominio** (web, mobile, backend, dados, IA, jogos, design, pesquisa, automação, etc.), **tipo** (feature, bug, refatoracao, auditoria, pesquisa, deploy, aprendizado, etc.)
3. Verificar se ha contexto anterior em `memoria/ESTADO-ATUAL.md` e `memoria/PROXIMO-PASSO.md`
4. **Nao perguntar ainda** - apenas classificar e preparar

### ETAPA 2: CLASSIFICAR A TAREFA
**Matriz de Classificacao:**

| Dimensao | Opcoes | Como Determinar |
|----------|--------|-----------------|
| **Dominio** | web, mobile, backend, api, dados, ia, jogos, design, pesquisa, automação, infra, seguranca | Palavras-chave + contexto |
| **Tipo** | feature, bug, refatoracao, auditoria, pesquisa, deploy, config, aprendizado, manutencao | Verbos + objetivo |
| **Complexidade** | baixa (1-2 etapas), media (3-8), alta (9+), desconhecida | Escopo + dependencias |
| **Risco** | baixo (reversivel, isolado), medio (parcialmente reversivel), alto (irreversivel, dados, producao, seguranca, financeiro) | Impacto de falha |
| **Escopo** | arquivo, componente, modulo, sistema, cross-cutting, organizacao | Area de impacto |

**Exemplos de classificacao automatica:**
- "Crie um login" -> web, feature, media, medio, modulo auth
- "Corrija este bug no carrinho" -> web, bug, baixa/baixa, baixo, componente carrinho
- "Audite a seguranca do sistema" -> seguranca, auditoria, alta, alto, sistema
- "Melhore este jogo Godot" -> jogos, refatoracao, desconhecida, medio, sistema
- "Explique este erro" -> web/backend, pesquisa, baixa, baixo, arquivo/funcao

### ETAPA 3: CONSULTAR INDICE E CONTEXTO (Discovery)
**Consultar em ordem:**
1. `INDEX.md` - Mapa da Biblia, localizar modulos relevantes
2. `memoria/ESTADO-ATUAL.md` - Fase atual, ultima validacao, arquivos recentes
3. `memoria/PROXIMO-PASSO.md` - Onde retomar se continuando trabalho
4. `memoria/PLANO-DE-EXECUCAO.md` - Plano vigente (se continuando)
5. `memoria/DECISOES.md` - Decisoes tecnicas vigentes (stack, padroes, seguranca)
6. `memoria/PENDENCIAS.md` - Pendencias que podem impactar
7. Inspecionar projeto real - `ls`, `git status`, `package.json`, estrutura pastas
8. `SKILLS-CATALOG.md` - Skills disponiveis para o dominio/tipo
9. `TOOLS-AND-MCP.md` - MCPs/ferramentas disponiveis e compativeis

**Resultado da Discovery:** Mapa do que existe, o que e relevante, gaps de informacao.

### ETAPA 4: IDENTIFICAR LACUNAS CRITICAS
**Para cada informacao que REALMENTE afeta a solucao, verificar se ja se sabe:**

| Categoria | Perguntas Chave | Como Obter (sem perguntar) |
|-----------|-----------------|----------------------------|
| Requisitos funcionais | O que exatamente deve fazer? Historias de usuario? | Issues, specs, conversa anterior, code inspection |
| Usuarios/personas | Quem usa? Permissoes? Jornada? | Auth code, RBAC, docs, analytics |
| Restricoes tecnicas | Stack fixa? Infra? Performance? Compliance? | `package.json`, infra docs, `docs/ARQUITETURA.md` |
| Integracoes externas | APIs, servicos, webhooks, bancos? | Code inspection, config, `.env.example` |
| Criterios de aceitacao | Como saber que esta pronto? | Issues, specs, conversa, `checklists/ENTREGA.md` |
| Riscos conhecidos | Seguranca, performance, breaking changes? | `memoria/PENDENCIAS.md`, `checklists/SEGURANCA.md` |
| Stack/Infra preferida | Ja decidida? `docs/ARQUITETURA.md`, `DECISOES.md` | Stack padrao da Biblia se nao decidido |

**Regra de Ouro:** Se a informacao pode ser obtida com seguranca por **inspecao** (arquivos, Git, docs, ferramentas, Context7), **obte-la ANTES de perguntar**.

### ETAPA 5: ENTREVISTA ADAPTATIVA (Se Necessario)
**Regra:** So perguntar o que **nao da para descobrir sozinho** e que **realmente afeta a solucao**.

**Adaptacao por Classificacao:**

| Classificacao | Abordagem |
|---------------|-----------|
| **Simples + Clara** (baixa complexidade, risco baixo, escopo arquivo) | **Nao perguntar.** Assumir padroes sensatos (reversiveis, baixo risco), registrar premissas, prosseguir. Ex: "Corrija typo", "Adicione log", "Crie componente Button" |
| **Media** (escopo componente/modulo, risco baixo/medio) | Perguntas **pontuais** para lacunas criticas. Agrupar relacionadas. Ex: "Qual validacao no campo X?", "Qual endpoint usar?" |
| **Complexa/Alto Risco** (sistema, irreversivel, seguranca, financeiro, producao) | Entrevista **estruturada progressiva**: 1 pergunta por vez, contextualizada, com opcoes quando possivel. Descobrir: requisitos, usuarios, restricoes, integracao, criterios, riscos. |
| **Nova Feature/Sistema** | Descoberta completa: usuarios, jornadas, regras, integracao, criterios, stack, arquitetura, riscos, timeline. |

**Principios da Entrevista:**
- **Uma pergunta por vez** quando resposta determina a proxima
- **Agrupar relacionadas** quando reduz esforco do usuario
- **Contexto na pergunta:** "Para o modulo X que usa Prisma, qual validacao...?"
- **Opcoes quando possivel:** "Prefere Argon2id (padrao) ou bcrypt?"
- **Nao repetir** perguntas ja respondidas (ver `memoria/DECISOES.md`)
- **Se usuario diz "pode comecar":** Assumir padroes sensatos (reversiveis, baixo risco), registrar premissas explicitas, prosseguir
- **Decisao irreversivel/alto impacto:** Sempre confirmar explicitamente

**Sintese Obrigatoria ao Final da Entrevista:**
```
## Sintese de Descoberta
**Entendimento:** [O que sera feito em 1 frase]
**Dominio/Tipo:** [classificacao]
**Premissas Registradas:** [lista - decisoes assumidas sem confirmacao]
**Lacunas Resolvidas:** [o que foi descoberto]
**Lacunas Restantes:** [o que ainda nao se sabe - se houver]
**Plano Preliminar:** [fases/etapas de alto nivel]
**Riscos Identificados:** [lista]
**Proxima Acao:** [etapa 1 acionavel]
```

### ETAPA 6: CONSULTAR CATALOGO E SELECIONAR COMPETENCIAS
**Consultar `SKILLS-CATALOG.md` e `TOOLS-AND-MCP.md`**

**Mapeamento Dominio/Tipo -> Competencias:**

| Dominio/Tipo | Skills Principais | MCPs/Ferramentas | Agentes Paralelos |
|--------------|-------------------|------------------|-------------------|
| **Web: Feature** | `planejamento-de-tarefas`, `frontend-ui-engineering`/`ui-ux-pro-max`, `testes-com-roteiro`, `auditoria-de-seguranca`, `revisao-final` | Context7 (React/Prisma), Playwright | Implementacao paralela: backend + frontend |
| **Web: Bug** | `systematic-debugging`, `testes-com-roteiro`, `revisao-final` | Playwright, DevTools | - |
| **Web: Refatoracao** | `analise-de-legado`, `code-simplification`, `testes-com-roteiro` | Graphify | - |
| **Seguranca: Auditoria** | `auditoria-de-seguranca`, `testes-com-roteiro` | npm audit, Playwright | - |
| **UI/UX: Auditoria** | `revisao-de-interface`, `testes-com-roteiro` | Playwright, axe-core | - |
| **Legado: Analise** | `analise-de-legado`, `graphify` | Graphify, Context7 | - |
| **Pesquisa Tecnica** | `brainstorming`, `spec-driven-development` | Context7, WebSearch | - |
| **Deploy/Release** | `revisao-final`, `ci-cd-and-automation` | GitHub, Playwright (smoke) | - |
| **Jogos (Godot)** | `analise-de-legado` (se legado), skills GDScript | - | - |
| **Pesquisa/Analise** | `brainstorming`, `idea-refine`, `documentation-and-adrs` | Context7, WebSearch | Agente `general` para pesquisa paralela |

**Regra de Selecao:** **Minimo necessario.** Nao ativar todas. Adicionar quando necessidade concreta surgir.

### ETAPA 7: PREPARAR PLANO PROPORCIONAL
**Usar skill `planejamento-de-tarefas` (ou logica interna equivalente):**

**Para tarefas simples:** Plano leve (3-5 passos acionaveis)
**Para tarefas complexas:** Plano estruturado (fases -> etapas -> criterios -> dependencias)

**Formato Padrao do Plano:**
```
## Plano de Execucao: [Titulo]

### Entendimento
- Objetivo: ...
- Classificacao: Dominio: X | Tipo: Y | Complexidade: Z | Risco: W | Escopo: V

### Premissas Registradas
1. [Premissa 1 - decisao assumida]
2. [Premissa 2 - decisao assumida]

### Fases e Etapas
| Fase | Etapa | Descricao | Objetivo | Depende de | Criterio Aceitacao | Skill/Ferramenta | Status |
|------|-------|-----------|----------|------------|-------------------|------------------|--------|
| 1 | 1.1 | ... | ... | - | ... | `skill X` | NAO INICIADA |
| 1 | 1.2 | ... | ... | 1.1 | ... | `skill Y` | NAO INICIADA |
| 2 | 2.1 | ... | ... | 1 | ... | `skill Z` | NAO INICIADA |

### Riscos e Mitigacoes
| Risco | Prob. | Impacto | Mitigacao |

### Skills/Ferramentas Selecionadas
- Skills: [...]
- MCPs: [...]
- Agentes Paralelos: [...]

### Proximo Passo Imediato
[Instrucao executavel para retomada - salva em `memoria/PROXIMO-PASSO.md`]
```

### ETAPA 8: APRESENTAR SINTESE E OBTER AUTORIZACAO (Se Necessario)
**Para tarefas simples/baixo risco reversivel:** Apresentar sintese + premissas + plano -> "Prossigo?" (ou assumir "pode comecar" = autorizacao)
**Para tarefas complexas/alto risco/irreversivel:** Apresentar sintese + plano + riscos + decisoes irreversiveis -> **Exigir confirmacao explicita** antes de executar

**Template de Apresentacao:**
```
## Sintese de Execucao

**Entendimento:** [1 frase]
**Classificacao:** [Dominio/Tipo/Complexidade/Risco/Escopo]

**Premissas (assumidas se "pode comecar"):**
1. ...
2. ...

**Plano Resumido:** [Fases principais]
**Riscos Principais:** [Top 3]
**Skills/Ferramentas:** [Lista]

**Proximo Passo:** [Acao 1]

**Decisoes Irreversiveis/Alto Risco:** [Lista - requer sua confirmacao]

-> **Prossigo?** (ou "pode comecar" para autorizar)
```

### ETAPA 9: EXECUTAR / COORDENAR EXECUCAO
**Para cada etapa do plano:**

1. **Ativar Skill/Ferramenta necessaria** (`skill X`, `tools.context7`, `tools.github`, `tools.mcp.browser_*`, etc.)
2. **Executar etapa** seguindo o procedimento da skill/ferramenta
3. **Verificar criterio de aceitacao** da etapa
4. **Registrar evidencia** (arquivos, comandos, resultados, screenshots)
5. **Atualizar estado persistente:**
   - `memoria/ESTADO-ATUAL.md` (fase, ultima validacao, proxima etapa)
   - `memoria/PLANO-DE-EXECUCAO.md` (status etapas)
   - `memoria/HISTORICO-DE-EXECUCAO.md` (acao, resultado, evidencia)
   - `memoria/PROXIMO-PASSO.md` (proxima etapa acionavel)
   - `memoria/DECISOES.md` / `PENDENCIAS.md` (se novo)

**Se etapa falhar:**
- Registrar falha + evidencia
- Analisar: retry? replanejar? escalar? bloquear?
- Atualizar plano/estado
- Comunicar ao usuario se necessario

**Coordenacao Paralela (se aplicavel):**
- Identificar etapas independentes (sem dependencias entre si)
- Disparar agentes `general` paralelos para etapas independentes
- Agregar resultados, consolidar evidencias

### ETAPA 10: VERIFICAR RESULTADO FINAL
**Ao concluir todas as etapas:**

1. **Verificar criterios de aceitacao globais** (do plano original)
2. **Executar validacao final** (skill `revisao-final` se entrega/release, ou `testes-com-roteiro` se testes)
3. **Comparar entregue vs criterios originais**
4. **Registrar evidencias finais** (testes, build, screenshots, relatorios)
5. **Identificar pendencias residuais** (documentar em `memoria/PENDENCIAS.md`)

### ETAPA 11: CONCLUIR E REGISTRAR CONTINUIDADE
**Antes de encerrar:**

1. **Salvar estado completo** em `memoria/`
2. **Atualizar `memoria/PROXIMO-PASSO.md`** com instrucao de retomada (mesmo se concluido: "Proximo: nova tarefa")
3. **Registrar decisao final** em `memoria/DECISOES.md`
4. **Atualizar `memoria/PENDENCIAS.md`** (limpar resolvidas, adicionar novas)
5. **Apresentar relatorio final ao usuario:**
```
## Conclusao: [Titulo]

**Objetivo:** [Original]
**Resultado:** [Entregue | Parcial | Bloqueado]

**Entregues:**
- [Arquivo/Funcionalidade 1] - Evidencia: [teste/build/link]
- [Arquivo/Funcionalidade 2] - Evidencia: ...

**Verificacoes:** [Testes, Build, Quality Gates - todos OK]

**Pendencias Residuais:** [Lista - registradas em memoria/PENDENCIAS.md]

**Proximos Passos Recomendados:** [Proximas tarefas logicas]

**Estado Salvo:** `memoria/` atualizado para retomada
```

---

## REGRAS DE OURO (Inviolaveis)

| Regra | Descricao |
|-------|-----------|
| **Nunca assumir o nao-dito** | Perguntar lacunas criticas, assumir apenas reversivel/baixo risco |
| **Nunca executar sem verificar** | Criterio de aceitacao em cada etapa |
| **Nunca esconder falhas** | Registrar, analisar, replanejar ou escalar |
| **Nunca perder estado** | `memoria/` atualizado a cada etapa significativa |
| **Nunca expor segredos** | Sanitizar relatorios, logs, evidencias |
| **Nunca acoes irreversiveis sem confirmacao** | Deploy, delete, migrate, publish, push = confirmacao explicita |
| **Nunca ignorar `memoria/`** | Fonte de verdade para continuidade |
| **Nunca ativar skills desnecessarias** | Minimo suficiente, adicionar sob demanda |
| **Nunca inventar evidencias** | Apenas resultados reais, comandos reais, arquivos reais |
| **Sempre registrar premissas** | Decisoes assumidas sem confirmacao explicita |

---

## FERRAMENTAS NECESSARIAS
- **Leitura/Escrita:** `read`, `write`, `edit`, `glob`, `grep`
- **Shell:** `git`, `npm`, `npx`, comandos build/test
- **MCPs:** `tools.context7`, `tools.github`, `tools.mcp.browser_*`, `tools.mcp.playwright_*`
- **Skills:** Todas as locais + globais conforme selecao
- **Agentes:** `general` para tarefas paralelas independentes
- **Memoria:** `memoria/` (6 arquivos obrigatorios)

---

## LIMITES DE RESPONSABILIDADE
- **NAO** toma decisoes de negocio irreversiveis sem confirmacao
- **NAO** executa acoes destrutivas/irreversiveis sem autorizacao explicita
- **NAO** expõe segredos, PII, credenciais
- **NAO** faz push/publica/deploy sem autorizacao explicita
- **NAO** substitui julgamento humano em decisoes de alto impacto
- **SIM** orquestra, coordena, verifica, registra, aprende
- **SIM** bloqueia execucao se criterios nao atendidos
- **SIM** preserva continuidade entre sessoes/projetos

---

## CRITERIOS DE ACEITACAO DA SKILL
- [ ] Entende pedido e classifica corretamente
- [ ] Descobre contexto real antes de agir (inspecao + memoria/)
- [ ] Identifica lacunas criticas e resolve via inspecao ou entrevista adaptativa
- [ ] Seleciona competencias pertinentes (minimo necessario)
- [ ] Prepara plano proporcional com criterios aceitacao
- [ ] Obtem autorizacao quando necessario (irreversivel/alto risco)
- [ ] Executa/coordena com verificacao por etapa
- [ ] Mantem `memoria/` atualizado a cada etapa significativa
- [ ] Verifica resultado final vs criterios originais
- [ ] Registra continuidade completa para retomada
- [ ] Apresenta relatorio final honesto (entregue, pendencias, evidencias)

---

## TRATAMENTO DE FALHAS CRITICAS
| Falha | Acao Obrigatoria |
|-------|------------------|
| Perda de contexto total | Recuperar via `memoria/` + inspecao Git/arquivos, **nao inventar** |
| Skill/ferramenta indisponivel | Registrar limitacao, usar alternativa, documentar em `DECISOES.md` |
| Acao irreversivel executada por engano | Parar imediatamente, registrar, comunicar, avaliar rollback |
| Segredo exposto acidentalmente | Rotacionar imediatamente, registrar incidente, nao logar no historico |
| Usuario inacessivel em decisao critica | Pausar, registrar bloqueio, aguardar, nao assumir |
| Conflito entre skills/ferramentas | Isolar, testar isoladamente, escolher a mais adequada, documentar |

---

## FORMATO DE ENTRADA ESPERADO
```
Usuario: "Quero criar um sistema de gestao de tarefas com React e Node"
# ou
Usuario: "Audite a seguranca deste projeto"
# ou
Usuario: "Corrija este bug no login"
# ou
Usuario: "Consulte a Biblia e vamos fazer este projeto"
# ou (continuacao)
Usuario: "Vamos continuar"
```

## FORMATO DE SAIDA PADRAO
Sempre que a skill responde/entrega algo:
```
## [Titulo da Entrega]

**Entendimento:** [1 frase]
**Classificacao:** [Dominio/Tipo/Complexidade/Risco/Escopo]
**Premissas:** [Lista - decisoes assumidas]
**Plano/Status:** [Resumo ou link para plano completo]
**Proximo Passo:** [Instrucao executavel]
**Riscos/Pendencias:** [Lista]
**Evidencias:** [Onde encontrar - arquivos, relatorios, test-results/]
```

---

## REFERENCIAS DA BIBLIA (Obrigatorias)
- `INDEX.md` - Indice principal
- `ORCHESTRATOR.md` - Selecao modulos/skills/ferramentas
- `INTERVIEW.md` - Entrevista adaptativa detalhada
- `SKILLS-CATALOG.md` - Catalogo completo skills
- `TOOLS-AND-MCP.md` - Ferramentas e MCPs
- `SKILLS-SELECTION-MATRIX.md` - Matriz selecao
- `ARCHITECTURE.md` - Padroes arquiteturais
- `docs/` - Documentacao tecnica (ARQUITETURA, CODIGO-LIMPO, SEGURANCA, TESTES, FERRAMENTAS-IA, IA-E-CONTEXTO, BOOTSTRAP-AMBIENTE, DECISOES-TECNICAS, VALIDACAO-DO-REPOSITORIO)
- `checklists/` - Checklists obrigatorios (9)
- `templates/` - Modelos reutilizaveis (12)
- `memoria/` - Estado persistente (6 arquivos)
- `exemplos/` - Implementacoes de referencia
- `scripts/` - Validacao e automacao
- `AGENTS.md` - Instrucoes operacionais base
- `AGENTS.md` (projeto) - Instrucoes especificas do projeto