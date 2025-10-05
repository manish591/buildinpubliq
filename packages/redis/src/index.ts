import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';

if (!REDIS_URL) {
  throw new Error('Redis configuration not found');
}

const globalForRedis = global as unknown as { redis: Redis };

export const redis = globalForRedis.redis || new Redis(REDIS_URL);

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis;
