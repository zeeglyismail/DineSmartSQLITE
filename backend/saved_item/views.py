from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from common.custom_permission import CustomJWTAuthentication
from saved_item.serializers import SavedItemSerializer, SavedItemIngredientSerializer
from saved_item.models import SavedItemModel


class SavedItemViewSet(viewsets.ModelViewSet):
    serializer_class = SavedItemSerializer
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedItemModel.objects.filter(user=self.request.user, is_display=True)

    def list(self, request, *args, **kwargs):
        menu_item_id = request.query_params.get('menu_item_id', None)
        queryset = self.get_queryset()
        if menu_item_id is not None:
            if not menu_item_id.isdigit():
                return Response([])
            queryset = queryset.filter(menu_item_id=int(menu_item_id))
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
        
    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['user'] = request.user.id
        data['is_display'] = True
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # If you need to handle ingredients, you can do it here
        ingredients_data = data.get('ingredients', [])
        if ingredients_data:
            saved_item = serializer.instance
            for ingredient_data in ingredients_data:
                ingredient_data['saved_item'] = saved_item.id
                ingredient_serializer = SavedItemIngredientSerializer(data=ingredient_data)
                ingredient_serializer.is_valid(raise_exception=True)
                ingredient_serializer.save()

        return Response({"success":True}, status=201)
