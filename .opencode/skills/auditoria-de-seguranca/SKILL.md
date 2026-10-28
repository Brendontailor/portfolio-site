---
name: auditoria-de-seguranca
description: "Examina autenticação, autorização, validações, exposição de segredos, configuração, dependências e riscos relevantes. Baseada em security-and-hardening, code-review-and-quality e docs/SEGURANCA.md."
argument-hint: "[caminho-projeto] [escopo: completa|auth|api|infra|deps]"
license: MIT
metadata:
  author: meu-padrao-de-desenvolvimento
  version: "1.0.0"
  domains: ["seguranca", "auditoria", "auth", "autorizacao", "validacao", "secrets", "dependencias"]
  triggers: ["auditoria segurança", "revisão segurança", "vulnerabilidades", "auth authorization", "secrets", "dependências"]
---

# Skill: Auditoria de Segurança

## Objetivo
Realizar auditoria sistemática de segurança em aplicações, identificando vulnerabilidades reais, classificando por severidade, apresentando evidências e recomendações de mitigação - **sem executar ações destrutivas ou não autorizadas**.

## Quando Ativar
- Pré-deploy / release candidato
- Auditoria periódica (trimestral/semestral)
- Implementação de auth/autorização/dados sensíveis
- Code review com foco em segurança
- Investigação de incidente suspeito
- Compliance (LGPD, PCI-DSS, etc.)

## Pré-condições
- Acesso ao código fonte completo
- `docs/SEGURANCA.md` e `checklists/SEGURANCA.md` lidos
- `npm audit` / `pnpm audit` disponível
- Permissão apenas de **leitura e análise** (não execução de exploits)

## Procedimento de Execução

### Passo 1: Definir Escopo e Limites
| Escopo | Inclui |
|--------|--------|
| **completa** | Auth, AuthZ, Validação, Secrets, Config, Deps, Infra, Logs |
| **auth** | Login, registro, tokens, sessões, MFA, recuperação senha |
| **api** | Rate limit, CORS, headers, validação, authZ por endpoint |
| **infra** | Headers, TLS, CSP, HSTS, cookies, deploy, secrets management |
| **deps** | `npm audit`, Snyk, licenças, supply chain |

**Limites obrigatórios:**
- **NÃO** executar exploits, fuzzing, SQL injection real
- **NÃO** acessar dados de produção/reais
- **NÃO** modificar código (apenas relatar)
- **NÃO** expor segredos encontrados no relatório (referenciar apenas)

### Passo 2: Autenticação e Autorização (Auth/AuthZ)
**Verificar com evidências (código + config):**

| Item | Verificação | Evidência Esperada |
|------|-------------|-------------------|
| Hash senhas | Argon2id (preferencial) ou bcrypt ≥12 rounds | `argon2` ou `bcrypt` import, parâmetros |
| Senhas texto puro | **NENHUMA** | Grep por `password`/`senha` em logs/DB/code |
| JWT | RS256 (assimétrico) preferencial, expiração ≤15min | `jsonwebtoken` config, `JWT_PRIVATE_KEY` |
| Refresh token | Rotação a cada uso, hash no DB, expiração ≤7d | Schema DB, rota `/refresh` |
| Cookies | HttpOnly, Secure, SameSite=lax/strict | `cookieOptions` no código |
| Rate limit auth | 5 tent/15min por IP + conta | `express-rate-limit` config |
| MFA/2FA | TOTP ou WebAuthn (opcional mas recomendado) | `otplib`/`@simplewebauthn` |
| Tentativas login | Bloqueio progressivo, reset após janela | Contador + timestamp no Redis/memória |

**AuthZ (Autorização) - CRÍTICO:**
- [ ] Middleware `autorizar` em **TODAS** rotas protegidas
- [ ] RBAC: roles/permissions granulares (não apenas "admin/user")
- [ ] Verificação propriedade recurso (IDOR prevention): `userId === resource.ownerId`
- [ ] Admin bypass auditado (logs de ações admin)
- [ ] Matriz permissão × endpoint documentada

### Passo 3: Validação e Sanitização de Entrada
| Vetor | Verificação | Ferramenta/Evidência |
|-------|-------------|---------------------|
| SQL Injection | Apenas Prisma/parameterized queries | Grep: `$queryRaw`, `$executeRaw`, string concat |
| XSS (Reflected/Stored) | Zod validation + DOMPurify output | Zod schemas + `isomorphic-dompurify` |
| CSRF | SameSite cookies + double-submit token | `csurf` ou custom token |
| SSRF | Allowlist domínios fetch externo | Config fetch, validação URL |
| Path Traversal | Validação path, `path.resolve()` + prefix check | Upload/download handlers |
| Prototype Pollution | `Object.freeze()` config, validação keys | `lodash.merge`/`defaultsDeep` usage |
| XXE | Parser XML seguro (se aplica) | `libxmljs` config |
| File Upload | MIME real (magic bytes) + allowlist + sanitização | `file-type`, `sharp`, antivirus |

**Validação backend = barreira obrigatória:**
- [ ] Zod schemas em **TODOS** endpoints (body, params, query)
- [ ] Rejeição campos extras (`strict()` ou `passthrough()` controlado)
- [ ] Unicidade verificada no service **antes** de persistir
- [ ] Integridade referencial (FKs) verificada no service

### Passo 4: Proteção da Aplicação
| Camada | Verificação | Config Esperada |
|--------|-------------|----------------|
| Rate Limiting | Global API + endpoints sensíveis | `express-rate-limit`: 100req/min global, 5/15min auth |
| CORS | Allowlist explícita (não `*`) | `origin: ['https://app.dominio.com']` |
| Headers Segurança | Helmet.js configurado | CSP, HSTS, X-Frame-Options, Referrer-Policy |
| TLS | Apenas HTTPS em produção | `sslmode=require`, certificado válido |
| Error Handling | Sem stack trace em produção | `NODE_ENV=production` → generic 500 |
| Logging | Estruturado, sem segredos | Pino/Winston + sanitização (senhas, tokens, PII) |

### Passo 5: Gestão de Segredos e Configuração
| Item | Verificação | Evidência |
|------|-------------|-----------|
| `.env` no `.gitignore` | Sim | `git check-ignore .env` |
| `.env.example` no Git | Sim, valores fictícios | Arquivo existe, sem valores reais |
| Validação startup | Zod schema + fail fast | `getEnv()` com `safeParse` |
| Segredos no frontend | **NENHUM** em `VITE_*` | Build analysis: `grep -r "VITE_" dist/` |
| Chaves JWT | Assimétricas (RS256) | `JWT_PRIVATE_KEY`, `JWT_PUBLIC_KEY` env |
| Secrets em logs | Sanitização automática | Pino/Winston + `serializers` deny list |

### Passo 6: Banco de Dados (PostgreSQL + Prisma)
| Item | Verificação |
|-------|-------------|
| Usuário DB | Role dedicada (`app_user`), **NÃO** superuser |
| Permissões | Grants mínimos: SELECT/INSERT/UPDATE/DELETE apenas tabelas app |
| Soft delete | `deletedAt` em tabelas sensíveis |
| Constraints | `@unique`, `@relation(onDelete: Cascade/SetNull)`, `@@index` |
| Transações | `$transaction` para operações multi-tabela atômicas |
| Migrations | Versionadas no Git, revisadas antes de deploy |
| Backup | Automático diário + PITR ≥ 7 dias + teste restore mensal |
| Criptografia | Em repouso (AES-256) + trânsito (TLS 1.3) |

### Passo 7: Dependências e Supply Chain
- [ ] `npm audit --audit-level=high` → **0 high/critical**
- [ ] Dependabot/Renovate configurado (PRs automáticos)
- [ ] `package-lock.json` / `pnpm-lock.yaml` commitado
- [ ] Lockfile versionado, sem `*` ou `^` em deps críticas
- [ ] Auditoria mensal: `npm outdated`, revisar CHANGELOGS
- [ ] Pacotes suspeitos: verificar mantenedores, downloads, última atualização

### Passo 8: Infraestrutura e Deploy
| Item | Verificação |
|-------|-------------|
| Variáveis produção | Validadas, separadas de dev/staging |
| Segredos em CI/CD | GitHub Secrets / Vercel Env / Doppler (não no código) |
| Deploy | Preview automático + aprovação manual para prod |
| Rollback | Documentado, testado, < 5 min |
| Monitoramento | Alertas: 5xx spike, auth failures, rate limit hits, latency p95 |
| Logs agregados | Structured JSON, retenção ≥ 1 ano (segurança) |

### Passo 9: Matriz de Riscos (Obrigatória)
Para cada achado, preencher:
| ID | Risco | Severidade | Impacto | Evidência (arquivo:linha) | Mitigação | Status |
|----|-------|------------|---------|---------------------------|-----------|--------|
| SEC-001 | JWT secret fraco | Crítico | Total conta compromise | `config/jwt.ts:12` (HS256) | Migrar RS256 + rotação | ABERTO |

**Severidade:** Crítico > Alto > Médio > Baixo > Informativo
**Status:** ABERTO | MITIGADO | ACEITO (com justificativa) | FALSO POSITIVO

### Passo 10: Relatório de Auditoria
```
# Auditoria de Segurança: [Projeto] - [Data]

## Escopo
- Tipo: [completa|auth|api|infra|deps]
- Arquivos analisados: X
- Linhas de código: Y
- Ferramentas: npm audit, grep, inspeção manual, Context7

## Sumário Executivo
- Total achados: X (Crítico: Y, Alto: Z, Médio: W, Baixo: V)
- Riscos críticos não mitigados: [lista]
- Conformidade geral: [Aprovado | Condicional | Reprovado]

## Achados por Categoria
### Autenticação/Autorização (Crítico: Y, Alto: Z)
| ID | Achado | Severidade | Arquivo:Linha | Mitigação |

### Validação Entrada
...

### Segredos/Config
...

### Dependências
- npm audit: X high, Y critical
- Dependabot: [configurado|não]

### Infra/Deploy
...

## Riscos Críticos Não Mitigados
[Lista - bloqueiam deploy se houver]

## Recomendações Priorizadas
1. **Imediato (Críticos)**: ...
2. **Esta Sprint (Altos)**: ...
3. **Backlog (Médios/Baixos)**: ...

## Checklist de Conformidade (Anexo)
- [ ] checklists/SEGURANCA.md completo
```

### Passo 11: Entregar
**Somente relatório.** Não modificar código, não executar exploits, não expor segredos.

## Ferramentas Necessárias
- `npm audit` / `pnpm audit` / `yarn audit`
- `grep`/`rg` para busca padrões inseguros
- `tools.context7` para docs de libs (ex: configuração segura Prisma, Express)
- `checklists/SEGURANCA.md` como guia
- `docs/SEGURANCA.md` como referência técnica

## Limites de Responsabilidade
- **NÃO** executa pentest/DAST real (ex: OWASP ZAP, Burp Suite)
- **NÃO** acessa ambiente de produção ou dados reais
- **NÃO** modifica código (skill `security-and-hardening` para implementar correções)
- **NÃO** decide aceitação de risco (apresenta, usuário decide)
- **SIM** identifica com evidência código:linha, classifica, recomenda mitigação

## Critérios de Aceitação
- [ ] Escopo definido e comunicado
- [ ] Todas categorias no escopo auditadas com evidência código:linha
- [ ] Matriz de riscos preenchida com severidade, evidência, mitigação
- [ ] Relatório entregue sem segredos expostos
- [ ] Código **não modificado**
- [ ] Checklist `checklists/SEGURANCA.md` usado como guia

## Tratamento de Falhas
| Falha | Ação |
|-------|------|
| Código muito grande para auditoria completa | Amostragem baseada em risco (auth, API, upload, payments) |
| Segredo encontrado em código | Reportar IMEDIATAMENTE ao usuário, não incluir no relatório escrito, sugerir rotação |
| Dependência crítica vulnerável sem patch | Documentar como risco aceito temporariamente, mitigação compensatória (WAF, monitoramento) |
| AuthZ ausente em endpoints | Classificar como Crítico, bloquear deploy até correção |
| Falso positivo `npm audit` | Verificar contexto, documentar como FALSO POSITIVO com justificativa |

## Formato de Entrega
Relatório em `docs/AUDITORIA-SEGURANCA-[projeto]-[data].md` (sem segredos)

## Referências
- `checklists/SEGURANCA.md` - Checklist executável completo
- `docs/SEGURANCA.md` - Referência técnica detalhada
- `security-and-hardening` skill (implementação correções)
- `code-review-and-quality` skill (revisão qualidade + segurança)
