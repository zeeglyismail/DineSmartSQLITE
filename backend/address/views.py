from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from common.custom_permission import CustomJWTAuthentication
from address.models import Address
from address.serializers import AddressSerializer
from common.response_utils import generate_response


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return  Response(generate_response(
                status_code=status.HTTP_200_OK,
                message="address list successfully.",
                data=serializer.data,
                success=True
            ), status=status.HTTP_200_OK,)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.user != request.user:
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(instance)
        return  Response(generate_response(
                status_code=status.HTTP_200_OK,
                message="Address details retrieve successfully.",
                data=serializer.data,
                success=True
            ), status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
