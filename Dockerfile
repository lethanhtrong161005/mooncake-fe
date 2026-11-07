# syntax=docker/dockerfile:1
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite embeds these public values in the browser bundle at build time.
ARG VITE_API_BASE_URL=/api
ARG VITE_API_VERSION=v1
ARG VITE_API_TIMEOUT=15000
ARG VITE_APP_ENV=staging
ARG VITE_ENABLE_MOCK_FALLBACK=false
ARG VITE_ENABLE_DEBUG_LOGS=false
ARG VITE_GOOGLE_CLIENT_ID=
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_API_VERSION=$VITE_API_VERSION \
    VITE_API_TIMEOUT=$VITE_API_TIMEOUT \
    VITE_APP_ENV=$VITE_APP_ENV \
    VITE_ENABLE_MOCK_FALLBACK=$VITE_ENABLE_MOCK_FALLBACK \
    VITE_ENABLE_DEBUG_LOGS=$VITE_ENABLE_DEBUG_LOGS \
    VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
RUN npm run build

FROM nginx:1.27-alpine AS runtime
ENV TZ=Etc/UTC
COPY nginx.staging.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 5173
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:5173/ || exit 1
