from django.urls import path, include
from rest_framework.routers import DefaultRouter
from table.views import *

router = DefaultRouter()
router.register(r'', TableViewSet, basename='table') 


urlpatterns = [
    # {base-url}/api/table/
    path('', include(router.urls)),
]
