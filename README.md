# Dine Smart

A clean, lightweight restaurant management app for menus, orders, table assignments, and basic analytics. This repository contains a Django backend and a React + Vite frontend. The docs in this repo explain how to set up, run, and contribute to the project.

## Contents

- backend/: Django REST API and admin site
- frontend/: React + Vite single-page app
- docs/: Additional documentation (backend/frontend/API/CONTRIBUTING)
- run-instruction.txt: quick start notes

## Quick start (development)

Requirements: Python 3.10+, Node.js 16+/npm, virtualenv (recommended)

1) Backend

    cd backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver

    The backend will be available at http://127.0.0.1:8000

2) Frontend

    cd frontend
    npm install
    npm run dev

    The frontend dev server typically runs at http://localhost:5173

For more details and troubleshooting, see the files under the `docs/` directory.

## Architecture overview

- Django REST Framework serves JSON APIs and includes a custom `authentication` app with `UserAccount` as the auth user model. The default database is SQLite for development (`backend/db.sqlite3`), configured in `backend/config/settings.py`.
- The frontend is a React app bootstrapped to work with Vite and communicates with the backend over the configured CORS origins.

## Project layout (high level)

backend/
- config/: Django project settings and URLs
- authentication/: custom user model and auth endpoints
- menu/, order/, cart/, table/, etc.: domain apps

frontend/
- src/: React source code

docs/
- BACKEND.md - Detailed backend setup and env variables
- FRONTEND.md - Frontend setup and build steps
- API.md - API endpoints and authentication notes
- CONTRIBUTING.md - Contribution guidelines and code style

## Contributing

Please read `CONTRIBUTING.md` in the repository root for guidelines on development, tests, and pull requests.

## License

This repository currently doesn't include a license file. Add a `LICENSE` if you want to make the project open-source.

## Environment Configuration

Before running the backend, copy the example environment file and update it with your settings:

```bash
cd backend
cp .env.example .env
```

Edit `.env` to provide valid values for email host configuration (e.g., SMTP server, port, credentials).  
You can also use PostgreSQL instead of SQLite by updating the database settings in `.env`.  
If your environment uses a `DATABASE_URL`, it should look like:

```
DATABASE_URL=postgres://mshosen2001:12345@127.0.0.1:5432/kgsw
```

Alternatively, you can set individual database fields:

```

Make sure PostgreSQL is installed and the database/user exist before running migrations.