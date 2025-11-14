# Backend (Django) Documentation

This document explains how to set up, run, and extend the backend API.

## Requirements

- Python 3.10+
- virtualenv (or venv)
- PostgreSQL for production (optional). The default dev DB is SQLite.

## Setup

1. Change to the backend directory:

   cd backend

2. Create and activate a virtual environment:

   python -m venv venv
   source venv/bin/activate

3. Install dependencies:

   pip install -r requirements.txt

python manage.py makemigrations

4. Apply migrations:

   python manage.py migrate

5. Create a superuser to access the admin:

   python manage.py createsuperuser

6. Run the development server:

   python manage.py runserver

### Environment variables

The project now reads configuration from environment variables via `python-decouple`. For local development you can create a `.env` file inside the `backend/` directory. An example file is provided at `backend/.env.example`.

Important environment variables:

- SECRET_KEY - Django secret key (use a secure random value in production)
- DEBUG - True/False
- ALLOWED_HOSTS - comma-separated list of allowed hosts
- DATABASE_URL - optional. If provided, should be a full database URL (Postgres). Example: `postgres://USER:PASSWORD@HOST:PORT/DBNAME`. If empty, the project uses SQLite (`db.sqlite3`).
- EMAIL_HOST_USER - Email account used for sending mail
- EMAIL_HOST_PASSWORD - Email account password or app password

Example: copy `backend/.env.example` to `backend/.env` and fill values before running.

### DATABASE_URL Example

To configure PostgreSQL, set the `DATABASE_URL` environment variable in your `.env` file. Example:

```
DATABASE_URL=postgres://mshosen2001:12345@127.0.0.1:5432/kgsw
```

The backend will use this URL to connect to your Postgres database. If `DATABASE_URL` is not set, the project defaults to using a local SQLite database (`db.sqlite3`) for development.

### Static and media files

- Static files collect to `STATIC_ROOT` (default `staticfiles`) using `python manage.py collectstatic`.
- Uploaded files (images) are stored under `media/`.

### Common commands

- Run tests: python manage.py test
- Linting / formatting: project doesn't include a linter by default; consider running tools like flake8/black.

### Notes on settings

- `AUTH_USER_MODEL` is `authentication.UserAccount` (see `backend/authentication/models.py`).
- Default DB in `config/settings.py` is SQLite for local dev. For production set `DATABASES` appropriately.

### Troubleshooting

- Django import errors: ensure virtualenv is activated and `pip install -r requirements.txt` succeeded.
- Database lock errors (SQLite): delete `db.sqlite3` if you can reset dev data, or switch to PostgreSQL for parallel development.
