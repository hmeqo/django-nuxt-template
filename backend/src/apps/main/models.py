from __future__ import annotations

from django.contrib.auth.models import AbstractUser, Group
from django.core.validators import MinLengthValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from drf_spectacular.utils import extend_schema_field, extend_schema_serializer
from rest_framework import serializers

from backend.common.modelutils import *

from .choices import *
from .validators import *

# Create your models here.


class User(AbstractUser):
    """用户"""

    user_info: "UserInfo"

    display_name = models.CharField(_("Display Name"), max_length=150, blank=True)

    class Meta:
        db_table = "main_user"
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return f"{self.username} ({self.display_name})" if self.display_name else self.username


# User._meta.get_field("username").max_length = 20


class UserInfo(models.Model):
    """用户信息"""

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True, related_name="user_info", verbose_name=_("User")
    )
    phone = models.CharField(
        _("Phone Number"), blank=True, max_length=20, validators=[MinLengthValidator(11)], db_index=True
    )

    class Meta:
        db_table = "main_user_info"
        verbose_name = _("User Info")
        verbose_name_plural = _("User Infos")

    def __str__(self):
        return f"{self.user}'s info"
