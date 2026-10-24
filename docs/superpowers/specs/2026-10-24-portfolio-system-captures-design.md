# Capturas dos sistemas do portfólio — Design

## Intenção

Dar mais presença aos cases com capturas cuidadas dos sistemas em uso, substituindo capas genéricas ou focadas em login. O portfólio já está na Vercel; este trabalho prepara imagens locais e galerias sem alterar o comportamento dos produtos nem fazer deploy.

## Objetivos

- Cobrir os seis sistemas já listados em `src/data/cases.ts`: Sah Açaí, Monky Food, Monky Tech, RoutePilot, PortCont e Dropzone.
- Executar localmente cada produto que puder ser iniciado com segurança, usando dados fictícios/de demonstração isolados, e capturar telas internas úteis.
- Também capturar os sistemas publicados quando a URL abrir uma tela de produto sem autenticação. Nunca usar tela de login como imagem do portfólio.
- Preferir capturas nítidas em formato paisagem, mostrando um fluxo ou painel representativo em vez de formulários de acesso.
- Adicionar as imagens aprovadas em `public/images` e referenciá-las nas galerias existentes, alimentadas por dados.

## Fora de escopo e práticas a evitar

- Não alterar a interface dos produtos, dados de produção, autenticação, configurações da Vercel ou deploy.
- Não conectar execuções locais aos bancos de produção nem usar registros de clientes, endereços, faturamento, tokens ou credenciais reais nas capturas.
- Não contornar proteções da Vercel nem capturar telas de login. Se uma URL de produção exigir autenticação, pular a captura ao vivo e usar uma instância local segura.
- Não incluir trabalhos acadêmicos, forks ou repositórios arquivados além dos seis cases atuais nesta etapa.
- Não publicar nem enviar alterações ao GitHub/Vercel sem um pedido explícito separado.

## Abordagens consideradas

1. **Usar apenas capturas existentes ou enviadas pelo usuário.** Rápido e de baixo risco, mas não atende ao pedido de capturar sistemas locais e publicados.
2. **Capturar telas reais localmente e nos deploys públicos.** Escolhida: mantém as imagens autênticas e atuais, com produção somente para leitura e dados locais fictícios. Capturar ambas as versões quando possível; evitar duplicatas na galeria pública se não houver diferença relevante.
3. **Usar telas autenticadas e dados de produção.** Rejeitada porque sistemas protegidos e dados de clientes não devem ser expostos em um portfólio público.

## Restrições e descobertas atuais

- O conteúdo dos cases e os metadados das galerias ficam em `src/data/cases.ts`; as imagens ficam em `public/images`.
- A URL pública do RoutePilot, `https://routpilotes.vercel.app/`, abre sem login. A captura do mapa ao vivo está em `routepilot-live-map.png` no workspace e deve ser revisada antes de entrar no repositório.
- A URL pública do PortCont, `https://portcont.vercel.app/`, cai em `/login`; não haverá captura ao vivo dessa página.
- A URL do próprio portfólio redireciona para o login da Vercel nesta sessão. A verificação visual final do deploy pode exigir uma prévia pública; a verificação local continua possível.
- Os READMEs de alguns produtos exigem configuração de banco. Capturas locais devem usar banco descartável e dados fictícios; se isso exigir credenciais reais ou acesso à produção, parar e informar o bloqueio em vez de conectar à produção.
- A imagem de detalhe do RoutePilot enviada pelo usuário contém coordenadas exatas. Não publicá-la sem edição; preferir a captura pública nova ou ocultar os campos sensíveis.

## Decisões de captura e integração

- Executar localmente cada um dos seis cases quando for seguro; capturar também o deploy público apenas quando houver uma tela interna acessível sem login.
- Usar tamanho desktop em paisagem consistente e um estado intencional do produto, sem diálogos, ferramentas de desenvolvimento ou página de login do navegador.
- Manter os originais fora da pasta pública até a revisão. Antes de adicionar qualquer imagem a `public/images`, verificar se há dados pessoais/de clientes ou credenciais.
- Escolher uma boa capa e poucas imagens de detalhe por case; manter versões local/ao vivo adicionais apenas quando contarem uma história diferente.
- Atualizar legendas e textos alternativos em `src/data/cases.ts` para descrever a tela real com precisão. Não atribuir à imagem uma função que ela não mostra.
- Trabalhar localmente em uma branch de funcionalidade. Não enviar alterações, acionar deploy ou mudar configurações da Vercel nesta etapa.

## Decisões que ficam para a execução

- Escolher a melhor tela representativa de cada produto depois de inspecionar a aplicação em execução.
- Usar um estado local de demonstração sanitizado se o sistema publicado exigir login ou contiver dados privados.
- Se um produto não puder ser executado com segurança usando a configuração de demonstração disponível, não alterar seu case e informar o que falta.
