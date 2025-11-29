from django.urls import path, include
from rest_framework.routers import DefaultRouter
from cart.views import *

router = DefaultRouter()
router.register(r'', CartViewSet, basename='cart') 


urlpatterns = [
    # {base-url}/api/cart/
    path('', include(router.urls)),
]
