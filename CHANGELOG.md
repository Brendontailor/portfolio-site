# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

---

## [Não Lançado]

### Adicionado
- Estrutura inicial da Biblia Universal de IA
- Skill central `entrevista-orquestradora`
- 6 Skills locais: planejamento-de-tarefas, analise-de-legado, revisao-de-interface, auditoria-de-seguranca, testes-com-roteiro, revisao-final
- Documentacao completa: ARQUITETURA.md, CODIGO-LIMPO.md, SEGURANCA.md, TESTES.md, FERRAMENTAS-IA.md, IA-E-CONTEXTO.md, BOOTSTRAP-AMBIENTE.md
- 9 Checklists obrigatorios: INICIO, DESENVOLVIMENTO, SEGURANCA, TESTES, ROTEIRO-DE-TESTES, REVISAO-DE-CODIGO, ENTREGA, PUBLICACAO, USO-DE-IA
- 12 Templates reutilizaveis: AGENTS.md, README.md, ARQUITETURA.md, DECISAO-TECNICA.md, PLANO-IMPLEMENTACAO.md, ESPECIFICACAO-FUNCIONAL.md, PLANO-TESTES.md, AUDITORIA-SEGURANCA.md, REVISAO-CODIGO.md, RELATORIO-ENTREGA.md, REGISTRO-INCIDENTE.md, DIVIDA-TECNICA.md
- Sistema de memoria operacional (memoria/ com 6 arquivos)
- Configuracao OpenCode com 7 skills globais + 7 skills locais + plugin graphify
- Matriz de selecao de skills (SKILLS-SELECTION-MATRIX.md)
- Catalogo de skills (SKILLS-CATALOG.md)
- Guia de bootstrap de ambiente (BOOTSTRAP-AMBIENTE.md)
- Entrevista adaptativa (INTERVIEW.md)
- Orquestrador de skills/ferramentas (ORCHESTRATOR.md)
- Ferramentas e MCPs (TOOLS-AND-MCP.md)

### Corrigido
- N/A (versao inicial)

### Removido
- N/A (versao inicial)

---

## [1.0.0] - 2026-10-27

### Adicionado
- Release inicial da Biblia Universal de IA
- Todos os componentes listados em "Não Lançado" acima

---

## Formato de Entradas

### Tipos de Mudança
- `Adicionado` para novas funcionalidades
- `Alterado` para mudanças em funcionalidades existentes
- `Depreciado` para funcionalidades que serao removidas
- `Removido` para funcionalidades removidas
- `Corrigido` para correcao de bugs
- `Seguranca` para correcoes de vulnerabilidades

### Formato de Commit (Conventional Commits)
```
<tipo>(<escopo>): <descricao>

[corpo opcional]

[rodapé opcional]
```

**Tipos**: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `security`, `perf`, `ci`, `build`, `revert`

**Exemplos**:
```
feat(auth): adicionar refresh token rotation
fix(api): corrigir validacao email no endpoint usuarios
refactor(services): extrair logica validacao para validator separado
docs(readme): atualizar instrucoes deploy
test(auth): adicionar testes login invalido
security(deps): atualizar dependencias vulneraveis
```

---

## Versionamento

Este projeto segue [Semantic Versioning](https://semver.org/lang/pt-BR/):
- **MAJOR**: Mudancas incompativeis na API
- **MINOR**: Novas funcionalidades compativeis
- **PATCH**: Correcoes de bugs compativeis

### Tags de Versao
- `v1.0.0` - Release inicial
- `v1.1.0` - Proxima minor
- `v1.1.1` - Proximo patch
- `v2.0.0` - Proxima major (breaking changes)

---

## Links Úteis

- [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
- [Semantic Versioning](https://semver.org/lang/pt-BR/)
- [Conventional Commits](https://www.conventionalcommits.org/pt-BR/)
- [GitHub Releases](https://github.com/seu-usuario/meu-padrao-de-desenvolvimento/releases)