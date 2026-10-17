import { Request, Response, NextFunction } from 'express';

interface RateLimitOptions {
  windowMs: number;
  max: number;
  message: string;
}

interface HitEntry {
  count: number;
  resetAt: number;
}

// Limitador en memoria por IP (ventana fija). Suficiente para una sola instancia;
// con varias réplicas habría que moverlo a un almacén compartido (p. ej. Redis).
export const rateLimit = ({ windowMs, max, message }: RateLimitOptions) => {
  const hits = new Map<string, HitEntry>();

  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (entry.resetAt <= now) hits.delete(key);
    }
  }, windowMs).unref();

  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.ip ?? 'unknown';
    const now = Date.now();

    let entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      entry = { count: 0, resetAt: now + windowMs };
      hits.set(key, entry);
    }

    entry.count++;

    if (entry.count > max) {
      res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
      res.status(429).json({ message });
      return;
    }

    next();
  };
};
