// src/reference/api/clientes/route.ts
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
}
