import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../src/lib/prisma';
import { requireRole } from '../../../../src/lib/permissions';
import { canPerform, nextStatus, type ReportAction } from '../../../../src/lib/reportWorkflow';
import { logAction } from '../../../../src/lib/audit';

const ACTIONS: ReportAction[] = ['submit', 'approve', 'reject', 'archive'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }

  const { meetingId } = req.query as { meetingId: string };

  const session = await requireRole(req, res, ['ADMIN', 'ORGANIZER', 'REPORTER']);
  if (!session) return;

  const action = String(req.body?.action || '') as ReportAction;
  if (!ACTIONS.includes(action)) {
    return res.status(400).json({ error: 'Action invalide' });
  }

  const report = await prisma.report.findUnique({
    where: { meetingId },
    include: { meeting: { select: { organizerId: true } } },
  });
  if (!report) return res.status(404).json({ error: 'Compte rendu introuvable' });

  const ctx = {
    role: session.user.role,
    userId: session.user.id,
    authorId: report.authorId,
    organizerId: report.meeting.organizerId,
  };

  if (!canPerform(action, report.status, ctx)) {
    return res.status(403).json({ error: "Transition non autorisée depuis l'état actuel." });
  }

  const to = nextStatus(action)!;
  const data: Record<string, unknown> = { status: to };
  if (action === 'submit') data.submittedAt = new Date();
  if (action === 'approve') {
    data.approvedAt = new Date();
    data.approvedById = session.user.id;
  }
  if (action === 'reject') {
    data.approvedAt = null;
    data.approvedById = null;
    data.submittedAt = null;
  }

  const updated = await prisma.report.update({ where: { id: report.id }, data });
  await logAction('Report', report.id, 'TRANSITION', session.user.id, {
    action,
    from: report.status,
    to,
  });

  return res.status(200).json({ report: updated });
}
