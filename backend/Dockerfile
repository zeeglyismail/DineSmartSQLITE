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

# FIX: give sqlite write permission
RUN chown -R dinesmartuser:dinesmartuser /app
RUN chmod -R 775 /app

USER dinesmartuser

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
