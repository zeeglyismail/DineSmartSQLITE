from django.db import models

from authentication.models import UserAccount
from ingredient.models import IngredientModel
from menu.models import MenuItemModel


class SavedItemModel(models.Model):
    custom_name = models.CharField(max_length=100, null=True, blank=True, help_text="Custom name for the saved item")
    custom_description = models.TextField(null=True, blank=True, help_text="Custom description for the saved item")
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='saved_items', null=True, blank=True)
    menu_item = models.ForeignKey(MenuItemModel, on_delete=models.DO_NOTHING)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_display = models.BooleanField(default=False, help_text="Whether to display this item in the Home page")

    def __str__(self):
        return f"{self.custom_name} (saved_id({self.id}): {self.amount}"

    class Meta:
        verbose_name = "Saved Item"
        verbose_name_plural = "Saved Items"
        db_table = "saved_item"


class SavedItemIngredientModel(models.Model):
    saved_item = models.ForeignKey(SavedItemModel, on_delete=models.CASCADE, related_name='saved_ingredients')
    ingredient = models.ForeignKey(IngredientModel, on_delete=models.DO_NOTHING)
    # used = models.CharField(max_length=100)
    # type = models.CharField(max_length=100,
    #                         help_text="Type of quantity used, e.g., grams, pieces, etc."
    #                         )
    quantity = models.PositiveSmallIntegerField(
        default=0,
        help_text="Quantity of the ingredient used in the saved item"
    )

    def __str__(self):
        return f"{self.saved_item.custom_name} (saved_ings_id {self.id}): {self.quantity}" #{self.used}{self.type}"

    class Meta:
        verbose_name = "Saved Item Ingredient"
        verbose_name_plural = "Saved Item Ingredients"
        db_table = "saved_item_ingredient"
