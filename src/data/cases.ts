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
  architecture: {
    summary: string;
    modules: { name: string; responsibility: string }[];
  };
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
    architecture: {
      summary:
        "A vitrine monta o pedido; o servidor valida e registra a compra antes de encaminhá-la para a operação da loja.",
      modules: [
        {
          name: "Catálogo e montagem",
          responsibility:
            "Apresentar os produtos e reunir tamanho, complementos e escolhas do cliente.",
        },
        {
          name: "Pedidos e validação",
          responsibility:
            "Conferir as regras comerciais, recalcular o pedido e registrá-lo antes de abrir o WhatsApp.",
        },
        {
          name: "Operação e financeiro",
          responsibility:
            "Acompanhar pedidos digitais, lançamentos manuais, custos e indicadores da loja.",
        },
      ],
    },
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
      "A Monky Food é uma plataforma white-label com banco compartilhado e isolamento por empresa. A vitrine resolve a loja pelo domínio, o painel identifica a empresa pela sessão e os dados de negócio permanecem separados por operação. A Sah Açaí é a primeira operação real.",
    architecture: {
      summary:
        "Uma plataforma atende diferentes lojas: a vitrine identifica a operação e o painel mantém os dados de cada empresa separados.",
      modules: [
        {
          name: "Vitrine white-label",
          responsibility:
            "Resolver a loja pelo domínio e apresentar catálogo e identidade visual próprios.",
        },
        {
          name: "Painel operacional",
          responsibility:
            "Atender cada empresa com contexto de sessão e ferramentas da operação.",
        },
        {
          name: "Isolamento multiempresa",
          responsibility:
            "Manter os dados de negócio separados entre lojas dentro de uma plataforma compartilhada.",
        },
      ],
    },
    decisions: [
      {
        title: "Isolamento desde a modelagem",
        text: "Os dados de negócio recebem o contexto da empresa desde a modelagem. O isolamento não depende de filtros aplicados manualmente em cada tela.",
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
    slug: "routepilot",
    index: "03",
    title: "RoutePilot",
    kicker: "Mapa operacional e planejamento de visitas",
    type: "Produto próprio",
    status: "No ar · acesso restrito",
    year: "2026",
    role: "Produto & engenharia",
    tags: ["PWA", "Mapas", "Offline", "Geocodificação"],
    summary:
      "Uma PWA para equipes de campo consultarem endereços, entenderem regiões e planejarem a ordem das visitas — inclusive offline.",
    cover: "/images/case-routepilot-home.png",
    coverAlt: "Tela inicial do RoutePilot com busca e cidades atendidas",
    context:
      "Equipes de campo precisam localizar um atendimento, entender a região, consultar referências e planejar a ordem das visitas. Em cidades com muitas localidades rurais e bairros com nomes parecidos, um mapa genérico não resolve a operação.",
    problem:
      "A base de endereços é grande, os nomes variam e a conectividade nem sempre existe. A equipe precisa de busca tolerante a acentos, região por polígono, rota pela malha viária local e operação offline.",
    solution:
      "O RoutePilot combina uma base local de endereços e regiões com mapa interativo, busca fuzzy, geocodificação híbrida e cálculo de rotas. A PWA funciona offline com IndexedDB e permite imprimir a rota em A4.",
    architecture: {
      summary:
        "A busca e a base local alimentam o mapa e o planejamento de visitas, com suporte para continuar a operação offline.",
      modules: [
        {
          name: "Endereços e regiões",
          responsibility:
            "Consultar localidades e identificar áreas operacionais a partir de uma base local.",
        },
        {
          name: "Busca e geocodificação",
          responsibility:
            "Encontrar endereços mesmo com variações de escrita e coordenadas disponíveis.",
        },
        {
          name: "Mapa e planejamento de rota",
          responsibility:
            "Visualizar pontos e organizar a ordem das visitas com revisão da equipe.",
        },
        {
          name: "PWA offline",
          responsibility:
            "Manter dados e recursos essenciais utilizáveis quando a conexão falha.",
        },
      ],
    },
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
    gallery: [
      {
        src: "/images/case-routepilot-map.png",
        alt: "Mapa do RoutePilot com localidades e regiões operacionais de Pelotas e cidades próximas",
        caption:
          "Mapa operacional com localidades públicas, pontos de referência e limites das regiões atendidas.",
        aspect: "16 / 9",
      },
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
    index: "04",
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
    architecture: {
      summary:
        "Arquivos de diferentes formatos entram em um fluxo de extração, comparação assistida e geração de resultados revisáveis.",
      modules: [
        {
          name: "Importação e extração",
          responsibility:
            "Receber arquivos de planilha e documentos e extrair os registros para comparação.",
        },
        {
          name: "Normalização e comparação",
          responsibility:
            "Padronizar os dados e classificar correspondências, exclusividades e possíveis semelhanças.",
        },
        {
          name: "Revisão e relatórios",
          responsibility:
            "Permitir que uma pessoa resolva casos ambíguos e exporte o resultado da conciliação.",
        },
      ],
    },
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
    index: "05",
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
    architecture: {
      summary:
        "A vitrine e a experiência de compra se integram aos serviços de catálogo, conta e recursos compartilhados do produto.",
      modules: [
        {
          name: "Vitrine e catálogo",
          responsibility:
            "Apresentar coleções, produtos, filtros e conteúdo editorial da marca.",
        },
        {
          name: "Conta e experiência de compra",
          responsibility:
            "Conectar login, carrinho e favoritos à navegação da loja.",
        },
        {
          name: "Serviços integrados",
          responsibility:
            "Reunir avaliações, atendimento por WhatsApp e recursos de IA em módulos do produto.",
        },
      ],
    },
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
