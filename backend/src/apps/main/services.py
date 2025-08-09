from typing import Optional

from django.http import HttpRequest

from .models import *
from .serializers import *


class UserSrv:
    @staticmethod
    def login_state(request: HttpRequest):
        assert isinstance(request.user, User)
        return LoginStateSer(
            {
                "user": request.user,
                "expires": request.session.get_expiry_date(),
                "permissions": request.user.get_all_permissions(),
            }
        ).data
