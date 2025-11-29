from rest_framework import serializers

from authentication.models import UserAccount


class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = (
            "id",
            "email",
            "name",
            "phone_number",
            "date_of_birth",
            'created_at',
            'updated_at',
        )
        read_only_fields = ("id",)
