from django.contrib.auth import get_user_model

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from common.custom_permission import CustomJWTAuthentication
from table.models import TableModel
from common.response_utils import generate_response
from table.serializers import TableSerializer


User = get_user_model()

class TableViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing tables.
    """
    serializer_class = TableSerializer
    queryset = TableModel.objects.all()
    authentication_classes = []
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        """
        List all tables.
        """
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        print("List of tables:", serializer.data)
        return Response(
            generate_response(
            status_code=status.HTTP_200_OK,
            message="Table list.",
            success=True,
            data=serializer.data
        )
            , status=status.HTTP_200_OK
        )

    
    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a specific table by ID.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(
            generate_response(
            status_code=status.HTTP_200_OK,
            message="Table list.",
            success=True,
            data=serializer.data
        )
        , status=status.HTTP_200_OK
        )
    