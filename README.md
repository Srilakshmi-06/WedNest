# WedNest - Perfect Vendors for Your Perfect Day

WedNest is a full-stack wedding services platform tailored for discovering the finest wedding vendors and getting in touch with them effortlessly. Featuring a modern, highly responsive design with elegant UI components built entirely from scratch using React, TanStack Router, and Tailwind CSS. The backend utilizes Node.js, Express, and PostgreSQL.

## Core Features
1. **JWT Authentication**: Full-fledged authentication with hashed passwords (bcrypt).
2. **Beautiful Vendor Discovery**: Browse vendors filtered by categories like Photographers, Venues, etc.
3. **Vendor Details**: Check out detailed profiles with pricing, services, locations, and descriptions.
4. **Seamless Inquiry Management**: Directly contact vendors from their profiles and manage your inquiries via the User Dashboard.
5. **Robust User Dashboard**: Review and manage sent inquiries and update profile details.

## Tech Stack
- Frontend: React.js, TanStack Router, Tailwind CSS 4+, Lucide Icons
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Infrastructure Ready: Structured for easily deploying Frontend to Vercel and Backend to Render.

## Project Structure
```text
WedNest/
├── backend/
│   ├── .env                       # Environment variables (DB Connection)
│   ├── db.js                      # PostgreSQL pool setup and table auto-creation
│   ├── index.js                   # Application entry and REST routing
│   ├── seed.js                    # Seeder script to provide dummy vendor data
│   ├── controllers/               # Auth, vendor, and inquiry request controllers
│   ├── middleware/                # JWT verification checks
│   ├── routes/                    # Route handlers mapping to controllers
│   └── package.json
└── frontend/
    ├── src/
    │   ├── context/AuthContext.jsx # Stateful authentication context 
    │   ├── components/AppLayout.jsx# Navigation & Layout structure with TanStack Router
    │   ├── pages/                  # Route specific pages (Home, Dashboard, Vendors, etc)
    │   ├── router/index.jsx        # Routing manifest & architecture mapping 
    │   ├── main.jsx                # Render target and strict mode enabler
    │   └── index.css               # Required Tailwind base injections
    ├── .env                        # Vite ENV configurations
    ├── tailwind.config.js          # Specific theme and styling plugins (colors)
    └── package.json
```

## Setup Instructions

### Backend (Node/Express/Postgres)
1. Ensure your PostgreSQL instance is running on your machine.
2. Navigate to the `backend` directory.
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Adjust your Database Connection inside `backend/.env`. Specifically update the `DATABASE_URL` line to match your PostgreSQL server.
   *Example: `postgres://postgres:mypassword@localhost:5432/wednest`*
5. Seed initial data and auto-create tables:
   ```bash
   node seed.js
   ```
6. Start the server:
   ```bash
   npm run dev
   # or
   node index.js
   ```
   *The server will run on http://localhost:5000.*

### Frontend (React/Vite/Tailwind)
1. Navigate to the `frontend` directory.
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   *Open the Local URL (usually http://localhost:5173).*
