# MeetingFlow - MVP

MeetingFlow is a meeting management MVP built with Next.js, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and NextAuth.

The current codebase already includes:

- authenticated access with role information in session
- meeting dashboard with summary cards and upcoming sessions
- meeting directory with advanced filters and sorting
- meeting creation with agenda, location, schedule, registered participants, and ad hoc emails
- participant directory with manual creation and Excel import
- report pages and export endpoints
- scheduled notification records for invited participants
- Docker files for local and production-style deployment

## Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- NextAuth credentials provider
- `xlsx`, `docx`, `puppeteer`, `nodemailer`

## Local setup

1. Create a `.env` file with at least:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/meetingflow?schema=public"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

2. Install dependencies:

```bash
npm install
```

3. Apply the Prisma migration:

```bash
npx prisma migrate deploy
```

For a fresh local database, `npx prisma migrate dev --name init` also works.

4. Seed demo data:

```bash
npm run prisma:seed
```

5. Start the app:

```bash
npm run dev
```

6. Optional: start the notification scheduler in another terminal:

```bash
npm run scheduler
```

## Demo accounts

The seed creates these users:

- `admin@example.com` / `adminpass`
- `organizer@example.com` / `organizerpass`
- `participant@example.com` / `participantpass`

## Main routes

- `/` dashboard
- `/meetings` meeting list with filters
- `/meetings/create` meeting creation form
- `/participants` participant directory and Excel import
- `/calendar` placeholder calendar page
- `/reports/[meetingId]` report view
- `/auth/signin` custom sign-in page

## Participant import

The participant directory accepts Excel files and exposes a template at:

- `public/templates/participants-import-template.xlsx`

Expected columns:

- `Nom`
- `Email`

## API overview

- `GET/POST /api/meetings`
- `GET /api/meetings/[id]`
- `GET/POST /api/participants`
- `POST /api/participants/import`
- `GET/POST /api/reports/[meetingId]`
- `GET /api/reports/[meetingId]/export`
- `POST /api/notifications/schedule`
- `GET /api/health`

Most API routes require authentication. Creation endpoints are restricted to `ADMIN` and `ORGANIZER`.

## Docker

Local development with Docker:

```bash
docker compose up --build
```

The app runs on `http://localhost:3000`. PostgreSQL is exposed on `localhost:5432`.

The container entrypoint attempts to run Prisma migrations before starting Next.js.

## Build verification

Production build check:

```bash
npm run build
```

This passes on the current repository state.

## Notes

- The calendar page is still a placeholder.
- File storage is still local/logical only; no S3 integration is present.
- There are no automated tests configured yet.
