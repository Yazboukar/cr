#!/bin/sh
set -e

echo "[entrypoint] Starting container..."

run_with_retries() {
  retries=10

  until "$@"; do
    retries=$((retries - 1))
    echo "[entrypoint] Command failed: $*"
    echo "[entrypoint] Waiting for database... retries left: $retries"

    if [ "$retries" -le 0 ]; then
      return 1
    fi

    sleep 2
  done
}

LAST_MIGRATE_OUTPUT=""

run_migrate_deploy() {
  set +e
  LAST_MIGRATE_OUTPUT=$(npx prisma migrate deploy 2>&1)
  status=$?
  set -e

  printf '%s\n' "$LAST_MIGRATE_OUTPUT"
  return "$status"
}

run_migrate_deploy_with_retries() {
  retries=10

  while true; do
    if run_migrate_deploy; then
      return 0
    fi

    case "$LAST_MIGRATE_OUTPUT" in
      *P1001*|*P1002*)
        retries=$((retries - 1))
        echo "[entrypoint] Database not ready for migrations yet"
        echo "[entrypoint] Waiting for database... retries left: $retries"

        if [ "$retries" -le 0 ]; then
          return 1
        fi

        sleep 2
        ;;
      *)
        return 1
        ;;
    esac
  done
}

has_migrations() {
  find prisma/migrations -mindepth 1 -maxdepth 1 -type d | grep -q .
}

if [ -n "${DATABASE_URL:-}" ]; then
  if has_migrations; then
    echo "[entrypoint] DATABASE_URL present, applying versioned Prisma migrations"

    if ! run_migrate_deploy_with_retries; then
      echo "[entrypoint] Migration deploy failed, checking whether schema already matches without migration history"

      if npx prisma migrate diff --from-url "$DATABASE_URL" --to-schema-datamodel prisma/schema.prisma --exit-code >/dev/null 2>&1; then
        echo "[entrypoint] Schema matches Prisma schema, recording existing migrations as applied"

        for migration_dir in prisma/migrations/*; do
          [ -d "$migration_dir" ] || continue
          migration_name=$(basename "$migration_dir")
          npx prisma migrate resolve --applied "$migration_name"
        done
      else
        echo "[entrypoint] Migration deploy failed and database schema does not match the repository schema"
        exit 1
      fi
    fi
  else
    echo "[entrypoint] No Prisma migrations found, syncing schema with prisma db push"
    run_with_retries npx prisma db push --skip-generate
  fi
else
  echo "[entrypoint] DATABASE_URL not set - skipping Prisma schema setup"
fi

echo "[entrypoint] Starting Next.js"
exec npm run start
