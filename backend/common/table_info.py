from django.db import models


class TableStatus(models.TextChoices):
    available = "available"
    booked = "booked"
    cleaning = "cleaning"
    served = "served"
    unavailable = "unavailable"
    reserved = "reserved"
