from management.views import ManagementSiteView, CreateOrderView

from django.urls import path

urlpatterns = [
    path('', ManagementSiteView.as_view(), name='management_site'),
    path('create-order/', CreateOrderView.as_view(), name='create_order'),
]