from django.urls import path, include
from rest_framework.routers import DefaultRouter

from used_ingredient.views import *

router = DefaultRouter()
router.register(r'', UsedIngredientViewSet, basename='used_ingredient') 


urlpatterns = [
    # {base-url}/api/used_ingredient/
    path('', include(router.urls)),
]
