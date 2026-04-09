import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { sendNotification } from '../services/notification';

const prisma = new PrismaClient();

async function processNotifications() {
  const now = new Date();
  const pending = await prisma.notification.findMany({ where: { scheduledAt: { lte: now }, status: 'PENDING' } });
  for (const n of pending) {
    try {
      await sendNotification(n);
      await prisma.notification.update({ where: { id: n.id }, data: { status: 'SENT', sentAt: new Date() } });
    } catch (err) {
      console.error('Failed to send notification', err);
      await prisma.notification.update({ where: { id: n.id }, data: { status: 'FAILED' } });
    }
  }
}

console.log('Scheduler starting — will run every minute.');
cron.schedule('* * * * *', () => {
  processNotifications().catch(console.error);
});

// run once immediately
processNotifications().catch(console.error);
