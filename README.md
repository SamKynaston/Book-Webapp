# University Library Webapp: COM5409
## Information
### Executive Summary
This is a full-stack university library web application written in typescript. It uses a React + Vite frontend, which communicates to an Express + Sequelize backend, which then uses a Postgres database. There is additionally a small Typescript package library for types. It provides REST v1 endpoints for books, authors, users and inventory, and is packaged to run locally with Docker. 
### Stack
- Languages: Typescript (primary), CSS, Dockerfiles
- Framework: Vite + React (frontend), Express + Sequelize + Postgres (Backend)
- Notable Libraries: Tailwindcss, sequelize, jsonwebtoken, zod (for type validation)
## How to Execute
- Backend Port: 3000
- Frontend Port: 5173

> Ensure Docker/Docker Compose is installed
> Make sure the init script is executeable `chmod +x ./init.sh`. 
>> Use `docker-compose-up` if you'd prefer to run directly.
## Structure
├── README.md             # Project documentation and execution instructions
├── docker-compose.yml    # Orchestrates frontend, backend, and PostgreSQL services
├── init.sh               # Helper script to initialize and start the app
│
├── frontend/             # React + Vite application
│   ├── src/              # UI components, routes, and application logic
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies (React, React Router, Tailwind, Vite)
│   ├── nginx.conf        # Production Nginx configuration
│   └── Dockerfile
│
├── backend/              # Express API (TypeScript)
│   ├── src/
│   │   ├── server.ts     # App entry point & route mounts (/v1/books, /v1/authors, etc.)
│   │   ├── database.ts   # Sequelize initialization & database connection
│   │   ├── routes/       # API route definitions
│   │   ├── controllers/  # Request handlers and core business logic
│   │   ├── models/       # Sequelize database models
│   │   ├── schemas/      # Zod validation schemas
│   │   ├── middleware/   # Authentication & session middleware
│   │   └── sample.ts     # Seed script for development data
│   ├── package.json      # Dependencies (Express, Sequelize, pg, JWT, Zod)
│   └── Dockerfile
│
└── types/                # Shared TypeScript package
    ├── src/              # Common type definitions shared by frontend & backend
    └── package.json
