# Auditoria do portfólio — mercado dev 2026

**Data**: 16/11/2026
**Escopo**: site `portfolio-site` (código em `src/`), conteúdo dos cases, presença no GitHub e publicação
**Objetivo**: comparar o portfólio com o que o mercado brasileiro pede hoje e priorizar o que melhora a conversão em entrevistas

---

## 1. Resumo executivo

O portfólio tem conteúdo acima da média para júnior/pleno: 6 cases com contexto, decisões técnicas e resultados, um cliente real, vídeo de demonstração e um site próprio bem construído. O problema não é a qualidade do material — é **distribuição e prova verificável**.

| Dimensão | Nota | Comentário |
|---|---|---|
| Conteúdo dos cases | 8/10 | Contexto, problema, decisões e stack. Falta métrica de impacto e autoria explícita. |
| Prova técnica clicável | 4/10 | 4 de 6 cases sem demo ou código acessível; principais produtos são privados. |
| Presença profissional | 3/10 | Sem LinkedIn, sem currículo, GitHub com CI vermelho e sem link do site. |
| Publicação | 2/10 | O domínio de referência responde com tela de login da Vercel (deployment protection). |
| Diferencial | 9/10 | Vídeo narrado do sistema rodando é raro em portfólio júnior. |

**Top 5 ações, em ordem de impacto:**

1. **Garantir que o site abra publicamente** (hoje `brendontailor.vercel.app` mostra login da Vercel).
2. **Adicionar LinkedIn e currículo em PDF** no header, no contato e no rodapé.
3. **Consertar o GitHub**: CI verde, link do site no perfil, repositório do portfólio com linguagem correta.
4. **Transformar 2 cases em provas clicáveis** (demo pública ou vídeo + trecho de código comentado).
5. **Adicionar métricas e autoria** nos cases (tempo, equipe, meu papel, resultado mensurável).

---

## 2. O que o mercado pede (evidências)

### 2.1 Volume e faixa salarial — júnior

| Indicador | Valor | Fonte |
|---|---|---|
| Vagas com "Desenvolvedor Júnior" no LinkedIn (mar/2026) | ~680 no Brasil | deveprogramar.substack.com |
| Salário médio nacional júnior | R$ 3.463/mês | Glassdoor, via deveprogramar |
| Faixa mais comum (25º–75º) | R$ 2.580 – R$ 4.915 | Glassdoor, via deveprogramar |
| Faixa júnior por stack moderna | R$ 3.500 – R$ 8.500 | devvagas.com.br (Guia de Salários 2026) |
| Diferenciais citados para júnior | testes automatizados básicos, comunicação assíncrona, proatividade, stack moderna (React/Next ou Node) | devvagas.com.br |

### 2.2 Requisitos que aparecem nas vagas

Amostra de vagas full-stack júnior/pleno (Brasil, remotas) e contagem de termos na página de vagas do Programathor (16/11/2026):

| Requisito | Evidência |
|---|---|
| React | 11 menções na listagem do Programathor |
| Node.js | 9 menções |
| TypeScript / JavaScript | 5 / 7 menções |
| APIs REST | 10 menções de "API", 9 de "REST" |
| Testes automatizados | 8 menções; vaga júnior/pleno pede Jest e Testing Library |
| Docker | 4 menções |
| AWS | 8 menções |
| Git | 7 menções |
| Java | 18 menções (stack alternativa relevante no mercado) |

Vaga júnior/pleno analisada (Innvo Labs, via techjobs.space) pede: React.js, TypeScript, HTML/CSS, Node.js e/ou .NET, APIs REST, SQL/NoSQL, testes automatizados (Jest, Testing Library), Git.

### 2.3 O que recrutores avaliam em portfólio

Síntese de quatro guias de 2026 (Hyperskill, DevVagas, Prupru, GetCraftly):

- **Poucos projetos completos valem mais que muitos pela metade.** "3 projetos excepcionais valem mais que 20 medíocres."
- **Precisa rodar de um clone limpo**: dependências, variáveis de ambiente documentadas, funcionalidade principal robusta.
- **Deploy é filtro**: "se o recrutador não pode clicar e ver funcionando, ele segue para o próximo".
- **README é a landing page do projeto**: demo, screenshots, stack, como rodar, testes e decisões técnicas.
- **Capacidade de explicar por 30 minutos**: problema, arquitetura, trade-offs, desafios e o que faria diferente.
- **O próprio portfólio é amostra de código**: performance e acessibilidade contam.
- **Recrutador e pessoa técnica olham coisas diferentes**: RH valida stack aderente, projetos publicados e comunicação; pessoa técnica olha README, estrutura, commits, testes e nomes.

---

## 3. Portfólio × mercado

| Requisito de mercado | Evidência no portfólio | Avaliação |
|---|---|---|
| React, Next.js, TypeScript | Cases 02–06, stack detalhada | Forte |
| Node.js, Express, APIs REST | Cases 01, 02, 05, 06 | Forte |
| PostgreSQL, Prisma, modelagem | Case 01, 02, 04, 06 | Forte |
| Testes automatizados | Apenas "Vitest" na stack do PortCont e chip "Testes" em Conhecimento | **Fraco** |
| Docker | Chip em Conhecimento; ambiente do AgendaFlow | **Fraco** |
| CI/CD | Afirmado no "Sobre", mas o workflow real só valida estrutura e está vermelho | **Crítico** |
| Deploy / demo clicável | RoutePilot e PortCont no ar, mas com acesso restrito; nenhum demo aberto | **Fraco** |
| Git e histórico | Commits do portfólio são bons; repositórios principais são privados | Médio |
| Inglês | Não informado | **Ausente** |
| Comunicação | Cases bem escritos + vídeo narrado | Forte |
| Prova social | Nenhum depoimento | Ausente |

---

## 4. Achados por severidade

### P0 — bloqueiam a candidatura

**P0-1. O site de referência não está público.**
`GET https://brendontailor.vercel.app/cases/agenda-flow` retorna HTTP 200 com a página "Login – Vercel". O mesmo acontece em `portfolio-site-monky2.vercel.app`. `src/data/site.ts:11` aponta para esse domínio, usado em canonical, sitemap, Open Graph e no texto do vídeo no YouTube. Se a proteção de deployment estiver ativa em produção, recrutador não vê o portfólio.
*Ação*: conferir no painel da Vercel (Settings → Deployment Protection) e definir o domínio público real; atualizar `site.url` e o link na descrição do vídeo.

**P0-2. Não existe LinkedIn nem currículo.**
Nenhuma menção a LinkedIn no código. O contato oferece e-mail, telefone e GitHub (`contact-section.tsx:31-49`; `site-footer.tsx`). O artigo de referência é explícito: RH valida LinkedIn, GitHub e comunicação antes do currículo.
*Ação*: adicionar LinkedIn e "Baixar currículo (PDF)" no header, contato e rodapé; criar `/cv` com versão web + PDF.

**P0-3. O GitHub manda sinal negativo.**
- O último commit (`555905e`) tem CI vermelho (run 43909887499): o workflow chama `scripts/validar-estrutura.js`, mas o arquivo é `validar-estrutura.cjs`.
- Mesmo corrigindo o nome, a validação falha por arquivos da "Bíblia" ausentes na raiz (`INDEX.md`, `SKILLS-CATALOG.md`, `ORCHESTRATOR.md` etc.), então o check continua vermelho.
- O repositório `portfolio-site` é detectado como **HTML** (por causa de `exemplos/`), não TypeScript.
- O perfil não tem site (`blog` vazio) e tem 12 repositórios públicos, vários forks ou acadêmicos; os projetos que sustentam os cases são privados.
*Ação*: corrigir workflow para `.cjs` e validar só o que existe; adicionar `.gitattributes` com `exemplos/** linguist-vendored`; preencher o site no perfil; fixar 4 repositórios (portfolio-site, dropzone, rotas-predio-grafos + 1 estudo) e arquivar/limpar duplicados (`portfolio` × `portfolio-site`).

**P0-4. Hero desatualizado (corrigido nesta sessão).**
`hero.tsx` dizia "Cinco cases" e "Ver os 5 cases" com 6 publicados. Corrigido para 6 e incluída a automação na lista.

### P1 — reduzem conversão

**P1-1. Cases sem prova clicável.**
Sah Açaí (privado), Monky (privado/em evolução), RoutePilot (login), PortCont (login), Dropzone (link para um fork, não para uma demo). Só o AgendaFlow tem vídeo. Pelo critério do mercado, 4 dos 6 cases não podem ser verificados.
*Ação*: escolher 2 cases-âncora e publicar demo sanitizada (dados fictícios) ou vídeo curto + trecho de código comentado; corrigir o link do Dropzone para o repositório original/colaborativo.

**P1-2. Resultados descrevem funcionalidades, não impacto.**
Ex.: "Dashboard financeiro", "PWA instalável". Falta "o que mudou na operação": tempo de pedido, erro de conciliação, horas economizadas, número de pedidos. RoutePilot tem os melhores números (5 cidades, 11 regiões, 122.919 endereços).
*Ação*: em cada case, uma linha "Antes → Depois" com número verificável ou, quando não houver, o escopo exato (tempo, equipe, meu papel).

**P1-3. Autoria difusa nos projetos colaborativos.**
Dropzone diz "atuei no frontend... também contribuí", sem delimitar o que é seu. Recrutador técnico pergunta exatamente isso.
*Ação*: bloco "Meu papel" com 3–5 entregas objetivas por case; em colaboração, o que foi feito por você e o que foi do parceiro.

**P1-4. Afirmação de CI/CD não sustentada.**
`about-section.tsx:88-92` afirma GitHub Actions com lint, type-check, testes, build, deploy preview e semantic-release. O workflow do repositório roda apenas estrutura/links/segredos e está falhando.
*Ação*: ou implementar o pipeline de verdade (lint + build + check:content) e deixar verde, ou ajustar o texto para o que existe.

**P1-5. Testes quase invisíveis.**
O mercado júnior pede "conhecimento básico em testes automatizados". Hoje só aparece "Vitest" numa stack e um chip. Não há case contando estratégia de teste.
*Ação*: adicionar em 2 cases o que é testado e por quê (ex.: regra de preço, comparação fuzzy, timeout de webhook); publicar um repositório de estudo com testes (Vitest + Testing Library) e citar no Laboratório.

**P1-6. Inglês e modelo de contratação ausentes.**
Nenhum nível de inglês, nenhuma indicação de CLT/PJ/remoto. Vagas remotas filtram por isso.
*Ação*: linha no hero/contato: "Inglês técnico — leitura e escrita" (ajustar ao real) e "Aberto a CLT ou PJ, remoto".

**P1-7. SEO e datas.**
`sitemap.ts:6` usa `lastModified` fixo em 2026-10-24; canonical depende de `site.url`, que está errado. Falta `alumniOf`/`knowsLanguage` no JSON-LD.
*Ação*: usar data real, corrigir domínio e enriquecer o schema.

**P1-8. Legibilidade da microtipografia.**
Metadados em 8px caixa alta e cinza (`globals.css`, vários blocos) são estéticos, mas ruins em tela pequena e para baixa visão.
*Ação*: piso de 10–11px para metadados e revisar contraste do texto secundário.

### P2 — evolução

- **P2-1.** Versão em inglês do site ou, no mínimo, do currículo.
- **P2-2.** Notas técnicas (2–3 artigos: multi-tenant, webhook idempotente, fuzzy matching) — comunicação é diferencial em júnior.
- **P2-3.** Depoimento do cliente Sah Açaí e do parceiro Leonardo (com autorização).
- **P2-4.** Analytics leve (Plausible/Umami) para saber se recrutador chega aos cases.
- **P2-5.** Página "Como eu trabalho" (descoberta → entrega → operação) para compensar pouca experiência formal.

---

## 5. Backlog priorizado

| # | Ação | Impacto | Esforço | Depende de |
|---|---|---|---|---|
| 1 | Desbloquear domínio público e corrigir `site.url` | Alto | Baixo | acesso à Vercel |
| 2 | LinkedIn + currículo PDF no site | Alto | Baixo | texto do CV |
| 3 | CI verde + `.gitattributes` + site no perfil GitHub | Alto | Baixo | — |
| 4 | Corrigir link do Dropzone e adicionar "Meu papel" nos 6 cases | Alto | Médio | informação sua |
| 5 | Demo pública ou vídeo em 2 cases-âncora | Alto | Médio/Alto | sanitização de dados |
| 6 | Métricas antes/depois nos cases | Alto | Médio | dados reais |
| 7 | Seção de testes (2 cases + repo de estudo) | Médio | Médio | — |
| 8 | Inglês e modelo de contratação no hero/contato | Médio | Baixo | — |
| 9 | Pipeline real (lint + build + check:content) | Médio | Baixo | — |
| 10 | Ajustar SEO/datas/schema | Médio | Baixo | domínio |
| 11 | Microtipografia e contraste | Médio | Baixo | — |
| 12 | Versão EN, notas técnicas, depoimentos | Médio | Alto | — |

---

## 6. Plano de 30 dias sugerido

**Semana 1 — desbloqueio**
Domínio público, LinkedIn, CV em PDF, CI verde, `.gitattributes`, site no perfil do GitHub, link do Dropzone, inglês/modelo de contratação.

**Semana 2 — prova**
"Meu papel" nos 6 cases; métricas antes/depois onde houver; vídeo curto ou demo sanitizada para Sah Açaí e PortCont.

**Semanas 3–4 — autoridade**
Seção de testes com 2 cases e 1 repositório de estudo; 2 notas técnicas; ajustes de SEO, acessibilidade e analytics.

**Critérios de aceitação**
- `https://<domínio>/cases/agenda-flow` abre sem login, com player funcionando.
- LinkedIn e PDF acessíveis em até 2 cliques da home.
- GitHub: último commit com check verde; `portfolio-site` detectado como TypeScript.
- Cada case responde: problema, meu papel, decisão difícil, resultado e o que faria diferente.
- Pelo menos 2 cases com demonstração verificável.

---

## 7. Fontes

- Hyperskill — *Building a Developer Portfolio in 2026* (hyperskill.org)
- GetCraftly — *How to Build a Developer Portfolio That Gets You Hired in 2026* (getcraftly.dev)
- DevVagas — *Portfólio de Dev que Contrata: Guia Definitivo 2026* e *Guia de Salários Dev 2026* (devvagas.com.br)
- Prupru — *Portfólio de Desenvolvedor Júnior* (prupru.org)
- deveprogramar — *Mercado Dev Júnior 2026* (substack, mar/2026)
- Programathor — listagem de vagas (16/11/2026)
- TechJobs — vaga Full Stack React/Node júnior-pleno (Innvo Labs)
- Verificações diretas: `npm run build`, `npm run check:content`, `gh run view 43909887499`, `GET` nos domínios Vercel, API do GitHub
