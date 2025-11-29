from rest_framework import serializers

from used_ingredient.models import UsedIngredientModel
from saved_item.models import SavedItemModel, SavedItemIngredientModel


class SavedItemSerializer(serializers.ModelSerializer):
    menu_item_description = serializers.CharField(source='menu_item.description', read_only=True)
    
    class Meta:
        model = SavedItemModel
        fields = ['id', 'user', 'custom_name', 'menu_item', 'amount', 'menu_item_description', 'is_display']

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        rep['user_id'] = instance.user.id if instance.user else None

        # Menu info
        rep['menu_item_id'] = instance.menu_item.id
        rep['menu_item_name'] = str(instance.menu_item.name) if instance.menu_item else None
        rep['menu_item_description'] = str(instance.menu_item.description) if instance.menu_item else None
       

        # ingredients
        ingredients = SavedItemIngredientModel.objects.filter(saved_item=instance)
        rep['ingredients'] = []
        ingredient_count = 0
        for ingredient in ingredients:
            ingredient_count += 1
            ingredient_rep = {
                'id': ingredient.id,
                'ingredient_id': ingredient.ingredient.id,
                'ingredient_name': str(ingredient.ingredient.food),
                'quantity': ingredient.quantity,
            }
            rep['ingredients'].append(ingredient_rep)
        rep['ingredient_count'] = ingredient_count
    
        return rep


class SavedItemIngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedItemIngredientModel
        fields = "__all__"
