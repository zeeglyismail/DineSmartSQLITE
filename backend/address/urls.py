from django.urls import path, include
from rest_framework.routers import DefaultRouter
from address.views import *

router = DefaultRouter()
router.register(r'', AddressViewSet, basename='address') 

urlpatterns = [
    # {base-url}/api/address/
    path('', include(router.urls)),
]
