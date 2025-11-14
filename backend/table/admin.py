from django.contrib import admin

from table.models import TableModel


@admin.register(TableModel)
class TableAdmin(admin.ModelAdmin):
    list_display = [
        'table_id',
        'table_number',
        'total_seats',
        'booked_seats',
        'available_seats',
        'table_status',
    ]
    list_display_links = [
        'table_id',
        'table_number',
    ]
    search_fields = [
        'table_id',
        'table_number',
    ]
    list_filter = [
        'table_status',
    ]
    list_per_page = 25
    ordering = ('table_number',)
