from typing import Any, Optional, cast

from django.contrib.auth import authenticate, login, logout
from django.utils.translation import gettext_lazy as _
from drf_apischema import ASRequest, HttpError, apischema, apischema_view
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import (
    CreateModelMixin,
    DestroyModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)
from rest_framework.parsers import MultiPartParser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet, ViewSet

from .models import *
from .permissions import *
from .serializers import *

# Create your views here.


@apischema_view()
class AuthViewSet(ViewSet):
    @apischema(body=LoginIn, transaction=False, response=UserOut)
    @action(methods=["post"], detail=False)
    def login(self, request: ASRequest[LoginIn]) -> Any:
        user = cast(Optional[User], authenticate(request, **request.validated_data))
        if not user:
            raise HttpError(_("Invalid username or password"), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        login(request, user)
        return UserOut(user).data

    @apischema()
    @action(methods=["post"], detail=False)
    def logout(self, request) -> Any:
        logout(request)

    @apischema(response=LoginStateOut)
    @action(methods=["get"], detail=False)
    def login_state(self, request: Request) -> Any:
        if not request.user.is_authenticated:
            return None
        return LoginStateOut({"user": request.user, "expires": request.session.get_expiry_date() or None}).data


@apischema_view()
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserOut
    permission_classes = [IsAuthenticated]

    def filter_queryset(self, queryset):
        if not cast(User, self.request.user).is_superuser:
            queryset = queryset.filter(pk=self.request.user.pk)
        return super().filter_queryset(queryset)

    @apischema(body=UserIn)
    def create(self, request: ASRequest[UserIn]) -> Any:
        return self.get_serializer(request.serializer.save()).data

    @apischema(permissions=[IsAuthenticated], response=UserOut)
    @action(methods=["get"], detail=False)
    def me(self, request: Request) -> Any:
        return UserOut(request.user).data

    @apischema(body=UserResetPwdIn)
    @action(methods=["post"], detail=True)
    def reset_password(self, request: ASRequest[UserResetPwdIn], pk: int) -> Any:
        user: User = self.get_object()
        if request.user.pk != user.pk and not cast(User, request.user).is_superuser:
            raise HttpError(_("Permission denied"), status=status.HTTP_403_FORBIDDEN)
        if user.check_password(request.validated_data["password"]):
            raise HttpError(
                _("The new password cannot be the same as the old password."),
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )
        user.set_password(request.validated_data["password"])
        user.save()
        if request.user.pk == user.pk:
            logout(request)
