from django.urls import path

from authentication.views import CustomerLoginView, CustomerRegistrationView, CustomerActivationView, ResendOTPView

urlpatterns = [
    # {base-url}/api/auth/customer-login/
    path(
        route="customer-login/",
        view=CustomerLoginView.as_view(),
        name="customer_login",
    ),
    # {base-url}/api/auth/customer-registration/
    path(
        route="customer-register/",
        view=CustomerRegistrationView.as_view(),
        name="customer_registration",
    ),
    # {base-url}/api/auth/customer-activate/
    path(
        route="customer-activate/",
        view=CustomerActivationView.as_view(),
        name="customer_activate",
    ),
    # {base-url}/api/auth/resend-otp/
    path(
        route="resend-otp/",
        view=ResendOTPView.as_view(),
        name="resend_otp",
    ),
]
