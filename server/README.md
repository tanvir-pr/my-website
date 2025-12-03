# Portfolio Backend (Easy Setup)

## 1) Install dependencies

```bash
cd server
npm install
```

## 2) Configure environment

Copy `.env.example` to `.env` and update values:

- `DATABASE_URL`
- `OWNER_ANALYTICS_PASSWORD`
- `CLIENT_ORIGIN`

## 3) Run backend

```bash
npm run dev
```

Backend runs at `http://localhost:4000`.

## API Routes

- `GET /api/health`
- `GET /api/projects`
- `GET /api/experiences`
- `POST /api/contact`
- `POST /api/analytics/event`
- `POST /api/owner/login`
- `GET /api/owner/stats` (requires `x-owner-token` header)
- `POST /api/owner/projects` (requires `x-owner-token`)
- `PUT /api/owner/projects/:id` (requires `x-owner-token`)
- `DELETE /api/owner/projects/:id` (requires `x-owner-token`)
- `POST /api/owner/experiences` (requires `x-owner-token`)
- `PUT /api/owner/experiences/:id` (requires `x-owner-token`)
- `DELETE /api/owner/experiences/:id` (requires `x-owner-token`)

## Notes

- Tables are auto-created on startup.
- Seed projects are inserted only when `projects` table is empty.
