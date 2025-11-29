from django.db import models

from ingredient.models import IngredientModel
from menu.models import MenuItemModel


class UsedIngredientModel(models.Model):
    menu_item = models.ForeignKey(MenuItemModel, on_delete=models.DO_NOTHING)
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
        return f"{self.menu_item.name} (used_id {self.id}) : {self.quantity}" #{self.used}{self.type}"

    class Meta:
        verbose_name = "Used Ingredient"
        verbose_name_plural = "Used Ingredients"
        db_table = "used_ingredient"
