from django.http import HttpRequest

from .models import *
from .serializers import *


class UserSrv:
    @staticmethod
    def login_state(user: User):
        return AuthStateSer(
            {
                "user": user,
            }
        ).data
