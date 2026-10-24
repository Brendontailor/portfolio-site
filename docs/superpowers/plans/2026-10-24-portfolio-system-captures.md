# Plano mestre — capturas dos sistemas do portfólio

## Objetivo e limites

Executar os seis planos por produto abaixo, capturando telas de uso localmente com dados fictícios e também em produção somente se uma tela interna abrir sem login. Depois, integrar somente imagens revisadas nas galerias já existentes do portfólio. Não alterar os aplicativos, usar bancos/credenciais de produção, contornar autenticação, fazer commit/push ou publicar deploy.

## Sequência

1. RoutePilot (`2026-10-24-capture-routepilot.md`) — primeira captura; comparar o mapa local com a captura pública já feita.
2. Sah Açaí (`2026-10-24-capture-sah-acai.md`).
3. Monky Food (`2026-10-24-capture-monky-food.md`).
4. Monky Tech (`2026-10-24-capture-monky-tech.md`).
5. PortCont (`2026-10-24-capture-portcont.md`).
6. Dropzone (`2026-10-24-capture-dropzone.md`).
7. Integração compartilhada no `portfolio-site`, após aprovação das imagens.

Cada produto é uma unidade independente. Se faltar banco descartável, seed fictício, conta de demonstração ou forma segura de iniciar, registrar o bloqueio e seguir para o próximo; não enfraquecer autenticação nem usar dados reais.

## Integração das galerias

1. Revisar visualmente cada arquivo candidato em busca de dados pessoais, endereços exatos, nomes de clientes, valores reais, credenciais e telas de login. Remover/repetir capturas que não passem.
2. Copiar apenas imagens aprovadas para `public/images`, usando nomes estáveis por case e origem (`<case>-local-<tela>.<ext>`, `<case>-live-<tela>.<ext>`). Não manter variantes redundantes.
3. Atualizar `cover`, `coverAlt`, `gallery` e legendas correspondentes em `src/data/cases.ts`. Cobrir apenas telas realmente capturadas; usar alt text descritivo.
4. Executar `npm run lint` e `npm run build` no portfólio. Iniciar o app localmente, revisar os seis cases e confirmar que cada imagem carrega, não está cortada e não mostra login/dados sensíveis.
5. Conferir `git diff` e `git status`; deixar as mudanças locais na branch existente. Não enviar nem publicar.

## Critérios de conclusão

- Estado documentado por case: capturado, não elegível para publicação ao vivo, bloqueado com motivo, ou não disponível localmente.
- Nenhuma captura de login ou dado real exposta em `public/images`.
- Galerias descrevem somente o que cada captura mostra e carregam na versão local do portfólio.
- Lint e build executados; resultados e bloqueios relatados sem alegar validações não executadas.

## Resultado parcial da execução — 2026-10-24

- **RoutePilot:** a home pública foi aprovada como captura segura e integrada em `public/images/case-routepilot-home.png`; `src/data/cases.ts` agora usa essa capa e alt text preciso. A captura local foi verificada, mas ficou de fora porque usa geodados operacionais reais e repete a tela publicada. O mapa publicado com marcadores também ficou fora.
- **Sah Açaí, Monky Food, Monky Tech, PortCont e Dropzone:** não integrados. Os planos individuais registram por que não foi possível obter, nesta sessão, uma tela segura com banco/tenant demo isolado ou uma página pública sem login. Nenhum sistema foi apontado para banco de produção.
- A pasta local existente `C:\Users\Treinamento\dropzone` contém alterações do usuário e foi preservada; a análise usou um clone limpo separado. Os arquivos `.env` existentes em `C:\Users\Treinamento\portcont` não foram abertos nem usados.
- Verificações do portfólio após a alteração: `npm run lint` e `npm run build` passaram; a página `/cases/routepilot` carregou a imagem com HTTP 200 e 0 erros de console.
- Não houve commit, push ou deploy. O trabalho permanece local na branch `feature/portfolio-screenshot-refresh`.
