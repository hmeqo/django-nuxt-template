from django.urls import include, path
from drf_apischema.urls import api_path
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register("auth", AuthViewSet, "auth")
router.register("users", UserViewSet)

urlpatterns = [
    api_path("api/", [path("", include(router.urls))]),
]
