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

function buildReminderLabel(notification) {
  if (!notification.meeting) {
    return 'a venir';
  }

  const meetingStart = new Date(notification.meeting.startTime || notification.meeting.date);
  const diffMinutes = Math.round(
    (meetingStart.getTime() - new Date(notification.scheduledAt).getTime()) / 60000
  );

  if (diffMinutes >= 1440) {
    return 'dans 1 jour';
  }

  if (diffMinutes >= 60) {
    return `dans ${Math.round(diffMinutes / 60)} heure(s)`;
  }

  return `dans ${diffMinutes} minute(s)`;
}

async function processNotifications() {
  const now = new Date();
  const pending = await prisma.notification.findMany({
    where: { scheduledAt: { lte: now }, status: 'PENDING' },
    include: { user: true, meeting: true }
  });

  for (const notification of pending) {
    // Atomic claim: only one worker can move this row out of PENDING, so
    // running several schedulers concurrently never sends a reminder twice.
    const claim = await prisma.notification.updateMany({
      where: { id: notification.id, status: 'PENDING' },
      data: { status: 'SENT', sentAt: new Date() }
    });

    if (claim.count === 0) {
      continue; // already claimed/sent by another worker
    }

    try {
      const user = notification.user;
      if (!user) {
        console.error('User not found for notification', notification.id);
        await prisma.notification.update({
          where: { id: notification.id },
          data: { status: 'FAILED', sentAt: null }
        });
        continue;
      }

      if (notification.channel === 'EMAIL') {
        const meetingTitle = notification.meeting?.title || 'Reunion';
        const meetingStart = notification.meeting
          ? new Date(notification.meeting.startTime || notification.meeting.date).toLocaleString()
          : new Date(notification.scheduledAt).toLocaleString();

        await sendEmail(
          user.email,
          `Rappel reunion - ${meetingTitle}`,
          `<p>Bonjour,</p><p>La reunion <strong>${meetingTitle}</strong> est prevue ${buildReminderLabel(notification)}.</p><p>Date et heure de debut: ${meetingStart}</p>`
        );
      }
      // Row was already marked SENT by the claim above.
    } catch (err) {
      console.error('Failed to send notification', err);
      try {
        // Roll the claim back to FAILED so the failure is visible and not
        // mistaken for a successful send.
        await prisma.notification.update({
          where: { id: notification.id },
          data: { status: 'FAILED', sentAt: null }
        });
      } catch (error) {
        console.error('Failed to mark notification as FAILED', error);
      }
    }
  }
}

console.log('Scheduler starting - will run every minute.');
cron.schedule('* * * * *', () => {
  processNotifications().catch((err) => console.error('Scheduler error', err));
});

processNotifications().catch((err) => console.error('Initial scheduler run failed', err));

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection', err);
});

module.exports = {};
