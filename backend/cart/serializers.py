from rest_framework import serializers

from cart.models import CustomCartModel
from saved_item.models import SavedItemModel, SavedItemIngredientModel
from saved_item.serializers import SavedItemIngredientModel, SavedItemSerializer
from used_ingredient.models import UsedIngredientModel


class CartSerializer(serializers.ModelSerializer):
    amount = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        required=False,     
        allow_null=True  
    )

    class Meta:
        model = CustomCartModel
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)


        
        meals_from = representation.get("meals_from")
        # if meals_from == "saved_item":
        all_ings_info = ""
        saved_meals_id = representation.get("meals")
        saved_instance = SavedItemIngredientModel.objects.filter(saved_item=saved_meals_id)
        for i in saved_instance:
            if i.quantity != 0:
                all_ings_info += f"({i.ingredient.food}:{i.quantity}*{i.ingredient.price} = {i.ingredient.price * i.quantity})"
                representation['all_set'] = all_ings_info 
        # elif meals_from == 'menu_item':
        #     all_ings_info = ""
        #     menu_id = representation.get("menu_item_id")
        #     menu_instance = UsedIngredientModel.objects.filter(menu_item=menu_id)
        #     for i in menu_instance:
        #         all_ings_info += f"({i.ingredient.food}:{i.quantity}*{i.ingredient.price} = {i.ingredient.price * i.quantity})"

        #     representation[''] = all_ings_info 

        return representation

# from cart.models import CartModel, CartItemModel


# class CartItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CartItemModel
#         fields = '__all__'


# class CartSerializer(serializers.ModelSerializer):
#     items = CartItemSerializer(many=True, required=False)

#     class Meta:
#         model = CartModel
#         fields = '__all__'
