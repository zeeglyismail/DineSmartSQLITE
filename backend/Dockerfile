FROM python:3.12-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --prefix=/install -r requirements.txt

FROM python:3.12-slim AS runtime

RUN adduser --disabled-password --gecos '' dinesmartuser

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY --from=builder /install /usr/local
COPY . .

# db.sqlite3 is copied automatically since it's inside the backend folder
# this includes ALL your data!

USER dinesmartuser

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
