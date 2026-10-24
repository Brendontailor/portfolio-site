# Brendon Tailor — Portfólio

Portfólio de Brendon Tailor, desenvolvedor full-stack e co-fundador da Monky Soluções. O site reúne cases de produtos reais, as camadas técnicas por trás deles e um laboratório de estudos e experimentos.

## O que está aqui

- **5 cases** — Sah Açaí & Cia, Monky Food, RoutePilot, PortCont e Dropzone.
- **9 camadas de conhecimento** — fundamentos, algoritmos, regras de negócio, Clean Code, arquitetura, banco de dados, APIs, infraestrutura/segurança e IA aplicada.
- **4 itens de laboratório** — AED2 Labirinto, Singleton, Quicksort e Emberblade.
- **Páginas de case** com contexto, problema, solução, decisões técnicas, stack, galeria e próximo case.
- **Conteúdo data-driven** em `src/data`, sem banco de dados ou CMS.

## Stack

- Next.js 16 (App Router, Cache Components, Partial Prefetching)
- React 19
- TypeScript
- Tailwind CSS 4
- `next/image` com imagens locais em WebP
- Metadados, Open Graph, sitemap e JSON-LD

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Para validar a versão de produção:

```bash
npm run lint
npm run build
npm run start
```

## Estrutura

```text
src/
  app/
    cases/[slug]/     páginas dinâmicas dos cases
    globals.css       design system, layout e responsividade
    layout.tsx        metadata, fontes, header e footer
    page.tsx          home
  components/
    home/             seções da home
    case-card.tsx     card de case
    code-block.tsx    janela de código do laboratório
    reveal.tsx        revelação no scroll
  data/
    cases.ts          conteúdo dos 5 cases
    knowledge.ts      as 9 camadas
    lab.ts            os 4 itens do laboratório
    site.ts           marca, contato, navegação e estatísticas
public/
  images/             capturas e fotos reais
  og-image.png        Open Graph 1200×630
```

## Conteúdo e privacidade

As imagens incluem capturas reais das interfaces, fotos dos produtos e diagramas dos fluxos. Nenhum código proprietário, credencial, banco de dados ou dado sensível de cliente é publicado neste repositório. Cases de sistemas privados apresentam apenas contexto, decisões e resultados.

O case Dropzone é apresentado com crédito a Leonardo Rosler e sem exposição de dados da marca.

## Deploy

O projeto foi preparado para a Vercel. O domínio de referência em `src/data/site.ts` é `https://brendontailor.vercel.app`.

Defina `NEXT_PUBLIC_SITE_URL` no ambiente de produção para que `metadataBase`, Open Graph e sitemap usem a URL final.

## Contato

- E-mail: brendontailor040@gmail.com
- GitHub: https://github.com/Brendontailor
- Monky Soluções
