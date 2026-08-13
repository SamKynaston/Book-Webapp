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
> README.MD                   details about the project, ways to execute and use
> docker-compose.yml          docker compose for frontend + backend (and DB)
> init.sh                     helper script to start the system
> frontend/                   Vite + React app (index.html, src/, tailwind, vite config)
>  package.json              deps: react, react-dom, react-router-dom, tailwind, vite
>  src/                      React app source (UI, routes, components)
>  public/                   static assets
>  Dockerfile, nginx.conf
> backend/                    Express API in TypeScript
>  package.json              deps: express, sequelize, pg, jsonwebtoken, bcrypt, zod
>  src/
>    server.ts               app bootstrap, routes mounted (/v1/books, /v1/authors, /v1/users, /v1/inventory)
>    database.ts             Sequelize initialization (Postgres)
>    routes/                 route modules for the API surface
>    controllers/            request handlers and business logic
>    models/                 Sequelize models
>    schemas/                validation (zod) schemas
>    middleware/             auth / session middleware
>    sample.ts               seedSampleData called in DEVELOPMENT
>  Dockerfile
> types/                      local package with shared TypeScript types used by frontend & backend
>  package.json
>  src/                      type definitions

