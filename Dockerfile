########### Builder stage ###########
FROM node:18-bullseye-slim AS builder
WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# Install all deps (including dev) for build
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .

# Generate Prisma client and build Next.js
RUN npx prisma generate
RUN npm run build

########### Production image ###########
FROM node:18-bullseye-slim
WORKDIR /app
ENV NODE_ENV=production
# Fixed Chromium cache so the browser downloaded at build time is found at
# runtime, including when the process runs as the non-root `node` user.
ENV PUPPETEER_CACHE_DIR=/app/.cache/puppeteer

# openssl/ca-certificates for Prisma + the shared libraries required by the
# Chromium that Puppeteer downloads (PDF export crashes at runtime without them).
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    openssl ca-certificates \
    fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-0 \
    libcairo2 libcups2 libdbus-1-3 libdrm2 libgbm1 libglib2.0-0 libnspr4 \
    libnss3 libpango-1.0-0 libx11-6 libxcb1 libxcomposite1 libxdamage1 \
    libxext6 libxfixes3 libxkbcommon0 libxrandr2 \
  && rm -rf /var/lib/apt/lists/*

# Copy package files and install only production deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --silent

# Copy built app, generated Prisma client and Prisma CLI from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules/.bin/prisma ./node_modules/.bin/prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma

# Copy remaining runtime files (next.config, prisma schema)
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

# Entrypoint will run migrations (if DATABASE_URL set) and start the server
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Drop root: the bundled `node` user owns the app dir for least-privilege runtime.
RUN chown -R node:node /app
USER node

CMD ["/usr/local/bin/docker-entrypoint.sh"]
