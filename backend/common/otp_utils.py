import logging
import random
from django.core.cache import cache
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from datetime import timedelta

from authentication.models import Otp

logger = logging.getLogger(__name__)


def generate_otp_and_otp_send_to_email(email, timeout=300):
    """
    Generates an OTP, sends it via email and saves it to the database.
    """
    otp_code = random.randint(100000, 999999)
    
    
    expires_at = timezone.now() + timedelta(seconds=timeout)
    Otp.objects.create(email=email, otp=otp_code, expires_at=expires_at)

    subject = "DineSmart Account Registration OTP"
    message = f"Your OTP is: {otp_code}\n\nIt will expire in {timeout // 60} minutes."
    from_email = settings.EMAIL_HOST
    
    try:
        send_mail(subject, message, from_email, [email])
        logger.info(f"{otp_code} sent to {email}")
    except Exception as e:
        logger.error(f"Error sending OTP email to {email}: {e}", exc_info=True)

    return otp_code
