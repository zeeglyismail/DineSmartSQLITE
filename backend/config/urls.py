from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('authentication.urls')),
    path('api/customer/', include('customer_api.urls')),
    path('api/table/', include('table.urls')),
    path('api/address/', include('address.urls')),
    path('api/menu/', include('menu.urls')),
    path('api/used_ingredient/', include('used_ingredient.urls')),
    path('api/saved_item/', include('saved_item.urls')),
    path('api/order/', include('order.urls')),
    path('api/cart/', include('cart.urls')),
    path('', include('management.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
