---
name: seguranca-continua
description: "Validação de segurança CONTÍNUA durante implementação (shift-left). Invocada JUNTO com qualquer skill de implementação para garantir que código nasça seguro. Baseada em security-and-hardening, docs/SEGURANCA.md, checklists/SEGURANCA.md."
argument-hint: "[tipo-operacao: feature|bugfix|refactor|api|auth|upload] [contexto-arquivos]"
license: MIT
metadata:
  author: meu-padrao-de-desenvolvimento
  version: "1.0.0"
  domains: ["seguranca", "secure-by-design", "shift-left", "validacao-continua", "guardrails"]
  triggers: ["implementar", "criar", "nova feature", "endpoint", "auth", "api", "upload", "validação", "middleware", "controller", "service", "repository"]
  always-invoke-with: ["planejamento-de-tarefas", "frontend-ui-engineering", "incremental-implementation", "test-driven-development"]
---

# Skill: Segurança Contínua (Secure-by-Design / Shift-Left)

## Objetivo
**Executar validações de segurança EM TEMPO REAL durante a implementação** - não após. Atua como guardrail que impede padrões inseguros de serem escritos. Invocada **SEMPRE JUNTO** com skills de implementação (planejamento, TDD, incremental, frontend).

## Diferença da `auditoria-de-seguranca`
| Aspecto | `auditoria-de-seguranca` | `seguranca-continua` |
|---------|--------------------------|----------------------|
| **Quando** | Ponto no tempo (pré-deploy, periódico) | **Contínuo** (durante cada implementação) |
| **Foco** | Encontrar vulnerabilidades existentes | **Prevenir** vulnerabilidades ao nascer |
| **Ação** | Relatar (não modifica) | **Bloquear/Alertar** padrões inseguros na escrita |
| **Escopo** | Código completo | **Delta** sendo escrito agora |
| **Triggers** | "auditoria", "revisão segurança" | **"implementar", "criar endpoint", "nova feature"** |

---

## Quando Ativar (OBRIGATÓRIO JUNTO COM)
- ✅ `planejamento-de-tarefas` - validação do plano antes de codificar
- ✅ `incremental-implementation` - validação em cada slice
- ✅ `test-driven-development` - testes de segurança no red-green-refactor
- ✅ `frontend-ui-engineering` - validação componentes/forms/handlers
- ✅ Qualquer criação de: endpoint, auth, upload, validação, middleware, controller, service

**NUNCA implementar sem esta skill ativa.**

---

## Pré-condições
- `docs/SEGURANCA.md` e `checklists/SEGURANCA.md` internalizados
- Context7 disponível para docs de libs (Prisma, Express, Zod, argon2, jose)
- Entendimento da arquitetura do projeto (backend 9 camadas, frontend 6)

---

## Procedimento: Validação Contínua por Tipo de Operação

### A. Ao Criar/Modificar ENDPOINT (Route → Controller → Service)
**ANTES de escrever código, verificar:**

| Checkpoint | Regra | Como Validar |
|------------|-------|--------------|
| **AuthZ** | Middleware `autorizar` presente? | Grep: `router.(get\|post\|put\|delete).*autorizar` |
| **Validação** | Zod schema em body/params/query? | Verificar import + schema + `validate()` call |
| **Rate Limit** | Endpoint sensível tem limit específico? | `express-rate-limit` config no router |
| **Erros** | Usa `AppError` + middleware centralizado? | Sem `res.status(500).json({error: err.message})` |
| **Logs** | Sem segredos/PII no log? | Verificar serializers Pino/Winston |

**SE qualquer checkpoint falhar → PARAR implementação até corrigir.**

---

### B. Ao Implementar AUTENTICAÇÃO/TOKENS
**Checkpoints obrigatórios:**

| Item | Regra Obrigatória | Validação |
|------|-------------------|-----------|
| Hash senha | **Argon2id** (memoryCost=19456, timeCost=2, parallelism=1) OU bcrypt ≥12 | `argon2.hash()` ou `bcrypt.hash(rounds>=12)` |
| JWT | RS256 (assimétrico), access ≤15min | `jsonwebtoken.sign({...}, privateKey, {algorithm: 'RS256', expiresIn: '15m'})` |
| Refresh token | Rotação a cada uso, hash no DB, ≤7d | Schema `refreshTokens` com `tokenHash`, `expiresAt`, `revokedAt` |
| Cookies | HttpOnly, Secure, SameSite=lax/strict | `res.cookie('token', ..., {httpOnly: true, secure: true, sameSite: 'lax'})` |
| Rate limit login | 5 tent/15min por IP + conta | `express-rate-limit` com `keyGenerator: (req) => req.ip + ':' + req.body.email` |
| MFA | TOTP/WebAuthn recomendado | `otplib` ou `@simplewebauthn/server` |

---

### C. Ao Implementar VALIDAÇÃO (Zod Schemas)
**Todo schema DEVE:**

```typescript
// ✅ CORRETO - Padrão obrigatório
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(12).max(128),
  // campos extras REJEITADOS
}).strict(); // ou .passthrough() se controlado

// ❌ PROIBIDO
const schema = z.object({...}); // sem .strict()
z.any(), z.unknown() sem validação
```

**Validação automática:**
- [ ] `.strict()` em todos schemas de entrada
- [ ] `refine()` para regras de negócio (unicidade, integridade FK)
- [ ] Transformações seguras (`.transform()` sanitizado)
- [ ] Mensagens de erro genéricas (não vazam estrutura)

---

### D. Ao Implementar UPLOAD DE ARQUIVOS
**Checkpoints críticos:**

| Validação | Implementação Obrigatória |
|-----------|---------------------------|
| MIME real | `file-type` (magic bytes) + allowlist `['image/jpeg', 'image/png', 'application/pdf']` |
| Tamanho | Limit: `multer({limits: {fileSize: 5 * 1024 * 1024}})` |
| Sanitização | `sharp` para imagens (strip metadata, resize) |
| Storage | Privado + URLs assinadas temporárias (S3 presigned, etc.) |
| Nome arquivo | UUID + extensão validada, **NUNCA** nome original |
| Path traversal | `path.resolve()` + prefix check contra pasta permitida |

---

### E. Ao Implementar FRONTEND (Componentes/Forms/Hooks)
**Validações de segurança no cliente (UX + defesa em profundidade):**

| Vetor | Regra | Implementação |
|-------|-------|---------------|
| XSS | **NUNCA** `dangerouslySetInnerHTML` sem DOMPurify | `DOMPurify.sanitize(html)` |
| CSRF | SameSite cookies + token double-submit | `axios` interceptor injeta header `X-CSRF-Token` |
| Secrets | **NENHUM** segredo em `VITE_*` ou bundle | `grep -r "VITE_" src/` → vazio |
| Auth state | React Query + HttpOnly cookies (não localStorage) | `useQuery({queryKey: ['auth'], ...})` |
| Validação | Zod schema **compartilhado** com backend | `import { schema } from '@shared/validators'` |

---

### F. Ao Modificar BANCO DE DADOS (Prisma/Migrations)
**Em cada migration/schema change:**

| Checkpoint | Regra |
|------------|-------|
| Soft delete | `deletedAt DateTime?` em tabelas sensíveis |
| Constraints | `@@unique`, `@relation(onDelete: Cascade/SetNull)`, `@@index` |
| Usuário DB | Role `app_user` (não superuser), grants mínimos |
| TLS | `sslmode=require` no `DATABASE_URL` |
| Transações | `$transaction` para operações multi-tabela |

---

## Integração com Fluxo de Implementação

### No `planejamento-de-tarefas` (Passo 0 - Antes de Codificar)
```markdown
## Plano de Implementação - Checklist Segurança
- [ ] AuthZ definido por endpoint (matriz role × endpoint)
- [ ] Zod schemas listados (body/params/query por endpoint)
- [ ] Rate limits definidos (global + por endpoint sensível)
- [ ] Tratamento erros: AppError + middleware centralizado
- [ ] Logs: sem segredos, structured JSON
- [ ] Segredos: apenas .env (gitignored), validado startup Zod
```

### No `incremental-implementation` (Cada Slice)
```typescript
// ANTES de commitar cada slice:
/*
✅ Endpoint tem middleware autorizar?
✅ Zod schema .strict() em body/params/query?
✅ Sem console.log com dados sensíveis?
✅ Erros via AppError (não throw genérico)?
✅ Rate limit configurado se endpoint sensível?
✅ Testes: happy path + authZ negado + validação inválida?
*/
```

### No `test-driven-development` (Red-Green-Refactor Seguro)
```typescript
// Testes de segurança OBRIGATÓRIOS (red primeiro):
describe('Security', () => {
  test('rejects request without auth token', async () => {
    await request(app).get('/api/protected').expect(401);
  });
  test('rejects request without required permission', async () => {
    await request(app)
      .get('/api/admin')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(403);
  });
  test('rejects invalid payload (Zod)', async () => {
    await request(app)
      .post('/api/resource')
      .send({invalid: 'data'})
      .expect(400);
  });
  test('rate limits auth endpoint', async () => {
    for (let i = 0; i < 6; i++) {
      await request(app).post('/auth/login').send({...});
    }
    // 6th should be 429
  });
});
```

---

## Ferramentas de Validação Automatizada (Integrar no CI/Pre-commit)

```json
// .husky/pre-commit ou lint-staged
{
  "scripts": {
    "security:check": "npm run lint:security && npm run test:security",
    "lint:security": "eslint --rule 'security/detect-object-injection: error' --rule 'security/detect-non-literal-regexp: error' src/",
    "test:security": "vitest run --reporter=verbose src/**/*.security.test.ts"
  }
}
```

**ESLint Security Rules Obrigatórios:**
- `security/detect-object-injection`
- `security/detect-non-literal-regexp`
- `security/detect-unsafe-regex`
- `security/detect-buffer-noassert`
- `security/detect-child-process`
- `security/detect-disable-mustache-escape`
- `security/detect-eval-with-expression`
- `security/detect-no-csrf-before-method-override`
- `security/detect-non-literal-fs-filename`
- `security/detect-possible-timing-attacks`

---

## Checklist Rápido por Arquivo (Mental Model)

### Criando `routes/*.ts`
- [ ] `router.method('/path', autorizar('perm'), validate(schema), controller.handler)`

### Criando `controllers/*.ts`
- [ ] `try/catch` → `next(AppError(...))` (não `res.status().json()`)
- [ ] Sem lógica de negócio (delega para service)

### Criando `services/*.ts`
- [ ] Regras de negócio + validações de integridade
- [ ] Transações `$transaction` para multi-tabela
- [ ] Verifica propriedade recurso (IDOR): `userId === resource.ownerId`

### Criando `validators/*.ts`
- [ ] `z.object({...}).strict()`
- [ ] `refine()` para unicidade/FK
- [ ] Exporta schema + tipo inferido

### Criando `middlewares/*.ts`
- [ ] `autorizar` verifica permissão + propriedade
- [ ] `errorHandler` centralizado, sem stack trace prod
- [ ] `rateLimiter` configurado por sensibilidade

---

## Bloqueadores (STOP Implementation Imediatamente)

Se detectar **qualquer** um destes → **PARAR** e corrigir antes de continuar:

| Padrão Bloqueador | Por Que |
|-------------------|---------|
| `res.status(500).json({error: err.message})` | Vaza stack trace |
| `JWT_SECRET` simétrico (HS256) | Chave comprometida = todos tokens válidos |
| `bcrypt` com rounds < 12 | Brute-force viável |
| `z.object({}).passthrough()` sem controle | Mass assignment |
| `dangerouslySetInnerHTML` sem DOMPurify | XSS stored/reflected |
| `VITE_API_KEY` ou segredo no frontend | Exposição total no bundle |
| `console.log(password)` ou `logger.info({user: {...password}})` | Segredo em log |
| `multer()` sem `fileFilter` + `limits` | Upload ilimitado, qualquer tipo |
| `prisma.$queryRaw` com string concat | SQL Injection |
| Rota protegida **sem** `autorizar` middleware | AuthZ bypass |

---

## Entrega / Output

Esta skill **não gera relatório separado**. Ela:
1. **Bloqueia/alerta** em tempo real durante implementação
2. **Adiciona checklists** nos planos (`planejamento-de-tarefas`)
3. **Injeta testes de segurança** no TDD (`test-driven-development`)
4. **Valida cada slice** no incremental (`incremental-implementation`)
5. **Registra decisões** em `memoria/DECISOES.md` (ex: "Escolhido Argon2id over bcrypt: DEC-001")

---

## Referências Obrigatórias
- `docs/SEGURANCA.md` - Matriz 15 riscos, configurações detalhadas
- `checklists/SEGURANCA.md` - Checklist executável completo
- `security-and-hardening` skill - Para implementar correções quando bloqueado
- Context7: `resolve-library-id` + `query-docs` para versões exatas (argon2, jose, zod, prisma, helmet)

---

## Critérios de Aceitação (Skill Executada Corretamente)
- [ ] Invocada **antes** de qualquer código de implementação
- [ ] Zero padrões bloqueadores no código produzido
- [ ] Testes de segurança no TDD (authZ, validação, rate limit)
- [ ] Checklists de segurança no plano de implementação
- [ ] Decisões de segurança registradas em `memoria/DECISOES.md`
- [ ] Nenhum segredo exposto em logs, frontend, ou código