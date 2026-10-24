# Captura — Monky Tech

## Objetivo

Mostrar uma área operacional (preferencialmente PDV, estoque ou dashboard) sem expor contas, usuários ou informações comerciais reais.

## Passos

1. No clone local de `Brendontailor/monky-tech`, ler README, `.env.example`, scripts e seed. Verificar se os passos de instalação e migrações suportam uma base descartável.
2. Verificar se o deploy publicado tem rota de produto aberta sem login. Se cair em autenticação, não capturar a tela nem tentar contornar a proteção.
3. Executar localmente com PostgreSQL descartável e seed exclusivamente fictício; não usar valores Neon/Render existentes nem credenciais locais desconhecidas.
4. Se houver autenticação, usar somente usuário/senha de demonstração documentados para o ambiente local. Capturar PDV/estoque/dashboard com dados demonstrativos e sem executar venda ou integração externa real.
5. Revisar imagem, registrar candidatas para a integração e deixar o repositório do produto sem alterações.

## Verificação

- Sem clientes, vendas, e-mails, chaves ou dados financeiros reais.
- A captura é uma tela operacional, não login/configuração.
- Dados isolados e descartáveis; se isso não puder ser provado, parar.

## Resultado da execução — 2026-10-24

- O README documenta PostgreSQL local obrigatório; o seed inclui dados fictícios World Capas, mas também cria usuários de teste com senha/PINs conhecidos e exige uma base recém-criada.
- Não há Docker, `psql` ou `postgres` disponível para provisionar um banco descartável. O ambiente não contém credenciais/URL local que permita provar isolamento.
- `https://orakyn-sistemas.onrender.com` é descrito no projeto como backend/serviço para o wrapper móvel, não uma vitrine web pública. Não há URL pública do frontend documentada; portanto, não é uma tela de produto elegível para captura ao vivo.
- **Bloqueado com segurança:** não instalar/provisionar banco, não iniciar API, não usar o host Render ou quaisquer dados/credenciais existentes. Nenhuma tela foi capturada, nenhuma dependência instalada e o clone permaneceu sem alterações.
- Para retomar, é necessário PostgreSQL descartável isolado e confirmação do frontend/ambiente público autorizado.
- Retomada em 2026-10-24: a busca por demos públicas não encontrou uma URL verificável da vitrine. Embora o seed contenha vendas/estoque fictícios World Capas, ele só é seguro em base recém-criada. Avaliei PGlite via socket como alternativa, mas a documentação oficial avisa que o multiplex de conexões não é um PostgreSQL convencional e que nem todos os usos são garantidos; não o usei como substituto de uma base descartável compatível com Prisma.
