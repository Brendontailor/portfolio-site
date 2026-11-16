// src/reference/rate-limit.ts
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
}
