import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTransporter() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
    });
  }

  // Fallback to a JSON transport for local/dev testing (no external SMTP required)
  return nodemailer.createTransport({ jsonTransport: true });
}

export async function sendEmail(to: string, subject: string, html: string) {
  const transporter = await createTransporter();
  const from = process.env.SMTP_USER || 'no-reply@example.com';
  const info = await transporter.sendMail({ from, to, subject, html });

  if (!process.env.SMTP_HOST) {
    const preview = nodemailer.getTestMessageUrl(info);
    console.log('Ethereal preview URL:', preview);
  }

  return info;
}

export async function sendNotification(notification: any) {
  const user = await prisma.user.findUnique({ where: { id: notification.userId } });
  if (!user) throw new Error('User not found');

  if (notification.channel === 'EMAIL') {
    return sendEmail(user.email, 'Rappel réunion — MeetingFlow', `<p>Rappel: réunion prévue le ${notification.scheduledAt.toISOString()}</p>`);
  }

  // For IN_APP notifications we could create an activity item — already stored in the DB
  return true;
}
