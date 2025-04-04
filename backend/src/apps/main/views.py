from typing import Any, cast

from django.contrib.auth import authenticate, login, logout
from django.http import HttpRequest
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
from rest_framework.viewsets import GenericViewSet, ModelViewSet, ViewSet

from .models import *
from .permissions import *
from .serializers import *

# Create your views here.


@apischema_view()
class AuthViewSet(ViewSet):
    @apischema(body=LoginIn, transaction=False)
    @action(methods=["post"], detail=False)
    def login(self, request: ASRequest[LoginIn]) -> Any:
        """登录"""
        user: User | None = cast(User | None, authenticate(request, **request.validated_data))
        if not user:
            raise HttpError(_("Invalid username or password"), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        login(request, user)
        return True

    @apischema()
    @action(methods=["post"], detail=False)
    def logout(self, request: HttpRequest) -> Any:
        """退出登录"""
        logout(request)

    @apischema(response=LoginStateOut)
    @action(methods=["get"], detail=False)
    def loginstate(self, request) -> Any:
        """登录信息"""
        user: User = request.user
        if not user.is_authenticated:
            return LoginStateOut({"user": None}).data
        return LoginStateOut({"user": user}).data


@apischema_view()
class UserViewSet(ModelViewSet):
    """用户管理"""

    queryset = User.objects.all()
    serializer_class = UserOut

    @apischema(body=UserIn)
    def create(self, request: ASRequest[UserIn]) -> Any:
        """创建用户"""
        return self.get_serializer(request.serializer.save()).data

    @apischema(body=UserResetPwdIn)
    @action(methods=["post"], detail=True)
    def reset_password(self, request: ASRequest[UserResetPwdIn], pk: int) -> Any:
        """重置用户密码"""
        user: User = self.get_object()
        if user.check_password(request.validated_data["password"]):
            raise HttpError(
                _("The new password cannot be the same as the old password."),
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )
        user.set_password(request.validated_data["password"])
        user.save()
        if request.user.pk == user.pk:
            logout(request)
