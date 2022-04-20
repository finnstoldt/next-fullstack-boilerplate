FROM node:16-alpine AS builder
ARG APP_SCOPE
ENV APP_SCOPE ${APP_SCOPE}
RUN apk update && apk add --no-cache git
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=${APP_SCOPE} --docker

# Add lockfile, turbo.json and package.json's of isolated subworkspace
FROM node:16-alpine AS installer
RUN apk update && apk add --no-cache git
WORKDIR /app
#set CI variable to true
ENV CI=true
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install --immutable

FROM node:16-alpine AS sourcer
ARG APP_SCOPE
ENV APP_SCOPE ${APP_SCOPE}
ARG STOREFRONT_BASE_PATH
ENV STOREFRONT_BASE_PATH ${STOREFRONT_BASE_PATH}
RUN apk update && apk add --no-cache git
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN NODE_ENV=production yarn turbo run build --scope=${APP_SCOPE} --include-dependencies --no-deps

EXPOSE 3000
CMD yarn turbo run start --scope=${APP_SCOPE}