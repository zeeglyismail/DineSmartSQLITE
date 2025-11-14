import jwt
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model

User = get_user_model()

secret_key = "DineSmart"


def encode_jwt(email, token_time):
    payload = {
        "email": email,
        "exp": datetime.now() + timedelta(minutes=token_time)
    }
    token = jwt.encode(payload=payload, key=secret_key, algorithm="HS256")
    return token

def generate_jwt(email, refresh_token):
    if refresh_token:
        payload = decode_jwt(refresh_token)
        email = payload.get("email")

        if not email:
            raise ValueError("Invalid refresh token")
        
    access_token = encode_jwt(email, 60 * 24 * 7)
    refresh_token = encode_jwt(email, 60 * 24 * 15)
    token = {
        "access_token": access_token,
        "refresh_token": refresh_token
    }
    return token

def decode_jwt(token):
    try:
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise ValueError('Token has expired')
    except jwt.InvalidTokenError:
        raise ValueError('Invalid token')

def verify_jwt(token):
    try:
        payload = decode_jwt(token)
        is_user = User.objects.filter(email=payload.get("email")).exists()
        if is_user and datetime.fromtimestamp(payload.get("exp")) > datetime.now():
            return True
        return False

    except:
        return False
