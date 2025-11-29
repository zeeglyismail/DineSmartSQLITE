from django.urls import path, include
from rest_framework.routers import DefaultRouter

from menu.views import *

router = DefaultRouter()
router.register(r'', MenuItemViewSet, basename='menu') 


urlpatterns = [
    # {base-url}/api/menu/
    path('', include(router.urls)),
]
