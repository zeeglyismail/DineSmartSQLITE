from django.db import models

from authentication.models import UserAccount
from saved_item.models import SavedItemModel


class CustomCartModel(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='Carts')
    amount = models.DecimalField(max_digits=10, decimal_places=2, help_text="Total amount for the Cart", null=True, blank=True)
    order_type = models.CharField(max_length=100, null=True, blank=True)
    menu_item_id = models.CharField(max_length=100, help_text="Unique identifier for the menu item", null=True, blank=True)
    meals_from = models.CharField(max_length=100, help_text="Source of the meal item (e.g., 'Saved Item', 'Menu')", null=True, blank=True)
    meals = models.ForeignKey(SavedItemModel, on_delete=models.CASCADE, related_name='cart_items', help_text="Reference to the meal item", null=True, blank=True)
    item_name = models.CharField(max_length=255, help_text="Name of the item", null=True, blank=True)
    custom_name = models.CharField(max_length=255, help_text="Name of the item which set in saved_item", null=True, blank=True)
    item_price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price of the item", null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1, help_text="Quantity of the item in the order", null=True, blank=True)
    picture = models.ImageField(
        upload_to='cart_images/', blank=True, null=True,
        default='cart_images/default.jpg',
        help_text="Image of the menu item."
    )
    table_numbers = models.CharField(
        max_length=555,
        null=True,
        blank=True,
        help_text="Comma-separated table numbers (e.g., 1,3,4)"
    )
    
    is_active = models.BooleanField(default=True, help_text="Indicates if the Cart is currently active")
    deleted = models.BooleanField(default=False, help_text="Indicates if the Cart has been deleted")

    def get_table_numbers_list(self):
        return [int(num) for num in self.table_numbers.split(',')] if self.table_numbers else []

    def __str__(self):
        return f"Cart {self.id} by {self.user.email}"

    class Meta:
        verbose_name = "Cart"
        verbose_name_plural = "Carts"
        db_table = "custom_cart"