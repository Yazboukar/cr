-- Per-meeting IANA timezone (e.g. "Europe/Paris"). Nullable: existing rows fall
-- back to the application default timezone at read time.
ALTER TABLE "Meeting" ADD COLUMN IF NOT EXISTS "timezone" TEXT;
