import uuid
from django.db import models

from common.models import TimeStamp
from common.custom_validation import PHONE_REGEX
from common.table_info import TableStatus


class TableModel(models.Model):
    table_id = models.CharField(max_length=64, unique=True, default=uuid.uuid4)
    table_number = models.PositiveIntegerField(unique=True)
    total_seats = models.PositiveSmallIntegerField()
    booked_seats = models.PositiveSmallIntegerField(default=0)
    available_seats = models.PositiveSmallIntegerField(default=0)
    table_status= models.CharField(
        max_length=11, choices=TableStatus.choices, default=TableStatus.available
    )
    condition_seats = models.PositiveSmallIntegerField(
        help_text="Minimum number of seats that can be accommodated at this table with at least minimum order.", default=0
    )
    condition_order = models.PositiveSmallIntegerField(
        help_text="Minimum order amount for this table.", default=0.00
    )

    def __str__(self):
        return self.table_id

    class Meta:
        verbose_name = "Table"
        verbose_name_plural = "Tables"
        db_table = "table"
