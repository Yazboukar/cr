#!/bin/sh
set -e

echo "[entrypoint] Starting container..."

if [ -n "${DATABASE_URL:-}" ]; then
  echo "[entrypoint] DATABASE_URL present, attempting to run migrations (prisma migrate deploy)"
  # try to run migrations with retries
  RETRIES=10
  until npx prisma migrate deploy; do
    RETRIES=$((RETRIES-1))
    echo "[entrypoint] Waiting for database... retries left: $RETRIES"
    if [ $RETRIES -le 0 ]; then
      echo "[entrypoint] Migrations failed or database not ready, attempting db push as fallback"
      npx prisma db push --accept-data-loss || true
      break
    fi
    sleep 2
  done
else
  echo "[entrypoint] DATABASE_URL not set — skipping migrations"
fi

echo "[entrypoint] Starting Next.js"
exec npm run start
