# Logo e favicon — símbolo de construção

## Intenção
Dar à identidade de Brendon Tailor um símbolo mais próprio e legível em tamanhos pequenos, mantendo a paleta atual do portfólio (fundo escuro, verde-limão e texto claro).

## Abordagens consideradas
- **Monograma BT geométrico:** preserva as iniciais e as torna mais distintas; não foi escolhido.
- **Símbolo de construção (escolhido):** prompt de terminal simplificado em verde-limão, com chevron e cursor escuros. Comunica programação e continua legível como favicon.
- **Wordmark tipográfico:** enfatiza o nome, mas é menos reconhecível em 16–32 px; não foi escolhido.

## Escopo
- Substituir o “BT” do logo no cabeçalho (incluindo o menu móvel) e rodapé pelo símbolo escolhido.
- Atualizar `src/app/icon.svg` com a mesma forma vetorial, otimizada para o favicon.
- Manter nome, textos, dimensões gerais do logo, paleta, navegação e demais conteúdos.
- Preservar “BT” na ilustração da seção Sobre: ali funciona como monograma editorial, não como logo de navegação.

## Restrições e critérios
- SVG vetorial, sem dependências ou texto rasterizado; contraste alto e forma reconhecível em 16 px.
- Usar os tokens/cores existentes: `#C8FF4D` e `#08090A`.
- Não alterar manifesto, cases ou metadados além do favicon necessário.
- Validar lint, build e renderização no navegador, incluindo o favicon e as versões desktop/móvel do cabeçalho.

## Fora de escopo
Redesenho completo da marca, tipografia do nome, OG image, deploy e push. O push para `main` continua pendente conforme pedido anterior, depois da implementação e revisão.
