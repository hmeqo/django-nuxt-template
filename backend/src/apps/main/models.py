from __future__ import annotations

from django.contrib.auth.models import AbstractUser, Group
from django.core.validators import MinLengthValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema_field, extend_schema_serializer
from rest_framework import serializers

from .enums import UserRole

# Create your models here.


class TimeStampMixin(models.Model):
    created_at = models.DateTimeField(_("Create Time"), auto_now_add=True)
    updated_at = models.DateTimeField(_("Update Time"), auto_now=True)

    class Meta:
        abstract = True


class User(AbstractUser):
    """用户"""

    display_name = models.CharField(_("Display Name"), max_length=150, blank=True)

    def __str__(self):
        return f"{self.username} ({self.display_name})" if self.display_name else self.username

    class Meta:
        db_table = "auth_user"
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    @property
    @extend_schema_field(
        serializers.ListField(child=serializers.ChoiceField(choices=UserRole.choices), label=_("Roles"))
    )
    def roles(self):
        return list(self.groups.values_list("name", flat=True))

    @roles.setter
    def roles(self, value: list[str]):
        self.groups.clear()
        if not value:
            return
        groups = list(Group.objects.filter(name__in=value))
        non_existing_roles = set(value) - set((i.name for i in groups))
        if non_existing_roles:
            non_existing_groups = (Group(name=i) for i in non_existing_roles)
            groups.extend(Group.objects.bulk_create(non_existing_groups))
        self.groups.add(*groups)


# User._meta.get_field("username").max_length = 20


# class UserInfo(models.Model):
#     """用户信息"""

#     user = models.OneToOneField(
#         User, on_delete=models.CASCADE, primary_key=True, related_name="user_info", verbose_name=_("User")
#     )
#     phone = models.CharField(_("Phone Number"), blank=True, max_length=20, validators=[MinLengthValidator(11)])

#     class Meta:
#         db_table = "main_user_info"
#         verbose_name = _("User Info")
#         verbose_name_plural = _("User Infos")

#     def __str__(self):
#         return f"{self.user.username}'s info"
