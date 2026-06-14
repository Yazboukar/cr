import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../src/lib/prisma';
import { requireAuth, requireMeetingAccess, requireRole } from '../../../src/lib/permissions';
import { normalizeOptionalString, normalizeString } from '../../../src/lib/validation';
import { logAction } from '../../../src/lib/audit';

const REPORT_STATUSES = ['DRAFT', 'UNDER_REVIEW', 'APPROVED', 'ARCHIVED'] as const;

function normalizeActionItems(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ({
      description: normalizeString(item?.description),
      ownerId: normalizeOptionalString(item?.ownerId),
      dueDate: normalizeOptionalString(item?.dueDate),
      done: Boolean(item?.done),
    }))
    .filter((item) => item.description.length > 0);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { meetingId } = req.query as { meetingId: string };
  if (req.method === 'GET') {
    const session = await requireAuth(req, res);
    if (!session) return;
    if (!(await requireMeetingAccess(res, session, meetingId))) return;

    const report = await prisma.report.findUnique({
      where: { meetingId },
      include: { author: { select: { id: true, name: true, email: true } }, actionItems: true },
    });

    if (!report) return res.status(404).json({ error: 'Compte rendu introuvable' });
    return res.status(200).json({ report });
  }

  if (req.method === 'POST') {
    const session = await requireRole(req, res, ['ADMIN', 'ORGANIZER', 'REPORTER']);
    if (!session) return;

    const title = normalizeString(req.body?.title);
    const content = normalizeOptionalString(req.body?.content);
    const summary = normalizeOptionalString(req.body?.summary);
    const status = normalizeString(req.body?.status) || 'DRAFT';
    const actionItems = normalizeActionItems(req.body?.actionItems);

    if (!title) {
      return res.status(400).json({ error: 'Titre requis' });
    }

    if (!REPORT_STATUSES.includes(status as any)) {
      return res.status(400).json({ error: 'Statut invalide' });
    }

    const meeting = await prisma.meeting.findUnique({ where: { id: meetingId } });
    if (!meeting) return res.status(404).json({ error: 'Réunion introuvable' });

    const now = new Date();
    if (meeting.status !== 'COMPLETED' && meeting.date > now) {
      return res.status(400).json({ error: 'Le compte rendu ne peut être créé que pour une réunion passée ou terminée' });
    }

    const existing = await prisma.report.findUnique({ where: { meetingId } });
    if (existing) {
      // only author or admin can update
      const userId = session.user.id;
      if (existing.authorId !== userId && session.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Vous ne pouvez pas modifier ce compte rendu' });
      }
      const updated = await prisma.$transaction(async (tx) => {
        const report = await tx.report.update({
          where: { id: existing.id },
          data: { title, content, summary, status: status as any },
        });

        await tx.reportActionItem.deleteMany({ where: { reportId: existing.id } });
        if (actionItems.length > 0) {
          await tx.reportActionItem.createMany({
            data: actionItems.map((item) => ({
              reportId: existing.id,
              description: item.description,
              ownerId: item.ownerId,
              dueDate: item.dueDate ? new Date(item.dueDate) : null,
              done: item.done,
            })),
          });
        }

        return report;
      });
      await logAction('Report', existing.id, 'UPDATE', userId, { meetingId, actionItems: actionItems.length });
      return res.status(200).json({ report: updated });
    }

    const report = await prisma.report.create({
      data: {
        meeting: { connect: { id: meetingId } },
        title,
        summary,
        content,
        status: status as any,
        author: { connect: { id: session.user.id } },
        actionItems: {
          create: actionItems.map((item) => ({
            description: item.description,
            ownerId: item.ownerId,
            dueDate: item.dueDate ? new Date(item.dueDate) : null,
            done: item.done,
          })),
        },
      } as any,
    });
    await logAction('Report', report.id, 'CREATE', session.user.id, { meetingId, actionItems: actionItems.length });
    return res.status(201).json({ report });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Méthode ${req.method} non autorisée`);
}
