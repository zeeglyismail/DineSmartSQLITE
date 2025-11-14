from django.db import models

from authentication.models import UserAccount
from address.models import Address
from saved_item.models import SavedItemModel


class OrderModel(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='orders')
    order_id = models.CharField(max_length=100, unique=True, help_text="Unique identifier for the order", null=True, blank=True)
    order_date = models.DateTimeField(auto_now_add=True, help_text="Date and time when the order was placed")
    order_status = models.CharField(max_length=50, default='Pending', help_text="Status of the order (e.g., Pending, Completed, Cancelled)")
    amount = models.DecimalField(max_digits=10, decimal_places=2, help_text="Total amount for the order", null=True, blank=True)
    address = models.CharField(max_length=255, help_text="Delivery address for the order", null=True, blank=True)
    address_id = models.ForeignKey(Address, on_delete=models.CASCADE, related_name='orders', help_text="Reference to the delivery address", null=True, blank=True)
    is_user_verified = models.BooleanField(default=False, help_text="Indicates if the user has verified their account")
    is_address_verified = models.BooleanField(default=False, help_text="Indicates if the delivery address has been verified")
    is_order_verified = models.BooleanField(default=False, help_text="Indicates if the order has been verified")

    is_table_booked = models.BooleanField(default=False, help_text="Indicates if a table has been booked for the order")
    is_take_away = models.BooleanField(default=False, help_text="Indicates if the order is for takeaway")
    is_home_delivery = models.BooleanField(default=False, help_text="Indicates if the order is for home delivery")
    is_active = models.BooleanField(default=True, help_text="Indicates if the order is currently active")
    deleted = models.BooleanField(default=False, help_text="Indicates if the order has been deleted")

    payment_status = models.CharField(max_length=50, default='Pending', help_text="Status of the payment (e.g., Pending, Completed, Failed)")

    def __str__(self):
        return f"Order {self.order_id} by {self.user.email}"

    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"
        db_table = "order"


class OrderItemModel(models.Model):
    order = models.ForeignKey(OrderModel, on_delete=models.CASCADE, related_name='items', help_text="Reference to the order")
    order_type = models.CharField(max_length=50, null=True, blank=True, help_text="Type of order (e.g., Dine-in, Takeaway, Delivery)")
    menu_item_id = models.CharField(max_length=100, help_text="Unique identifier for the menu item", null=True, blank=True)
    meals_from = models.CharField(max_length=100, help_text="Source of the meal item (e.g., 'Saved Item', 'Menu')", null=True, blank=True)
    meals = models.ForeignKey(SavedItemModel, on_delete=models.CASCADE, related_name='order_items', help_text="Reference to the meal item", null=True, blank=True)
    
    item_name = models.CharField(max_length=255, help_text="Name of the item", null=True, blank=True)
    item_price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Price of the item", null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1, help_text="Quantity of the item in the order", null=True, blank=True)
    item_description = models.TextField(help_text="Description of the item", null=True, blank=True)
    item_image = models.URLField( help_text="URL of the item's image", null=True, blank=True)

    table_numbers = models.CharField(
        max_length=555,
        null=True,
        blank=True,
        help_text="Comma-separated table numbers (e.g., 1,3,4)"
    )

    def __str__(self):
        return f"Order {self.order.order_id} - Item {self.item_name if self.item_name else None} ({self.order.id})"
    
    def get_table_numbers_list(self):
        return [int(num) for num in self.table_numbers.split(',')] if self.table_numbers else []

    class Meta:
        verbose_name = "Order Item"
        verbose_name_plural = "Order Items"
        db_table = "order item"
