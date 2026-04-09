import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminPass = await bcrypt.hash('adminpass', 10);
  const orgPass = await bcrypt.hash('organizerpass', 10);
  const partPass = await bcrypt.hash('participantpass', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      hashedPassword: adminPass,
      role: 'ADMIN'
    }
  });

  const organizer = await prisma.user.upsert({
    where: { email: 'organizer@example.com' },
    update: {},
    create: {
      email: 'organizer@example.com',
      name: 'Organizer',
      hashedPassword: orgPass,
      role: 'ORGANIZER'
    }
  });

  const participant = await prisma.user.upsert({
    where: { email: 'participant@example.com' },
    update: {},
    create: {
      email: 'participant@example.com',
      name: 'Participant',
      hashedPassword: partPass,
      role: 'PARTICIPANT'
    }
  });

  const meetingDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // tomorrow
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
      participants: {
        create: [{ user: { connect: { id: participant.id } }, status: 'INVITED' }]
      }
    }
  });

  console.log('Seeded:', { admin: admin.email, organizer: organizer.email, participant: participant.email, meeting: meeting.title });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
