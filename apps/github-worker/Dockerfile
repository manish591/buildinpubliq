FROM node:22-alpine AS base

FROM base AS prunner
WORKDIR /app
RUN npm install turbo -g
COPY . .
RUN turbo prune --scope=github-worker --docker

FROM base AS installer
WORKDIR /app
COPY --from=prunner /app/out/json .
COPY --from=prunner /app/out/full .
RUN npm install pnpm -g
RUN pnpm install --frozen-lockfile

FROM installer AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=prunner /app/out/full .
RUN npm install pnpm -g
RUN pnpm run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/ .
EXPOSE 8000
CMD ["node", "apps/github-worker/dist/index.js"]