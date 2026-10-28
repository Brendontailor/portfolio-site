---
name: revisao-de-interface
description: "Avalia consistência visual, responsividade, acessibilidade, estados de interface e reutilização de componentes. Baseada em ui-ux-pro-max, frontend-ui-engineering e auditoria visual com evidências de navegador."
argument-hint: "[url-ou-caminho] [escopo: completa|componente|fluxo]"
license: MIT
metadata:
  author: meu-padrao-de-desenvolvimento
  version: "1.0.0"
  domains: ["ui-ux", "auditoria-visual", "acessibilidade", "responsividade", "design-system"]
  triggers: ["auditoria ui", "revisar interface", "acessibilidade", "responsividade", "consistência visual", "design system"]
---

# Skill: Revisão de Interface

## Objetivo
Realizar auditoria baseada em evidências de interfaces de usuário, avaliando consistência visual, responsividade, acessibilidade (WCAG 2.1 AA), estados de interface, reutilização de componentes e aderência ao design system - **sem modificar a interface** se a solicitação for somente auditoria.

## Quando Ativar
- Auditoria de UI/UX solicitada explicitamente
- PR de frontend antes de merge
- Nova implementação de interface
- Redesign ou migração de design system
- Validação de acessibilidade (legal/compliance)
- Investigação de problemas de usabilidade relatados

## Pré-condições
- Acesso à aplicação rodando (URL local/staging/produção) **OU** código fonte completo
- Playwright ou Browser MCP disponível para validação real
- `ui-ux-pro-max` skill disponível (dados de design intelligence)
- Docs de referência: `docs/ARQUITETURA.md` (frontend), `ui-ux-pro-max` guidelines

## Procedimento de Execução

### Passo 1: Reconhecimento e Escopo
1. Definir escopo: **completa** (toda app), **fluxo** (jornada específica), **componente** (bibliotecas UI)
2. Identificar: tecnologia (React/Vue/Svelte/HTML), design system (shadcn, MUI, custom), breakpoints alvo
3. Listar páginas/fluxos/jornadas críticas a auditar

### Passo 2: Inspeção Visual e Estrutural (Playwright/Browser MCP)
**Para cada página/componente no escopo:**

#### A. Consistência Visual
- [ ] **Tipografia**: escala consistente (heading 1-6, body, caption), font-pairings, line-height, letter-spacing
- [ ] **Espaçamento**: escala spacing tokens (4, 8, 16, 24, 32, 48, 64), alinhamento, ritmo vertical
- [ ] **Cores**: paleta definida (primária, secundária, neutra, semântica: success/warning/error/info), contraste
- [ ] **Componentes**: variantes consistentes (button: primary/secondary/ghost/destructive, input: default/error/disabled)
- [ ] **Ícones**: estilo único (outline/filled), tamanho consistente, biblioteca única
- [ ] **Bordas/raios**: border-radius scale consistente
- [ ] **Sombras/elevação**: elevation scale consistente

#### B. Responsividade (Breakpoints: 320, 768, 1024, 1440)
- [ ] Layout adapta sem quebrar (flex/grid, não overflow horizontal)
- [ ] Navegação móvel funcional (hamburger, drawer, tabs)
- [ ] Tabelas: scroll horizontal, stack cards, ou colunas prioritárias
- [ ] Formulários: inputs 100% width mobile, labels visíveis
- [ ] Imagens: max-width 100%, aspect-ratio preservado
- [ ] Touch targets: ≥ 44x44px (botões, links, inputs)
- [ ] Texto legível sem zoom (mínimo 16px base)

#### C. Acessibilidade (WCAG 2.1 AA)
**Automatizado (axe-core/Playwright):**
- [ ] Contraste texto: ≥ 4.5:1 (normal), ≥ 3:1 (large text 18px+)
- [ ] Contraste UI: ≥ 3:1 (bordas, ícones, estados focus)
- [ ] Semantic HTML: landmarks (header, main, nav, aside, footer), headings hierarchy (h1→h6)
- [ ] Labels em inputs (explícitos ou aria-label), não apenas placeholder
- [ ] Focus visible: outline/focus-ring em todos elementos interativos
- [ ] Ordem de foco lógica (tabindex natural, não saltos)
- [ ] ARIA: roles, states, properties corretos (não redundantes com HTML nativo)
- [ ] Imagens: alt text significativo (não "image", não filename)
- [ ] Formulários: error messages associados (aria-describedby), required indicado
- [ ] Tabelas: headers scope, caption se necessário
- [ ] Modais/dialogs: focus trap, ESC para fechar, aria-modal, retorno foco

**Manual (navegação teclado + screen reader):**
- [ ] Navegação completa por Tab/Shift+Tab
- [ ] Enter/Space ativam botões/links
- [ ] Escape fecha modais/dropdowns
- [ ] Setas navegam menus/tabs/carousels
- [ ] Screen reader (NVDA/VoiceOver): anúncios corretos, sem verbosidade excessiva

#### C. Estados de Interface
Para cada componente interativo:
- [ ] **Default**: estado inicial claro
- [ ] **Hover**: feedback visual (cor, sombra, transform)
- [ ] **Active/Focus**: focus-ring visível, acessível
- [ ] **Loading**: spinner/skeleton, disabled, aria-busy
- [ ] **Disabled**: visual distinto, não interativo, aria-disabled
- [ ] **Error**: mensagem clara, cor semântica, ícone, aria-invalid
- [ ] **Success**: confirmação visual, toast/alert
- [ ] **Empty**: ilustração + mensagem + action (CTA)
- [ ] **Partial/Intermediate**: progress, indeterminado

#### D. Reutilização de Componentes (Design System)
- [ ] Inventário de componentes únicos vs duplicados
- [ ] Props API consistente (nomes, tipos, defaults)
- [ ] Composição vs herança (slots/children vs variants)
- [ ] Storybook/documentação de componentes existe e atualizada
- [ ] Tokens de design (cores, spacing, tipografia) centralizados em CSS vars / ThemeProvider
- [ ] Componentes primitivos (Button, Input, Card, Dialog) vs compostos (FormField, DataTable)

### Passo 3: Validação com Navegador Real
**Playwright/Browser MCP - Evidências obrigatórias:**
```typescript
// Para cada achado: screenshot + seletor + descrição
await page.goto(url);
await page.screenshot({ path: `evidence/${componente}-${issue}.png`, fullPage: true });
```

**Checklist de validação automatizada:**
- [ ] `npm run test:a11y` (axe-core) - 0 violações críticas/severas
- [ ] `npm run test:visual` (chromatic/percy) - sem regressões visuais
- [ ] `npm run test:e2e` - fluxos críticos passam
- [ ] Lighthouse CI: Performance > 90, Accessibility > 95, Best Practices > 90

### Passo 4: Classificar Achados
| ID | Componente/Página | Categoria | Severidade | Descrição | Evidência | Esforço Estimado |
|----|-------------------|-----------|------------|-----------|-----------|------------------|
| UI-001 | Button primário | Contraste | Crítico | Contraste 3.2:1 < 4.5:1 | screenshot + seletor | Baixo (cor CSS) |
| UI-002 | Form login | Acessibilidade | Alto | Input sem label associado | screenshot + HTML | Baixo (add label) |

**Severidades:**
- **Crítico**: Bloqueia uso, viola lei (WCAG A/AA), quebra funcionalidade
- **Alto**: Degrada experiência significativa, risco conversão/usabilidade
- **Médio**: Inconsistência visual, desvios do design system, melhoria usabilidade
- **Baixo**: Polimento, micro-interações, preferências subjetivas

### Passo 5: Relatório de Auditoria
```
# Auditoria UI/UX: [Projeto] - [Data]

## Escopo
- Páginas/Componentes auditados: ...
- Breakpoints testados: ...
- Ferramentas: Playwright, axe-core, Lighthouse, inspeção manual

## Sumário Executivo
- Total achados: X (Crítico: Y, Alto: Z, Médio: W, Baixo: V)
- Pontuação geral: [A-F] ou [0-100]
- Riscos críticos: [lista]

## Achados Detalhados
### Críticos (Y)
| ID | Componente | Problema | Evidência | Correção |

### Altos (Z)
...

## Recomendação de Priorização
1. **Imediato (Críticos)**: ...
2. **Próxima Sprint (Altos)**: ...
3. **Backlog (Médios/Baixos)**: ...

## Evidências
- Screenshots em: `evidence/ui-audit-[timestamp]/`
- Relatórios axe/Lighthouse em: `reports/`
```

### Passo 6: Entregar
**Se apenas auditoria:** Entregar relatório acima, **não modificar código**.
**Se auditoria + correção:** Implementar correções acordadas, verificar regressões visuais (Chromatic/Percy), re-validar.

## Ferramentas Necessárias
- **Playwright** / **Browser MCP**: navegação, screenshots, axe-core injection
- **axe-core**: auditoria automatizada WCAG
- **Lighthouse CI**: performance, accessibility, best practices
- **Chromatic/Percy** (opcional): visual regression testing
- **ui-ux-pro-max**: guidelines, paletas, font-pairings, presets GSAP
- **Storybook** (se existe): documentação componentes

## Limites de Responsabilidade
- **NÃO** implementa correções (skill `frontend-ui-engineering` ou `ui-styling`)
- **NÃO** decide identidade visual/brand (skill `brand`, `design`)
- **NÃO** faz user research/testes com usuários reais
- **SIM** audita com evidências, classifica, prioriza, recomenda
- **SIM** valida com navegador real (não apenas inspeção estática)

## Critérios de Aceitação
- [ ] Escopo definido e comunicado
- [ ] Todas páginas/componentes no escopo auditadas
- [ ] Evidências (screenshots, relatórios axe/Lighthouse) coletadas
- [ ] Achados classificados por severidade com evidência
- [ ] Relatório entregue com recomendações priorizadas
- [ ] Código **não modificado** (salvo correções acordadas)
- [ ] Validação regressão visual se correções aplicadas

## Tratamento de Falhas
| Falha | Ação |
|-------|------|
| URL não acessível / app não roda | Auditar código estático + Storybook + documentar limitação |
| Playwright/Browser MCP indisponível | Inspeção estática + checklist manual + documentar limitação |
| Design system não existe / inconsistente | Auditar como "custom", recomendar design system |
| Muitos achados (>50) | Agrupar por padrão/componente, priorizar sistêmicos |
| Conflito com brand guidelines | Documentar divergência, recomendar alinhamento |

## Formato de Entrega
Relatório em `docs/AUDITORIA-UI-UX-[projeto]-[data].md` + evidências em `evidence/ui-audit-[timestamp]/`

## Referências
- `ui-ux-pro-max` skill (guidelines, paletas, presets)
- `frontend-ui-engineering` skill (implementação)
- `checklists/REVISAO-DE-CODIGO.md` (seção UI)
