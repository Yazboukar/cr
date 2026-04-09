const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');

const prisma = new PrismaClient();

async function createTransporter() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
    });
  }

  // Use JSON transport locally to avoid network/TLS issues inside CI/container
  return nodemailer.createTransport({ jsonTransport: true });
}

(async function main() {
  const user = await prisma.user.findUnique({ where: { email: 'admin@example.com' } }) || await prisma.user.findFirst();
  if (!user) {
    console.error('No user found in DB to send test email');
    process.exit(1);
  }

  const transporter = await createTransporter();
  const from = process.env.SMTP_USER || 'no-reply@example.com';
  const info = await transporter.sendMail({
    from,
    to: user.email,
    subject: 'MeetingFlow — Test Notification',
    html: `<p>Test email for ${user.email} at ${new Date().toISOString()}</p>`
  });

  console.log('Sent test email to', user.email);
  if (!process.env.SMTP_HOST) {
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  }

  await prisma.$disconnect();
})().catch(async (err) => {
  console.error('Test notification failed', err);
  try { await prisma.$disconnect(); } catch (e) {}
  process.exit(1);
});
