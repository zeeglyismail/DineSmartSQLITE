from django.shortcuts import get_object_or_404
from django.db import transaction

import random
import datetime
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from common.custom_permission import CustomJWTAuthentication
from used_ingredient.serializers import UsedIngredientSerializer    
from used_ingredient.models import UsedIngredientModel
from ingredient.models import IngredientModel
from common.unique_id import UniqueCode
from saved_item.serializers import SavedItemSerializer, SavedItemIngredientSerializer
from order.models import OrderModel, OrderItemModel
from order.serializers import OrderSerializer, OrderItemSerializer
from cart.models import CustomCartModel
from menu.models import MenuItemModel
from saved_item.models import SavedItemModel, SavedItemIngredientModel
from table.models import TableModel


def create_saved_item(request, data, amount):
    data["user"] = request.user.id
    data["custom_name"] = "just_for_order"
    data["amount"] = amount
    item_serializer = SavedItemSerializer(data=data)
    item_serializer.is_valid(raise_exception=True)
    item_serializer.save()
    print("Saved Item Created:", item_serializer.instance)

    ingredients_data_list = data.get('ingredients', [])
    if ingredients_data_list:
        saved_item = item_serializer.instance
        for ingredient_data in ingredients_data_list:
            ingredient_data['saved_item'] = saved_item.id
            ingredient_serializer = SavedItemIngredientSerializer(data=ingredient_data)
            ingredient_serializer.is_valid(raise_exception=True)
            ingredient_serializer.save()
        
        return True, item_serializer.instance
    
    item_serializer.delete()
    return False, "not_save"
    
        

def check_amount_based_table(request, amount, seats):
    print('........................s............a.........', seats, amount)

    if 4 <= seats <= 8:
        return amount>=500, 500
    elif 8 < seats <= 12:
        return amount>=1000, 1000
    elif 12<seats:
        return amount>=1000, 1000
    else:
        return True, 0



class OrderViewSet(viewsets.ModelViewSet):
    queryset = OrderModel.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        try:
            order_data_list = request.data.copy()
            address = request.query_params.get("address", "table 5")
            address_id = request.query_params.get("address_id", None)
            payment_status = request.query_params.get("payment_status", 'paid')

            order_instance = self.create_order_instance(address, address_id, payment_status)

            total_amount = 0
            total_seats = 0

            # Track order types separately
            has_delivery = False
            has_dine_in = False

            for order_data in order_data_list:
                order_type = order_data.get("order_type")
                if order_type == "delivery":
                    has_delivery = True
                if order_type == "dine_in":
                    has_dine_in = True

                # Process cart item but do NOT mark cart deleted yet
                cart_result = self.process_cart_item(request, order_data, order_instance)
                total_amount += cart_result['item_total']
                total_seats += cart_result['seats_booked']

            # Dine-in validation
            if has_dine_in:
                satisfied, table_condition_amount = check_amount_based_table(request, total_amount, total_seats)
                if not satisfied:
                    transaction.set_rollback(True)
                    raise ValueError(f'Dine In orders cannot be created with this amount, at leat order {table_condition_amount} BDT')

            # Delivery validation
            if has_delivery and not address_id:
                transaction.set_rollback(True)
                raise ValueError("Delivery orders cannot be created without address")

            # If all ok, mark carts as deleted
            for order_data in order_data_list:
                cart_instance = get_object_or_404(CustomCartModel, id=order_data.get("cart"))
                cart_instance.deleted = True
                cart_instance.save()

            # Update total amount
            order_instance.amount = total_amount
            order_instance.save()

            return Response({"success": True, "message": "Successfully created"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            # transaction.atomic ensures rollback
            return Response({"success": False, "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def create_order_instance(self, address, address_id, payment_status):
        order_data = {
            "order_id": UniqueCode.generate_order_unique_code('dine_smart'),
            "order_date": datetime.datetime.now().date(),
            "order_status": "requested",
            "amount": 0,
            "address": address,
            "is_user_verified": True,
            "is_table_booked": True,
            "is_active": True,
            "payment_status": payment_status,
            "user": self.request.user.id
        }
        if address_id and isinstance(address_id, int) and address_id > 0:
            order_data["address_id"] = address_id
            order_data["is_address_verified"] = True

        serializer = self.get_serializer(data=order_data)
        serializer.is_valid(raise_exception=True)
        serializer.is_order_verified = payment_status.lower() not in ['cash']
        serializer.save()
        return serializer.instance

    def process_cart_item(self, request, order_data, order_instance):
        flag_status = False
        seats_booked = 0
        cart_id = order_data.get("cart")
        order_type = order_data.get("order_type")

        if order_type in ["delivery", "dine_in"]:
            flag_status = True

        cart_instance = get_object_or_404(CustomCartModel, id=cart_id)
        tables = cart_instance.get_table_numbers_list()
        table_qs = TableModel.objects.filter(id__in=tables)

        for table in table_qs:
            seats_booked += table.total_seats
            table.booked_seats = table.total_seats
            table.available_seats = 0
            table.table_status = 'booked'
            table.save()

        # Ingredients
        saved_instance = SavedItemIngredientModel.objects.filter(saved_item=cart_instance.meals)
        if not saved_instance.exists():
            raise ValueError("No ingredients found in cart")

        ingredients = [
            {"ingredient": ing.ingredient.id, "quantity": ing.quantity}
            for ing in saved_instance if ing.quantity != 0
        ]
        all_ingredient_as_string = ", ".join(
            f"{ing.ingredient.food} ({ing.quantity} x {ing.ingredient.price} = {ing.quantity * ing.ingredient.price:.2f})"
            for ing in saved_instance if ing.quantity != 0
        )
        order_data['ingredients'] = ingredients

        menu_item_id = cart_instance.meals.menu_item.id if cart_instance.meals else None
        if not menu_item_id:
            raise ValueError("Menu item not found in cart")
        order_data['menu_item'] = menu_item_id

        # Create saved item
        result, saved_meals_instance = create_saved_item(request, order_data, amount=cart_instance.amount)
        if not result:
            raise ValueError(saved_meals_instance)

        item_name = cart_instance.meals.menu_item.name if cart_instance.meals.custom_name in ["just_for_order", "just_for_cart"] else cart_instance.meals.custom_name
        quantity = order_data.get("quantity", 1)
        item_total = cart_instance.amount * quantity

        # Create order item
        item_serializer_data = {
            "order": order_instance.id,
            "meals": saved_meals_instance.id,
            "meals_from": "saved_item",
            "quantity": quantity,
            "order_type": order_type,
            "item_name": item_name,
            "item_price": cart_instance.amount,
            "menu_item": menu_item_id,
            "item_description": all_ingredient_as_string,
            "table_numbers": ','.join(map(str, tables))
        }
        item_serializer = OrderItemSerializer(data=item_serializer_data)
        item_serializer.is_valid(raise_exception=True)
        item_serializer.save()

        # Mark cart as deleted
        cart_instance.deleted = True
        cart_instance.save()

        return {"item_total": item_total, "seats_booked": seats_booked, "flag_status": flag_status}














    def list(self, request, *args, **kwargs):
        print("Fetching orders for user:", request.user)

        queryset = self.filter_queryset(self.get_queryset().filter(user=request.user))

        for order in queryset:
            if not order.items.exists():
                print(f"Deleting empty order: {order.id}")
                order.delete()

        queryset = self.filter_queryset(self.get_queryset().filter(user=request.user))
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'], url_path='add-item')
    def add_item(self, request, pk=None):
        order = self.get_object()
        item_data = request.data
        item_data['order'] = order.id
        serializer = OrderItemSerializer(data=item_data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success":True}, status=status.HTTP_200_OK)
        return Response({"success":False}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['delete'], url_path='delete-item')
    def delete_item(self, request):
        item_id = request.data.get('order_item_id')
        if not item_id:
            return Response({"success":False}, status=status.HTTP_400_BAD_REQUEST)

        item = get_object_or_404(OrderItemModel, id=item_id)
        item.delete()
        return Response({"success":True}, status=status.HTTP_204_NO_CONTENT)
    

class OrderDetailAPIView(APIView):
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        print("Fetching order details for order_id:", order_id)

        # order = get_object_or_404(OrderModel, order_id=order_id, user=request.user)
        order = OrderModel.objects.filter(id=order_id, user=request.user).first()
        if not order:
            return Response({"success": False, "message": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
        order_items = OrderItemModel.objects.filter(order=order)
        order_data = {
                "id": order.id,
                "order_id": order.order_id,
                "total_amount": str(order.amount),
            }
        response_data = [order_data]
        details_data = {
            "order_id": order.order_id,
            "total_amount": str(order.amount),
            "items": []
        }
        # choosed = ['(table no 2, seat no 5), (table no 3, seat no 2)', 'West Wing, 2nd Floor', 'Dhaka, Bangladesh']
        if order.address_id:
            choosed = f"{order.address_id.label},  ({order.address_id.address_line1}, {order.address_id.city}), {order.address_id.postal_code}"
        else:
            choosed = " "
        for item in order_items:
            new_choosed = choosed
            if item.order_type == "dine_in":
                new_choosed = 'Table Booking'
            elif item.order_type == "take_away":
                new_choosed = 'Take Away'
            elif item.order_type == "delivery":
                new_choosed =  choosed

            item_price = item.item_price if item.item_price else 0
            item_data = {
                "order_type": item.order_type,
                "meals_from": "customized Item" if item.meals_from else "Menu Item",
                "item_name": item.item_name,
                "item_price": str(item.item_price),
                "item_quantity": item.quantity,
                "ingredients": item.item_description,
                "choosed": new_choosed
            }
            # if item.meals:
            #     item_data["meals"] = {
            #         "id": item.meals.id,
            #         "name": item.meals.name
            #     }
            # else:
            #     item_data["meals"] = None
            print("Item Data:", item_data)
            if item.meals_from == "saved_item":
                print("Fetching saved item ingredients for item:", item.meals)
            details_data["items"].append(item_data)

            print('.....................item....................')
        return Response(details_data, status=status.HTTP_200_OK)

