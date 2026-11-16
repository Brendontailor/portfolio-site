# Próximo Passo - portfolio-site

**Última atualização**: 2026-11-16

---

## Ação Imediata

1. Revisar o diff do case AgendaFlow e do suporte a vídeo.
2. Fazer commit atômico (`feat:` para o case + vídeo; `chore:` para excludes de build).
3. Pedir autorização explícita antes de `git push` (nada foi enviado ao remoto).
4. Após o deploy, conferir `https://brendontailor.vercel.app/cases/agenda-flow` com o player carregando.

## Pendências opcionais

- Publicar a versão vertical 9:16 (`AGENDA-EMAIL-N8N-vertical-9x16.mp4`) como Short e ligar ao case via `verticalYoutubeId` (campo já existe no tipo).
- Revisar o conteúdo dos cases 01–05 no mesmo nível de detalhe do AgendaFlow.
- O workflow de CI (`.github/workflows/validar.yml`) roda apenas estrutura/links/segredos; não roda build nem lint.
