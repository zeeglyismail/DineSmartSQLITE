from rest_framework import serializers

from order.models import OrderModel, OrderItemModel


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItemModel
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, required=False)

    class Meta:
        model = OrderModel
        fields = '__all__'
