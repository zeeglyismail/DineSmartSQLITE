from rest_framework import serializers

from menu.models import MenuItemModel
from used_ingredient.models import UsedIngredientModel


class MenuItemSerializer(serializers.ModelSerializer):
    """
    Serializer for MenuItem model.
    """
    class Meta:
        model = MenuItemModel
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')
        extra_kwargs = {
            'is_table_menu': {'required': False, 'default': False},
        } 
    
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        # calculate ingredients
        used_ings = UsedIngredientModel.objects.filter(menu_item__id=instance.id).values_list('ingredient__food', flat=True)
        used_ings_list = list(used_ings)

        rep['used_ingredient'] = used_ings_list
        rep['menu_name'] = instance.name
        rep['count_ingredient'] = len(used_ings_list)
        return rep
