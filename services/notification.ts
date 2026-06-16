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

function appBaseUrl() {
  return process.env.NEXTAUTH_URL || 'http://localhost:3000';
}

export async function sendPasswordResetEmail(to: string, token: string) {
  const link = `${appBaseUrl()}/auth/reset?token=${token}`;
  return sendEmail(
    to,
    'Réinitialisation de votre mot de passe — MeetingFlow',
    `<p>Bonjour,</p><p>Pour réinitialiser votre mot de passe, cliquez sur le lien ci-dessous (valable 1 heure) :</p><p><a href="${link}">${link}</a></p><p>Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.</p>`
  );
}

export async function sendInviteEmail(to: string, token: string, role: string) {
  const link = `${appBaseUrl()}/auth/reset?token=${token}`;
  return sendEmail(
    to,
    'Invitation à MeetingFlow',
    `<p>Bonjour,</p><p>Un compte « ${role} » vous a été créé sur MeetingFlow. Définissez votre mot de passe via le lien ci-dessous (valable 72 heures) :</p><p><a href="${link}">${link}</a></p>`
  );
}

export async function sendNotification(notification: any) {
  const contact = await prisma.contact.findUnique({ where: { id: notification.contactId } });
  if (!contact) throw new Error('Contact not found');

  if (notification.channel === 'EMAIL') {
    return sendEmail(contact.email, 'Rappel réunion — MeetingFlow', `<p>Rappel: réunion prévue le ${notification.scheduledAt.toISOString()}</p>`);
  }

  // For IN_APP notifications we could create an activity item — already stored in the DB
  return true;
}
