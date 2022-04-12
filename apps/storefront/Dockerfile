# syntax=docker/dockerfile:1

FROM node:16-alpine
ENV NODE_ENV=production

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --chown=nextjs:nodejs ./.next/standalone/ ./
COPY --chown=nextjs:nodejs ./.next/static ./apps/storefront/.next/static

EXPOSE 3000
CMD [ "node", "./apps/storefront/server.js" ]