const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

(async function main() {
  const list = await prisma.notification.findMany({ orderBy: { createdAt: 'desc' }, take: 20 });
  console.log(JSON.stringify(list, null, 2));
  await prisma.$disconnect();
})().catch(async (err) => {
  console.error(err);
  try { await prisma.$disconnect(); } catch (e) {}
  process.exit(1);
});
