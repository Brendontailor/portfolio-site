# Captura — Monky Food

## Objetivo

Capturar a vitrine multi-tenant e/ou uma visão de operação que demonstre a plataforma sem expor sessões ou dados de uma loja real.

## Passos

1. No clone local de `Brendontailor/monky-food`, ler README, `.env.example`, scripts, configuração de tenant e seeds. Identificar caminho de demonstração e dependências antes de iniciar.
2. Verificar se existe vitrine publicada acessível anonimamente; registrar a URL e capturar somente páginas de catálogo/produto abertas sem login.
3. Iniciar em ambiente local isolado com tenant e catálogo fictícios. Não usar dados ou banco da Sah Açaí nem produção.
4. Capturar vitrine com marca de demonstração ou painel com conteúdo fictício, se a autenticação demo estiver documentada e segura. Não inventar bypass de sessão.
5. Revisar e registrar imagens candidatas para integração; não alterar o sistema Monky Food.

## Verificação

- Tenant demonstrativo isolado; nenhum dado de cliente/loja real.
- Tela não é login e comunica visualmente o fluxo white-label/multi-tenant.
- Não capturar painel sem conta de demonstração autorizada.

## Resultado da execução — 2026-10-24

- O clone está na branch `feat/fundacao-multi-tenant`. O README exige PostgreSQL, e o `.env.example` contém somente placeholders para configuração real.
- O seed cria a empresa padrão Sah Açaí e seu catálogo comercial; não há tenant/catálogo fictício de demonstração. A vitrine lê `/api/*` e resolve o tenant pelo `Host`, então o frontend isolado não renderiza uma demonstração funcional.
- Não foi encontrado endereço de deploy público documentado no README/configuração do projeto.
- **Bloqueado com segurança:** não preencher `.env`, não provisionar banco, não usar dados Sah Açaí/produção, e não iniciar painel/login. Nenhuma tela foi capturada, nenhuma dependência instalada e o clone permaneceu sem alterações.
- Para retomar, é necessário banco PostgreSQL descartável, seed que crie um tenant/catálogo fictício ou uma URL pública de demonstração autorizada.
