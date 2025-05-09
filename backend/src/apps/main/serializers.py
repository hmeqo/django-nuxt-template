from django.utils.translation import gettext_lazy as _
from drf_apischema import HttpError
from rest_framework import serializers

from .models import *
from .validators import PasswordValidator


class LoginIn(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]
        extra_kwargs = {
            "username": {
                "validators": [User.username_validator],
            },
            "password": {
                "min_length": 8,
                "max_length": 32,
                "validators": [PasswordValidator()],
            },
        }


class UserOut(serializers.ModelSerializer):
    roles = serializers.ListField(
        child=serializers.ChoiceField(choices=UserRole.choices),
        label=_("Roles"),
        read_only=False,
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "display_name",
            "first_name",
            "last_name",
            "is_active",
            "is_superuser",
            "is_staff",
            "roles",
        ]

    def validate(self, attrs):
        if attrs.get("is_superuser") and not attrs.get("is_staff"):
            attrs["is_staff"] = True
        return super().validate(attrs)


class LoginStateOut(serializers.Serializer):
    user = UserOut(read_only=True)
    expires = serializers.DateTimeField(read_only=True)


class UserIn(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "display_name",
            "first_name",
            "last_name",
            "is_superuser",
            "is_staff",
            "is_active",
        ]
        extra_kwargs = {
            "password": {
                "write_only": True,
                "min_length": 8,
                "max_length": 32,
                "validators": [PasswordValidator()],
            },
        }

    def validate(self, attrs):
        if attrs.get("is_superuser") and not attrs.get("is_staff"):
            attrs["is_staff"] = True
        return super().validate(attrs)

    def create(self, validated_data: dict):
        user: User = super().create(validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

    def update(self, instance: User, validated_data: dict):
        if "password" in validated_data:
            instance.set_password(validated_data.pop("password"))
        return super().update(instance, validated_data)


class UserResetPwdIn(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["password"]
        extra_kwargs = {
            "password": {
                "min_length": 8,
                "max_length": 32,
                "validators": [PasswordValidator()],
            },
        }
