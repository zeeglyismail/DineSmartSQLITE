from django.contrib.auth import get_user_model
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST, HTTP_201_CREATED
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password

from authentication.models import UserAccount, Otp
from authentication.serializers import CustomerLoginSerializer, CustomerRegistrationSerializer
from common.jwt_utils import generate_jwt
from common.response_utils import generate_response
from common.otp_utils import generate_otp_and_otp_send_to_email

User = get_user_model()


class CustomerLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomerLoginSerializer(data=request.data)
        if serializer.is_valid():
            valid_data = serializer.validated_data
            customer = UserAccount.objects.filter(email=valid_data.get("email")).values("email", "password", "is_active").first()
            if customer and check_password(valid_data.get("password"), customer.get("password")) and customer.get("is_active"):
                data = {
                    "email": customer.get("email"),
                }
                token = generate_jwt(data.get("email"), refresh_token=None)
                response = generate_response(status_code=HTTP_200_OK, message="Login successful.", data=token, success=True)
                return Response(response, status=HTTP_200_OK)
            
            else:
                response = generate_response(status_code=HTTP_404_NOT_FOUND, message="User not found.", success=False)
                return Response(response, status=HTTP_404_NOT_FOUND)
        else:
            response = generate_response(status_code=HTTP_400_BAD_REQUEST, message="Invalid request.", success=False)
            return Response(response, status=HTTP_400_BAD_REQUEST)


class CustomerRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data.copy()
        data["is_customer"] = True
        serializer = CustomerRegistrationSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            generate_otp_and_otp_send_to_email(user.email)
            response = generate_response(
                status_code=HTTP_201_CREATED,
                message="Registration successful.",
                data=serializer.data,
                success=True
            )
            return Response(response, status=HTTP_201_CREATED)
        response = generate_response(
            status_code=HTTP_400_BAD_REQUEST,
            message="Invalid request.",
            success=False
        )
        return Response(response, status=HTTP_400_BAD_REQUEST)


class CustomerActivationView(APIView):
    permission_classes = [AllowAny]

    def patch(self, request):
        email = request.data.get("email")
        requested_otp = request.data.get("otp")

        if not email or not requested_otp:
            return Response(
                generate_response(
                    status_code=HTTP_400_BAD_REQUEST,
                    message="Please provide both email and OTP.",
                    success=False
                ),
                status=HTTP_400_BAD_REQUEST
            )

        try:
            user = UserAccount.objects.get(email=email)
        except UserAccount.DoesNotExist:
            return Response(
                generate_response(
                    status_code=HTTP_404_NOT_FOUND,
                    message="User not found.",
                    success=False
                ),
                status=HTTP_404_NOT_FOUND
            )

        if user.is_active:
            return Response(
                generate_response(
                    status_code=HTTP_400_BAD_REQUEST,
                    message="Account is already active.",
                    success=True
                ),
                status=HTTP_400_BAD_REQUEST
            )

        otp_obj = (
            Otp.objects
            .filter(email=email, is_used=False, expires_at__gte=timezone.now())
            .order_by('-created_at')
            .first()
        )

        if not otp_obj:
            return Response(
                generate_response(
                    status_code=HTTP_400_BAD_REQUEST,
                    message="OTP not found, expired, or already used.",
                    success=False
                ),
                status=HTTP_400_BAD_REQUEST
            )

        if str(otp_obj.otp) != str(requested_otp):
            return Response(
                generate_response(
                    status_code=HTTP_400_BAD_REQUEST,
                    message="Invalid OTP provided.",
                    success=False
                ),
                status=HTTP_400_BAD_REQUEST
            )

        user.is_active = True
        user.save(update_fields=["is_active"])

        otp_obj.is_used = True
        otp_obj.save(update_fields=["is_used"])

        return Response(
            generate_response(
                status_code=HTTP_200_OK,
                message="Your account has been activated!",
                success=True
            ),
            status=HTTP_200_OK
        )


class ResendOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        if not email:
            response = generate_response(
                status_code=HTTP_400_BAD_REQUEST,
                message="Email is required.",
                success=False
            )
            return Response(response, status=HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email, is_active=False).only("email").first()
        if not user:
            response = generate_response(
                status_code=HTTP_404_NOT_FOUND,
                message="User not found or already active.",
                success=False
            )
            return Response(response, status=HTTP_404_NOT_FOUND)

        otp = generate_otp_and_otp_send_to_email(email)
        response = generate_response(
            status_code=HTTP_200_OK,
            message="OTP resent successfully.",
            data=otp,
            success=True
        )
        return Response(response, status=HTTP_200_OK)
