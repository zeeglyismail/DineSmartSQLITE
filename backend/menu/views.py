from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from menu.models import MenuItemModel
from menu.serializers import MenuItemSerializer
from saved_item.models import SavedItemModel, SavedItemIngredientModel
from saved_item.serializers import SavedItemSerializer

class MenuItemViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing menu items.
    """
    queryset = MenuItemModel.objects.all()
    serializer_class = MenuItemSerializer

    def get_queryset(self):
        queryset = self.queryset
        list_type = self.request.query_params.get('list_type', None)
        if list_type and list_type == 'all':
            return queryset
        elif list_type and list_type == 'table_menu':
            queryset = queryset.filter(is_table_menu=True)
        elif list_type and list_type == 'special_menu':
            queryset = queryset.filter(is_special=True)
        else:
            queryset = queryset.filter(is_active=True)
        return queryset
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        menu_item_data = self.get_serializer(instance).data

        saved_meals_id = request.query_params.get('saved_meals', None)
        if saved_meals_id:
            saved_meal = SavedItemModel.objects.filter(id=saved_meals_id).first()
            if saved_meal:
                saved_data = SavedItemSerializer(saved_meal).data

                # Replace or merge the fields
                menu_item_data['name'] = saved_data.get('custom_name', menu_item_data['name'])
                menu_item_data['saved_meals'] = saved_meals_id
                menu_item_data['description'] = menu_item_data['name'] + menu_item_data['description']
                menu_item_data['price'] = saved_data.get('amount', menu_item_data['price'])

                # Add custom fields
                menu_item_data['used_ingredient'] = [i['ingredient_name'] for i in saved_data.get('ingredients', [])]
                menu_item_data['count_ingredient'] = saved_data.get('ingredient_count', 0)

        return Response(menu_item_data, status=status.HTTP_200_OK)
