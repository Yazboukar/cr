########### Builder stage ###########
FROM node:18-alpine AS builder
WORKDIR /app

# Install all deps (including dev) for build
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .

# Generate Prisma client and build Next.js
RUN npx prisma generate
RUN npm run build

########### Production image ###########
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy package files and install only production deps
COPY package.json package-lock.json* ./
RUN npm ci --production --silent

# Copy built app and generated Prisma client from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client

# Copy remaining files (next.config.js, prisma schema, pages, etc.)
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Copy all app source (for pages/api, etc.)
COPY --from=builder /app .

EXPOSE 3000

# Entrypoint will run migrations (if DATABASE_URL set) and start the server
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

CMD ["/usr/local/bin/docker-entrypoint.sh"]
