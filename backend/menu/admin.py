from django.contrib import admin

from menu.models import MenuItemModel
from django.utils.html import format_html


@admin.register(MenuItemModel)
class MenuItemAdmin(admin.ModelAdmin):
    def picture_display(self, obj):
        if obj.picture:
            return format_html('<img src="{}" width="50" height="50" />', obj.picture.url)
        return "-"
    
    picture_display.short_description = "Picture"
    list_display = [
        'id',
        'name',
        'description',
        'price_type',
        'price',
        # 'thumbnail',
        'picture_display',
        'is_table_menu',
        'is_first_menu',
        'is_special',
        'is_active',
        'created_at',
        'updated_at',
    ]
    list_display_links = [
        'id',
        'name',
        'price',
        "picture_display",
    ]
    search_fields = [
        'name',
        'description',
    ]
    list_filter = [
        'price_type',
        'is_first_menu',
    ]
    list_per_page = 25
    ordering = ('name',)
