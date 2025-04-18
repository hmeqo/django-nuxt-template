from rest_framework.permissions import BasePermission, IsAdminUser, IsAuthenticated

from .choices import UserRole

IsStaff = IsAdminUser


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser


class IsRoleEmployee(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.groups.filter(name=UserRole.EMPLOYEE.value).exists()
