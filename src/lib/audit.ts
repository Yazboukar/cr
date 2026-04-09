import { prisma } from './prisma';

export async function logAction(model: string, modelId: string, action: string, actorId?: string | null, diff?: any) {
  try {
    await prisma.auditLog.create({ data: { model, modelId, action, actorId, diff } as any });
  } catch (err) {
    console.error('Failed to write audit log', err);
  }
}
