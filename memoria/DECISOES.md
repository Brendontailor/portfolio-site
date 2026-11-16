# Decisões - portfolio-site

**Formato**: ID | Data | Decisão | Contexto | Estado

---

## DEC-001 | 2026-10-28 | Adotar AGENT-BIBLE como padrão
| Campo | Valor |
|-------|-------|
| **Decisão** | Usar AGENT-BIBLE (https://github.com/Brendontailor/AGENT_BIBLE) |
| **Contexto** | Bootstrap automático |
| **Estado** | **VIGENTE** |

## DEC-002 | 2026-11-16 | Remover o case Monky Food do portfólio
| Campo | Valor |
|-------|-------|
| **Decisão** | O portfólio passa a ter 5 cases (Sah Açaí & Cia, RoutePilot, PortCont, Dropzone, AgendaFlow) |
| **Contexto** | Decisão do autor durante a revisão da home; o case não estava bem encaixado na grade e o portfólio fica mais enxuto |
| **Consequências** | Indexes renumerados; hero, stats, `/cv` e README ajustados; `public/images/case-monky-food.webp` ficou sem referência (não removida) |
| **Estado** | **VIGENTE** |

## DEC-003 | 2026-11-16 | Grade de cases precisa fechar as 12 colunas sem buraco
| Campo | Valor |
|-------|-------|
| **Decisão** | Card comum ocupa 6 colunas, `featured`/`wide` ocupa 12; a sequência deve fechar a grade e `npm run check:content` valida isso |
| **Contexto** | A grade deixava duas linhas com metade vazia quando um card de 12 colunas caía depois de um card de 6 |
| **Consequências** | `wide` saiu do Dropzone e do AgendaFlow; erro de conteúdo vira erro de CI, não só visual |
| **Estado** | **VIGENTE** |

## DEC-004 | 2026-11-16 | RoutePilot é prova clicável pública
| Campo | Valor |
|-------|-------|
| **Decisão** | Status "No ar · demonstração pública" com link `https://routpilotes.vercel.app` |
| **Contexto** | A demo abre publicamente (verificado via fetch), sem tela de login |
| **Estado** | **VIGENTE** |

## DEC-005 | 2026-11-16 | Código de referência real publicado no repositório
| Campo | Valor |
|-------|-------|
| **Decisão** | Os itens "Público" do laboratório apontam para `src/reference/rate-limit.ts` e `src/reference/api/clientes/route.ts`, com snippet idêntico ao arquivo |
| **Contexto** | Os links anteriores apontavam para caminhos inexistentes (404) e o snippet era código de projeto privado |
| **Consequências** | `zod` virou dependência; `check:content` passa a exigir que links internos do repositório existam |
| **Estado** | **VIGENTE** |

## DEC-006 | 2026-11-16 | Declarar inglês técnico e modelo de contratação
| Campo | Valor |
|-------|-------|
| **Decisão** | Site e currículo declaram "Inglês técnico — leitura" e "Aberto a CLT ou PJ" (remoto) |
| **Contexto** | Resposta do autor à auditoria de mercado (P1-6) |
| **Estado** | **VIGENTE** |

## DEC-007 | 2026-11-16 | Currículo alinhado ao documento oficial do autor
| Campo | Valor |
|-------|-------|
| **Decisão** | A página `/cv` passa a refletir o currículo oficial de 1 página do autor (nome completo, cargo "Suporte Técnico N1/N2", RGSUL Internet, Fiberschool, 4º semestre) e o PDF baixável passa a ser o arquivo do próprio autor |
| **Contexto** | O autor enviou `Curriculo - Brendon Tailor.pdf` como a versão correta do currículo (links já apontando para o LinkedIn e para `portfolio-site-brendont.vercel.app`) |
| **Consequências** | `public/cv/brendon-tailor-cv.pdf` = PDF oficial do autor (1 página, 79 KB); a versão web mantém a seção "Projetos" do portfólio; ao alterar `/cv`, o PDF oficial **não** é sobrescrito |
| **Estado** | **VIGENTE** |

## DEC-008 | 2026-11-16 | Push para origin/main autorizado
| Campo | Valor |
|-------|-------|
| **Decisão** | O autor autorizou o push dos commits (P0 do domínio público + revisão dos cases + currículo) |
| **Contexto** | "termine e faça o push" após revisão local |
| **Estado** | **VIGENTE** |
