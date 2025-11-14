from decouple import config

# Read email credentials from environment variables (or .env).
# Defaults are placeholders and should be overridden in production.
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='example@gmail.com')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
