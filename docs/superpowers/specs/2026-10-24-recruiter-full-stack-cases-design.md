# Cases full-stack voltados a recrutadores

## Intenção
Apresentar Brendon Tailor para vagas de desenvolvimento full-stack com evidências verificáveis do trabalho: sites públicos, responsabilidades, módulos em alto nível, tecnologias e decisões. O portfólio deve mostrar capacidade técnica sem revelar propriedade intelectual ou dados privados de clientes.

## Abordagens
- **Home com foco em recrutamento + cases completos (escolhida):** a home destaca o perfil full-stack e cada projeto oferece acesso ao case; quando houver URL pública aprovada, também oferece acesso ao site. Os detalhes explicam estrutura e decisões. Mais contexto para avaliar competência, sem concentrar tudo na home.
- **Links apenas dentro dos cases:** alteração mínima e home mais limpa, mas o site publicado fica menos visível.
- **Diretório separado de sites no ar:** facilita abrir demonstrações, porém separa cada entrega de seu contexto técnico e papel no projeto.

## Objetivos
- Reforçar claramente o posicionamento full-stack já presente no portfólio.
- Facilitar o caminho do recrutador: visão geral → case → demonstração pública, quando disponível.
- Nos cases, explicar contribuição pessoal, responsabilidades dos módulos, tecnologias agrupadas e decisões/resultados relevantes.
- Manter dados de cada case explícitos e revisáveis; não inferir arquitetura nem declarar resultado sem evidência.

## Escopo proposto
- Atualizar os cards da home para preservar um link acessível ao case e, onde existir link `live` público e aprovado, acrescentar uma ação externa separada. O card atual é um único `<Link>`; não criar links externos aninhados.
- Estender os dados dos cases com uma descrição de arquitetura/módulos em alto nível, usando nomes e responsabilidades apropriados a cada projeto. Apresentar essa informação na página de detalhe junto à stack e às decisões técnicas existentes.
- Reaproveitar os campos atuais de resultados, galeria e links sempre que verdadeiros e suficientes; evitar duplicar conteúdo.
- Incluir demonstrações apenas para URLs públicas e deliberadamente autorizadas. Repositório e site ao vivo são ações diferentes e devem continuar identificados como tais.

## Limites de divulgação
- Não publicar código-fonte privado, credenciais, segredos, dados pessoais, pedidos/transações reais ou telas com dados de clientes.
- Não expor URLs administrativas ou internas, rotas de API não públicas, IPs, topologia de infraestrutura, esquema detalhado do banco ou regras que facilitem abuso.
- Diagramas de módulos descrevem responsabilidades e fluxo conceitual, não infraestrutura ou implementação confidencial. Capturas devem usar dados públicos, sintéticos ou adequadamente redigidos.
- Só marcar como “Acessar projeto” quando a URL pública for confirmada e apropriada para recrutadores; manter indicação de privado/acesso restrito nos demais casos.

## Restrições e fora de escopo
- Preservar stack, identidade visual existente e conteúdo já confirmado; nenhuma nova dependência.
- Não inventar arquitetura, URLs públicas, métricas, resultados ou permissões de acesso.
- Não publicar/deployar; o push pendente para `main` será tratado após validação do trabalho autorizado.
