# Captura — RoutePilot

## Objetivo

Capturar uma tela representativa do mapa/planejamento no RoutePilot local e avaliar se uma captura pública acrescenta algo à imagem já disponível.

## Passos

1. No clone local de `Brendontailor/Routpilotes`, ler README, `.env.example`, scripts de inicialização e configuração de dados antes de executar. Não copiar segredos do ambiente.
2. Identificar se a tela pública permite um fluxo de demonstração sem autenticação. Não fazer login nem acionar operações que gravem dados.
3. Iniciar localmente somente se o frontend/API puderem usar dados estáticos ou banco descartável e seed fictício. Se a configuração apontar para serviços de produção, parar e registrar o bloqueio.
4. Abrir o produto local, navegar até o mapa operacional com regiões/dados sintéticos e confirmar que não há dados de pessoas ou coordenadas precisas de clientes. Capturar em viewport desktop 1920×1080, sem browser chrome/DevTools.
5. Revisar a captura e compará-la com `routepilot-live-map.png` no workspace. A captura pública existente pode ser integrada somente após revisão visual de dados e qualidade; não duplicar imagens se não houver diferença significativa.
6. Registrar nomes dos arquivos aprovados e estado da captura para a integração mestre. Não alterar o repositório RoutePilot.

## Verificação

- A imagem mostra o mapa/produto em uso, nunca login.
- Não contém nomes, endereços ou coordenadas exatas associadas a clientes.
- O ambiente local não consultou banco ou serviço de produção.

## Resultado da execução — 2026-10-24

- A porta `4173` já estava ocupada por um preview Vite que pertence ao workspace `Documents\Routpilotes`; não encerrei nem alterei esse processo. A primeira inspeção do navegador foi nesse preview preexistente e não será tratada como captura verificada do clone.
- Para isolar a execução, servir apenas `public/legado/` do clone `routepilot-capture` em `http://127.0.0.1:4174/`, sem instalar pacotes e sem iniciar backend, Prisma, OAuth ou banco.
- Capturas do clone: `routepilot-local-overview.png` e `routepilot-local-map.png`, fora do repositório do portfólio. Ambas mostram interface interna, sem login.
- O app usa datasets geográficos reais já versionados e carregou previsão pública da Open-Meteo; não há seed fictício documentado. Nenhuma requisição `/api/*` foi observada. As capturas locais ficam fora da galeria: não representam dados fictícios e repetem telas públicas.
- `routepilot-live-home.png` foi selecionada: tela pública de produto, sem formulário de login e sem marcadores de coordenadas. Copiada para `public/images/case-routepilot-home.png` e aplicada como capa com alt text atualizado.
- Após autorização explícita do usuário de que os endereços/localizações são públicos e podem ser mostrados, `routepilot-live-map.png` foi selecionada para a galeria. Ela mostra localidades e regiões públicas, sem coordenadas numéricas ou dados identificáveis de clientes. Copiada para `public/images/case-routepilot-map.png`, registrada em `src/data/cases.ts` com descrição e proporção 16:9.
- Navegação no clone: 0 erros de console e 20 avisos de validação de dados/indisponibilidade de login; nenhum login foi tentado. O navegador requisitou previsão da Open-Meteo e tiles cartográficos públicos; não foi iniciado acesso ao banco de produção.
- O clone `routepilot-capture` permaneceu sem alterações de código; o servidor local isolado foi encerrado e a porta 4174 ficou livre.
- Ruling atualizado: exibir a captura pública do mapa conforme autorização do usuário; a captura local continua fora da galeria por ser redundante e derivada de dados reais. A home pública segue como capa e o mapa demonstra a função principal do produto.
