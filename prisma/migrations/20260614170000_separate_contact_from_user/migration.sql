-- Separate the Contact directory (invitees, no login) from authenticated User
-- accounts. Participants, notification targets and action-item owners become
-- Contacts. The backfill reuses each User id as the Contact id so existing
-- foreign keys can be repointed in place (production-safe; on an empty database
-- the backfill simply selects nothing).

-- 1. Contact table
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Contact_email_key" ON "Contact"("email");

-- 2. Backfill Contacts from every User referenced as participant / notification
--    target / action-item owner, reusing the same id.
INSERT INTO "Contact" ("id", "name", "email", "createdAt")
SELECT u."id", u."name", u."email", u."createdAt"
FROM "User" u
WHERE u."id" IN (
    SELECT "userId" FROM "MeetingParticipant"
    UNION
    SELECT "userId" FROM "Notification"
    UNION
    SELECT "ownerId" FROM "ReportActionItem" WHERE "ownerId" IS NOT NULL
)
ON CONFLICT ("id") DO NOTHING;

-- 3. MeetingParticipant.userId -> contactId (FK to Contact)
ALTER TABLE "MeetingParticipant" DROP CONSTRAINT IF EXISTS "MeetingParticipant_userId_fkey";
ALTER TABLE "MeetingParticipant" DROP CONSTRAINT IF EXISTS "MeetingParticipant_meetingId_userId_key";
DROP INDEX IF EXISTS "MeetingParticipant_meetingId_userId_key";
DROP INDEX IF EXISTS "MeetingParticipant_userId_idx";
ALTER TABLE "MeetingParticipant" RENAME COLUMN "userId" TO "contactId";
CREATE UNIQUE INDEX "MeetingParticipant_meetingId_contactId_key" ON "MeetingParticipant"("meetingId", "contactId");
CREATE INDEX "MeetingParticipant_contactId_idx" ON "MeetingParticipant"("contactId");
ALTER TABLE "MeetingParticipant" ADD CONSTRAINT "MeetingParticipant_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 4. Notification.userId -> contactId (FK to Contact)
ALTER TABLE "Notification" DROP CONSTRAINT IF EXISTS "Notification_userId_fkey";
DROP INDEX IF EXISTS "Notification_userId_idx";
ALTER TABLE "Notification" RENAME COLUMN "userId" TO "contactId";
CREATE INDEX "Notification_contactId_idx" ON "Notification"("contactId");
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- 5. ReportActionItem.ownerId now references Contact
ALTER TABLE "ReportActionItem" DROP CONSTRAINT IF EXISTS "ReportActionItem_ownerId_fkey";
ALTER TABLE "ReportActionItem" ADD CONSTRAINT "ReportActionItem_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- 6. Remove migrated invitees that were never real accounts (no password) and
--    are not referenced as organizer / author / actor / uploader.
DELETE FROM "User" u
WHERE u."role" = 'PARTICIPANT'
  AND u."hashedPassword" IS NULL
  AND NOT EXISTS (SELECT 1 FROM "Meeting" m WHERE m."organizerId" = u."id")
  AND NOT EXISTS (SELECT 1 FROM "Report" r WHERE r."authorId" = u."id")
  AND NOT EXISTS (SELECT 1 FROM "AuditLog" a WHERE a."actorId" = u."id")
  AND NOT EXISTS (SELECT 1 FROM "Attachment" att WHERE att."uploadedById" = u."id");
