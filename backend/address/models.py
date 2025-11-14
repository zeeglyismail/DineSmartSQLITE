from django.db import models
from django.utils import timezone

from common.custom_validation import PHONE_REGEX
from authentication.models import UserAccount
from common.models import TimeStamp


class Address(TimeStamp):
    email = models.EmailField(null=True, blank=True, db_index=True)
    phone = models.CharField(max_length=15, validators=[PHONE_REGEX], db_index=True, null=True, blank=True)
    user = models.ForeignKey(
        UserAccount,
        on_delete=models.CASCADE,
        related_name='addresses',
        null=True,
        blank=True
    )
    label = models.CharField(max_length=50, null=True, blank=True)
    address_line1 = models.CharField(max_length=255, null=True, blank=True)
    address_line2 = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    postal_code = models.CharField(max_length=20, null=True, blank=True)
    is_default= models.BooleanField(default=False)

    
    def __str__(self):
         return f"{self.user.email} : {self.city}-{self.address_line1}"
    
    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Addresses"
        db_table = "address"

