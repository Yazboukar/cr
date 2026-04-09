const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

(async function main() {
  const user = await prisma.user.findUnique({ where: { email: 'admin@example.com' } }) || await prisma.user.findFirst();
  if (!user) {
    console.error('No user found to create notification');
    process.exit(1);
  }

  const n = await prisma.notification.create({
    data: {
      userId: user.id,
      channel: 'EMAIL',
      scheduledAt: new Date(),
      status: 'PENDING'
    }
  });

  console.log('Created notification', n.id);
  await prisma.$disconnect();
})().catch(async (err) => {
  console.error(err);
  try { await prisma.$disconnect(); } catch (e) {}
  process.exit(1);
});
