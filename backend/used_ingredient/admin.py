from django.contrib import admin

from used_ingredient.models import UsedIngredientModel


# @admin.register(UsedIngredientModel)
class UsedIngredientAdmin(admin.ModelAdmin):
    def get_menu_item(self, obj):
        return f"{obj.menu_item.name}-(menu_id {obj.menu_item.id})"

    def ingredient(self, obj):
        return obj.ingredient.food

    # def quantity(self, obj):
    #     return f"{obj.used} {obj.type}"

    list_display = (
        "id",
        "get_menu_item",
        "ingredient",
        "quantity",
    )
    list_display_links = (
        "get_menu_item",
        "ingredient",
        "quantity",
    )
    search_fields = [
        "menu_item",
        "ingredient",
    ]
    list_per_page = 15
admin.site.register(UsedIngredientModel, UsedIngredientAdmin)