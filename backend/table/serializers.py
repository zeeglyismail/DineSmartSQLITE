from rest_framework import serializers

from table.models import TableModel


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableModel
        fields = [
            'table_id',
            'table_number',
            'total_seats',
            'booked_seats',
            'available_seats',
            'table_status',
            'condition_seats',
            'condition_order'
        ]
        read_only_fields = ['table_id', 'available_seats', 'booked_seats']

    def validate(self, attrs):
        if attrs['booked_seats'] > attrs['total_seats']:
            raise serializers.ValidationError("Booked seats cannot exceed total seats.")
        if attrs['available_seats'] < 0:
            raise serializers.ValidationError("Available seats cannot be negative.")
        if attrs['condition_order'] < 0:
            raise serializers.ValidationError("Minimum order cannot be negative.")
        return attrs
