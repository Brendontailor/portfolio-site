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
    name: "Rate Limiting — Sliding Window",
    file: "reference/rate-limit.ts",
    label: "Middleware + janela deslizante",
    visibility: "Público",
    description:
      "Rate limiter de janela deslizante: cada requisição conta em uma janela que expira, e a resposta devolve quanto ainda resta e em quanto tempo a janela reinicia. É a implementação de referência deste site — no PortCont e no RoutePilot a mesma janela roda sobre Redis.",
    tags: ["Rate Limiting", "Sliding Window", "Middleware", "Next.js", "Security"],
    href: "https://github.com/Brendontailor/portfolio-site/blob/main/src/reference/rate-limit.ts",
    code: `// src/reference/rate-limit.ts
// Rate limiter de janela deslizante, sem dependências externas.
// A mesma janela roda sobre Redis nos projetos reais (PortCont e RoutePilot);
// aqui a implementação é local, para ser lida e executada sem infraestrutura.

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetMs: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now(),
): RateLimitResult {
  const bucket = buckets.get(key);

  // janela expirada (ou chave ainda sem registro): abre uma nova
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });

    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      resetMs: windowMs,
    };
  }

  bucket.count += 1;

  return {
    allowed: bucket.count <= limit,
    remaining: Math.max(0, limit - bucket.count),
    resetMs: bucket.resetAt - now,
  };
}

export function resetRateLimit(key: string): void {
  buckets.delete(key);
}`,
    size: "side",
  },
  {
    id: "02",
    name: "API Routes — Validação Zod",
    file: "reference/api/clientes/route.ts",
    label: "Next.js App Router",
    visibility: "Público",
    description:
      "Padrão de rota tipada com validação de entrada, tratamento de erros centralizado e resposta tipada. É a referência deste site — nos projetos reais a persistência usa Prisma sobre PostgreSQL — e a base de todas as APIs que eu construo.",
    tags: ["Next.js", "TypeScript", "Zod", "API Design"],
    href: "https://github.com/Brendontailor/portfolio-site/blob/main/src/reference/api/clientes/route.ts",
    code: `// src/reference/api/clientes/route.ts
// Referência de Route Handler do Next.js com validação de entrada.
// Não é publicado como endpoint deste site: é o padrão usado nas APIs dos
// projetos reais, onde a persistência usa Prisma sobre PostgreSQL.

import { z } from "zod";

const createSchema = z.object({
  nome: z.string().min(2),
  email: z.email(),
  telefone: z.string().optional(),
});

export type ClienteInput = z.infer<typeof createSchema>;

export async function POST(req: Request): Promise<Response> {
  const body = await req.json();
  const parsed = createSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: "Dados inválidos", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  return Response.json(
    { id: crypto.randomUUID(), ...parsed.data },
    { status: 201 },
  );
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
