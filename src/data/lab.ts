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
    size: "side",
  },
  {
    id: "03",
    name: "Auth — JWT HttpOnly Cookie",
    file: "auth.ts",
    label: "Segurança",
    visibility: "Privado",
    description:
      "Login, refresh token rotativo e logout com cookies seguros. Sem localStorage, sem XSS. Padrão usado no Dropzone e PortCont.",
    tags: ["Auth", "JWT", "Cookies", "Security"],
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
    httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 15
  });
  cookies().set("refresh_token", refreshToken, {
    httpOnly: true, secure: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 30
  });
}`,
    size: "side",
  },
  {
    id: "04",
    name: "Multi-tenant — Middleware",
    file: "middleware.ts",
    label: "Arquitetura SaaS",
    visibility: "Privado",
    description:
      "Resolução de tenant por subdomínio/domínio customizado. Isolamento de dados no middleware antes de chegar nas rotas.",
    tags: ["Multi-tenant", "Next.js", "Middleware", "SaaS"],
    code: `// middleware.ts
export async function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const tenant = await resolveTenant(host);
  if (!tenant) return NextResponse.redirect(new URL("/404", req.url));

  const headers = new Headers(req.headers);
  headers.set("x-tenant-id", tenant.id);
  headers.set("x-tenant-slug", tenant.slug);

  return NextResponse.next({ request: { headers } });
}

async function resolveTenant(host: string) {
  const sub = host.split(".")[0];
  if (sub !== "app" && sub !== "www") {
    return prisma.tenant.findUnique({ where: { slug: sub } });
  }
  return prisma.tenant.findUnique({ where: { customDomain: host } });
}`,
    size: "small",
  },
];