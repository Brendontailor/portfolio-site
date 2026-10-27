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
    file: "rate-limit.ts",
    label: "Middleware + Redis",
    visibility: "Público",
    description:
      "Rate limiter distribuído com janela deslizante. Protege APIs públicas e autenticadas contra abuso, com chaves por IP, usuário ou tenant. Usado no PortCont e RoutePilot.",
    tags: ["Rate Limiting", "Redis", "Middleware", "Next.js", "Security"],
    href: "https://github.com/Brendontailor/portfolio-site/tree/main/src/lib/rate-limit",
    code: `// lib/rate-limit.ts
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetMs: number }> {
  const now = Date.now();
  const windowStart = now - windowMs;
  const redisKey = \`rl:\${key}\`;

  const pipe = redis.pipeline();
  pipe.zremrangebyscore(redisKey, 0, windowStart);
  pipe.zadd(redisKey, { score: now, member: \`\${now}:\${Math.random()}\` });
  pipe.zcard(redisKey);
  pipe.pexpire(redisKey, windowMs);
  const results = await pipe.exec();

  const current = (results[2] as number) || 0;
  const allowed = current <= limit;
  const remaining = Math.max(0, limit - current);
  const resetMs = windowMs;

  return { allowed, remaining, resetMs };
}

// Uso no middleware ou route handler
export async function withRateLimit(
  req: Request,
  limit = 60,
  windowMs = 60_000
) {
  const ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  const { allowed, remaining, resetMs } = await rateLimit(ip, limit, windowMs);

  if (!allowed) {
    return Response.json(
      { error: "Rate limit exceeded", retryAfter: Math.ceil(resetMs / 1000) },
      { status: 429, headers: { "Retry-After": String(Math.ceil(resetMs / 1000)) } }
    );
  }
  return null; // continua
}`,
    size: "side",
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
  {
    id: "05",
    name: "Git Workflow — Conventional Commits + CI",
    file: ".github/workflows/ci.yml",
    label: "GitHub Actions",
    visibility: "Público",
    description:
      "Pipeline completa: lint, type-check, testes, build e deploy preview. Commits semânticos (Conventional Commits), versionamento automático, changelog gerado. Padrão usado em todos os projetos.",
    tags: ["Git", "GitHub Actions", "CI/CD", "Conventional Commits", "Release"],
    href: "https://github.com/Brendontailor/portfolio-site/blob/main/.github/workflows/ci.yml",
    code: `# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build

  deploy-preview:
    needs: lint-and-test
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with: { vercel-token: \${{ secrets.VERCEL_TOKEN }}, vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}, vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}, vercel-args: '--prod=false' }

  release:
    needs: lint-and-test
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, registry-url: 'https://registry.npmjs.org' }
      - run: npm ci && npm run build
      - run: npx semantic-release
        env: { GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}, NPM_TOKEN: \${{ secrets.NPM_TOKEN } }`,
    size: "side",
  },
];