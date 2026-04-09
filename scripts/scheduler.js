const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');

const prisma = new PrismaClient();

async function createTransporter() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // Fallback to json transport in development to avoid external SMTP/TLS issues
  return nodemailer.createTransport({ jsonTransport: true });
}

async function sendEmail(to, subject, html) {
  const transporter = await createTransporter();
  const from = process.env.SMTP_USER || 'no-reply@example.com';
  const info = await transporter.sendMail({ from, to, subject, html });
  if (!process.env.SMTP_HOST) {
    console.log('Local email payload (jsonTransport):', info);
  }
  return info;
}

async function processNotifications() {
  const now = new Date();
  const pending = await prisma.notification.findMany({ where: { scheduledAt: { lte: now }, status: 'PENDING' } });
  for (const n of pending) {
    try {
      const user = await prisma.user.findUnique({ where: { id: n.userId } });
      if (!user) {
        console.error('User not found for notification', n.id);
        await prisma.notification.update({ where: { id: n.id }, data: { status: 'FAILED' } });
        continue;
      }

      if (n.channel === 'EMAIL') {
        await sendEmail(user.email, 'Rappel réunion — MeetingFlow', `<p>Rappel: réunion prévue le ${n.scheduledAt.toISOString()}</p>`);
      }

      await prisma.notification.update({ where: { id: n.id }, data: { status: 'SENT', sentAt: new Date() } });
    } catch (err) {
      console.error('Failed to send notification', err);
      try {
        await prisma.notification.update({ where: { id: n.id }, data: { status: 'FAILED' } });
      } catch (e) {
        console.error('Failed to mark notification as FAILED', e);
      }
    }
  }
}

console.log('Scheduler starting — will run every minute.');
cron.schedule('* * * * *', () => {
  processNotifications().catch((err) => console.error('Scheduler error', err));
});

// run once immediately
processNotifications().catch((err) => console.error('Initial scheduler run failed', err));

// keep process alive
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection', err);
});

module.exports = {};
