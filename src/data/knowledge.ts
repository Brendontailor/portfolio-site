export type KnowledgeLayer = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export const knowledgeLayers: KnowledgeLayer[] = [
  {
    id: "01",
    title: "Fundamentos",
    description:
      "Lógica, estruturas de dados e complexidade. A base para escolher a solução certa antes de escrever a primeira linha.",
    items: [
      "Lógica",
      "Estruturas de dados",
      "Complexidade",
      "Paradigmas",
      "Resolução de problemas",
    ],
  },
  {
    id: "02",
    title: "Algoritmos",
    description:
      "Busca, ordenação, grafos e pathfinding. Uso onde o problema pede, não como enfeite.",
    items: [
      "Busca",
      "Ordenação",
      "Grafos",
      "BFS / DFS",
      "Dijkstra",
      "Point-in-polygon",
    ],
  },
  {
    id: "03",
    title: "Regras de negócio",
    description:
      "Modelagem de regras, validação e cálculo no servidor. O sistema precisa ser confiável mesmo quando o cliente tenta outro caminho.",
    items: [
      "Modelagem",
      "Validação",
      "Cálculo no servidor",
      "Estados",
      "Exceções",
      "Preço",
    ],
  },
  {
    id: "04",
    title: "Clean Code",
    description:
      "Nomes claros, coesão, baixo acoplamento e refatoração. Código que outra pessoa consegue manter.",
    items: [
      "Nomes",
      "Coesão",
      "Acoplamento",
      "Testes",
      "Refatoração",
      "Legibilidade",
    ],
  },
  {
    id: "05",
    title: "Arquitetura",
    description:
      "Camadas, contratos, módulos e multi-tenant. A estrutura precisa sobreviver ao próximo requisito.",
    items: [
      "Camadas",
      "DDD",
      "Multi-tenant",
      "Módulos",
      "Contratos",
      "Migrações",
    ],
  },
  {
    id: "06",
    title: "Banco de dados",
    description:
      "Modelagem relacional, índices, migrações e isolamento por empresa. Dados consistentes são parte do produto.",
    items: [
      "PostgreSQL",
      "Prisma",
      "Modelagem",
      "Índices",
      "Migrações",
      "Isolamento",
    ],
  },
  {
    id: "07",
    title: "APIs & integrações",
    description:
      "REST, JSON, autenticação, webhooks e integrações externas. O sistema conversa com o mundo sem perder o controle.",
    items: [
      "REST",
      "JSON",
      "Auth",
      "Webhooks",
      "WhatsApp",
      "Geocodificação",
      "PIX",
    ],
  },
  {
    id: "08",
    title: "Infra & segurança",
    description:
      "Deploy, cookies HttpOnly, JWT, bcrypt, permissões, auditoria e observabilidade. Segurança é requisito, não etapa final.",
    items: [
      "Deploy",
      "Docker",
      "JWT",
      "bcrypt",
      "HttpOnly",
      "Permissões",
      "Auditoria",
    ],
  },
  {
    id: "09",
    title: "IA aplicada",
    description:
      "GenAI onde ela ajuda a experiência ou a operação, com validação humana e sem terceirizar decisões críticas.",
    items: [
      "GenAI",
      "Prompts",
      "Automação",
      "Busca semântica",
      "Validação humana",
      "Privacidade",
    ],
  },
];
