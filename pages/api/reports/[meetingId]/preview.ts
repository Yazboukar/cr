import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/lib/prisma';
import { buildReportHtml } from '../../../../services/export';
import { requireAuth, requireMeetingAccess } from '../../../../src/lib/permissions';
import { normalizeOptionalString, normalizeString } from '../../../../src/lib/validation';
import { normalizeTemplate, resolveLayout, sanitizeLayout } from '../../../../src/lib/documentTemplates';
import { readEmblemDataUri } from '../../../../src/lib/emblem';

// Renders the document HTML from the live editor draft (no save required) so the
// preview matches what the PDF export will produce.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  const { meetingId } = req.query as { meetingId: string };
  const session = await requireAuth(req, res);
  if (!session) return;
  if (!(await requireMeetingAccess(res, session, meetingId))) return;

  const body = req.body || {};
  const title = normalizeString(body.title) || 'Document';
  const content = normalizeOptionalString(body.content) || '';
  const recipient = normalizeOptionalString(body.recipient);
  const documentType = normalizeString(body.documentType) || 'Compte rendu';
  const template = normalizeTemplate(body.template);
  const layout = resolveLayout(template, sanitizeLayout(body.layout));

  const existing = await prisma.report.findUnique({
    where: { meetingId },
    select: {
      status: true,
      createdAt: true,
      approvedAt: true,
      author: { select: { name: true, email: true } },
      approvedBy: { select: { name: true, email: true } },
    },
  });

  const meta = {
    documentType,
    status: existing?.status || 'DRAFT',
    approvedByName: existing?.approvedBy?.name || existing?.approvedBy?.email || null,
    approvedAt: existing?.approvedAt || null,
    recipient,
    objet: title,
    authorName:
      existing?.author?.name || existing?.author?.email || session.user.name || session.user.email || null,
    documentDate: existing?.approvedAt || existing?.createdAt || new Date(),
    emblemDataUri: readEmblemDataUri(),
    layout,
  };

  const html = buildReportHtml({ title, content }, meta);
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.send(html);
}
