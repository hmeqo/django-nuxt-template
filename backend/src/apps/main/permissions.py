from typing import cast

from rest_framework.permissions import BasePermission, IsAuthenticated

from .choices import *
from .models import User


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and cast(User, request.user).is_superuser


class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and cast(User, request.user).is_staff
