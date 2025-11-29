from django.urls import path, include
from rest_framework.routers import DefaultRouter

from saved_item.views import *

router = DefaultRouter()
router.register(r'', SavedItemViewSet, basename='saved_item') 


urlpatterns = [
    # {base-url}/api/saved_item/
    path('', include(router.urls)),
]
