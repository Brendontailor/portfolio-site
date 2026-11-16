# Histórico de Execução - portfolio-site

**Formato**: Data/Hora | Ação | Resultado

---

### 2026-10-28 12:40:37 - Inicialização AGENT-BIBLE
- **Ação**: Bootstrap automático via `npx github:Brendontailor/AGENT_BIBLE`
- **Resultado**: Estrutura criada, skills carregadas
- **Próximo**: Entrevista para definir objetivo

### 2026-10-28 09:45:41 - AGENT-BIBLE aplicado ao portfolio-site
- **Ação**: Aplicação completa da AGENT-BIBLE ao projeto Next.js
- **Comandos**: Copy-Item docs/checklists/templates/skills/scripts/LICENSE/.github
- **Resultado**: Estrutura 62/62 validada, links 0 quebrados, 7 skills locais instaladas
- **Arquivos**: AGENTS.md (substituído), docs/, checklists/, templates/, .opencode/skills/, scripts/, .github/workflows/, LICENSE
- **Próximo**: Desenvolvimento contínuo com skills da AGENT-BIBLE

### 2026-11-16 - Case AgendaFlow com player de vídeo
- **Ação**: Adicionar case 06 (AgendaFlow) e suporte a vídeo nos cases
- **Arquivos**:
  - `src/data/cases.ts` — tipo `CaseVideo`, campo `video?` e case `agenda-flow`
  - `src/app/cases/[slug]/page.tsx` — seção `#case-video` (iframe `youtube-nocookie`) e link "Assistir à demonstração"
  - `src/app/globals.css` — estilos `.case-video-*`
  - `src/components/home/cases-section.tsx` — texto atualizado (automação, vídeos)
  - `public/images/case-agenda-flow.webp`, `agenda-flow-{agendamento,emails,admin,lembretes}.webp`, `public/og/agenda-flow.jpg`
- **Imagens**: extraídas do vídeo final com ffmpeg do `imageio_ffmpeg` (ffmpeg não está no PATH); recorte da barra do navegador e conversão para WebP
- **Vídeo**: publicado no YouTube público como "AgendaFlow — agendamentos com automações no n8n" (https://youtu.be/hlUS2N0JeX4), miniatura enviada, não é conteúdo para crianças, tags definidas
- **Validação**:
  - `npm run check:content` — OK (6 cases)
  - `npx eslint src` — limpo
  - `npm run lint` — limpo
  - `npm run build` — sucesso (15 páginas, 6 rotas de case)
  - Conferência visual no dev server em desktop (1536px) e mobile (390px)
- **Configuração**: `tsconfig.json` e `eslint.config.mjs` passaram a excluir `exemplos/**`; eslint também ignora `scripts/**` — o build e o lint do repositório falhavam nesses diretórios antes da mudança
- **Correção**: `exemplos/arquitetura-modular/frontend/src/pages/Usuarios/Lista.tsx` linha 244, `});` → `};` (erro de sintaxe TS1005)
- **Pendências**: commit local feito, push não autorizado; versão vertical 9:16 ainda não publicada

### 2026-11-16 (tarde) - Revisão dos cases, Monky Food removido e demo pública do RoutePilot
- **Ação**: revisar o encaixe dos blocos de cases, remover o case Monky Food e corrigir o status do RoutePilot
- **Diagnóstico (Playwright, geometria, sem screenshots)**: a grade de 12 colunas deixava duas linhas com 6 colunas vazias — um card `wide` (12 colunas) caía depois de um card comum (6 colunas)
- **Correção**:
  - `src/data/cases.ts`: `wide` saiu do Dropzone e do AgendaFlow; case Monky Food removido; indexes renumerados (RoutePilot 02, PortCont 03, Dropzone 04, AgendaFlow 05); status do RoutePilot → "No ar · demonstração pública" com nota de que a demo abre sem login
  - `src/components/home/hero.tsx`: contagem dinâmica de cases, CTA "Ver os 5 cases", frame do hero com `routpilotes.vercel.app` / "CASE 02"
  - `src/data/site.ts`: stats "02 produtos próprios" + `contract` ("Aberto a CLT ou PJ") e `english` ("Inglês técnico — leitura")
  - `src/components/home/contact-section.tsx`: contrato e inglês no rodapé do contato
  - `src/app/cv/page.tsx`: sem Monky, "Cinco projetos publicados", perfil com inglês/CLT-PJ, seção Idiomas e Disponibilidade ajustadas
  - `src/components/home/about-section.tsx`: texto do CI/CD corrigido para o workflow real
  - `src/app/page.tsx`: JSON-LD com `knowsLanguage` e `alumniOf`
  - `src/reference/rate-limit.ts` e `src/reference/api/clientes/route.ts`: código de referência real (novos)
  - `src/data/lab.ts`: itens "Público" do laboratório apontam para os arquivos acima, com snippet idêntico ao arquivo
  - `scripts/check-content.mjs`: valida que a grade fecha sem buraco e que links do laboratório para o repositório existem
  - `public/cv/brendon-tailor-cv.pdf`: regenerado (A4, 2 páginas, ~190 KB)
  - `README.md` e `docs/AUDITORIA-PORTFOLIO-2026.md`: cases e notas atualizados
- **Validação**:
  - `npm run check:content` - OK (5 cases, 9 camadas, 4 itens de laboratório)
  - `npm run lint` - sem erros
  - `npm run build` - sucesso (15 páginas, 5 rotas de case)
  - Playwright 1440 px: 3 linhas, 0 coluna vazia, cards com a mesma altura por linha; 390 px: coluna única sem overflow; `/cases/monky-food` retorna 404; `/cases/routepilot` e `/cv` conferidos por texto
- **Pendências**: push não autorizado (teste local pedido); PDF do currículo precisa ser regerado em qualquer nova mudança na página `/cv`

### 2026-11-16 (noite) - Currículo alinhado ao documento oficial e push autorizado
- **Ação**: ajustar a página `/cv` ao currículo oficial de 1 página enviado pelo autor e publicar tudo no GitHub
- **PDF do autor** (`Downloads/Curriculo - Brendon Tailor.pdf`): texto extraído com pypdf (o modelo não lê PDF diretamente). Conteúdo: suporte técnico N1/N2 em telecomunicações, RGSUL Internet 06/2026–Atual, Exército 03/2019–02/2026, ADS no Senac (4º semestre), curso de Fibra Óptica do Zero (Fiberschool), competências de operação/rede/full stack/informática; links para LinkedIn e `portfolio-site-brendont.vercel.app`
- **Mudanças**:
  - `src/app/cv/page.tsx`: cabeçalho com nome completo e cargo "Suporte Técnico N1/N2 · Desenvolvimento Full Stack"; perfil no formato do PDF; 5 grupos de competência (Operação e Suporte, Redes e Telecom, Full Stack, Infra e automação, Informática); experiência e formação viraram dados (`jobs`, `courses`); Idiomas e Disponibilidade com CNH AB
  - `src/app/globals.css`: espaçamento entre `.cv-job` (`.cv-job + .cv-job`)
  - `public/cv/brendon-tailor-cv.pdf`: substituído pelo PDF oficial do autor (1 página, 79 KB)
- **Validação**: `npm run check:content` OK; `npm run lint` sem erros; `npm run build` OK (15 páginas); `/cv` conferida por texto no navegador (sem overflow)
- **Push**: autorizado pelo autor ("termine e faça o push") — `555905e..cac775f` enviado para `origin/main`
- **CI corrigido**: a primeira execução do workflow "Validar" falhou em `check:content` porque o runner usava Node 20 (sem type stripping para importar `src/data/cases.ts`). Workflow atualizado para `node-version: '24'`.
- **Resultado final**: run `43945376449` verde (conteúdo, lint, build, segredos). Deploy conferido em `https://portfolio-site-brendont.vercel.app`: 5 cases sem Monky Food, `/cv` com RGSUL Internet/Fiberschool/nome completo/inglês/CLT-PJ, PDF oficial de 1 página (79.721 bytes) e `/cases/routepilot` com a demo pública.
