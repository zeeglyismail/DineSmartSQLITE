from django.urls import path, include
from rest_framework.routers import DefaultRouter
from order.views import *

router = DefaultRouter()
router.register(r'', OrderViewSet, basename='order') 


urlpatterns = [
    # {base-url}/api/order/
    path('', include(router.urls)),
    # {base-url}/api/order/<order_id>/
    path('details/<int:order_id>/', OrderDetailAPIView.as_view(), name='order-detail'),
]
