# MeetingFlow — MVP

Minimal Meeting & report management app (MVP) built with Next.js, TypeScript, Tailwind, Prisma and PostgreSQL.

Quick start (local)

1. Copy env: `cp .env.example .env` and fill values.
2. Install dependencies: `npm install`.
3. Run database migrations: `npx prisma migrate dev --name init`.
4. Seed demo data: `npm run prisma:seed`.
5. Start dev server: `npm run dev`.
6. Optional: run scheduler in separate terminal: `npm run scheduler`.

Docker (local)

- Build and start services: `docker-compose up --build`.
- The app will be available at `http://localhost:3000` and Postgres on port `5432`.
- After the DB is up you may need to run migrations inside the container or from host:

```bash
# from host (if you have prisma installed locally)
export DATABASE_URL="postgresql://postgres:password@localhost:5432/meetingflow?schema=public"
npx prisma migrate deploy
npm run prisma:seed
```

What is included

- Basic Next.js + TypeScript scaffold
- Tailwind CSS styling
- Prisma schema and seed script with demo data
- Auth via NextAuth (Credentials provider) and Prisma adapter
- API endpoints for meetings, reports, attachments, notifications
- Scheduler script to process pending notifications (`scripts/scheduler.ts`)
- Export utilities for PDF/DOCX (`services/export.ts`) using Puppeteer and `docx`
- Dockerfile and `docker-compose.yml` for local development

Next steps / MVP scope

- Improve permissions and role-based access control
- Add file upload storage (S3 or similar) for attachments
- Add unit/integration tests
- Improve UI/UX and mobile responsiveness
- Add calendar view and filters

Quick Deployment — Render (recommended)

1. Push your repository to GitHub.
2. Go to Render (https://dashboard.render.com) and create a new "Web Service".
	- Connect your GitHub repo and select the branch to deploy.
	- Choose "Docker" as the environment and leave the `Dockerfile` path as-is.
3. Create a managed Postgres database on Render (Databases → New Database) and note the `DATABASE_URL`.
4. In the Web Service settings, add environment variables:
	- `DATABASE_URL` set to the managed DB connection string
	- `NEXTAUTH_SECRET` (set a strong secret)
	- `NEXTAUTH_URL` set to your Render service URL (https://your-service.onrender.com)
5. Deploy — Render will build the Docker image and start the service. The entrypoint will apply migrations (if DB reachable) and start the Next.js server.

Quick Deployment — VPS or Docker host

1. Copy `docker-compose.prod.yml` to the server and update `DATABASE_URL` / secrets as needed.
2. Run:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

3. The container will attempt to apply migrations at startup, then start the app on port `3000`.

Notes

- The Docker image runs a migration step (`prisma migrate deploy`) at container startup if `DATABASE_URL` is set. For production control you may prefer to run migrations manually via a one-off job.
- Ensure `NEXTAUTH_SECRET` is set to a secure random value in production.
- If you deploy to Vercel, provide an external Postgres (Railway, Render DB, ElephantSQL) and set `DATABASE_URL` in Vercel project settings.

