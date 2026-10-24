# Captura — Sah Açaí

## Objetivo

Substituir a imagem de acesso administrativo da galeria por telas de produto em uso, priorizando a montagem de pedido e, se houver ambiente demo seguro, o painel operacional.

## Passos

1. No clone local de `Brendontailor/sah-acai-whatsapp`, ler README, scripts, `.env.example`, seed e configuração de banco. Determinar se a vitrine funciona sem backend ou se há banco descartável demonstrável.
2. Confirmar se existe URL publicada de vitrine aberta sem login; capturar apenas navegação pública de produto. Não abrir painel protegido nem fazer pedidos reais.
3. Executar localmente com dados sintéticos e configuração isolada. Não reutilizar arquivo `.env`, banco ou credenciais do sistema em operação.
4. Capturar a montagem do copo/catálogo com valores claramente demonstrativos e sem endereço/telefone de cliente. Capturar painel financeiro apenas com seed inteiramente fictício; se não houver forma segura, omitir.
5. Rever capturas e registrar imagens aprovadas para a integração mestre. Não editar o repositório do produto.

## Verificação

- Sem login, dados reais, PII, credenciais, ou pedido enviado a WhatsApp/serviço externo.
- Captura mostra a montagem do pedido ou operação realista, sem reivindicar recursos ausentes.
- Confirmar que a captura publicada (se elegível) é diferente e relevante em relação à local.

## Resultado da execução — 2026-10-24

- O README exige PostgreSQL e variáveis reais para executar. Não há `backend/.env.example` no clone nem banco demo documentado; o seed é feito para atualizar o catálogo de loja, não cria dados de pedido fictícios.
- A vitrine carrega catálogo e regras da API (`/api/*`), sem fallback estático de demonstração. A configuração Vite encaminharia essas chamadas para `localhost:3333`; sem backend/banco, a captura seria uma tela vazia ou de erro.
- Não foi encontrado endereço de deploy público no README/configuração do projeto que pudesse ser verificado como vitrine sem login.
- **Bloqueado com segurança:** não instalar dependências, iniciar backend, criar `.env`, provisionar banco, nem usar credenciais/banco real. Nenhuma tela foi capturada e o clone permaneceu sem alterações.
- Para retomar, é necessário fornecer um ambiente PostgreSQL descartável claramente separado da produção e um modo/seed autorizado para catálogo demonstrativo, ou uma URL pública da vitrine.
