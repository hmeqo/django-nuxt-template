from typing import Any, Optional, cast

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
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet, ViewSet

from .models import *
from .permissions import *
from .serializers import *
from .services import *

# Create your views here.


@apischema_view()
class AuthViewSet(ViewSet):
    @apischema(body=LoginSer, transaction=False, response=LoginStateSer)
    @action(methods=["post"], detail=False)
    def login(self, request: ASRequest[LoginSer]):
        user = cast(Optional[User], authenticate(cast(HttpRequest, request), **request.validated_data))
        if not user:
            raise HttpError(_("Invalid username or password"), status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        login(cast(HttpRequest, request), user)
        return UserSrv.login_state(request)

    @apischema(response=None)
    @action(methods=["post"], detail=False)
    def logout(self, request) -> Any:
        logout(request)

    @apischema(response=LoginStateSer)
    @action(methods=["get"], detail=False)
    def login_state(self, request: Request):
        if not request.user.is_authenticated:
            raise HttpError(_("Not logged in"), status=status.HTTP_401_UNAUTHORIZED)
        return UserSrv.login_state(request)


@apischema_view(destroy=apischema(permissions=[IsSuperUser]))
class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSer
    permission_classes = [IsAuthenticated]

    def filter_queryset(self, queryset):
        if not cast(User, self.request.user).is_superuser and self.action not in ("list", "retrieve"):
            queryset = queryset.filter(pk=self.request.user.pk)
        return super().filter_queryset(queryset)

    @apischema(permissions=[IsAuthenticated], response=UserSer)
    @action(methods=["get"], detail=False)
    def me(self, request: Request) -> Any:
        return UserSer(request.user).data

    @apischema(body=UserResetPwdSer)
    @action(methods=["post"], detail=True)
    def reset_password(self, request: ASRequest[UserResetPwdSer], pk: int) -> Any:
        target_user = cast(User, request.serializer.instance)
        if request.user.pk != target_user.pk and not cast(User, request.user).is_superuser:
            raise HttpError(_("Permission denied"), status=status.HTTP_403_FORBIDDEN)
        if target_user.check_password(request.validated_data["password"]):
            raise HttpError(
                _("The new password cannot be the same as the old password."),
                status=status.HTTP_422_UNPROCESSABLE_ENTITY,
            )
        target_user.set_password(request.validated_data["password"])
        target_user.save()
        if request.user.pk == target_user.pk:
            logout(request)
