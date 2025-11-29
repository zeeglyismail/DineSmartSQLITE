from django.contrib.auth import get_user_model

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from common.custom_permission import CustomJWTAuthentication
from authentication.models import UserAccount
from common.response_utils import generate_response
from customer_api.serializers import CustomerProfileSerializer


User = get_user_model()



class CustomerProfileViewSet(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = CustomerProfileSerializer
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'patch']

    def get_queryset(self):
        return UserAccount.objects.filter(id=self.request.user.id)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_queryset().first()
        if not instance:
            return Response(generate_response(
                status_code=status.HTTP_404_NOT_FOUND,
                message="Profile not found.",
                success=False
            ), status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance)
        return Response(generate_response(
            status_code=status.HTTP_200_OK,
            message="Profile retrieved.",
            success=True,
            data=serializer.data
        ))

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_queryset().first()
        if not instance:
            return Response(generate_response(
                status_code=status.HTTP_404_NOT_FOUND,
                message="Profile not found.",
                success=False
            ), status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(generate_response(
                status_code=status.HTTP_200_OK,
                message="Profile updated successfully.",
                success=True,
                data=serializer.data
            ))

        return Response(generate_response(
            status_code=status.HTTP_400_BAD_REQUEST,
            message="Invalid data.",
            success=False,
            errors=serializer.errors
        ), status=status.HTTP_400_BAD_REQUEST)

    def perform_update(self, serializer):
        serializer.save(id=self.request.user.id)
