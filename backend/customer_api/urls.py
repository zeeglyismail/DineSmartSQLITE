from django.urls import path, include
from rest_framework.routers import DefaultRouter
from customer_api.views import *

router = DefaultRouter()
router.register(r'profile', CustomerProfileViewSet, basename='customer') 

urlpatterns = [
    # {base-url}/api/customer/profile/
    path('', include(router.urls)),
]