from rest_framework import serializers
from django.contrib.auth.hashers import make_password

from common.custom_validation import PHONE_REGEX
from authentication.models import UserAccount


class CustomerLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(
        write_only=True
    )
    password = serializers.CharField(
        max_length=60,
        write_only=True,
        style={'input_type': 'password'}
    )


class CustomerRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = (
            "name",
            "email",
            # "phone_number",
            "password",
            "is_customer"
        )
        extra_kwargs = {
            'password': {'write_only': True, 'style': {'input_type': 'password'}},
            # 'phone_number': {'validators': [PHONE_REGEX]}
        }

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    
