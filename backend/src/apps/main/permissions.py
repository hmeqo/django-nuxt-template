from rest_framework.permissions import BasePermission, IsAdminUser, IsAuthenticated

from .choices import *

IsStaff = IsAdminUser


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_superuser
