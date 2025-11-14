from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from ingredient.models import IngredientModel
from used_ingredient.serializers import UsedIngredientSerializer, IngredientSerializer, SavedMealsIngredientForLoadSerializer   
from used_ingredient.models import UsedIngredientModel
from ingredient.models import IngredientModel
from saved_item.models import SavedItemIngredientModel
from saved_item.serializers import SavedItemIngredientSerializer


class UsedIngredientViewSet(viewsets.ModelViewSet):
    queryset = UsedIngredientModel.objects.all()
    serializer_class = UsedIngredientSerializer

    def list(self, request, *args, **kwargs):
        menu_item_id = request.query_params.get('menu_item_id', None)
        queryset = self.get_queryset()
        if menu_item_id is not None:
            queryset = queryset.filter(menu_item_id=menu_item_id)
        
        serializer = self.get_serializer(queryset, many=True, context={'request': request})

        saved_meals = request.query_params.get('saved_meals')
        if saved_meals:
            ingredients = SavedItemIngredientModel.objects.filter(saved_item=saved_meals)
            ings_serializer = SavedMealsIngredientForLoadSerializer(ingredients, many=True, context={'request': request})
            print('.................ing......', ings_serializer.data)
            return Response(ings_serializer.data)
            
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'], url_path='calculate_amount')
    def calculate_amount(self, request, *args, **kwargs):
        ingredients = request.data.get('ingredients', None)

        if not ingredients or not isinstance(ingredients, list):
            return Response({"error": "ingredients list is required"}, status=status.HTTP_400_BAD_REQUEST)

        total_amount = 0
        breakdown = []

        for item in ingredients:
            try:
                ingredient_id = item.get('ingredient')
                quantity = item.get('quantity')

                if not ingredient_id or not quantity:
                    continue

                ingredient = IngredientModel.objects.get(id=ingredient_id)
                price = ingredient.price

                item_total = float(quantity) * float(price)
                total_amount += item_total

                breakdown.append({
                    "ingredient_id": ingredient.id,
                    "food": ingredient.food,
                    "weight": ingredient.weight,
                    "calories": ingredient.calories,
                    "quantity": quantity,
                    "rate": price,
                    "total": item_total
                })

            except IngredientModel.DoesNotExist:
                breakdown.append({
                    "ingredient_id": ingredient_id,
                    "error": "Ingredient not found"
                })
            except Exception as e:
                breakdown.append({
                    "ingredient_id": ingredient_id,
                    "error": str(e)
                })

        return Response({
            "success": True,
            "total_amount": round(total_amount, 2)
        }, status=200)