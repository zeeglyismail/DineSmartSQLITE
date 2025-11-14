import uuid
from django.db import models

from common.models import TimeStamp


class MenuItemModel(TimeStamp):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    
    class PricingType(models.TextChoices):
        custom = "custom"
        fixed = "fixed"
        others = "others"
    price_type = models.CharField(
        max_length=10, choices=PricingType.choices, default=PricingType.custom
    )
    price = models.DecimalField(
        max_digits=10, decimal_places=2, default=0.00, blank=True, null=True
    )
    thumbnail = models.URLField(
        max_length=200, blank=True, null=True,
        help_text="URL of the thumbnail image for the menu item."
    )
    picture = models.ImageField(
        upload_to='menu_item_images/', blank=True, null=True,
        help_text="Image of the menu item."
    )
    is_first_menu = models.BooleanField(
        default=False,
        help_text="Indicates if this is the first menu item in the list."
    )
    is_special = models.BooleanField(
        default=False,
        help_text="Indicates if this menu item is a special item."
    )
    is_table_menu = models.BooleanField(
        default=False,
        help_text="Indicates if this menu item is part of the table menu."
    )


    def __str__(self):
        return f"{self.name}-(menu_id{self.id})"

    class Meta:
        verbose_name = "Menu Item"
        verbose_name_plural = "Menu Items"
        db_table = "menu_item"
