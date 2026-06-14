const { PrismaClient } = require('@prisma/client');

(async () => {
  const p = new PrismaClient();
  try {
    await p.$connect();
    console.log('Prisma connected');
    const u = await p.user.findMany({ take: 1 });
    console.log('users count:', u.length);
  } catch (e) {
    console.error('PRISMA ERR', e.message);
  } finally {
    await p.$disconnect();
  }
})();
