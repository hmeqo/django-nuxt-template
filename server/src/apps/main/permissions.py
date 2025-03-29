from django.db.models.enums import TextChoices
from rest_framework.permissions import BasePermission, IsAdminUser, IsAuthenticated

from .enums import UserRole


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser


class IsRoleEmployee(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.groups.filter(name=UserRole.EMPLOYEE.value).exists()
