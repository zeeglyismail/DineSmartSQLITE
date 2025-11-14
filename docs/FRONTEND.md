# Frontend (React + Vite) Documentation

This project uses a React app built with Vite. The `frontend/package.json` contains scripts and dependencies.

## Requirements

- Node.js 16+ and npm

## Setup

1. Change to the frontend directory:

   cd frontend

2. Install dependencies:

   npm install

3. Start the dev server with hot reload:

   npm run dev

4. Build for production:

   npm run build

5. Preview the production build locally:

   npm run preview

## Environment / API base URL

The frontend expects the backend API to be reachable at the address configured in the app's code (check `src` files for `fetch`/`axios` base URLs). During local dev, backend is usually at `http://localhost:8000` and the Vite dev server at `http://localhost:5173`.

## Linting

The project includes ESLint dev dependencies. Run:

  npm run lint

## Troubleshooting
 ## Contributing
 Please refer to the CONTRIBUTING.md file for guidelines on contributing to this project.
- Port conflicts: change the Vite port in `vite.config.js` or start with `PORT=... npm run dev`.
