# Graph Report - portfolio-site  (2026-11-16)

## Corpus Check
- 121 files · ~251,814 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 10 file(s) not represented in the graph (top: (none) 7, .pid 1, .prisma 1)

## Summary
- 1826 nodes · 2256 edges · 94 communities (91 shown, 3 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 94 edges (avg confidence: 0.91)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `79ade7a0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- icons.tsx
- app/page.tsx
- [slug]/page.tsx
- compilerOptions
- highlight.ts
- IndexConfig
- check-content.mjs
- usuarios.routes.ts
- ARQUITETURA - [NOME DO PROJETO]
- Brendon Tailor — Portfólio
- Validação do Repositório
- Divida Tecnica: DT-[NUMERO] - [TITULO DESCRITIVO]
- Padrões de Código Limpo
- Especificacao Funcional: [NOME DA FEATURE]
- Plano de Implementacao: [NOME DA FEATURE/FUNCIONALIDADE]
- Checklist de Publicacao - Deploy e Release
- IA e Contexto - Estratégia Integrada
- Checklist de Entrega - Definition of Done
- CONTRIBUTING.md
- 2. Proteção da Aplicação
- Relatório de Entrega: [NOME DA FUNCIONALIDADE/MILESTONE] - v[VERSAO]
- Registro de Incidente: INC-[NUMERO] - [TITULO RESUMIDO]
- AGENTS.md - Instrucoes Operacionais para Agentes de IA
- Checklist de Uso Responsavel de IA
- AGENTS.md - [NOME DO PROJETO]
- [NOME DO PROJETO]
- B. IMPLEMENTAÇÃO E FERRAMENTAS ESPECIALIZADAS
- Checklist de Segurança
- Checklist de Testes
- Estratégia de Testes
- Checklist de Desenvolvimento - Durante Implementacao
- Skill: Segurança Contínua (Secure-by-Design / Shift-Left)
- Changelog
- AGENTS.md - Operational Instructions for AI Agents
- Skill: Entrevista Orquestradora (Central da Biblia)
- Procedimento de Execução
- 3. Decisões
- Skill: Testes com Roteiro
- Plano de Testes: [NOME DO PROJETO/MODULO]
- Procedimento de Execução
- Skill: Revisão de Interface
- Relatório de Auditoria de Segurança: [PROJETO] - [DATA]
- Skill: Análise de Legado
- Skill: Planejamento de Tarefas
- ADR-[NUMERO]: [TITULO DA DECISAO]
- Relatório de Code Review: PR #[NUMERO] - [TITULO]
- Checklist de Inicio - Preparacao e Validacao Inicial
- Ordem de Execução Obrigatória
- Checklist de Revisao de Codigo - Code Review Multi-Axis
- Auditoria do portfólio — mercado dev 2026
- next
- .github/.github/ISSUE_TEMPLATE/security_report.md
- .github/ISSUE_TEMPLATE/security_report.md
- Módulo: Autenticação
- useUsuarios.ts
- Lista.tsx
- Pull Request Template
- Pull Request Template
- useUsuarios
- Backend - Camadas Detalhadas
- Arquitetura Modular Obrigatória
- .github/.github/ISSUE_TEMPLATE/bug_report.md
- .github/.github/ISSUE_TEMPLATE/feature_request.md
- .github/ISSUE_TEMPLATE/bug_report.md
- .github/ISSUE_TEMPLATE/feature_request.md
- Módulo: Autorização (RBAC)
- site.ts
- Implementacao Frontend
- Roteiro de Testes - Cenários Detalhados
- Módulo: Frontend (E2E Playwright)
- Módulo: CRUD Usuários
- Módulo: Validação de Dados
- Frontend - Camadas Detalhadas
- hero.tsx
- Módulo: Upload de Arquivos
- Execução e Registro
- Módulo: Falhas e Resiliência
- Módulo: Segurança (Automatizado)
- 3. FRONTEND - ARQUITETURA DETALHADA
- Decisões - portfolio-site
- Pendências - portfolio-site
- Plano de Execução - portfolio-site
- PROXIMO-PASSO.md
- local-rag
- frontend/src/types/usuario.types.ts
- 7. COMUNICACAO FRONTEND <-> BACKEND
- rate-limit.ts
- 6. SEGURANCA
- 8. OBSERVABILIDADE
- 11. EVOLUCAO E MANUTENCAO
- 2. BACKEND - ARQUITETURA DETALHADA
- 5. AUTENTICACAO E AUTORIZACAO
- 1. VISAO GERAL

## God Nodes (most connected - your core abstractions)
1. `IndexConfig` - 35 edges
2. `ArrowUpRight()` - 24 edges
3. `VectorIndex` - 23 edges
4. `RagPaths` - 21 edges
5. `Embedder` - 20 edges
6. `AGENTS.md - Instrucoes Operacionais para Agentes de IA` - 19 edges
7. `chunk_file()` - 18 edges
8. `AGENTS.md - Operational Instructions for AI Agents` - 18 edges
9. `Reveal()` - 17 edges
10. `compilerOptions` - 16 edges

## Surprising Connections (you probably didn't know these)
- `Nomenclatura e Estrutura` --references--> `UsuariosController`  [INFERRED]
  checklists/DESENVOLVIMENTO.md → exemplos/arquitetura-modular/backend/src/controllers/usuarios.controller.ts
- `Convencoes Backend` --references--> `UsuariosController`  [INFERRED]
  templates/ARQUITETURA.md → exemplos/arquitetura-modular/backend/src/controllers/usuarios.controller.ts
- `Código TypeScript` --references--> `UsuariosService`  [INFERRED]
  docs/CODIGO-LIMPO.md → exemplos/arquitetura-modular/backend/src/services/usuarios.service.ts
- `Hooks Personalizados` --references--> `useUsuarios()`  [INFERRED]
  checklists/DESENVOLVIMENTO.md → exemplos/arquitetura-modular/frontend/src/hooks/useUsuarios.ts
- `Paginas e Layouts` --references--> `useUsuarios()`  [INFERRED]
  checklists/DESENVOLVIMENTO.md → exemplos/arquitetura-modular/frontend/src/hooks/useUsuarios.ts

## Import Cycles
- None detected.

## Communities (94 total, 3 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.05
Nodes (36): eslintConfig, dependencies, next, react, react-dom, zod, devDependencies, eslint (+28 more)

### Community 1 - "icons.tsx"
Cohesion: 0.20
Nodes (19): react, NotFound(), BrandMark(), CopyEmail(), CopyEmailProps, ContactSection(), ArrowUpRight(), baseProps() (+11 more)

### Community 2 - "app/page.tsx"
Cohesion: 0.31
Nodes (12): Home(), CaseCard(), AboutSection(), CasesSection(), KnowledgeSection(), LabSection(), Manifesto(), Marquee() (+4 more)

### Community 3 - "[slug]/page.tsx"
Cohesion: 0.18
Nodes (11): CasePage(), CasePageProps, generateMetadata(), instant, CaseCardProps, CaseImage, CaseLink, cases (+3 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 5 - "highlight.ts"
Cohesion: 0.39
Nodes (7): CodeBlock(), CodeBlockProps, escapeHtml(), findComment(), highlightCode(), highlightLine(), KEYWORDS

### Community 6 - "IndexConfig"
Cohesion: 0.06
Nodes (39): chunk_by_tokens(), chunk_file(), count_tokens(), extract_nodes(), walk(), get_parser(), get_tree_sitter_language(), _split_text_with_line_tracking() (+31 more)

### Community 7 - "check-content.mjs"
Cohesion: 0.14
Nodes (12): errors, imagesDir, publicDir, referenced, requireText(), requireUniqueIds(), slugs, warnings (+4 more)

### Community 8 - "usuarios.routes.ts"
Cohesion: 0.07
Nodes (16): UsuariosController, UsuariosRepository, controller, router, UsuariosService, AtualizarUsuarioDTO, CriarUsuarioDTO, ListarUsuariosFiltros (+8 more)

### Community 9 - "ARQUITETURA - [NOME DO PROJETO]"
Cohesion: 0.22
Nodes (8): 10. RISCOS E MITIGACOES, 12. REFERENCIAS, 4. BANCO DE DADOS, 9. DECISOES TECNICAS (ADRs), ARQUITETURA - [NOME DO PROJETO], Prisma Schema - Convencoes, Regras Obrigatorias, Template ARQUITETURA.md - Decisoes Arquiteturais do Projeto

### Community 10 - "Brendon Tailor — Portfólio"
Cohesion: 0.22
Nodes (8): Brendon Tailor — Portfólio, Contato, Conteúdo e privacidade, Deploy, Estrutura, O que está aqui, Rodando localmente, Stack

### Community 11 - "Validação do Repositório"
Cohesion: 0.05
Nodes (38): 10. Git e Consistência Final, 11. Resultado da Validação, 12. Falhas Comuns e Correção, 1. Quando Executar, 2. Preparação, 3.1 Script automatizado (fonte de verdade), 3.2 Contagem manual por categoria, 3.3 Arquivos vazios ou suspeitos (+30 more)

### Community 12 - "Divida Tecnica: DT-[NUMERO] - [TITULO DESCRITIVO]"
Cohesion: 0.05
Nodes (43): 1. INFORMAÇÕES BÁSICAS, 2. DESCRIÇÃO, 3. CONTEXTO TECNICO, 4. PLANO DE TESTES E VALIDACAO, 4. SOLUÇÃO PROPOSTA, 5. PLANO DE EXECUÇÃO E CRONOGRAMA, 5. PRIORIZAÇÃO E ESCORE, 6. ACOMPANHAMENTO E GOVERNANÇA (+35 more)

### Community 13 - "Padrões de Código Limpo"
Cohesion: 0.05
Nodes (42): Anti-Padrões a Evitar, Arquivos e Pastas, Checklist Antes de Refatorar, Checklist Rápido, Classes e Injeção de Dependência, Comentários, Componentes React, Configuração Recomendada (`tsconfig.json`) (+34 more)

### Community 14 - "Especificacao Funcional: [NOME DA FEATURE]"
Cohesion: 0.05
Nodes (39): 1. CONTEXTO E OBJETIVOS, 2. USUARIOS E PERSONAS, 3. REQUISITOS FUNCIONAIS DETALHADOS, 3. REQUISITOS NAO-FUNCIONAIS, 4. INTERFACES E INTEGRACOES, 5. REGRAS DE NEGOCIO DETALHADAS, 6. CASOS DE TESTE (Para QA/Automacao), 7. CRITERIOS DE ACEITACAO (Definition of Done) (+31 more)

### Community 15 - "Plano de Implementacao: [NOME DA FEATURE/FUNCIONALIDADE]"
Cohesion: 0.05
Nodes (39): 10. APROVACAO FINAL, 1. CONTEXTO E OBJETIVOS, 2. ANALISE E PRE-REQUISITOS, 3. ARQUITETURA E DESIGN, 4. PLANO DE EXECUCAO, 5. TESTES E QUALIDADE, 6. DOCUMENTACAO E ENTREGA, 6. SEGURANCA (+31 more)

### Community 16 - "Checklist de Publicacao - Deploy e Release"
Cohesion: 0.05
Nodes (37): 1. PREPARACAO DE AMBIENTE, 2. ESTRATEGIA DE DEPLOY, 3. VALIDACAO PRE-DEPLOY (Staging/Preview), 4. DEPLOY PRODUCAO, 5. POS-DEPLOY (Primeiras 24-48h), 6. COMUNICACAO E DOCUMENTACAO POS-RELEASE, 6. ROLLBACK PLAN (Obrigatorio ter pronto ANTES do deploy), 7. MONITORAMENTO CONTINUO (Pos-Release 7 Dias) (+29 more)

### Community 17 - "IA e Contexto - Estratégia Integrada"
Cohesion: 0.05
Nodes (37): Arquivos Obrigatórios, Atualização de Índices, Busca Textual vs Busca por Símbolos vs Busca Semântica, Cenário 1: Iniciar Nova Feature, Cenário 2: Debug Bug Produção, Cenário 3: Code Review, Checklist de Validação Contínua, Context7 - Documentação Técnica Externa (+29 more)

### Community 18 - "Checklist de Entrega - Definition of Done"
Cohesion: 0.06
Nodes (34): 1. FUNCIONALIDADE E TESTES, 2. BUILD E ARTEFATOS, 3. SEGURANCA E CONFORMIDADE, 4. DOCUMENTACAO E COMUNICACAO, 5. GIT E VERSIONAMENTO, 6. DEPLOY E OPERACAO (Pre-Deploy Checklist), 7. POS-DEPLOY (Pos-Entrega Imediata), 8. PENDENCIAS RESIDUAIS E RISCOS (+26 more)

### Community 19 - "CONTRIBUTING.md"
Cohesion: 0.06
Nodes (34): 1. Antes de Abrir PR, 1. Tipos de Contribuição Bem-Vindos, 2. Configuração do Ambiente, 2. Template de PR, 3. Estrutura de Branches, 3. Processo de Review, 4. Convenção de Commits (Conventional Commits), 4. Critérios de Aprovação (+26 more)

### Community 20 - "2. Proteção da Aplicação"
Cohesion: 0.06
Nodes (34): 1.1 Hash de Senhas, 1.2 Tokens e Sessões, 1.3 Verificação de Permissões (Backend - SEMPRE), 1.4 Expiração, Renovação e Revogação, 1. Autenticação e Autorização, 2.1 Validação de Entrada (Backend = Barreira Principal), 2.2 Proteção contra Ataques Comuns, 2.3 Rate Limiting (+26 more)

### Community 21 - "Relatório de Entrega: [NOME DA FUNCIONALIDADE/MILESTONE] - v[VERSAO]"
Cohesion: 0.06
Nodes (34): 10. PENDENCIAS RESIDUAIS E RISCOS, 11. DECISAO DE ENTREGA, 1. RESUMO, 2. CRITÉRIOS DE ACEITACAO, 3. FUNCIONALIDADE E TESTES, 4. BUILD E ARTEFATOS, 5. SEGURANCA E CONFORMIDADE, 6. DOCUMENTACAO E COMUNICACAO (+26 more)

### Community 22 - "Registro de Incidente: INC-[NUMERO] - [TITULO RESUMIDO]"
Cohesion: 0.06
Nodes (33): 1. INFORMAÇÕES BÁSICAS, 2. DESCRIÇÃO DO INCIDENTE, 3. ANÁLISE DE CAUSA RAIZ (RCA), 4. AÇÕES DE RESPOSTA E RESOLUÇÃO, 5. IMPACTO E MÉTRICAS, 6. AÇÕES PREVENTIVAS (CAPA - Corrective and Preventive Actions), 7. COMUNICAÇÃO E NOTIFICAÇÕES, 8. LIÇÕES APRENDIDAS (+25 more)

### Community 23 - "AGENTS.md - Instrucoes Operacionais para Agentes de IA"
Cohesion: 0.07
Nodes (26): 0. SKILL CENTRAL: ENTREVISTA ORQUESTRADORA, 10. REGRA DE CONTINUIDADE, 11. CHECKLISTS OBRIGATORIOS (`checklists/` - 9), 12. TEMPLATES REUTILIZAVEIS (`templates/` - 12), 13. VALIDACAO E QUALIDADE, 15. DOCUMENTOS DE REFERENCIA DA BIBLIA (Obrigatorios), 16. COMUNICACAO E RELATORIOS, 1. PROTOCOLO DE INICIO DE SESSAO (+18 more)

### Community 24 - "Checklist de Uso Responsavel de IA"
Cohesion: 0.06
Nodes (32): 1. Geracao de Codigo (Copilot, Cursor, Codeium, Ghostwriter, etc.), 2. Assistentes de Chat (ChatGPT, Claude, Gemini, etc.), 3. Agentes de IA / Orquestracao (OpenCode, Cursor Agent, etc.), 4. Geracao de Testes, 5. Documentacao e ADRs, 5. Pesquisa e Analise (Context7, WebSearch, Perplexity, etc.), Alucinacao Critica em Producao, Antes de Usar (+24 more)

### Community 25 - "AGENTS.md - [NOME DO PROJETO]"
Cohesion: 0.06
Nodes (32): 10. TEMPLATES DISPONIVEIS, 1. CONTEXTO DO PROJETO, 2. REGRAS ESPECIFICAS DO PROJETO, 3. SEGURANCA ESPECIFICA, 4. INFRAESTRUTURA E DEPLOY, 5. COMANDOS ESSENCIAIS, 5. TESTES E QUALIDADE, 6. BIBLIA - INTEGRACAO (+24 more)

### Community 26 - "[NOME DO PROJETO]"
Cohesion: 0.06
Nodes (32): 🙏 Agradecimentos, Ambientes, 🏗️ Arquitetura, Comandos, 🤝 Contribuicao, 🚀 Deploy, Estrategia, 📁 Estrutura do Projeto (+24 more)

### Community 27 - "B. IMPLEMENTAÇÃO E FERRAMENTAS ESPECIALIZADAS"
Cohesion: 0.06
Nodes (30): A.1 Context7 (MCP) - Documentação Técnica Atualizada, A.2 Graphify (Plugin OpenCode) - Knowledge Graph, A.3 Skill: planejamento-de-tarefas (Local), A.4 Skills Globais de Planejamento (Disponíveis), A. CONTEXTO E PLANEJAMENTO, B.1 ui-ux-pro-max (Skill Global) - Inteligência UI/UX, B.2 design (Skill Global) - Design Abrangente, B.3 design-system (Skill Global) - Tokens e Componentes (+22 more)

### Community 28 - "Checklist de Segurança"
Cohesion: 0.07
Nodes (29): Assinatura de Verificação, Autenticação, Autorização, Banco de Dados, Checklist de Segurança, Controle de Acesso, Cookies e Sessões, CORS (+21 more)

### Community 29 - "Checklist de Testes"
Cohesion: 0.07
Nodes (29): Ambiente de Testes, API Endpoints, Assinatura de Verificação, Banco de Dados de Teste, Checklist de Testes, CI/CD Pipeline, Componentes Compostos, Componentes UI (Primitivos) (+21 more)

### Community 30 - "Estratégia de Testes"
Cohesion: 0.07
Nodes (29): axe-core Integrado, Cenários Obrigatórios, CI Pipeline (GitHub Actions Exemplo), Cobertura e Qualidade, Configuração, Configuração Vitest, Controller + Supertest, CRUD Usuários (+21 more)

### Community 31 - "Checklist de Desenvolvimento - Durante Implementacao"
Cohesion: 0.07
Nodes (28): Antes de Codificar, Assinatura, Atualizacao de Estado (Obrigatorio apos cada etapa), Banco de Dados (Prisma), Checklist de Desenvolvimento - Durante Implementacao, Comentarios e Documentacao, Configuracao e Env, Contexto Tecnico (+20 more)

### Community 32 - "Skill: Segurança Contínua (Secure-by-Design / Shift-Left)"
Cohesion: 0.07
Nodes (27): A. Ao Criar/Modificar ENDPOINT (Route → Controller → Service), B. Ao Implementar AUTENTICAÇÃO/TOKENS, Bloqueadores (STOP Implementation Imediatamente), C. Ao Implementar VALIDAÇÃO (Zod Schemas), Checklist Rápido por Arquivo (Mental Model), Criando `controllers/*.ts`, Criando `middlewares/*.ts`, Criando `routes/*.ts` (+19 more)

### Community 33 - "Changelog"
Cohesion: 0.06
Nodes (31): [1.0.0] - 2026-10-27, Adicionado, Adicionado, Changelog, Corrigido, Formato de Commit (Conventional Commits), Formato de Entradas, Links Úteis (+23 more)

### Community 34 - "AGENTS.md - Operational Instructions for AI Agents"
Cohesion: 0.08
Nodes (25): 0. CENTRAL SKILL: ORCHESTRATOR INTERVIEW, 10. CONTINUITY RULE, 11. MANDATORY CHECKLISTS (`checklists/` - 9), 12. REUSABLE TEMPLATES (`templates/` - 12), 13. VALIDATION AND QUALITY, 15. BIBLE REFERENCE DOCUMENTS (Mandatory), 16. COMMUNICATION AND REPORTS, 1. SESSION START PROTOCOL (+17 more)

### Community 35 - "Skill: Entrevista Orquestradora (Central da Biblia)"
Cohesion: 0.08
Nodes (25): CRITERIOS DE ACEITACAO DA SKILL, ETAPA 10: VERIFICAR RESULTADO FINAL, ETAPA 11: CONCLUIR E REGISTRAR CONTINUIDADE, ETAPA 1: ENTENDER O PEDIDO (Entrada), ETAPA 2: CLASSIFICAR A TAREFA, ETAPA 3: CONSULTAR INDICE E CONTEXTO (Discovery), ETAPA 4: IDENTIFICAR LACUNAS CRITICAS, ETAPA 5: ENTREVISTA ADAPTATIVA (Se Necessario) (+17 more)

### Community 36 - "Procedimento de Execução"
Cohesion: 0.08
Nodes (25): Arquitetura e Padrões, Critérios de Aceitação, Ferramentas Necessárias, Formato de Entrega, Limites de Responsabilidade, Objetivo, Passo 1: Coletar Contexto da Entrega, Passo 2: Verificar Critérios de Aceitação (+17 more)

### Community 37 - "3. Decisões"
Cohesion: 0.08
Nodes (24): 1. Propósito e Formato, 2. Índice de Decisões, 3. Decisões, 4. Como Registrar uma Nova Decisão, 5. Checklist de Validação deste Documento, ADR-001 — Idioma da documentação e identificadores próprios, ADR-002 — Preservação de nomes oficiais, ADR-003 — Monorepo com frontend e backend separados (+16 more)

### Community 38 - "Skill: Testes com Roteiro"
Cohesion: 0.08
Nodes (24): Critérios de Aceitação, Execução Acessibilidade, Execução E2E (Playwright), Execução Performance, Execução Segurança, Execução Unitária/Integração (Vitest), Ferramentas Necessárias, Formato de Entrega (+16 more)

### Community 39 - "Plano de Testes: [NOME DO PROJETO/MODULO]"
Cohesion: 0.08
Nodes (24): 1. ESCOPO, 2. ESTRATEGIA, 3. AMBIENTES E DADOS, 4.1 Autenticacao, 4.2 Autorizacao, 4.3 Validacao de entrada, 4.4 CRUD e regras de negocio, 4.5 Falhas e resiliencia (+16 more)

### Community 40 - "Procedimento de Execução"
Cohesion: 0.09
Nodes (22): Critérios de Aceitação, Ferramentas Necessárias, Formato de Entrega, Limites de Responsabilidade, Objetivo, Passo 10: Relatório de Auditoria, Passo 11: Entregar, Passo 1: Definir Escopo e Limites (+14 more)

### Community 41 - "Skill: Revisão de Interface"
Cohesion: 0.09
Nodes (22): A. Consistência Visual, B. Responsividade (Breakpoints: 320, 768, 1024, 1440), C. Acessibilidade (WCAG 2.1 AA), C. Estados de Interface, Critérios de Aceitação, D. Reutilização de Componentes (Design System), Ferramentas Necessárias, Formato de Entrega (+14 more)

### Community 42 - "Relatório de Auditoria de Segurança: [PROJETO] - [DATA]"
Cohesion: 0.09
Nodes (22): 1. INFORMAÇÕES GERAIS, 2. SUMÁRIO EXECUTIVO, 3.1 Autenticação e Autorização, 3.2 Validação e Sanitização de Entrada, 3.3 Proteção Contra Ataques Específicos, 3.4 Proteção da Aplicação, 3.5 Gestão de Segredos e Configuração, 3.6 Banco de Dados (PostgreSQL + Prisma) (+14 more)

### Community 43 - "Skill: Análise de Legado"
Cohesion: 0.10
Nodes (19): Critérios de Aceitação, Ferramentas Necessárias, Formato de Entrega, Limites de Responsabilidade, Objetivo, Passo 1: Reconhecimento Inicial, Passo 2: Mapear Arquitetura (Graphify + Inspeção), Passo 3: Analisar Módulos e Dependências (+11 more)

### Community 44 - "Skill: Planejamento de Tarefas"
Cohesion: 0.10
Nodes (19): Critérios de Aceitação da Skill, Ferramentas Necessárias, Formato de Entrega, Limites de Responsabilidade, Objetivo, Passo 1: Entender a Solicitação, Passo 2: Consultar Estado e Contexto, Passo 3: Identificar Lacunas Críticas (+11 more)

### Community 45 - "ADR-[NUMERO]: [TITULO DA DECISAO]"
Cohesion: 0.11
Nodes (18): ADR-[NUMERO]: [TITULO DA DECISAO], Alternativas Consideradas, Aprovacao, Consequencias, Contexto, Decisao, Documentacao e Artefatos, Historico de Mudancas (+10 more)

### Community 46 - "Relatório de Code Review: PR #[NUMERO] - [TITULO]"
Cohesion: 0.11
Nodes (18): 1. INFORMAÇÕES DO PR, 2. CONTEXTO E CRITÉRIOS DE ACEITACAO, 3. ANÁLISE DO DIFF (Qualidade de Código), 4. BUILD E TYPE CHECKING, 5. DOCUMENTAÇÃO E RASTREABILIDADE, 6. VERIFICAR REGRESSÕES, 7. PENDÊNCIAS E RISCOS RESIDUAIS, 8. DECISAO FINAL (+10 more)

### Community 47 - "Checklist de Inicio - Preparacao e Validacao Inicial"
Cohesion: 0.11
Nodes (17): Ambiente e Ferramentas, Assinatura, Biblia e Documentos Base, Checklist de Inicio - Preparacao e Validacao Inicial, Checklist de Pronto para Desenvolvimento, Dependencias e Build, Documentacao e Contexto, Git e Versionamento (+9 more)

### Community 48 - "Ordem de Execução Obrigatória"
Cohesion: 0.11
Nodes (17): 10. Testar Recuperação de Contexto, 1. Verificar Versão do OpenCode, 2. Verificar/Instalar Skills Globais Necessárias, 3. Verificar/Configurar MCPs Necessários, 4. Instalar Skills Locais do Repositório, 5. Verificar Plugins Locais, 6. Validar Estrutura do Repositório, 7. Inicializar Git (se novo projeto) (+9 more)

### Community 49 - "Checklist de Revisao de Codigo - Code Review Multi-Axis"
Cohesion: 0.12
Nodes (16): 1. CRITERIOS DE ACEITACAO (Obrigatorio), 2. QUALIDADE DE CODIGO (Diff Git), 3. BUILD E TYPE CHECKING, 4. DOCUMENTACAO E RASTREABILIDADE, 5. VERIFICAR REGRESSOES, 6. PENDENCIAS E RISCOS RESIDUAIS, 7. DECISAO FINAL, Arquitetura e Padroes (+8 more)

### Community 50 - "Auditoria do portfólio — mercado dev 2026"
Cohesion: 0.13
Nodes (14): 1. Resumo executivo, 2.1 Volume e faixa salarial — júnior, 2.2 Requisitos que aparecem nas vagas, 2.3 O que recrutores avaliam em portfólio, 2. O que o mercado pede (evidências), 3. Portfólio × mercado, 4. Achados por severidade, 5. Backlog priorizado (+6 more)

### Community 51 - "next"
Cohesion: 0.16
Nodes (11): nextConfig, next, courses, CvPage(), jobs, metadata, projects, skills (+3 more)

### Community 52 - ".github/.github/ISSUE_TEMPLATE/security_report.md"
Cohesion: 0.14
Nodes (13): Ações Tomadas, Contato do Reportador, Descrição da Vulnerabilidade, Divulgação Responsável, Impacto, Impacto Potencial, Notas Internas, Para Uso Interno (Equipe de Segurança) (+5 more)

### Community 53 - ".github/ISSUE_TEMPLATE/security_report.md"
Cohesion: 0.14
Nodes (13): Ações Tomadas, Contato do Reportador, Descrição da Vulnerabilidade, Divulgação Responsável, Impacto, Impacto Potencial, Notas Internas, Para Uso Interno (Equipe de Segurança) (+5 more)

### Community 54 - "Módulo: Autenticação"
Cohesion: 0.18
Nodes (11): CT-AUTH-001: Login Válido, CT-AUTH-002: Login Inválido - Senha Errada, CT-AUTH-003: Login Inválido - Usuário Inexistente, CT-AUTH-004: Bloqueio por Tentativas Excessivas, CT-AUTH-005: Desbloqueio Automático Após Janela, CT-AUTH-006: Refresh Token Válido, CT-AUTH-007: Refresh Token Expirado, CT-AUTH-008: Refresh Token Revogado (Logout) (+3 more)

### Community 56 - "Lista.tsx"
Cohesion: 0.20
Nodes (3): UsuarioForm(), UsuarioFormProps, UsuariosListaPage()

### Community 57 - "Pull Request Template"
Cohesion: 0.18
Nodes (10): Breaking Changes, Checklist de Revisão (para revisores), Checklist Obrigatório, Contexto Adicional, Descrição, Evidências, Issue Relacionada, Pull Request Template (+2 more)

### Community 58 - "Pull Request Template"
Cohesion: 0.18
Nodes (10): Breaking Changes, Checklist de Revisão (para revisores), Checklist Obrigatório, Contexto Adicional, Descrição, Evidências, Issue Relacionada, Pull Request Template (+2 more)

### Community 59 - "useUsuarios"
Cohesion: 0.22
Nodes (10): Backend (Node/Express/Prisma), Frontend (React/Vite/Tailwind), Nomenclatura, 📝 Padrões de Código, Segurança (Obrigatório), TypeScript, 2. Páginas (`src/pages/`), 3. Hooks (`src/hooks/`) (+2 more)

### Community 60 - "Backend - Camadas Detalhadas"
Cohesion: 0.20
Nodes (10): 1. Rotas (`src/routes/`), 2. Controladores (`src/controllers/`), 3. Serviços (`src/services/`), 4. Validações (`src/validations/`), 5. Repositórios (`src/repositories/`), 6. Middlewares (`src/middlewares/`), 7. Configuração (`src/config/`), 8. Tipos (`src/types/`) (+2 more)

### Community 61 - "Arquitetura Modular Obrigatória"
Cohesion: 0.22
Nodes (8): Arquitetura Modular Obrigatória, Estrutura de Diretórios (Monorepo), Exemplo Funcional Completo: Funcionalidade "Usuários", Fluxo Backend Completo, Fluxo Frontend Completo, Princípios Gerais, Prisma Schema Exemplo (`backend/prisma/schema.prisma`), Referências Cruzadas

### Community 62 - ".github/.github/ISSUE_TEMPLATE/bug_report.md"
Cohesion: 0.22
Nodes (8): Ambiente, Checklist, Comportamento Atual, Comportamento Esperado, Contexto Adicional, Descrição do Bug, Passos para Reproduzir, Screenshots/Logs

### Community 63 - ".github/.github/ISSUE_TEMPLATE/feature_request.md"
Cohesion: 0.22
Nodes (8): Alternativas Consideradas, Checklist, Contexto Adicional, Critérios de Aceitação, Descrição da Funcionalidade, Impacto Estimado, Problema que Resolve, Solução Proposta

### Community 64 - ".github/ISSUE_TEMPLATE/bug_report.md"
Cohesion: 0.22
Nodes (8): Ambiente, Checklist, Comportamento Atual, Comportamento Esperado, Contexto Adicional, Descrição do Bug, Passos para Reproduzir, Screenshots/Logs

### Community 65 - ".github/ISSUE_TEMPLATE/feature_request.md"
Cohesion: 0.22
Nodes (8): Alternativas Consideradas, Checklist, Contexto Adicional, Critérios de Aceitação, Descrição da Funcionalidade, Impacto Estimado, Problema que Resolve, Solução Proposta

### Community 66 - "Módulo: Autorização (RBAC)"
Cohesion: 0.25
Nodes (8): CT-AUTHZ-001: Acesso Sem Token, CT-AUTHZ-002: Token Inválido/Expirado, CT-AUTHZ-003: Permissão Insuficiente (403), CT-AUTHZ-004: Permissão Suficiente (200), CT-AUTHZ-005: IDOR - Acesso a Recurso de Outro Usuário, CT-AUTHZ-006: Admin Acessa Qualquer Recurso, CT-AUTHZ-007: Matriz de Permissões Completa, Módulo: Autorização (RBAC)

### Community 67 - "site.ts"
Cohesion: 0.18
Nodes (8): jetbrains, metadata, plex, RootLayout(), viewport, manifesto, marqueeItems, site

### Community 68 - "Implementacao Frontend"
Cohesion: 0.29
Nodes (7): Acessibilidade e Responsividade, Componentes, Estado e Auth, Hooks Personalizados, Implementacao Frontend, Paginas e Layouts, Servicos HTTP (API Client)

### Community 69 - "Roteiro de Testes - Cenários Detalhados"
Cohesion: 0.29
Nodes (6): CT-PERF-001: Latência API p95, CT-PERF-002: Bundle Size Frontend, CT-PERF-003: Core Web Vitals (Lighthouse), Legenda de Status, Módulo: Performance e Carga, Roteiro de Testes - Cenários Detalhados

### Community 70 - "Módulo: Frontend (E2E Playwright)"
Cohesion: 0.29
Nodes (7): CT-FE-001: Login Flow Completo, CT-FE-002: Erro Login Exibido, CT-FE-003: Protected Route Redirect, CT-FE-004: Token Refresh Automático, CT-FE-005: Acessibilidade - Navegação Teclado, CT-FE-005: Formulário Validação Client-Side, Módulo: Frontend (E2E Playwright)

### Community 71 - "Módulo: CRUD Usuários"
Cohesion: 0.29
Nodes (7): CT-USR-001: Listar Usuários - Paginação, CT-USR-002: Obter Usuário por ID, CT-USR-003: Criar Usuário - Sucesso, CT-USR-004: Atualizar Usuário - Próprio (User), CT-USR-005: Atualizar Usuário - Admin Altera Roles, CT-USR-006: Excluir Usuário - Soft Delete, Módulo: CRUD Usuários

### Community 72 - "Módulo: Validação de Dados"
Cohesion: 0.33
Nodes (6): CT-VAL-001: Dados Inválidos - Múltiplos Erros, CT-VAL-002: Email Duplicado (Unicidade), CT-VAL-003: CPF Inválido, CT-VAL-004: Sanitização XSS no Input, CT-VAL-005: Payload Excede Limite, Módulo: Validação de Dados

### Community 73 - "Frontend - Camadas Detalhadas"
Cohesion: 0.33
Nodes (6): 1. Componentes (`src/components/`), 4. Serviços HTTP (`src/services/`), 5. Tipos Frontend (`src/types/`), 6. Gerenciamento de Estado, Estrutura `frontend/src/`, Frontend - Camadas Detalhadas

### Community 74 - "hero.tsx"
Cohesion: 0.53
Nodes (4): BrowserFrame(), BrowserFrameProps, Hero(), ArrowDown()

### Community 75 - "Módulo: Upload de Arquivos"
Cohesion: 0.40
Nodes (5): CT-UPL-001: Upload Válido (Imagem), CT-UPL-002: Upload Tipo Não Permitido, CT-UPL-003: Upload Excede Tamanho, CT-UPL-004: Magic Bytes vs Extensão, Módulo: Upload de Arquivos

### Community 76 - "Execução e Registro"
Cohesion: 0.50
Nodes (4): Como Executar, Execução e Registro, Registro de Execução, Template de Relatório de Bug (se REPROVADO)

### Community 77 - "Módulo: Falhas e Resiliência"
Cohesion: 0.50
Nodes (4): CT-FAL-001: Banco de Dados Indisponível, CT-FAL-002: Erro Não Tratado (Bug), CT-FAL-003: Timeout Request Lento, Módulo: Falhas e Resiliência

### Community 78 - "Módulo: Segurança (Automatizado)"
Cohesion: 0.50
Nodes (4): CT-SEC-001: npm Audit, CT-SEC-002: Headers Segurança Presentes, CT-SEC-003: CSP Report-Only → Enforce, Módulo: Segurança (Automatizado)

### Community 79 - "3. FRONTEND - ARQUITETURA DETALHADA"
Cohesion: 0.50
Nodes (4): 3. FRONTEND - ARQUITETURA DETALHADA, Camadas Frontend, Estrutura `frontend/src/`, Padroes Frontend

### Community 80 - "Decisões - portfolio-site"
Cohesion: 0.20
Nodes (9): DEC-001 | 2026-10-28 | Adotar AGENT-BIBLE como padrão, DEC-002 | 2026-11-16 | Remover o case Monky Food do portfólio, DEC-003 | 2026-11-16 | Grade de cases precisa fechar as 12 colunas sem buraco, DEC-004 | 2026-11-16 | RoutePilot é prova clicável pública, DEC-005 | 2026-11-16 | Código de referência real publicado no repositório, DEC-006 | 2026-11-16 | Declarar inglês técnico e modelo de contratação, DEC-007 | 2026-11-16 | Currículo alinhado ao documento oficial do autor, DEC-008 | 2026-11-16 | Push para origin/main autorizado (+1 more)

### Community 81 - "Pendências - portfolio-site"
Cohesion: 0.17
Nodes (11): P0 | ALTA | Push dos commits (P0 do domínio público + revisão dos cases) | BLOQUEADA — autor pediu teste local; precisa de autorização explícita, P1 | ALTA | Atualizar a descrição do vídeo no YouTube (ainda com o domínio antigo) | ABERTA, P1 | ALTA | Definir objetivo do projeto via entrevista | ABERTA, P1 | MÉDIA | Demo sanitizada de Sah Açaí e PortCont (2º e 3º cases-âncora) | ABERTA, P1 | MÉDIA | "Meu papel" e métricas antes/depois em cada case | ABERTA — depende de informação do autor, P1 | MÉDIA | Preencher site/local no perfil do GitHub (token `gh` sem escopo `user`) | ABERTA, P1 | MÉDIA | Seção de testes (Vitest/Testing Library) + repositório de estudo público | ABERTA, P2 | BAIXA | Microtipografia: subir metadados de 7–9 px para piso de 10–11 px | ABERTA (+3 more)

### Community 83 - "PROXIMO-PASSO.md"
Cohesion: 0.50
Nodes (3): Ação Imediata, Backlog da auditoria que continua aberto, Pendências que dependem de terceiros

### Community 85 - "frontend/src/types/usuario.types.ts"
Cohesion: 0.25
Nodes (7): ApiResponse, AtualizarUsuarioDTO, CriarUsuarioDTO, ListarUsuariosFiltros, ListarUsuariosResponse, PaginatedResponse, UsuarioResponse

### Community 86 - "7. COMUNICACAO FRONTEND <-> BACKEND"
Cohesion: 0.33
Nodes (6): Tipos Frontend, ApiError, 7. COMUNICACAO FRONTEND <-> BACKEND, API Client (Frontend), Contratos (Tipos Compartilhados), Padroes API

### Community 87 - "rate-limit.ts"
Cohesion: 0.33
Nodes (3): Bucket, buckets, RateLimitResult

### Community 88 - "6. SEGURANCA"
Cohesion: 0.33
Nodes (6): 6. SEGURANCA, CORS, Headers Seguranca (Helmet.js), Protecao Ataques, Segredos e Config, Validacao e Sanitizacao

### Community 89 - "8. OBSERVABILIDADE"
Cohesion: 0.40
Nodes (5): 8. OBSERVABILIDADE, Alertas, Logs, Metricas, Tracing (se microservicos)

### Community 90 - "11. EVOLUCAO E MANUTENCAO"
Cohesion: 0.50
Nodes (4): 11. EVOLUCAO E MANUTENCAO, Deprecacao, Tech Debt, Versionamento

### Community 91 - "2. BACKEND - ARQUITETURA DETALHADA"
Cohesion: 0.50
Nodes (4): 2. BACKEND - ARQUITETURA DETALHADA, Camadas (Clean Architecture), Convencoes Backend, Responsabilidades por Camada

### Community 92 - "5. AUTENTICACAO E AUTORIZACAO"
Cohesion: 0.50
Nodes (4): 5. AUTENTICACAO E AUTORIZACAO, Configuracao Obrigatoria, Fluxo Auth, RBAC (Role-Based Access Control)

### Community 93 - "1. VISAO GERAL"
Cohesion: 0.67
Nodes (3): 1. VISAO GERAL, Objetivo Arquitetural, Principais Decisoes

## Knowledge Gaps
- **8 isolated node(s):** `react-dom`, `@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1289 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `UsuariosController` connect `usuarios.routes.ts` to `2. BACKEND - ARQUITETURA DETALHADA`, `useUsuarios`, `Checklist de Desenvolvimento - Durante Implementacao`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Are the 11 inferred relationships involving `IndexConfig` (e.g. with `chunk_file()` and `save_config()`) actually correct?**
  _`IndexConfig` has 11 INFERRED edges - model-reasoned connections that need verification._
- **What connects `react-dom`, `@tailwindcss/turbopack`, `@types/node` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._
- **Why does `zod` connect `package.json` to `usuarios.routes.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `VectorIndex` (e.g. with `Embedder` and `Chunk`) actually correct?**
  _`VectorIndex` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._