-- Approval workflow metadata for reports (official meeting minutes).
ALTER TABLE "Report" ADD COLUMN "submittedAt" TIMESTAMP(3);
ALTER TABLE "Report" ADD COLUMN "approvedAt" TIMESTAMP(3);
ALTER TABLE "Report" ADD COLUMN "approvedById" TEXT;

CREATE INDEX "Report_approvedById_idx" ON "Report"("approvedById");

ALTER TABLE "Report" ADD CONSTRAINT "Report_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
