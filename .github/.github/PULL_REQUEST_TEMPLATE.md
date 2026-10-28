# Pull Request Template

## Descrição

**Resumo do que foi feito - 2-3 frases.**

## Tipo de Mudança

- [ ] Bug fix
- [ ] Nova feature
- [ ] Refatoração
- [ ] Documentação
- [ ] Testes
- [ ] Segurança
- [ ] Performance
- [ ] Chore/Manutenção
- [ ] Outro: _______

## Checklist Obrigatório

- [ ] `pnpm run validate` passa (lint + typecheck + test + format:check)
- [ ] Testes unitários/integração adicionados/atualizados
- [ ] Testes E2E para fluxos críticos (se aplicável)
- [ ] Documentação atualizada (README, CHANGELOG, ADRs, docs/)
- [ ] Segurança revisada (`checklists/SEGURANCA.md`)
- [ ] Breaking changes documentados (se houver)

## Testes Executados

- [ ] Unitários: `pnpm run test:unit`
- [ ] Integração: `pnpm run test:integration`
- [ ] E2E: `pnpm run test:e2e`
- [ ] Acessibilidade: `pnpm run test:a11y`
- [ ] Cobertura: thresholds atendidos (linhas 80%, branches 70%, funções 80%)

## Evidências

- [Screenshots, logs, links CI, etc.]

## Checklist de Revisão (para revisores)

- [ ] Código segue padrões (`ARCHITECTURE.md`, `CODIGO-LIMPO.md`)
- [ ] Segurança: auth/authZ, validação, secrets, headers
- [ ] Testes cobrem casos de borda e erro
- [ ] Performance aceitável (p95 < 200ms)
- [ ] Acessibilidade (WCAG 2.1 AA)
- [ ] Documentação clara e completa

## Issue Relacionada

Fixes #123
Closes #456
Related to #789

## Breaking Changes

- [ ] Sim (descreva abaixo)
- [ ] Não

**Se Sim**: Descreva breaking changes e migração necessária.

## Contexto Adicional

[Qualquer informação adicional, configurações, decisões de design, etc.]