import Redis from "ioredis";

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error("Redis url is required");
}

const redis = new Redis(REDIS_URL);

export default redis;