const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

(async function main() {
  const adminPass = await bcrypt.hash('adminpass', 10);
  const orgPass = await bcrypt.hash('organizerpass', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: { email: 'admin@example.com', name: 'Admin', hashedPassword: adminPass, role: 'ADMIN' }
  });

  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@example.com' },
    update: {},
    create: { email: 'organizer@example.com', name: 'Organizer', hashedPassword: orgPass, role: 'ORGANIZER' }
  });

  // Invitee directory entry (a Contact has no login).
  const participant = await prisma.contact.upsert({
    where: { email: 'participant@example.com' },
    update: {},
    create: { email: 'participant@example.com', name: 'Participant' }
  });

  const meetingDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const meeting = await prisma.meeting.create({
    data: {
      title: 'Kickoff Meeting',
      description: 'Initial kickoff to align team and goals',
      type: 'Kickoff',
      date: meetingDate,
      startTime: new Date(meetingDate.getTime() + 9 * 60 * 60 * 1000),
      endTime: new Date(meetingDate.getTime() + 10 * 60 * 60 * 1000),
      location: 'Conference Room A',
      agenda: 'Project goals, milestones, responsibilities',
      status: 'PLANNED',
      organizer: { connect: { id: organizer.id } },
      participants: { create: [{ contact: { connect: { id: participant.id } }, status: 'INVITED' }] }
    }
  });

  console.log('Seeded:', { admin: admin.email, organizer: organizer.email, participant: participant.email, meeting: meeting.title });
})()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
