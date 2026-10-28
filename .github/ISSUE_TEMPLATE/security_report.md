---
name: Security Report
about: Reportar uma vulnerabilidade de segurança (PRIVADO)
title: "[SECURITY] "
labels: ["security", "private"]
assignees: ""
---

> **IMPORTANTE**: Este template é para vulnerabilidades de segurança. 
> Não publique detalhes da vulnerabilidade publicamente até que seja corrigida.
> Para relatórios públicos de segurança já corrigidos, use o template de Bug Report.

---

## Tipo de Vulnerabilidade

- [ ] Injeção SQL/NoSQL
- [ ] XSS (Cross-Site Scripting)
- [ ] CSRF (Cross-Site Request Forgery)
- [ ] Autenticação/Autorização (bypass, escalation)
- [ ] Exposição de Dados Sensíveis (PII, secrets, tokens)
- [ ] Configuração Insegura (headers, CORS, TLS)
- [ ] Dependência Vulnerável (supply chain)
- [ ] Outro: ___________

## Descrição da Vulnerabilidade

**Descreva a vulnerabilidade de forma clara e técnica.**

## Impacto

| Dimensão | Severidade | Detalhes |
|----------|------------|----------|
| **Confidencialidade** | [Crítica/Alta/Média/Baixa] | [Detalhes] |
| **Integridade** | [Crítica/Alta/Média/Baixa] | [Detalhes] |
| **Disponibilidade** | [Crítica/Alta/Média/Baixa] | [Detalhes] |
| **Escopo** | [Usuário/Sistema/Organização] | [Detalhes] |

## Passos para Reproduzir (Proof of Concept)

1. [Passo 1]
2. [Passo 2]
3. [Passo 3]

**Evidências**: [Logs, screenshots, requests/responses, PoC code]

## Versões Afetadas

- **Versão(es)**: [ex: v1.2.0, v1.2.1]
- **Branch/Commit**: [branch/commit hash]
- **Ambiente**: [Produção/Staging/Desenvolvimento/Local]

## Impacto Potencial

| Área | Impacto Estimado |
|------|------------------|
| **Usuários Afetados** | [Número/%] |
| **Dados Comprometidos** | [Tipos: PII, credenciais, financeiros, etc.] |
| **Receita/Negócio** | [Estimativa] |
| **Compliance/Legal** | [LGPD, PCI-DSS, etc.] |
| **Reputação** | [Baixo/Médio/Alto/Crítico] |

## Sugestão de Correção

**Descreva como a vulnerabilidade pode ser corrigida.**

## Workaround Temporário

**Existe workaround imediato? Se sim, descreva.**

## Divulgação Responsável

- [ ] Concordo em seguir o processo de divulgação responsável
- [ ] Não divulgarei publicamente até correção
- [ ] Permito que a equipe entre em contato para coordenação

## Contato do Reportador

- **Nome**: [Nome]
- **Email**: [email@dominio.com]
- **Organização**: [Se aplicável]
- **Preferência de Contato**: [Email/Slack/Telefone]

---

## Para Uso Interno (Equipe de Segurança)

| Campo | Valor |
|-------|-------|
| **ID Interno** | SEC-YYYY-NNN |
| **Severidade CVSS** | [Score/Critico/Alto/Medio/Baixo] |
| **Status** | [Aberto/Em Investigacao/Em Correcao/Resolvido/Divulgado] |
| **Responsavel** | [Nome/Equipe] |
| **Prazo Correcao** | [Data] |
| **CVE ID** | [Se aplicavel] |
| **Data Divulgacao Publica** | [Data planejada] |

### Ações Tomadas

- [ ] Investigacao iniciada
- [ ] Causa raiz identificada
- [ ] Fix desenvolvido
- [ ] Testes de validacao
- [ ] Deploy staging
- [ ] Deploy producao
- [ ] Monitoramento pos-deploy
- [ ] Comunicacao stakeholders
- [ ] Post-mortem agendado
- [ ] Divulgacao publica (se aplicavel)

### Notas Internas

[Notas da equipe de segurança, decisões, discussões]