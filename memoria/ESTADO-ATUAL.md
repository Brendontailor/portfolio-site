# Estado Atual - portfolio-site

**Última atualização**: 2026-11-16
**Versão**: 1.1

---

## Objetivo Atual

Portfólio com 6 cases. O case 06 (AgendaFlow) foi adicionado com player de vídeo do YouTube, galeria extraída do próprio vídeo e conteúdo detalhado de arquitetura, decisões e resultados.

---

## Fase em Andamento

**FASE 3: PUBLICAÇÃO DE CONTEÚDO**

### Concluído nesta etapa

- Suporte a vídeo nos cases (`CaseVideo` em `src/data/cases.ts` + seção `#case-video` na página do case)
- Case `agenda-flow` completo (contexto, problema, solução, módulos, decisões, resultados, stack, galeria)
- Imagens geradas a partir do vídeo final (`public/images/agenda-flow-*.webp`, `case-agenda-flow.webp`, `public/og/agenda-flow.jpg`)
- Home atualizada (`cases-section.tsx`: "automação" e "vídeos")
- Vídeo publicado no YouTube público: https://youtu.be/hlUS2N0JeX4
- `youtubeId: "hlUS2N0JeX4"` ativo no case

### Validações executadas

- `npm run check:content` — OK (6 cases, 9 camadas, 4 itens de laboratório)
- `npx eslint src` e `npm run lint` — sem erros
- `npm run build` — sucesso, 15 páginas geradas
- Página conferida em desktop e mobile no dev server (player, hero e galeria renderizando)

### Ajustes de configuração necessários

- `tsconfig.json` e `eslint.config.mjs` passaram a excluir `exemplos/**` (código de referência com erros pré-existentes de tipos/deps)
- `eslint.config.mjs` também ignora `scripts/**`
- Corrigido erro de sintaxe real em `exemplos/arquitetura-modular/frontend/src/pages/Usuarios/Lista.tsx` (`});` → `};`)
