import Redis from "ioredis";

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT as number | undefined;

if (!REDIS_HOST || !REDIS_PORT) {
  throw new Error("Redis configuration not found");
}

const globalForRedis = global as unknown as { redis: Redis };

export const redis =
  globalForRedis.redis ||
  new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    maxRetriesPerRequest: null
  });

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;
