-- Operational indexes and uniqueness constraints for reliable meeting management.
CREATE INDEX IF NOT EXISTS "Meeting_date_idx" ON "Meeting"("date");
CREATE INDEX IF NOT EXISTS "Meeting_status_idx" ON "Meeting"("status");
CREATE INDEX IF NOT EXISTS "Meeting_organizerId_idx" ON "Meeting"("organizerId");

DELETE FROM "MeetingParticipant" a
USING "MeetingParticipant" b
WHERE a."id" > b."id"
  AND a."meetingId" = b."meetingId"
  AND a."userId" = b."userId";

CREATE UNIQUE INDEX IF NOT EXISTS "MeetingParticipant_meetingId_userId_key" ON "MeetingParticipant"("meetingId", "userId");
CREATE INDEX IF NOT EXISTS "MeetingParticipant_userId_idx" ON "MeetingParticipant"("userId");
CREATE INDEX IF NOT EXISTS "MeetingParticipant_status_idx" ON "MeetingParticipant"("status");

CREATE INDEX IF NOT EXISTS "Notification_status_scheduledAt_idx" ON "Notification"("status", "scheduledAt");
CREATE INDEX IF NOT EXISTS "Notification_meetingId_idx" ON "Notification"("meetingId");
CREATE INDEX IF NOT EXISTS "Notification_userId_idx" ON "Notification"("userId");

CREATE INDEX IF NOT EXISTS "ReportActionItem_reportId_idx" ON "ReportActionItem"("reportId");
CREATE INDEX IF NOT EXISTS "ReportActionItem_ownerId_idx" ON "ReportActionItem"("ownerId");
CREATE INDEX IF NOT EXISTS "ReportActionItem_done_idx" ON "ReportActionItem"("done");

CREATE INDEX IF NOT EXISTS "AuditLog_model_modelId_idx" ON "AuditLog"("model", "modelId");
CREATE INDEX IF NOT EXISTS "AuditLog_actorId_idx" ON "AuditLog"("actorId");
CREATE INDEX IF NOT EXISTS "AuditLog_timestamp_idx" ON "AuditLog"("timestamp");
