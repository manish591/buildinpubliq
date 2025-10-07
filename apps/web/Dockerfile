FROM node:lts-alpine3.17 AS base

ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_GITHUB_APP_NAME

FROM base AS prunner
WORKDIR /app
RUN npm install turbo -g
COPY . .
RUN turbo prune --scope=web --docker

FROM base AS installer
WORKDIR /app
COPY --from=prunner /app/out/json .
COPY --from=prunner /app/out/full .
RUN npm install pnpm -g
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=prunner /app/out/full .
RUN npm install pnpm -g
RUN pnpm run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/apps/web/.next/standalone .
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/public ./apps/web/public

EXPOSE 3000
CMD [ "node", "apps/web/server.js" ]