# Captura — Dropzone

## Objetivo

Capturar vitrine e catálogo reais do produto em execução, evitando tela de login e conteúdo de clientes.

## Passos

1. No clone local de `Brendontailor/dropzone`, ler README, scripts, `.env.example` e seeds para separar frontend público das dependências privadas.
2. Verificar as URLs de produção explicitamente documentadas pelo projeto. Capturar apenas vitrine/catalogo acessível anonimamente; não entrar na área administrativa nem usar contas de cliente.
3. Iniciar o frontend local conforme README. Se ele chamar API, usar mock/seed oficial local; não apontar variáveis de ambiente a serviços publicados nem disparar pedidos, mensagens ou integrações externas.
4. Capturar home de campanha e uma tela de catálogo/detalhe se visualmente distintas. Usar conteúdo de catálogo que o projeto autorize publicar; não incluir informações de clientes.
5. Rever, selecionar imagens diferentes das fotos editoriais já usadas se adicionarem contexto de produto, e registrar para integração. Não alterar o repositório Dropzone.

## Verificação

- Mostra interface funcional da loja, não formulário de acesso.
- Sem dados de conta, endereço, pedido ou comunicação externa.
- Confirmar autorização para uso público de conteúdo do projeto colaborativo; se incerto, manter imagens fora do portfólio até confirmar.

## Resultado da execução — 2026-10-24

- O workspace local `C:\Users\Treinamento\dropzone` tem alterações não relacionadas às capturas; foi preservado. A inspeção ocorreu em um clone limpo separado, `dropzone-capture`.
- O clone não documenta uma URL de loja publicada nem `.env.example`. O frontend depende de API em `localhost:3333`; o backend exige `DATABASE_URL` e, ao iniciar, executa importações/upserts do catálogo e vínculos de looks.
- Não há PostgreSQL/Docker local disponível. Sem banco descartável e confirmação de que as imagens/catálogo colaborativos podem ser republicados, não há forma segura de iniciar e capturar.
- **Bloqueado com segurança:** não instalar dependências, não iniciar backend/frontend e não usar o CSV/catálogo de produtos. Nenhuma captura foi feita e o clone limpo permaneceu sem alterações.
- Para retomar, é necessário banco descartável com dados autorizados e/ou uma URL pública de vitrine, além de confirmação do colaborador sobre a republicação dos assets usados.
