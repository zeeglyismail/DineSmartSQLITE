from django.contrib import admin
from django.utils.html import format_html

from ingredient.models import IngredientModel


@admin.register(IngredientModel)
class IngredientAdmin(admin.ModelAdmin):
    def picture_display(self, obj):
        if obj.picture:
            return format_html('<img src="{}" width="50" height="50" />', obj.picture.url)
        return "-"
    
    picture_display.short_description = "Picture"

    list_display = (
        "id",
        "food",
        "weight",
        "price",
        "calories",
        "priority",
        "picture_display",
    )
    list_display_links = (
        "id",
        "food",
        "weight",
        "calories",
        "picture_display",
    )
    search_fields = [
        "food",
        "weight",
        "calories",
    ]
    list_filter = ("priority",)
    list_per_page = 15
