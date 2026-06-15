-- Flexible document edition: a report can be any document type, with a layout
-- template and per-document customization stored as JSON.
ALTER TABLE "Report" ADD COLUMN "documentType" TEXT NOT NULL DEFAULT 'Compte rendu';
ALTER TABLE "Report" ADD COLUMN "template" TEXT NOT NULL DEFAULT 'OFFICIAL';
ALTER TABLE "Report" ADD COLUMN "layout" JSONB;
