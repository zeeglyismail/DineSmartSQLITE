from django.db import models

from menu.models import MenuItemModel
from ingredient.models import IngredientModel


class AdminOrder(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    menu_item = models.ForeignKey(MenuItemModel, on_delete=models.CASCADE)
    amount = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='requested', help_text="Status of the order (e.g., requested, cooking, be ready, deliveried cancelled)")

    def __str__(self):
        return f"Order #{self.id} - {self.name}"
    
    class Meta:
        verbose_name = "Admin Order"
        verbose_name_plural = "Admin Orders"
        db_table = 'admin_order'


class AdminOrderItem(models.Model):
    order = models.ForeignKey(AdminOrder, related_name="items", on_delete=models.CASCADE)
    ingredient = models.ForeignKey(IngredientModel, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.FloatField()

    def __str__(self):
        return f"{self.ingredient.food} × {self.quantity}"
    
    class Meta:
        verbose_name = "Admin Order Item"
        verbose_name_plural = "Admin Order Items"
        db_table = 'admin_order_item'
