export type CaseLink = {
  label: string;
  href: string;
  kind?: "live" | "repo";
};

export type CaseImage = {
  src: string;
  alt: string;
  caption: string;
  aspect?: string;
};

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  kicker: string;
  type: string;
  status: string;
  year: string;
  role: string;
  tags: string[];
  summary: string;
  cover: string;
  coverAlt: string;
  featured?: boolean;
  wide?: boolean;
  context: string;
  problem: string;
  solution: string;
  decisions: { title: string; text: string }[];
  results: string[];
  stack: { label: string; items: string[] }[];
  gallery?: CaseImage[];
  links?: CaseLink[];
  statusNote: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "sah-acai",
    index: "01",
    title: "Sah Açaí & Cia",
    kicker: "Pedidos pelo WhatsApp + painel financeiro",
    type: "Cliente real",
    status: "Em operação",
    year: "2026",
    role: "Full-stack",
    tags: ["Food retail", "Pedidos", "Financeiro", "PostgreSQL"],
    summary:
      "Um sistema full-stack para uma loja real: o cliente monta o copo, o servidor valida o pedido e a operação acompanha tudo em um painel financeiro.",
    cover: "/images/case-sah-acai.webp",
    coverAlt:
      "Copo de açaí com a marca Sah Açaí & Cia, com banana, chocolate e complementos",
    featured: true,
    context:
      "A Sah Açaí & Cia vendia por WhatsApp e precisava organizar pedidos personalizados sem depender de um marketplace. O desafio era deixar o cliente montar o copo e garantir que valor, complementos e endereço chegassem corretos para a loja.",
    problem:
      "O pedido não podia ser calculado no navegador: preço, adicionais, copos, colheres e sacolas precisavam ser validados no servidor. A loja também precisava enxergar o que entrou pelo site e o que veio de outros canais.",
    solution:
      "Construí a vitrine, a montagem do copo, o checkout e o painel administrativo. O backend modela o catálogo e as regras comerciais, recalcula cada item, registra o pedido no PostgreSQL e só então devolve o link do WhatsApp. O painel reúne dashboard financeiro, pedidos do site, lançamentos manuais e acompanhamento de custos.",
    decisions: [
      {
        title: "Preço e regra no servidor",
        text: "O frontend envia a escolha; o backend confere o catálogo, recalcula o total e grava o pedido. O navegador não é fonte de verdade.",
      },
      {
        title: "Pedido persistido antes do WhatsApp",
        text: "O deep link só é aberto depois que o pedido existe no banco. Isso evita conversa sem registro e permite conciliar o que foi vendido.",
      },
      {
        title: "Um painel para todos os canais",
        text: "Além dos pedidos do site, o painel aceita lançamentos manuais para vendas por WhatsApp, balcão e outros canais.",
      },
      {
        title: "Custos e embalagens no cálculo",
        text: "Copos, colheres e sacolas entram no planejamento da operação, não só no preço final.",
      },
    ],
    results: [
      "Cliente real em operação",
      "Pedido validado e persistido no servidor",
      "Dashboard financeiro e lançamentos manuais",
      "Cálculo de copos, colheres e sacolas",
      "Código e dados privados",
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React", "TypeScript", "Vite", "Tailwind"],
      },
      {
        label: "Backend",
        items: ["Node.js", "Express", "TypeScript", "Prisma"],
      },
      { label: "Banco", items: ["PostgreSQL"] },
      {
        label: "Integração",
        items: ["WhatsApp por deep link", "Sem gateway de pagamento"],
      },
    ],
    gallery: [
      {
        src: "/images/sah-acai-builder.webp",
        alt: "Montagem de copo no site da Sah Açaí & Cia",
        caption:
          "Montagem do copo: tamanho, complementos e revisão do pedido.",
      },
      {
        src: "/images/sah-acai-admin.webp",
        alt: "Tela de acesso do painel administrativo da Sah Açaí & Cia",
        caption: "Acesso ao painel administrativo da operação.",
      },
    ],
    statusNote:
      "Sistema privado, desenvolvido para uma operação real. Código e dados não são públicos.",
  },
  {
    slug: "monky-food",
    index: "02",
    title: "Monky Food",
    kicker: "SaaS multi-tenant para food service",
    type: "Produto próprio",
    status: "Em desenvolvimento",
    year: "2026",
    role: "Produto & engenharia",
    tags: ["SaaS", "Multi-tenant", "White-label", "Food service"],
    summary:
      "A base da Sah Açaí virou uma plataforma white-label: cada loja com sua identidade, seus dados isolados e a operação no mesmo painel.",
    cover: "/images/case-monky-food.webp",
    coverAlt:
      "Vitrine real da Sah Açaí & Cia, primeira operação da plataforma Monky Food",
    context:
      "Depois de colocar a Sah Açaí em operação, o próximo passo foi transformar a mesma base em um produto reutilizável para açaiterias, hamburguerias, pizzarias, marmitarias e operações de balcão.",
    problem:
      "Duplicar o sistema para cada cliente não escala. A plataforma precisava resolver a loja pelo domínio ou subdomínio, separar dados por empresa e manter o painel central funcionando sem misturar operações.",
    solution:
      "A Monky Food é uma plataforma white-label com banco compartilhado e isolamento por empresa. A vitrine resolve a loja pelo Host, o painel resolve a empresa pela sessão e todas as tabelas de negócio carregam o empresaId. A Sah Açaí é a primeira operação real.",
    decisions: [
      {
        title: "empresaId obrigatório",
        text: "As tabelas de negócio carregam a empresa desde a modelagem. O isolamento não depende de o desenvolvedor lembrar de filtrar.",
      },
      {
        title: "Resolução por Host",
        text: "A vitrine descobre a loja pelo domínio ou subdomínio; o painel descobre a empresa pela sessão.",
      },
      {
        title: "Banco compartilhado, dados separados",
        text: "Uma base só, com escopo por empresa. Menos duplicação, mais consistência e um caminho claro para planos e módulos.",
      },
      {
        title: "Migração incremental",
        text: "A operação que já existia ganhou um caminho de migração, sem parar a loja para trocar de plataforma.",
      },
    ],
    results: [
      "Primeira operação real: Sah Açaí & Cia",
      "Isolamento por empresa nas tabelas de negócio",
      "Vitrine white-label por domínio",
      "Base preparada para planos, módulos e identidade por loja",
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React", "TypeScript", "Vite", "Tailwind"],
      },
      {
        label: "Backend",
        items: ["Node.js", "Express", "TypeScript", "Prisma"],
      },
      { label: "Banco", items: ["PostgreSQL"] },
      {
        label: "Arquitetura",
        items: [
          "Multi-tenant",
          "Banco compartilhado",
          "Isolamento por empresa",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/sah-acai-admin.webp",
        alt: "Acesso ao painel da primeira operação da Monky Food",
        caption:
          "Acesso ao painel da primeira operação. Cada loja mantém sua própria identidade e seus dados isolados.",
      },
    ],
    statusNote: "Base multi-tenant em evolução. Código privado.",
  },
  {
    slug: "monky-tech",
    index: "03",
    title: "Monky Tech",
    kicker: "Gestão para eletrônicos e capinhas",
    type: "Produto próprio",
    status: "Em evolução",
    year: "2026",
    role: "Produto & engenharia",
    tags: ["SaaS", "PDV", "Estoque", "Financeiro"],
    summary:
      "PDV, estoque, compras, financeiro, usuários e auditoria em um SaaS multiempresa para lojas de eletrônicos.",
    cover: "/images/case-monky-tech.webp",
    coverAlt:
      "Tela de acesso do sistema de gestão Monky Tech, com identidade em transição",
    context:
      "Lojas de eletrônicos, acessórios e capinhas costumam controlar venda, estoque, compras e financeiro em planilhas separadas. O objetivo foi reunir a operação do balcão em um sistema multiempresa, com controle de acesso e histórico.",
    problem:
      "O balcão precisa vender rápido, mas o dono precisa enxergar estoque, compras, despesas, contas e permissões. Cada empresa tem seu próprio conjunto de dados e não pode acessar o do outro.",
    solution:
      "O Monky Tech reúne PDV, produtos, variantes, códigos de barras, estoque, compras, despesas, financeiro, relatórios, usuários e auditoria. A mesma aplicação atende várias empresas, com sessões e permissões separadas. O hub administrativo concentra a visão da plataforma, o modo suporte e a gestão de planos.",
    decisions: [
      {
        title: "Venda vinculada ao funcionário",
        text: "O PDV usa PIN para identificar quem vendeu. A operação ganha responsabilidade e histórico.",
      },
      {
        title: "Sessão web e sessão nativa",
        text: "Cookie HttpOnly no navegador e sessão própria no wrapper Android, sem misturar os modelos.",
      },
      {
        title: "Auditoria e modo suporte",
        text: "Ações sensíveis deixam rastro; o suporte entra com escopo controlado.",
      },
      {
        title: "Multiempresa de verdade",
        text: "Dados, permissões e planos separados por empresa, com um hub central para a plataforma.",
      },
    ],
    results: [
      "PDV, estoque, compras, financeiro e auditoria no mesmo sistema",
      "Multiempresa com permissões separadas",
      "Wrapper Android para o balcão",
      "Modo suporte e hub administrativo",
    ],
    stack: [
      { label: "Frontend", items: ["React", "Vite"] },
      {
        label: "Backend",
        items: ["Node.js", "Express", "Prisma", "Zod"],
      },
      { label: "Banco", items: ["PostgreSQL"] },
      {
        label: "Autenticação",
        items: ["Cookie HttpOnly", "Sessão nativa", "bcrypt"],
      },
      {
        label: "Outros",
        items: ["Nodemailer", "PIX", "Empacotamento Android"],
      },
    ],
    statusNote:
      "Produto privado em evolução. A identidade visual está em transição de Orakyn para Monky Tech; o deploy legado ainda pode exibir o nome anterior.",
  },
  {
    slug: "routepilot",
    index: "04",
    title: "RoutePilot",
    kicker: "Mapa operacional e planejamento de visitas",
    type: "Produto próprio",
    status: "No ar · acesso restrito",
    year: "2026",
    role: "Produto & engenharia",
    tags: ["PWA", "Mapas", "Offline", "Geocodificação"],
    summary:
      "Uma PWA para equipes de campo consultarem endereços, entenderem regiões e planejarem a ordem das visitas — inclusive offline.",
    cover: "/images/case-routepilot.webp",
    coverAlt: "Tela de acesso do RoutePilot, mapa operacional de visitas técnicas",
    context:
      "Equipes de campo precisam localizar um atendimento, entender a região, consultar referências e planejar a ordem das visitas. Em cidades com muitas localidades rurais e bairros com nomes parecidos, um mapa genérico não resolve a operação.",
    problem:
      "A base de endereços é grande, os nomes variam e a conectividade nem sempre existe. A equipe precisa de busca tolerante a acentos, região por polígono, rota pela malha viária local e operação offline.",
    solution:
      "O RoutePilot combina uma base local de endereços e regiões com mapa interativo, busca fuzzy, geocodificação híbrida e cálculo de rotas. A PWA funciona offline com IndexedDB e permite imprimir a rota em A4.",
    decisions: [
      {
        title: "Busca que perdoa digitação",
        text: "Normalização sem acentos, fuzzy matching e geocodificação híbrida com base local, Photon e Geoapify opcional.",
      },
      {
        title: "Região por polígono",
        text: "Point-in-polygon identifica a região operacional e permite consultar regiões próximas.",
      },
      {
        title: "Offline de verdade",
        text: "IndexedDB e Service Worker mantêm a operação utilizável quando a rede cai.",
      },
      {
        title: "Rota com controle humano",
        text: "O sistema sugere a ordem, mas permite reordenar, fixar posições e revisar antes de sair.",
      },
    ],
    results: [
      "5 cidades",
      "11 regiões operacionais",
      "105 localidades e pontos cadastrados",
      "122.919 endereços integrados para consulta local",
      "PWA instalável com operação offline",
    ],
    stack: [
      {
        label: "Frontend",
        items: ["HTML", "CSS", "JavaScript modular"],
      },
      { label: "Mapas", items: ["Leaflet", "OpenStreetMap"] },
      {
        label: "Dados",
        items: ["IndexedDB", "Service Worker", "Busca fuzzy"],
      },
      {
        label: "Infra",
        items: [
          "Netlify",
          "Netlify Identity",
          "Neon PostgreSQL",
          "Funções serverless",
        ],
      },
    ],
    links: [
      {
        label: "Abrir o RoutePilot",
        href: "https://routpilotes.vercel.app",
        kind: "live",
      },
    ],
    statusNote:
      "No ar, com acesso restrito a usuários autorizados. O código é privado.",
  },
  {
    slug: "portcont",
    index: "05",
    title: "PortCont",
    kicker: "Comparação inteligente de bases",
    type: "Produto próprio",
    status: "No ar · ambiente interno",
    year: "2026",
    role: "Produto & engenharia",
    tags: ["Dados", "Fuzzy matching", "Next.js", "PostgreSQL"],
    summary:
      "Uma aplicação que lê PDF, Excel e CSV, normaliza os registros e mostra quem está nas duas bases, quem é exclusivo e quem precisa de revisão humana.",
    cover: "/images/case-portcont.webp",
    coverAlt: "Tela de acesso do PortCont, comparação de bases de clientes",
    context:
      "Comparar duas bases de clientes manualmente é lento e sujeito a erro. Nomes com variações de escrita, formatos diferentes e duplicados transformam uma conciliação simples em uma planilha enorme.",
    problem:
      "O time precisava importar arquivos heterogêneos, comparar bases e separar o que é certeza do que é semelhança. O critério não podia ser só igualdade exata, e o resultado precisava ser revisável.",
    solution:
      "O PortCont recebe PDF, XLSX, XLS e CSV, extrai os clientes e compara as bases. O sistema classifica em existentes, exclusivos da base A, exclusivos da base B e semelhantes para revisão. O time revisa os ambíguos, gera relatórios e exporta o resultado.",
    decisions: [
      {
        title: "Normalização antes da comparação",
        text: "Os registros passam por limpeza e padronização para que a comparação não dependa do formato de origem.",
      },
      {
        title: "Fuzzy matching com revisão",
        text: "Semelhança não é certeza. O sistema separa os casos ambíguos e devolve a decisão para uma pessoa.",
      },
      {
        title: "Formatos diferentes, um fluxo",
        text: "PDF, XLSX, XLS e CSV entram no mesmo pipeline de extração e classificação.",
      },
      {
        title: "Sessão protegida",
        text: "O ambiente interno usa sessão com cookie HttpOnly e não expõe as bases comparadas.",
      },
    ],
    results: [
      "Upload e leitura de PDF, XLSX, XLS e CSV",
      "Classificação em existentes, exclusivos e semelhantes",
      "Revisão humana dos casos ambíguos",
      "Gestão de parceiras, períodos e equivalências",
      "Relatórios e exportação",
    ],
    stack: [
      {
        label: "Frontend",
        items: ["Next.js 14", "React 18", "TypeScript"],
      },
      {
        label: "Backend",
        items: ["Express", "TypeScript", "ES Modules"],
      },
      { label: "Banco", items: ["PostgreSQL no Neon", "Prisma"] },
      { label: "Deploy", items: ["Vercel"] },
      { label: "Testes", items: ["Vitest"] },
    ],
    gallery: [
      {
        src: "/images/portcont-flow.webp",
        alt: "Fluxo de comparação de bases do PortCont",
        caption:
          "Fluxo de comparação: PDF, Excel e CSV entram, passam pela normalização e saem classificados para revisão humana.",
        aspect: "4 / 3",
      },
    ],
    links: [
      {
        label: "Abrir o PortCont",
        href: "https://portcont.vercel.app",
        kind: "live",
      },
    ],
    statusNote:
      "No ar, em ambiente interno com login. O código e as bases de clientes são privados.",
  },
  {
    slug: "dropzone",
    index: "06",
    title: "Dropzone",
    kicker: "E-commerce de streetwear",
    type: "Colaboração",
    status: "Em colaboração",
    year: "2026",
    role: "Frontend & integrações",
    tags: ["E-commerce", "React", "Node.js", "IA aplicada"],
    summary:
      "Vitrine, catálogo, carrinho, favoritos e área administrativa para uma marca de streetwear — em colaboração com Leonardo Rosler.",
    cover: "/images/case-dropzone.webp",
    coverAlt: "Home real da loja Dropzone, campanha de streetwear",
    wide: true,
    context:
      "A Dropzone é uma marca de streetwear com vitrine, catálogo, carrinho, favoritos e área administrativa. O projeto foi desenvolvido em colaboração com Leonardo Rosler.",
    problem:
      "A marca precisava de uma experiência editorial forte, mas também de uma base de e-commerce que aguentasse catálogo, contas, administração e integrações.",
    solution:
      "Atuei no frontend da vitrine e na integração com o backend, incluindo catálogo, carrinho, favoritos e login. Também contribuí em módulos de autenticação, administração, avaliações, WhatsApp e recursos de IA.",
    decisions: [
      {
        title: "Editorial + operação",
        text: "A vitrine precisava vender a estética da marca sem esconder o catálogo e o fluxo de compra.",
      },
      {
        title: "Integração de ponta a ponta",
        text: "Frontend conectado à API para catálogo, carrinho, favoritos e sessão de cliente.",
      },
      {
        title: "Módulos compartilhados",
        text: "Autenticação, administração, avaliações, WhatsApp e IA foram construídos como partes do produto, não como remendos.",
      },
      {
        title: "Crédito explícito",
        text: "Projeto colaborativo, com autoria dividida e sem exposição de dados de clientes.",
      },
    ],
    results: [
      "Vitrine e catálogo com filtros",
      "Looks editoriais e galeria de produto",
      "Carrinho, favoritos e login de cliente",
      "Módulos de admin, avaliações, WhatsApp e IA",
      "Colaboração com Leonardo Rosler",
    ],
    stack: [
      {
        label: "Frontend",
        items: ["React 19", "Vite", "TypeScript"],
      },
      {
        label: "Backend",
        items: ["Node.js", "Express 5", "Prisma 7", "PostgreSQL"],
      },
      {
        label: "Outros",
        items: ["JWT", "Zod", "Sharp", "Google GenAI", "Upload de imagens"],
      },
    ],
    gallery: [
      {
        src: "/images/dropzone-look-01.webp",
        alt: "Look real da coleção Dropzone",
        caption: "Look editorial da coleção real da marca.",
        aspect: "3 / 4",
      },
      {
        src: "/images/dropzone-look-03.webp",
        alt: "Look real da coleção Dropzone",
        caption: "Look editorial da coleção real da marca.",
        aspect: "3 / 4",
      },
    ],
    links: [
      {
        label: "Repositório público",
        href: "https://github.com/Brendontailor/dropzone",
        kind: "repo",
      },
    ],
    statusNote:
      "Projeto colaborativo. A marca, o catálogo e o código pertencem aos responsáveis pelo projeto. Este case é apresentado com crédito e sem exposição de dados de clientes.",
  },
];

export function getCase(slug: string) {
  return cases.find((study) => study.slug === slug);
}

export function getNextCase(slug: string) {
  const index = cases.findIndex((study) => study.slug === slug);
  if (index === -1) return cases[0];
  return cases[(index + 1) % cases.length];
}
