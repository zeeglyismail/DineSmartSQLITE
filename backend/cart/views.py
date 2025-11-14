from django.shortcuts import get_object_or_404, get_list_or_404

import datetime
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from common.custom_permission import CustomJWTAuthentication
from used_ingredient.serializers import UsedIngredientSerializer    
from used_ingredient.models import UsedIngredientModel
from ingredient.models import IngredientModel
from common.unique_id import UniqueCode
from saved_item.serializers import SavedItemSerializer
from saved_item.models import SavedItemModel
from menu.models import MenuItemModel
from saved_item.serializers import SavedItemSerializer, SavedItemIngredientSerializer
from cart.models import CustomCartModel
from cart.serializers import CartSerializer
from table.models import TableModel


def create_saved_item(request, data, amount):
    data["user"] = request.user.id
    data["custom_name"] = "just_for_cart"
    data["amount"] = amount
    item_serializer = SavedItemSerializer(data=data)
    item_serializer.is_valid(raise_exception=True)
    item_serializer.save()

    ingredients_data_list = data.get('ingredients', [])
    if ingredients_data_list:
        saved_item = item_serializer.instance
        total = 0
        for ingredient_data in ingredients_data_list:
            ingredient_data['saved_item'] = saved_item.id

            ingredient_price = IngredientModel.objects.filter(
                id=ingredient_data.get('ingredient')
            ).values_list("price", flat=True).first()

            total = total + ingredient_price * ingredient_data.get('quantity', 0)
            ingredient_serializer = SavedItemIngredientSerializer(data=ingredient_data)
            ingredient_serializer.is_valid(raise_exception=True)
            ingredient_serializer.save()
        
        return True, total, item_serializer.instance
    
    item_serializer.delete()
    return False, total, item_serializer.instance
    
        





class CartViewSet(viewsets.ModelViewSet):
    queryset = CustomCartModel.objects.filter(deleted=False)
    serializer_class = CartSerializer
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        cart_data = request.data.copy()
        order_type = cart_data.get('order_type')
        menu_item_id = cart_data.get('menu_item', None)
        saved_meals = cart_data.get("saved_meals", None)
        table = cart_data.get("table", None)

        if table:
            table_instance = get_list_or_404(TableModel, table_id__in=table) if table else None
        
            if not table_instance:
                return Response({"success": False, "error": "Table not found."}, status=status.HTTP_404_NOT_FOUND)
        
            table_ids = [str(table.id) for table in table_instance]
            table_ids_str = ",".join(table_ids)
        else:
            table_ids_str = ""

        cart_serializer_data = {
            "user": request.user.id,
            "order_type": order_type,
            "amount": 0,  # Default amount
            "quantity": cart_data.get("quantity"),
            "table_numbers": table_ids_str,
        }

        if saved_meals:
            saved_meal_instance = SavedItemModel.objects.filter(id=saved_meals).first()
            custom_name = saved_meal_instance.custom_name if saved_meal_instance else None
            amount = saved_meal_instance.amount if saved_meal_instance else None

            cart_serializer_data["custom_name"] = custom_name
            if amount is not None:
                cart_serializer_data["amount"] = amount
            cart_serializer_data["meals_from"] = "saved_item"
            cart_serializer_data["meals"] = saved_meals

            if saved_meal_instance and saved_meal_instance.menu_item.picture:
                cart_serializer_data["picture"] = saved_meal_instance.menu_item.picture
            else:
                cart_serializer_data["picture"] = None

        elif menu_item_id:
            menu_instance = MenuItemModel.objects.filter(id=menu_item_id).first()
            if menu_instance:
                menu_name = menu_instance.name
                cart_serializer_data["item_name"] = menu_name


                if menu_instance.picture:
                    cart_serializer_data["picture"] = menu_instance.picture
                else:
                    cart_serializer_data["picture"] = None

                result, menu_total_price, saved_meals_instance = create_saved_item(request, cart_data, 0)

                if result and menu_total_price and saved_meals_instance:
                    cart_serializer_data["meals_from"] = "menu_item"
                    cart_serializer_data["amount"] = menu_total_price
                    cart_serializer_data["meals"] = saved_meals_instance.id

        cart_serializer = self.get_serializer(data=cart_serializer_data)
        cart_serializer.is_valid(raise_exception=True)
        cart_serializer.save()

        return Response({"success": True}, status=status.HTTP_201_CREATED)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data_list = serializer.data
        
        response_data = []
        for item in data_list:
            meals_from = item.get('meals_from')
            print('....item....', item)
            if meals_from == 'saved_item':
                saved_meals_id = item.get('meals')
                meals_instance = SavedItemModel.objects.filter(id=saved_meals_id).first()
                meals_serializer = SavedItemSerializer(meals_instance)
                meals = meals_serializer.data
                
                item["id"] = item.get('id')
                name = " "
                if meals.get('custom_name'):
                    name += f"{meals.get('custom_name')}"
                if meals.get('menu_item_name'):
                    name += f"{meals.get('menu_item_name')}"
                item["item_name"] = name


                description = " "
                if meals.get('menu_item_description'):
                    description = meals.get('menu_item_description')
                item["item_description"] =  description

                item["total_amount"] = meals.get('amount')
                item["ingredients"] = meals.get('ingredients')


            elif meals_from == 'menu_item':
                name = ""
                if item.get('custom_name'):
                    name += f"{item.get('custom_name')}"
                if item.get('item_name'):
                    name += f"{item.get('item_name')}"
                item["item_name"] = name
                description = ""
                if item.get('item_description'):
                    description = item.get('item_description')
                item["item_description"] = description

                
                
                


            # remove unnecessary fields
            item.pop('custom_name', None)
            item.pop('item_price', None)
            item.pop('is_active', None)
            item.pop('deleted', None)
            item.pop('user', None)
            item.pop('total_amount', None)
            item.pop('menu_item_id', None)

            response_data += item

        return Response(serializer.data)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"success": True}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], url_path='calculate-total')
    def calculate_total(self, request):
        cart_items = request.data
        if not isinstance(cart_items, list):
            return Response({"success": False, "error": "Invalid data format. Expected a list."}, status=status.HTTP_400_BAD_REQUEST)

        total_amount = 0
        details = []

        print('cart_items', cart_items)

        for item in cart_items:
            print('item', item)
            cart_id = item.get('cart')
            quantity = item.get('quantity', 0)
            if not cart_id:
                continue
            cart_instance = CustomCartModel.objects.filter(id=cart_id, user=request.user.id, deleted=False).first()
            print('cart_instance', cart_instance)
            if not cart_instance:
                continue
            print('cart_instance', cart_instance)
            print('cart_instance.amount', cart_instance.amount)
            amount = cart_instance.amount or 0
            total = amount * quantity
            total_amount += total
            details.append({
                "cart_id": cart_id,
                "quantity": quantity,
                "unit_amount": amount,
                "total": total
            })

        return Response({
            "success": True,
            "total_amount": round(total_amount, 2),
            "payable_amount": int(total_amount),
        }, status=status.HTTP_200_OK)
    

    # @action(detail=True, methods=['patch'], url_path='make-order-payment')
    # def make_order_payment(self, request):

    #     cart_ids = request.data.get('cart')
    #     if not cart_ids:
    #         return Response({"success": False, "error": "Cart IDs not provided."}, status=status.HTTP_400_BAD_REQUEST)
    #     instances = CustomCartModel.objects.filter(id__in=cart_ids, user=request.user.id)
    #     if not instances.exists():
    #         return Response({"success": False, "error": "Cart not found."}, status=status.HTTP_404_NOT_FOUND)
    #     for instance in instances:
    #         instance.is_paid = True
    #         instance.paid_at = datetime.datetime.now()
    #         instance.save()









    # @action(detail=True, methods=['patch'], url_path='add-item')
    # def add_item(self, request, pk=None):
    #     order = self.get_object()
    #     item_data = request.data
    #     item_data['order'] = order.id
    #     serializer = OrderItemSerializer(data=item_data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({"success":True}, status=status.HTTP_200_OK)
    #     return Response({"success":False}, status=status.HTTP_400_BAD_REQUEST)

    # @action(detail=False, methods=['delete'], url_path='delete-item')
    # def delete_item(self, request):
    #     item_id = request.data.get('order_item_id')
    #     if not item_id:
    #         return Response({"success":False}, status=status.HTTP_400_BAD_REQUEST)

    #     item = get_object_or_404(OrderItemModel, id=item_id)
    #     item.delete()
    #     return Response({"success":True}, status=status.HTTP_204_NO_CONTENT)
