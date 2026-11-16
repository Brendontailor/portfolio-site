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
