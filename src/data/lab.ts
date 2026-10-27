export type LabItem = {
  id: string;
  name: string;
  file: string;
  label: string;
  visibility: "Público" | "Privado" | "Pessoal";
  description: string;
  tags: string[];
  href?: string;
  code: string;
  size: "featured" | "side" | "wide" | "small";
};

export const labItems: LabItem[] = [
  {
    id: "01",
    name: "AED2 — Labirinto",
    file: "labirinto.ts",
    label: "Estudo de algoritmos",
    visibility: "Público",
    description:
      "Estudo público de estruturas de dados e caminhos em grid. O exercício vira laboratório para comparar BFS, DFS e critérios de custo.",
    tags: ["Algoritmos", "Estruturas de dados", "Pathfinding", "TypeScript"],
    href: "https://github.com/Brendontailor/aed2_labirinto",
    code: `// labirinto.ts
const queue = [start];
const seen = new Set([key(start)]);

while (queue.length) {
  const cell = queue.shift()!;
  if (isExit(cell)) return pathTo(cell);

  for (const next of neighbors(cell)) {
    if (!seen.has(key(next))) {
      seen.add(key(next));
      queue.push(next);
    }
  }
}`,
    size: "featured",
  },
  {
    id: "02",
    name: "API Routes — Validação Zod",
    file: "route.ts",
    label: "Next.js App Router",
    visibility: "Público",
    description:
      "Padrão de rota tipada com validação de entrada, tratamento de erros centralizado e resposta tipada. Base para todas as APIs dos projetos reais.",
    tags: ["Next.js", "TypeScript", "Zod", "API Design"],
    href: "https://github.com/Brendontailor/portfolio-site/tree/main/src/app/api",
    code: `// app/api/clientes/route.ts
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const createSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  telefone: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parse = createSchema.safeParse(body);

  if (!parse.success) {
    return Response.json(
      { error: "Dados inválidos", issues: parse.error.flatten() },
      { status: 400 }
    );
  }

  const cliente = await prisma.cliente.create({
    data: parse.data,
  });

  return Response.json(cliente, { status: 201 });
}`,
    size: "featured",
  },
  {
    id: "03",
    name: "Repository Pattern — Prisma",
    file: "cliente.repository.ts",
    label: "Camada de dados",
    visibility: "Privado",
    description:
      "Abstração do Prisma para testes e troca de ORM. Isola queries complexas e transações em um só lugar.",
    tags: ["TypeScript", "Prisma", "Repository Pattern", "Clean Architecture"],
    code: `// repositories/cliente.repository.ts
export class ClienteRepository {
  constructor(private prisma: PrismaClient) {}

  async findByEmail(email: string) {
    return this.prisma.cliente.findUnique({
      where: { email },
    });
  }

  async createWithTransaction(
    data: CreateClienteInput,
    auditoria: AuditoriaInput
  ) {
    return this.prisma.$transaction(async (tx) => {
      const cliente = await tx.cliente.create({ data });
      await tx.auditoria.create({ data: { ...auditoria, clienteId: cliente.id } });
      return cliente;
    });
  }

  async search(filtro: ClienteFiltro) {
    const where = this.buildWhere(filtro);
    return this.prisma.cliente.findMany({ where });
  }
}`,
    size: "side",
  },
  {
    id: "04",
    name: "Auth — JWT com HttpOnly Cookie",
    file: "auth.ts",
    label: "Segurança",
    visibility: "Privado",
    description:
      "Login, refresh token rotativo e logout com cookies seguros. Sem localStorage, sem XSS. Padrão usado no Dropzone e PortCont.",
    tags: ["Auth", "JWT", "Cookies", "Security", "Node.js"],
    code: `// lib/auth.ts
export async function createSession(userId: string) {
  const accessToken = jwt.sign(
    { sub: userId, type: "access" },
    process.env.JWT_SECRET!,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { sub: userId, type: "refresh", jti: crypto.randomUUID() },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "30d" }
  );

  await prisma.refreshToken.create({
    data: { userId, token: hash(refreshToken), expiresAt: days(30) },
  });

  cookies().set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 15,
  });
  cookies().set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
}`,
    size: "side",
  },
  {
    id: "05",
    name: "Webhook — Idempotência",
    file: "webhook.ts",
    label: "Integrações",
    visibility: "Privado",
    description:
      "Recebimento de webhooks externos (Stripe, WhatsApp, ERP) com chave de idempotência para evitar processamento duplicado.",
    tags: ["Webhooks", "Idempotency", "Stripe", "Integrações"],
    code: `// app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const signature = headers().get("stripe-signature")!;
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  const idempotencyKey = \`stripe:\${event.id}\`;
  const exists = await redis.setnx(idempotencyKey, "1");
  if (!exists) {
    return Response.json({ received: true, duplicate: true });
  }
  await redis.expire(idempotencyKey, 86400);

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutCompleted(event.data.object);
      break;
    case "invoice.payment_failed":
      await handlePaymentFailed(event.data.object);
      break;
  }

  return Response.json({ received: true });
}`,
    size: "small",
  },
  {
    id: "06",
    name: "Background Jobs — BullMQ",
    file: "queue.ts",
    label: "Processamento assíncrono",
    visibility: "Privado",
    description:
      "Fila de jobs para tarefas pesadas: geração de relatórios, envio de e-mails, sincronização de ERPs. Com retry, backoff e métricas.",
    tags: ["BullMQ", "Redis", "Background Jobs", "Observability"],
    code: `// queues/relatorio.queue.ts
export const relatorioQueue = new Queue("relatorios", {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: 100,
    removeOnFail: 50,
  },
});

relatorioQueue.process("gerar-pdf", async (job) => {
  const { clienteId, periodo } = job.data;
  const dados = await aggregateDados(clienteId, periodo);
  const pdf = await renderPDF(dados);
  await storage.upload(\`relatorios/\${clienteId}/\${periodo}.pdf\`, pdf);
  await notifyClient(clienteId, { tipo: "relatorio_pronto", url: pdf.url });
});

// Agendamento cron
export async function agendarRelatoriosMensais() {
  for (const cliente of await getClientesAtivos()) {
    await relatorioQueue.add(
      "gerar-pdf",
      { clienteId: cliente.id, periodo: previousMonth() },
      { repeat: { pattern: "0 2 1 * *" } } // todo dia 1 às 02:00
    );
  }
}`,
    size: "wide",
  },
  {
    id: "07",
    name: "Multi-tenant — Middleware",
    file: "middleware.ts",
    label: "Arquitetura SaaS",
    visibility: "Privado",
    description:
      "Resolução de tenant por subdomínio/domínio customizado. Isolamento de dados no middleware antes de chegar nas rotas.",
    tags: ["Multi-tenant", "Next.js", "Middleware", "SaaS"],
    code: `// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const tenant = await resolveTenant(host);

  if (!tenant) {
    return NextResponse.redirect(new URL("/404", req.url));
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-tenant-id", tenant.id);
  requestHeaders.set("x-tenant-slug", tenant.slug);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

async function resolveTenant(host: string): Promise<Tenant | null> {
  // 1. Subdomínio: cliente.app.com
  const subdomain = host.split(".")[0];
  if (subdomain !== "app" && subdomain !== "www") {
    return prisma.tenant.findUnique({ where: { slug: subdomain } });
  }

  // 2. Domínio customizado: cliente.com.br
  return prisma.tenant.findUnique({
    where: { customDomain: host },
  });
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};`,
    size: "small",
  },
];