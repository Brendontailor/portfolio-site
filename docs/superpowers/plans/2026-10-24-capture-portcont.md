# Captura — PortCont

## Objetivo

Mostrar o fluxo de comparação e revisão usando bases sintéticas. O deploy publicado conhecido abre em `/login`, portanto não haverá captura ao vivo dessa página.

## Passos

1. No clone local de `Brendontailor/portcont`, ler README, `.env.example`, scripts, migrations e testes para entender banco, autenticação, importação e armazenamento de arquivos.
2. Não capturar `https://portcont.vercel.app/login` nem tentar contornar a sessão da Vercel/PortCont.
3. Iniciar localmente apenas com banco descartável e usuário demo documentado. Criar/importar arquivos CSV de exemplo com nomes empresariais fictícios e valores inventados; não usar exportações de clientes.
4. Capturar uma tela de resultados classificados ou revisão de correspondências com dados sintéticos. Não capturar a tela de login, upload contendo dados reais nem relatórios fora do ambiente local.
5. Verificar se arquivos temporários ficam no ambiente descartável e remover somente os gerados para esta execução após confirmar o escopo. Registrar imagem aprovada para integração; não alterar o produto.

## Verificação

- Fixture CSV e linhas demonstrativas inventadas; nenhuma base real utilizada.
- Tela mostra comparação/revisão concluída, sem credenciais, PII ou login.
- Se o app exigir serviço/banco real ou conta não disponível, registrar bloqueio e não prosseguir.

## Resultado da execução — 2026-10-24

- A URL pública conhecida, `https://portcont.vercel.app`, cai em `/login`; não foi capturada nem contornada.
- O workspace local existente `C:\Users\Treinamento\portcont` contém `.env` e `.env.local`. Não abri nem usei esses arquivos, nem iniciei qualquer serviço nesse diretório.
- O README descreve PostgreSQL/Neon obrigatório e autenticação; sem banco descartável/demo autorizado não há como gerar resultados fictícios com segurança. Também não há Docker/PostgreSQL local disponível.
- **Bloqueado com segurança:** sem captura local ou publicada nesta rodada; nenhum login foi tentado, nenhum arquivo temporário de cliente foi criado e o workspace existente permaneceu intacto.
- Para retomar, é necessário ambiente de banco descartável com fixtures inventadas e conta demo local, ou ambiente público de demonstração sem login.
