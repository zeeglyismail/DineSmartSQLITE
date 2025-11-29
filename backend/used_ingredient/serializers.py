from rest_framework import serializers

from used_ingredient.models import UsedIngredientModel
from ingredient.models import IngredientModel
from saved_item.models import SavedItemModel, SavedItemIngredientModel


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = IngredientModel
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')
        extra_kwargs = {
            'food': {'required': True},
            'weight': {'required': True},
            'calories': {'required': True},
            'priority': {'required': False},
            'thumbnail': {'required': False},
            'picture': {'required': False},
            'price': {'required': True, 'min_value': 0.00}
        }


class UsedIngredientSerializer(serializers.ModelSerializer):
    picture = picture = serializers.SerializerMethodField()

    def get_picture(self, obj):
        request = self.context.get('request')
        picture = getattr(obj.ingredient, 'picture', None)

        if picture and hasattr(picture, 'url'):
            print(f"Picture URL: {picture.url}")
            if request is not None:
                return request.build_absolute_uri(picture.url)  # Full absolute URL
            return picture.url  # Relative URL fallback (e.g., /media/images/xyz.jpg)
        return None

    class Meta:
        model = UsedIngredientModel
        fields = ['id', 'quantity', 'picture']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['menu_item_id'] = instance.menu_item.id
        rep['menu_item_name'] = str(instance.menu_item)
        ingredient = instance.ingredient
        rep['ingredient_id'] = ingredient.id
        rep['food'] = ingredient.food
        rep['weight'] = ingredient.weight
        rep['calories'] = ingredient.calories
        rep['price'] = ingredient.price

        return rep


class SavedMealsIngredientForLoadSerializer(serializers.ModelSerializer):
    saved_item = serializers.IntegerField(source='saved_item.id')
    saved_item_id = serializers.IntegerField(source='saved_item.id')
    saved_item_name = serializers.CharField(source='saved_item.custom_name')
    ingredient_id = serializers.CharField(source='ingredient.id')
    food = serializers.CharField(source='ingredient.food')
    weight = serializers.CharField(source='ingredient.weight')
    calories = serializers.CharField(source='ingredient.calories')
    thumbnail = serializers.CharField(source='ingredient.picture')
    price = serializers.CharField(source='ingredient.price')
    picture = serializers.SerializerMethodField()

    def get_picture(self, obj):
        request = self.context.get('request')
        picture = getattr(obj.ingredient, 'picture', None)

        if picture and hasattr(picture, 'url'):
            print(f"Picture URL: {picture.url}")
            if request is not None:
                return request.build_absolute_uri(picture.url)  # Full absolute URL
            return picture.url  # Relative URL fallback (e.g., /media/images/xyz.jpg)
        return None

    class Meta:
        model = SavedItemIngredientModel
        fields = [
            'id', 
            'quantity', 
            'saved_item', 
            'saved_item_id', 
            'saved_item_name',
            'ingredient_id',
            'food',
            'weight',
            'calories',
            'thumbnail',
            'picture',
            'price',
            ]

   